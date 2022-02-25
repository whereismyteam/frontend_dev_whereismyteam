import { getJSON, postJSON, postCredentialsJSON } from './util';
import { Cookies } from 'react-cookie';

const API_URL = `http://prod.9tapi.site:9000`;

// local login

export const fetchLogin = async (loginData: object): Promise<{ ok: boolean; msg: string; userIdx?: number; userName?: string }> => {
  try {
    const res = (await fetch(`${API_URL}/users/login`, postJSON(loginData)).then((res) => res.json())) as {
      success: boolean | undefined;
      message: string;
      data: {
        userIdx: number;
        token: string;
        refreshToken: string;
      };
    };
    if (res.success) {
      const cookies = new Cookies();
      cookies.set('ACCESS_TOKEN', res.data.token, { httpOnly: true });
      cookies.set('REFRESH_TOKEN', res.data.refreshToken, { httpOnly: true });
      return { ok: true, msg: '성공', userIdx: res.data.userIdx, userName: '홍길동' };
    } else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const fetchLogout = async (logoutData: object): Promise<{ ok: boolean; msg: string; userIdx?: number; userName?: string }> => {
  try {
    const res = (await fetch(`${API_URL}/users/login`, postCredentialsJSON(logoutData)).then((res) => res.json())) as {
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
