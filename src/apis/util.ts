import { Cookies } from 'react-cookie';

const cookies = new Cookies();

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
    ACCESS_TOKEN: cookies.get('ACCESS_TOKEN'),
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
    ACCESS_TOKEN: cookies.get('ACCESS_TOKEN'),
  },
  body: JSON.stringify(body),
});

export const patchCredentialsJSON = (body: any): RequestInit => ({
  method: 'PATCH',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    ACCESS_TOKEN: cookies.get('ACCESS_TOKEN'),
  },
  body: JSON.stringify(body),
});

export const deleteCredentialsJSON = (body: any): RequestInit => ({
  method: 'DELETE',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    ACCESS_TOKEN: cookies.get('ACCESS_TOKEN'),
  },
  body: JSON.stringify(body),
});

export const postCredentialsJSONwithR_Token = (body: any): RequestInit => ({
  method: 'post',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    REFRESH_TOKEN: cookies.get('REFRESH_TOKEN'),
  },
  body: JSON.stringify(body),
});
