import {TOGGLE_LEFT, TOGGLE_RIGHT } from '../constants';

const reducer = (state = {left: false, right: true}, action) => {
  switch(action.type) {
    case TOGGLE_LEFT:
      return {
        ...state,
        left: !state.left
      }
    case TOGGLE_RIGHT:
      return {
        ...state,
        right: !state.right
      }
    default:
      return state;
  }

}

export default reducer;