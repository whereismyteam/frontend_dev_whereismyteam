// import axios, { AxiosInstance } from 'axios';

// const baseURL = 'prod.9tapi.site:9000';

// const httpClient: AxiosInstance = axios.create({
//   baseURL,
//   withCredentials: true,
// });

export const fetchLoginResult = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ result: 'success', userName: '9T' });
    }, 500);
  });
};

export const fetchEmailConfirm = async (email: string) => {
  // try {
  //   await httpClient.get(`users/emails?email=${email}`);
  //   return '사용 가능한 이메일입니다.';
  // } catch (error) {
  //   return '중복된 이메일입니다.';
  // }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('사용 가능한 이메일입니다.');
    }, 500);
  });
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
