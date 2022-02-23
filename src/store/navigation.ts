const SCROLLED = 'navigation/SCROLLED';

export const setScrolled = () => ({ type: SCROLLED });

export type NavState = {
  isScrolled: boolean;
};

const navState: NavState = {
  isScrolled: false,
};

type Action = { type: 'navigation/SCROLLED' };

export default function navigation(state = navState, action: Action) {
  switch (action.type) {
    case SCROLLED:
      return {
        ...state,
        isScrolled: !state.isScrolled,
      };
    default:
      return state;
  }
}
