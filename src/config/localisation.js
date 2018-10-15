import { uniq } from 'ramda';

export const LOCATION_COOKIE_NAME = 'location';

export const DEFAULT_LOCALE = 'en';

export const FALLBACK_ROOT_REDIRECT_URL = '/en';

export const LOCATIONS = [
  {
    locale: 'en',
    localeTag: 'en',
    rootUrl: '/en',
    localeUrl: '/en',
  },
  {
    locale: 'zh',
    localeTag: 'zh',
    rootUrl: '/en',
    localeUrl: '/zh',
  },
];

// Should the site handle multiple locales?
export const HAS_MULTIPLE_LOCALES = LOCATIONS.length > 1;

// A full list of locale tags ('en-US' etc)
export const SUPPORTED_LOCALE_TAGS = uniq(LOCATIONS.map(loc => loc.localeTag));

export const getLocationByRootUrl = (rootUrl) => {
  if (!rootUrl) {
    return null;
  }
  const [, locale] = rootUrl.split('/');
  const localePath = `/${locale}`;
  const locations = LOCATIONS.filter(loc => loc.localeUrl === localePath);
  return locations[0];
};
