import { API_URL } from '..';
import { IPost } from '../../pages/post';
import { ITempList } from '../../pages/post/write';
import { deleteCredentialsJSON, getCredentialsJSON, patchCredentialsJSON, postCredentialsJSON } from '../util';

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

export const postReply = async (boardIdx: string, parentIdx: number, userIdx: number, content: string, isSecret: boolean) => {
  try {
    const res = (await fetch(
      `${API_URL}/users/comments/${boardIdx}/reComments/${parentIdx}`,
      postCredentialsJSON({ userIdx, content, isSecret: isSecret ? 'Y' : 'N' }),
    ).then((res) => res.json())) as {
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

export const deleteComment = async (userIdx: number, commentIdx: number) => {
  try {
    const res = (await fetch(`${API_URL}/users/comments/${commentIdx}`, deleteCredentialsJSON({ userIdx })).then((res) => res.json())) as {
      success: boolean | undefined;
      code: number;
      message: string;
      data: string;
    };

    if (res.success) return { ok: true, msg: res.data };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const postPost = async (args: {
  userIdx: number;
  title: string;
  content: string;
  onOff: string;
  categoryName: string;
  capacityNum: number;
  recruitmentPart: Array<string>;
  area: string;
  techstacks: Array<string>;
  boardStatus: string;
}) => {
  try {
    const res = (await fetch(`${API_URL}/users/posts`, postCredentialsJSON({ ...args })).then((res) => res.json())) as {
      success: boolean | undefined;
      code: number;
      message: string;
      data: string;
    };

    if (res.success) return { ok: true, msg: res.data };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const patchPostFix = async (args: {
  postIdx: number;
  userIdx: number;
  title: string;
  content: string;
  onOff: string;
  category: string;
  capacityNum: number;
  recruitmentPart: Array<string>;
  area: string;
  techstacks: Array<string>;
}) => {
  try {
    const res = (await fetch(`${API_URL}/users/posts/${args.postIdx}/fix`, patchCredentialsJSON({ ...args })).then((res) => res.json())) as {
      success: boolean | undefined;
      code: number;
      message: string;
      data: string;
    };

    if (res.success) return { ok: true, msg: res.data };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};

export const getPrePosts = async (userIdx: number) => {
  try {
    const res = (await fetch(`${API_URL}/users/${userIdx}/prePosts`, getCredentialsJSON()).then((res) => res.json())) as {
      success: boolean | undefined;
      code: number;
      message: string;
      data: ITempList;
    };

    if (res.success) return { ok: true, data: res.data };
    else return { ok: false, msg: res.message };
  } catch (e) {
    return { ok: false, msg: '서버가 불안정합니다. 다시 시도해주세요' };
  }
};
