export const fetchLoginResult = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ result: 'success', userName: '9T' });
    }, 500);
  });
};
