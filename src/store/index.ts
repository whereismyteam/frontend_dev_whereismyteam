import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import navigation from './navigation';
import { InitialState } from './auth';
import { UserState } from './user';
import { NavState } from './navigation';

export type rootState = {
  auth: InitialState;
  user: UserState;
  navigation: NavState;
};

const rootReducer = combineReducers({
  auth,
  user,
  navigation,
});

export default rootReducer;
