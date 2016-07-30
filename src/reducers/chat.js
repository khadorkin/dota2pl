
import {PUSH_MESSAGE, DELETE_MESSAGE, SEED_CHAT, SEND_MESSAGE_SOCKET} from '../constants';

const initialState  = [];


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case PUSH_MESSAGE:

      return [...state, action.payload]
    case SEED_CHAT:
      return [...action.payload]
    default:
      return state;
  }
}

export const addMessage = (data) => ({
  type: PUSH_MESSAGE,
  payload: data
});

export const seedChat = (data) => {
  const object = {
    type: SEED_CHAT,
    payload: data
  };
  return (object);
}

export const sendMessage = (data) => ({
  type: SEND_MESSAGE_SOCKET,
  payload: data
})

export default reducer;