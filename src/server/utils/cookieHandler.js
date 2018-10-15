import {
  getLocationByRootUrl,
  LOCATION_COOKIE_NAME,
} from 'config/localisation';

const COOKIE_OPTIONS = { httpOnly: false };

const log = debug('localisation-cookie');

export default class CookieJar {
  constructor(ctx) {
    this.cookies = ctx.cookies;
  }

  setLocation(rootUrl) {
    const location = getLocationByRootUrl(rootUrl);

    if (!location) {
      log('Invalid location', rootUrl);
      throw new Error(`Attempted to switch to invalid location ${rootUrl}`);
    }

    // Set the cookie to the root URL

    this.cookies.set(LOCATION_COOKIE_NAME, location.rootUrl, COOKIE_OPTIONS);
  }
}
