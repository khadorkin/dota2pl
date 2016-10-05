import { createAction, handleActions } from 'redux-actions';
import { TOGGLE_USER_PANEL } from '../constants';

export const toggleUserPanel = createAction(TOGGLE_USER_PANEL);


const userProfileReducer = handleActions({
  [toggleUserPanel]: (state) => ({
    active: !state.active,
  }),
}, { active: false });

export default userProfileReducer;
