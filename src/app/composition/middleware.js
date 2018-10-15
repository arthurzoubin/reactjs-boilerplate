import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { hasWindow, SOCKET_FLAG } from 'app/utils';
import { outClientViaSocketIO } from 'redux-via-socket.io';
import createSagaMiddleware from 'redux-saga';
import { pipe, tap } from 'ramda';

const log = debug('DISPATCH:');

export const sagaMiddleware = createSagaMiddleware();
export const middleware = [
  thunkMiddleware,
  promiseMiddleware(),
  sagaMiddleware,
  routerMiddleware(browserHistory),
];

/* istanbul ignore else  */
if (hasWindow) {
  middleware.push(
    createLogger({
      predicate: () => debug.enabled(),
      collapsed: true,
    }),
  );
  if (SOCKET_FLAG === 'true') {
    middleware.push(
      outClientViaSocketIO(require('./socket')),
    );
  }
} else {
  middleware.push(
    () => next => pipe(tap(log), next),
  );
}
