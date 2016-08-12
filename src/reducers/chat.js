
import {
  PUSH_MESSAGE,
  DELETE_MESSAGE,
  DELETE_MESSAGE_REQUEST,
  SEED_CHAT,
  SEND_MESSAGE_SOCKET,
  TIMEOUT_REQUEST,
  BAN_REQUEST,
} from '../constants';

const initialState = [];


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_MESSAGE:
      return [...state, action.payload];
    case DELETE_MESSAGE:
      return state.filter(m => !action.payload.includes(m.id));
    case SEED_CHAT:
      return [...action.payload];
    default:
      return state;
  }
};

export const addMessage = (data) => ({
  type: PUSH_MESSAGE,
  payload: data,
});

export const deleteMessage = (data) => ({
  type: DELETE_MESSAGE,
  payload: data,
});

export const deleteMessageRequest = (data) => ({
  type: DELETE_MESSAGE_REQUEST,
  remote: true,
  payload: data,
});

export const timeoutUser = (data) => ({
  type: TIMEOUT_REQUEST,
  remote: true,
  payload: data,
});

export const banUser = (data) => ({
  type: BAN_REQUEST,
  remote: true,
  payload: data,
});


export const seedChat = (data) => {
  const object = {
    type: SEED_CHAT,
    payload: data,
  };
  return (object);
};

export const sendMessage = (data) => ({
  type: SEND_MESSAGE_SOCKET,
  remote: true,
  payload: data,
});

export default reducer;
