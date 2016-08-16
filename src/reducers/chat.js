
import {
  PUSH_MESSAGE,
  DELETE_MESSAGE,
  DELETE_MESSAGE_REQUEST,
  SEED_CHAT,
  SEND_MESSAGE_SOCKET,
  TIMEOUT_REQUEST,
  BAN_REQUEST,
  SIDEBAR_CHATROOM,
  TOGGLE_CHANNEL,
} from '../constants';
import { combineReducers } from 'redux';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_MESSAGE:
      return [...state, action.payload.data];
    case DELETE_MESSAGE:
      return state.filter(m => !action.payload.data.includes(m.id));
    case SEED_CHAT:
      return [...action.payload.data];
    default:
      return state;
  }
};

const room = (state = { active: false, messages: [] }, action) => {
  switch (action.type) {
    case TOGGLE_CHANNEL:
      return { ...state, active: !state.active };
    case PUSH_MESSAGE:
      action.payload.data = {
        ...action.payload.data,
        viewed: state.active ? state.active : false,
      };
      return { ...state, messages: reducer(state.messages, action) };
    case SEED_CHAT:
      return { ...state, messages: reducer(state.messages, action) };
    case DELETE_MESSAGE:
      return { ...state, messages: reducer(state.messages, action) };
    default:
      return state;
  }
};

const initialChannelsState = {
  [SIDEBAR_CHATROOM]: {
    messages: [],
    active: true,
  },
};

const active = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_CHANNEL:
      return !state;
    default:
      return state;
  }
};
/* Router reducer ;+) */
const channel = (state = initialChannelsState, action) => {
  switch (action.type) {
    case TOGGLE_CHANNEL:
      console.log(`hello`);
      console.log(action.payload);
      return { ...state, [action.payload.room]: room(state[action.payload.room], action) };
    case PUSH_MESSAGE:
      return { ...state, [action.payload.room]: room(state[action.payload.room], action) };
    case SEED_CHAT:
      return { ...state, [action.payload.room]: room(state[action.payload.room], action) };
    case DELETE_MESSAGE:
      return { ...state, [action.payload.room]: room(state[action.payload.room], action) };
    default:
      return state;
  }
};

export const toggleChannel = (room = SIDEBAR_CHATROOM) => ({
  type: TOGGLE_CHANNEL,
  payload: { room },
});

export const addMessage = (data, room) => ({
  type: PUSH_MESSAGE,
  payload: { data, room },
});

export const deleteMessage = (data, room) => ({
  type: DELETE_MESSAGE,
  payload: { data, room },
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

export const seedChat = (data, room) => {
  const viewedMessages = data.map(e => ({ ...e, viewed: true }));
  return {
    type: SEED_CHAT,
    payload: { data: viewedMessages, room },
  };
};

export const sendMessage = (data, room) => ({
  type: SEND_MESSAGE_SOCKET,
  remote: true,
  payload: {data, room},
});

export default channel;
