/*
 * HomePageReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable'

import {
  CHANGE_USERNAME,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
} from 'app/constants/homePage'

// The initial state of the App
const initialState = fromJS({
  username: '',
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
})

export const homePageReducers = (state, action) => {
  state = state ?fromJS(state): initialState
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.replace(/@/gi, ''))
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn([ 'userData', 'repositories' ], false)
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn([ 'userData', 'repositories' ], action.repos)
        .set('loading', false)
        .set('currentUser', action.username)
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
    default:
      return state
  }
}
