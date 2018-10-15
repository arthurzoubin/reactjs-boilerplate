/**
 * Homepage selectors
 */
import { createSelector } from 'reselect';

const selectHomePage = state => state.get('homePage');

const makeSelectUsername = () => createSelector(
  selectHomePage,
  homePageState => homePageState.get('username'),
);

const makeSelectLoading = () => createSelector(
  selectHomePage,
  homePageState => homePageState.get('loading'),
);

const makeSelectError = () => createSelector(
  selectHomePage,
  homePageState => homePageState.get('error'),
);

const makeSelectRepos = () => createSelector(
  selectHomePage,
  homePageState => homePageState.getIn(['userData', 'repositories']),
);

export {
  selectHomePage,
  makeSelectUsername,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
};
