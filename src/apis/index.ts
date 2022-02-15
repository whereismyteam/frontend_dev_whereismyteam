// import axios, { AxiosInstance } from 'axios';

// const baseURL = 'prod.9tapi.site:9000';

// const httpClient: AxiosInstance = axios.create({
//   baseURL,
//   withCredentials: true,
// });

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

  // try {
  //   await httpClient.get(`users/emails?email=${email}`);
  //   return '사용 가능한 이메일입니다.';
  // } catch (error) {
  //   return '중복된 이메일입니다.';
  // }
};

export const fetchRegister = async (registerData: object) => {
  // try {
  //   const res = await ~.post("users/signup", registerData);
  //   return res;
  // } catch (error) {
  //   console.error(error);
  // }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        code: 0,
        msg: '성공',
        data: {
          userIdx: 2,
          email: 'cofls6581@naver.com',
        },
      });
    }, 500);
  });
};
