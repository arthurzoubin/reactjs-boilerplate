// Set the react-intl translations and locale

import { fromJS } from 'immutable';
import { load as loadTranslations } from 'server/utils/intlTranslations';
import {
  LOCATION_COOKIE_NAME,
  DEFAULT_LOCALE,
  FALLBACK_ROOT_REDIRECT_URL,
  getLocationByRootUrl,
} from 'config/localisation';

const log = debug('set-intl');
const translations = loadTranslations();

export default async(ctx, next) => {
  { // Skip middleware if not an HTML request
    const { accept } = ctx.request.headers;
    if (accept && accept.indexOf('html') === -1) {
      return await next();
    }
  }

  let rootUrl;
  let location;
  let localeTag;

  // Try to pick up location from context's state object, set via
  if (ctx.state.location) {
    rootUrl = ctx.state.location.rootUrl;
    location = ctx.state.location;
  } else {
    rootUrl = ctx.cookies.get(LOCATION_COOKIE_NAME);
    location = getLocationByRootUrl(rootUrl);
  }
  if (location) {
    localeTag = location.localeTag;
    log(`set page locale to ${localeTag} for ${rootUrl}`);
  } else {
    localeTag = DEFAULT_LOCALE;
    location = getLocationByRootUrl(FALLBACK_ROOT_REDIRECT_URL);
    log('page locale cookie not found');
  }

  const messages = translations[localeTag] || {};

  ctx.state.intl = fromJS({
    defaultLocale: DEFAULT_LOCALE,
    locale: localeTag,
    messages,
  });

  ctx.state.location = location;

  await next();
};
