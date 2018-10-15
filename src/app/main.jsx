import { Router } from 'react-router';
import { after } from 'lodash';
import { compose, isArrayLike } from 'ramda';
import { Provider } from 'react-redux';
import IntlProvider from 'app/composition/IntlProvider';
import { trigger } from 'redial';
import { inClientViaSocketIO } from 'redux-via-socket.io';
import { history } from 'app/composition/history';
import socket from 'app/composition/socket';
import { store } from 'app/composition/store';
import makeRoutes from 'app/routes';
import DevTools from 'app/components/DevTools/DevTools';
import { sagaMiddleware } from 'app/composition/middleware';
import rootSaga from 'app/sagas';
import { SOCKET_FLAG } from 'app/utils';

import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import zhLocaleData from 'react-intl/locale-data/zh';

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

if (SOCKET_FLAG === 'true') {
  inClientViaSocketIO(socket, store.dispatch);
}
// If saga is array, run each.
isArrayLike(rootSaga) ? rootSaga.map(sagaMiddleware.run) : sagaMiddleware.run(rootSaga);

function routeLocalsTrigger(event) {
  return function() {
    const { components, location, params } = this.state;
    trigger(event, components, { dispatch: store.dispatch, location, params });
  };
}

const onRouteUpdate = compose(
  // ignore first defer call because of initial LOCATION_CHANGE event
  after(2, routeLocalsTrigger('defer')),
  // ignore first 2, pre-fetched data already in server render
  after(3, routeLocalsTrigger('prefetch'))
);

const intlSelector = state => state.get('intl').toJS();
export const Main = (
  <Provider store={store}>
    <IntlProvider intlSelector={intlSelector}>
      <Router history={history} onUpdate={onRouteUpdate}>
        {makeRoutes()}
      </Router>
    </IntlProvider>
  </Provider>
);

export const Dev = (
  <Provider store={store}>
    <IntlProvider intlSelector={intlSelector}>
      <DevTools />
    </IntlProvider>
  </Provider>
);
