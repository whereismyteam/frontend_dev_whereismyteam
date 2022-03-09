import { bindActionCreators } from 'redux';

const LOGIN_INFO = 'user/LOGIN_INFO';
const LOGOUT = 'user/LOGOUT';

export type UserState = {
  isLogin: boolean;
  userIdx: number;
  nickName: string;
  email: string;
};

const initialState = {
  isLogin: false,
  userIdx: 0,
  nickName: '',
  email: '',
};

type Action = { type: 'user/LOGIN_INFO'; info: { isLogin: boolean; nickName: string; email: string } } | { type: 'user/LOGOUT' };

export default function user(state = initialState, action: Action) {
  switch (action.type) {
    case LOGIN_INFO:
      return { ...state, ...action.info };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}

export const setIsLogin = (info: { isLogin: boolean; userIdx: number | undefined; nickName: string | undefined; email: string | undefined }) => ({
  type: LOGIN_INFO,
  info,
});

export const setLogout = () => ({ type: LOGOUT });
