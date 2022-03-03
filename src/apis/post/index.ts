import { API_URL } from '..';
import { IPost } from '../../pages/post';
import { patchCredentialsJSON, postCredentialsJSON } from '../util';

export const postComment = async (boardIdx: string, userIdx: number, content: string, isSecret: boolean) => {
  try {
    const res = (await fetch(`${API_URL}/users/comments/${boardIdx}`, postCredentialsJSON({ userIdx, content, isSecret: isSecret ? 'Y' : 'N' })).then((res) =>
      res.json(),
    )) as {
      success: boolean | undefined;
      code: number;
      message: string;
      data: {
        commentIdx: number;
      };
    };

    if (res.success) return { ok: true, msg: '성공' };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const patchPost = async (boardIdx: string, userIdx: number) => {
  try {
    const res = (await fetch(`${API_URL}/users/posts/${boardIdx}`, patchCredentialsJSON({ userIdx })).then((res) => res.json())) as {
      success: boolean | undefined;
      code: number;
      message: string;
      data: IPost;
    };

    if (res.success) return { ok: true, data: res.data };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const postLikes = async (boardIdx: string, userIdx: number) => {
  try {
    const res = (await fetch(`${API_URL}/users/posts/likes`, postCredentialsJSON({ userIdx, boardIdx })).then((res) => res.json())) as {
      success: boolean | undefined;
      code: number;
      message: string;
      data: {
        likeIdx: number;
      };
    };

    if (res.success) return { ok: true, data: res.data };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const patchCancelLikes = async (boardIdx: string, userIdx: number) => {
  try {
    const res = (await fetch(`${API_URL}/users/posts/cancel/likes`, patchCredentialsJSON({ userIdx, boardIdx })).then((res) => res.json())) as {
      success: boolean | undefined;
      code: number;
      message: string;
      data: {
        likeIdx: number;
      };
    };

    if (res.success) return { ok: true, data: res.data };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};
