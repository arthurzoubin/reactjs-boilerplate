/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'ReactjsBoilerplate/HomePage/CHANGE_USERNAME'
export const LOAD_REPOS = 'ReactjsBoilerplate/HomePage/LOAD_REPOS'
export const LOAD_REPOS_SUCCESS = 'ReactjsBoilerplate/HomePage/LOAD_REPOS_SUCCESS'
export const LOAD_REPOS_ERROR = 'ReactjsBoilerplate/HomePage/LOAD_REPOS_ERROR'
