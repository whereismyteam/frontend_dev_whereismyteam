import { API_URL } from '..';
import { postCredentialsJSON } from '../util';

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
