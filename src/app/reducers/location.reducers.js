import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  error: false,
  isPending: false,
  location: [],
});

export const locationReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
