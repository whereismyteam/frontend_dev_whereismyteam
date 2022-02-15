import { getJSON, postJSON } from './util';

const API_URL = `http://prod.9tapi.site:9000`;

export const fetchLoginResult = async (email: string, password: string) => {
  try {
    const response = await fetch(`http://prod.9tapi.site:9000/user/login`, postJSON({ email, password }));

    return response;
  } catch (e) {
    console.error(e);
  }
};

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
