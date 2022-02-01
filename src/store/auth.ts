const MODAL_VISIBLE = 'auth/MODAL_VISIBLE';
const SET_LOGIN = 'auth/SET_LOGIN';
const SET_REGISTER = 'auth/SET_REGISTER';
const SET_UID = 'auth/SET_UID';
const SET_UPW = 'auth/SET_UPW';

export const setModalVisible = (isVisible: boolean) => ({ type: MODAL_VISIBLE, isVisible });
export const setLogin = () => ({ type: SET_LOGIN });
export const setRegister = () => ({ type: SET_REGISTER });
export const setUserId = (uid: string) => ({ type: SET_UID, uid });
export const setUserPw = (upw: string) => ({ type: SET_UPW, upw });

export type InitialState = {
  modalVisible: boolean;
  loginOrRegister: boolean;
  userId: string;
  userPw: string;
};

const initialState: InitialState = {
  modalVisible: false,
  loginOrRegister: true,
  userId: '',
  userPw: '',
};

type Action =
  | { type: 'auth/MODAL_VISIBLE'; isVisible: boolean }
  | { type: 'auth/SET_LOGIN' }
  | { type: 'auth/SET_REGISTER' }
  | { type: 'auth/SET_UID'; uid: string }
  | { type: 'auth/SET_UPW'; upw: string };

export default function auth(state = initialState, action: Action) {
  switch (action.type) {
    case MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.isVisible,
      };
    case SET_LOGIN:
      return {
        ...state,
        loginOrRegister: true,
      };
    case SET_REGISTER:
      return {
        ...state,
        loginOrRegister: false,
      };
    case SET_UID:
      return {
        ...state,
        userId: action.uid,
      };
    case SET_UPW:
      return {
        ...state,
        userId: action.upw,
      };
    default:
      return state;
  }
}
