import { bindActionCreators } from 'redux';

const LOGIN_INFO = 'user/LOGIN_INFO';

export type UserState = {
  isLogin: boolean;
  userName: string;
};

const initialState = {
  isLogin: false,
  userName: '',
};

type Action = { type: 'user/LOGIN_INFO'; info: { isLogin: boolean; userName: string } };

export default function user(state = initialState, action: Action) {
  switch (action.type) {
    case LOGIN_INFO:
      return { ...state, ...action.info };
    default:
      return state;
  }
}

export const setIsLogin = (info: { isLogin: boolean; userName: string | undefined }) => ({ type: LOGIN_INFO, info });
