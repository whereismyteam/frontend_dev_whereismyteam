const SET_CATEGORYIDX = 'main/SET_CATEGORYIDX';

export const setCategoryIndex = (num: number) => ({ type: SET_CATEGORYIDX, num });

export type MainState = {
  categoryIdx: number;
};

const navState: MainState = {
  categoryIdx: 0,
};

type Action = { type: 'main/SET_CATEGORYIDX'; num: number };

export default function navigation(state = navState, action: Action) {
  switch (action.type) {
    case SET_CATEGORYIDX:
      return {
        ...state,
        categoryIdx: action.num,
      };
    default:
      return state;
  }
}
