import { TOGGLE_LEFT, TOGGLE_RIGHT, TOGGLE_NAV } from '../constants';

const reducer = (state = { left: false, right: false, nav: false }, action) => {
  switch (action.type) {
    case TOGGLE_LEFT:
      return {
        ...state,
        left: !state.left,
      };
    case TOGGLE_RIGHT:
      return {
        ...state,
        right: !state.right,
      };
    case TOGGLE_NAV:
      return {
        ...state,
        nav: !state.nav,
      };
    default:
      return state;
  }
};

export default reducer;
