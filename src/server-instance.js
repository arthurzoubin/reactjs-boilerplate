import koa from 'koa'
import compress from 'koa-compress'
import session from 'koa-session-store'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import { ASSETS } from 'config/paths'
import sessionFlashArray from 'server/middleware/sessionFlashArray'
import handleError from 'server/middleware/handleError'
import rootGeoRedirect from 'server/middleware/rootGeolocationRedirect'
import helmet from 'koa-helmet'
import locale from 'koa-locale'

import {
  LOCALE_COOKIE_NAME,
  HAS_MULTIPLE_LOCALES,
} from 'config/localisation'

const app = koa()

app.keys = [ 'secret-keys', 'imaginato', 'reactjs base' ]

locale(app, LOCALE_COOKIE_NAME)

app.use(compress())
app.use(favicon(`${ASSETS}/favicon.ico`))
app.use(session())
app.use(sessionFlashArray())
// Security
app
  .use(helmet.contentSecurityPolicy())
  .use(helmet.dnsPrefetchControl())
  .use(helmet.hidePoweredBy())
  .use(helmet.hsts())
  .use(helmet.ieNoOpen())
  .use(helmet.noSniff())
  .use(helmet.xssFilter())

if (HAS_MULTIPLE_LOCALES) {
  app.
    use(rootGeoRedirect())
}

// reads process.env.DEBUG
/* istanbul ignore if  */
if (debug.enabled('server')) {
  app.use(logger())
}

app.use(handleError)

export default app
