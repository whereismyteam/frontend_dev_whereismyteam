import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import main from './main';
import { InitialState } from './auth';
import { UserState } from './user';
import { MainState } from './main';

export type rootState = {
  auth: InitialState;
  user: UserState;
  main: MainState;
};

const rootReducer = combineReducers({
  auth,
  user,
  main,
});

export default rootReducer;
