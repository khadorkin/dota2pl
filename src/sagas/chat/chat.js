import { call, take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { PUSH_MESSAGE, DELETE_MESSAGE, SEED_CHAT } from '../../constants';
import { seedChat, addMessage, deleteMessage } from '../../reducers/chat';
import logger from 'utils/logger';
const log = logger('sagas:chat');

function subscribeChat(socket) {
  return eventChannel(emit => {
    socket.on(SEED_CHAT, e => {
      const { results, room } = e;
      e && emit(seedChat(results, room));
    });
    socket.on(PUSH_MESSAGE, e => {
      const { message, room } = e;
      e && emit(addMessage(message, room));
    });
    socket.on(DELETE_MESSAGE, e => {
      const { removedMessages, room } = e;
      e && emit(deleteMessage(removedMessages, room));
    });

    return () => {};
  });
}


export function* readChat(socket) {
  // log.info('Opened socket channel');
  const channel = yield call(subscribeChat, socket);
  socket.emit(SEED_CHAT);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

