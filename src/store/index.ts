import { combineReducers } from 'redux';
import auth from './auth';
import { InitialState } from './auth';

export type rootState = {
  auth: InitialState;
};

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
