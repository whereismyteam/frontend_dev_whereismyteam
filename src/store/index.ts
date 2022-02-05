import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import { InitialState } from './auth';
import { UserState } from './user';

export type rootState = {
  auth: InitialState;
  user: UserState;
};

const rootReducer = combineReducers({
  auth,
  user,
});

export default rootReducer;
