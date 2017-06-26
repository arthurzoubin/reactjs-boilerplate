// This middleware listens to any request on the root of the site,
// performs a geoip lookup, and redirects the user to the best matching
// localised version URL.

import {
  getLocationByRootUrl,
  LOCATION_COOKIE_NAME,
  FALLBACK_ROOT_REDIRECT_URL,
} from 'config/localisation'
import { InvalidLocaleRootUrlException } from 'server/exceptions'
import CookieJar from 'server/utils/cookieHandler'

const log = debug('root-geo-redirect')

export default function rootGeolocationRedirect() {
  return function * (next) {
    { // Skip middleware if not an HTML request
      const { accept } = this.request.headers
      if (accept && accept.indexOf('html') === -1) {
        return yield next
      }
    }

    const rootUrl = this.cookies.get(LOCATION_COOKIE_NAME)

    // If root URL request
    if (this.request.url === '/') {
      let redirectUrl = null
      if (rootUrl) {
        if(rootUrl !== FALLBACK_ROOT_REDIRECT_URL) {
          redirectUrl = `/api/switch${FALLBACK_ROOT_REDIRECT_URL}`
          log('could not geolocate, redirecting to fallback', redirectUrl)
          return this.redirect(redirectUrl)
        }
      } else {
        const rootUrl = FALLBACK_ROOT_REDIRECT_URL
        const location = getLocationByRootUrl(rootUrl)
        log('Location after parsing', location)
        if (!location) {
          throw new InvalidLocaleRootUrlException(rootUrl)
        }
        // Pass to other middleware via context's state object
        this.state.location = location
        // Set cookie for future sticky sessions
        new CookieJar(this).setLocation(location.rootUrl)
      }
    } else if (!this.request.url.startsWith('/api/')) {
      // Not a root request
      if (this.request.accepts('html')) {
        const { url } = this.request
        log(`not a root request, parsing ${url}`)
        // Extract country, city, locale
        const m = url.match(/\/([^\/]{2})\/([^\/]+)\/?/)
        if (m !== null) {
          try {
            const rootUrl = m[0].replace(/\/$/, '') // strip trailing '/'
            const location = getLocationByRootUrl(rootUrl)
            log('Location after parsing', location)
            if (!location) {
              throw new InvalidLocaleRootUrlException(rootUrl)
            }
            // Pass to other middleware via context's state object
            this.state.location = location
            // Set cookie for future sticky sessions
            new CookieJar(this).setLocation(location.rootUrl)
          } catch (err) {
            log('error extracting locale from URL')
            if (err instanceof InvalidLocaleRootUrlException) {
              log('location is not supported', err, rootUrl)
              throw err
            }
          }
        }
      }
    }

    yield next
  }
}
