/**
 * Created by micha on 15.07.2016.
 */

import { LOGIN_USER, LOGOUT_USER } from '../constants';

const initialState = {
  userName: null,
  userId: null,
  avatarUrl: null,
  isAdmin: false,
  twitchId: null,
  twitchName: null,
  roles: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state,
        userName: action.payload.userName,
        userId: action.payload.userId,
        avatarUrl: action.payload.avatarUrl.big,
        twitchName: action.payload.twitchName,
        twitchId: action.payload.twitchId,
        isAdmin: action.payload.admin };
    case LOGOUT_USER:
      return { ...state, userName: null, userId: null };
    default:
      return state;
  }
};

export const loginUser = (userName, userId, avatarUrl, admin, twitchId, twitchName) => ({
  type: LOGIN_USER,
  payload: { userName, userId, avatarUrl, admin, twitchId, twitchName },
});

export const logoutUser = () => ({ type: LOGOUT_USER });

export default reducer;
