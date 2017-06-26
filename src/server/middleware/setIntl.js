// Set the react-intl translations and locale

import { fromJS } from 'immutable'
import { load as loadTranslations } from 'server/utils/intlTranslations'
import {
  LOCATION_COOKIE_NAME,
  DEFAULT_LOCALE,
  FALLBACK_ROOT_REDIRECT_URL,
  getLocationByRootUrl,
} from 'config/localisation'

const log = debug('set-intl')
const translations = loadTranslations()

export default function * (next) {
  { // Skip middleware if not an HTML request
    const { accept } = this.request.headers
    if (accept && accept.indexOf('html') === -1) {
      return yield next
    }
  }

  let rootUrl, location, localeTag

  // Try to pick up location from context's state object, set via
  if (this.state.location) {
    rootUrl = this.state.location.rootUrl
    location = this.state.location
  } else {
    rootUrl = this.cookies.get(LOCATION_COOKIE_NAME)
    location = getLocationByRootUrl(rootUrl)
  }
  if (location) {
    localeTag = location.localeTag
    log(`set page locale to ${localeTag} for ${rootUrl}`)
  } else {
    localeTag = DEFAULT_LOCALE
    location = getLocationByRootUrl(FALLBACK_ROOT_REDIRECT_URL)
    log('page locale cookie not found')
  }

  let messages = translations[localeTag] || {}

  this.state.intl = fromJS({
    defaultLocale: DEFAULT_LOCALE,
    locale: localeTag,
    messages,
  })

  this.state.location = location

  yield next
}
