/**
 * Gets the repositories of the user from Github
 */

import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { LOAD_REPOS } from 'app/constants/homePage';
import {
  reposLoaded,
  repoLoadingError,
} from 'app/actions/homePage';

import { makeSelectUsername } from 'app/selectors/homePage';
import { doGetRepos } from 'app/services/HomePage';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(doGetRepos, { username });
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  yield takeLatest(LOAD_REPOS, getRepos);
}

// Bootstrap sagas
export const homePageSaga = [
  githubData,
];
