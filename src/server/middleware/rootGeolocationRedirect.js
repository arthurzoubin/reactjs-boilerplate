// This middleware listens to any request on the root of the site,
// performs a geoip lookup, and redirects the user to the best matching
// localised version URL.

import {
  getLocationByRootUrl,
  LOCATION_COOKIE_NAME,
  FALLBACK_ROOT_REDIRECT_URL,
} from 'config/localisation';
import { InvalidLocaleRootUrlException } from 'server/exceptions';
import CookieJar from 'server/utils/cookieHandler';

const log = debug('root-geo-redirect');

export default function rootGeolocationRedirect() {
  return async (ctx, next) => {
    { // Skip middleware if not an HTML request
      const { accept } = ctx.request.headers;
      if (accept && accept.indexOf('html') === -1) {
        return await next();
      }
    }

    let rootUrl = ctx.cookies.get(LOCATION_COOKIE_NAME);

    // If root URL request
    if (ctx.request.url === '/') {
      rootUrl = FALLBACK_ROOT_REDIRECT_URL;
      const location = getLocationByRootUrl(rootUrl);
      log('Location after parsing', location);
      if (!location) {
        throw new InvalidLocaleRootUrlException(rootUrl);
      }
      // Pass to other middleware via context's state object
      ctx.state.location = location;
      // Set cookie for future sticky sessions
      new CookieJar(ctx).setLocation(location.rootUrl);
    } else if (!ctx.request.url.startsWith('/api/')) {
      // Not a root request
      if (ctx.request.accepts('html')) {
        const { url } = ctx.request;
        log(`not a root request, parsing ${url}`);
        // Extract country, city, locale
        const m = url.match(/\/([^\/]{2})\/([^\/]+)\/?/);
        if (m !== null) {
          try {
            rootUrl = m[0].replace(/\/$/, ''); // strip trailing '/'
            const location = getLocationByRootUrl(rootUrl);
            log('Location after parsing', location);
            if (!location) {
              throw new InvalidLocaleRootUrlException(rootUrl);
            }
            // Pass to other middleware via context's state object
            ctx.state.location = location;
            // Set cookie for future sticky sessions
            new CookieJar(ctx).setLocation(location.rootUrl);
          } catch (err) {
            log('error extracting locale from URL');
            if (err instanceof InvalidLocaleRootUrlException) {
              log('location is not supported', err, rootUrl);
              throw err;
            }
          }
        }
      }
    }
    await next();
  };
}
