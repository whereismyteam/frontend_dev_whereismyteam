export const getJSON = (): RequestInit => ({
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCredentialsJSON = (): RequestInit => ({
  method: 'get',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postJSON = (body: any): RequestInit => ({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const postCredentialsJSON = (body: any): RequestInit => ({
  method: 'post',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});
