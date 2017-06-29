/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { LOAD_REPOS } from 'app/constants/homePage'
import { reposLoaded, repoLoadingError } from 'app/actions/homePage'

import { request } from 'app/utils'
import { makeSelectUsername } from 'app/selectors/homePage'

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername())
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request.fetch, requestURL)
    yield put(reposLoaded(repos, username))
  } catch (err) {
    yield put(repoLoadingError(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_REPOS, getRepos)

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// Bootstrap sagas
export const homePageSaga = [
  githubData,
]
