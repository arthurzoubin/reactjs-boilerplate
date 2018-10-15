import { UPDATE } from 'react-intl-redux';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { enableBatching } from 'redux-batched-actions';
import { homePageReducers as homePage } from 'app/reducers/homePage.reducers';
import { locationReducers as location } from './location.reducers';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/*
 * intlReducer
 *
 * The reducer merges route int changes into our immutable state.
 *
 */

// Initial routing state
const intlInitialState = fromJS({
  locale: 'en',
  messages: {},
});

/**
 * Merge intl the global application state
 */
function intlReducer(state = intlInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case UPDATE:
      return state.merge({
        ...action.payload,
      });
    default:
      return state;
  }
}

export default enableBatching(combineReducers({
  intl: intlReducer,
  homePage,
  location,
  routing: routeReducer,
}));
