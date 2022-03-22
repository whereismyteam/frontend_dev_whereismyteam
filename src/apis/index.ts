import { getJSON, postJSON, postCredentialsJSON, getCredentialsJSON, postCredentialsJSONwithR_Token } from './util';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

export const API_URL = `http://prod.9tapi.site:9000`;

import { setLogout } from '../store/user';
import { setModalVisible } from '../store/auth';

// local login

export const fetchLogin = async (loginData: object): Promise<{ ok: boolean; msg: string; userIdx?: number; nickName?: string; email?: string }> => {
  try {
    const res = (await fetch(`${API_URL}/users/login`, postJSON(loginData)).then((res) => res.json())) as {
      success: boolean | undefined;
      message: string;
      data: {
        email: string;
        nickName: string;
        userIdx: number;
        token: string;
        refreshToken: string;
      };
    };
    if (res.success) {
      const cookies = new Cookies();
      cookies.set('ACCESS_TOKEN', res.data.token);
      cookies.set('REFRESH_TOKEN', res.data.refreshToken);
      cookies.set('userIdx', res.data.userIdx);
      console.log(res);
      return { ok: true, msg: '성공', userIdx: res.data.userIdx, nickName: res.data.nickName, email: res.data.email };
    } else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const fetchLogout = async (logoutData: object): Promise<{ ok: boolean; msg: string; userIdx?: number; userName?: string }> => {
  try {
    const res = (await fetch(`${API_URL}/users/logout`, postCredentialsJSON(logoutData)).then((res) => res.json())) as {
      success: boolean | undefined;
      message: string;
    };
    if (res.success) {
      return { ok: true, msg: '성공' };
    } else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const fetchNewAccessToken = async (accessTokenData: object): Promise<{ ok: boolean; isReLogin?: boolean }> => {
  try {
    const res = (await fetch(`${API_URL}/users/newAccessToken`, postCredentialsJSONwithR_Token(accessTokenData)).then((res) => res.json())) as {
      success: boolean | undefined;
      message: string;
      data: {
        accessToken: string;
      };
    };
    console.log(res); // console.log
    if (res.success) {
      const cookies = new Cookies();
      cookies.set('ACCESS_TOKEN', res.data.accessToken);
      return { ok: true, isReLogin: false };
    } else if (res.message == '다시 로그인 해주세요.') return { ok: false, isReLogin: true };
    else return { ok: false };
  } catch (e) {
    return { ok: false };
  }
};

export const fetchUserInfo = async (): Promise<{ ok: boolean; msg: string; userIdx?: number; nickName?: string; email?: string }> => {
  try {
    const cookies = new Cookies();
    const userIdx: string = cookies.get('userIdx');
    const res = (await fetch(`${API_URL}/users/${userIdx}/info`, getCredentialsJSON()).then((res) => res.json())) as {
      success: boolean | undefined;
      message: string;
      data: {
        email: string;
        nickName: string;
        userIdx: number;
      };
    };
    if (res.success) {
      return { ok: true, msg: '성공', userIdx: res.data.userIdx, nickName: res.data.nickName, email: res.data.email };
    } else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

// register

export const fetchEmailConfirm = async (email: string): Promise<{ ok: boolean; msg: string }> => {
  try {
    const res = (await fetch(`${API_URL}/users/emails?email=${email}`, getJSON()).then((res) => res.json())) as {
      success: boolean | undefined;
      data: string;
      message: string;
    };

    if (res.success) return { ok: true, msg: res.data };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const fetchNickNameConfirm = async (nickName: string): Promise<{ ok: boolean; msg: string }> => {
  try {
    const res = (await fetch(`${API_URL}/users/nickNames?nickName=${nickName}`, getJSON()).then((res) => res.json())) as {
      success: boolean | undefined;
      data: string;
      message: string;
    };

    if (res.success) return { ok: true, msg: res.data };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const fetchRegister = async (registerData: object): Promise<{ ok: boolean; msg: string }> => {
  try {
    const res = (await fetch(`${API_URL}/users/signup`, postJSON(registerData)).then((res) => res.json())) as {
      success: boolean | undefined;
      message: string;
    };

    if (res.success) return { ok: true, msg: '성공' };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const fetchEmailSend = async (email: string): Promise<{ ok: boolean; msg: string }> => {
  try {
    const res = (await fetch(`${API_URL}/users/emails/send-email`, postJSON({ email })).then((res) => res.json())) as {
      success: boolean | undefined;
      message: string;
    };

    if (res.success) return { ok: true, msg: '성공' };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

// get access token

// export const identifiNewAccessToken = async (fetchFunction: () => Promise<any>): Promise<object> => {
//   await fetchFunction().then(async (res: { msg: string }) => {
//     if (res.msg == 'Access 토큰이 만료됐습니다. 재발급 받아주세요.') {
//       const cookies = new Cookies();
//       const dispatch = useDispatch();
//       const userIdx = cookies.get('userIdx');
//       const accessTokenData = { userIdx };
//       const response = await fetchNewAccessToken(accessTokenData);
//       if (response.ok) {
//         return fetchFunction();
//       } else if (response.isReLogin) {
//         dispatch(setLogout());
//         cookies.remove('ACCESS_TOKEN');
//         cookies.remove('REFRESH_TOKEN');
//         cookies.remove('userIdx');
//         alert('다시 로그인 해주세요');
//         dispatch(setModalVisible(true));
//       } else {
//         return;
//       }
//     } else return res;
//   });
// };
