import Koa from 'koa';
import compress from 'koa-compress';
import convert from 'koa-convert';
import session from 'koa-session-store';
import logger from 'koa-logger';
import favicon from 'koa-favicon';
import { ASSETS } from 'config/paths';
import sessionFlashArray from 'server/middleware/sessionFlashArray';
import handleError from 'server/middleware/handleError';
import rootGeoRedirect from 'server/middleware/rootGeolocationRedirect';
import locale from 'koa-locale';
import compressible from 'compressible';

import {
  LOCALE_COOKIE_NAME,
  HAS_MULTIPLE_LOCALES,
} from 'config/localisation';

const app = new Koa();

app.keys = ['secret-keys', 'imaginato', 'reactjs base'];

locale(app, LOCALE_COOKIE_NAME);

app.use(compress({
  filter: type => !(/event-stream/i.test(type)) && compressible(type),
}));
app.use(favicon(`${ASSETS}/favicon.ico`));
app.use(convert(session()));
app.use(sessionFlashArray());

if (HAS_MULTIPLE_LOCALES) {
  app.use(rootGeoRedirect());
}

// reads process.env.DEBUG
/* istanbul ignore if  */
if (debug.enabled('server')) {
  app.use(logger());
}

app.use(handleError);

export default app;
