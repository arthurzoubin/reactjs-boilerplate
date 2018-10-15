import { fromJS } from 'immutable';
import { isBrowser } from 'app/utils';
import makeCreateStore from 'app/composition/makeCreateStore';
import rootReducer from 'app/reducers';
import { middleware } from 'app/composition/middleware';

export const store = makeCreateStore(middleware)(
  rootReducer,
  isBrowser ? fromJS(window.__INITIAL_STATE__) : fromJS({})
);

/* istanbul ignore if  */
if (module.hot) {
  /* istanbul ignore next */
  module.hot.accept('app/reducers', () => {
    store.replaceReducer(require('app/reducers'));
  });
}
