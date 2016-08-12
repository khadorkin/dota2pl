/**
 * Created by micha on 15.07.2016.
 */

import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';
import { seedChat, addMessage, deleteMessage } from '../reducers/chat';
import { updateStreamList } from '../reducers/stream';
import { PUSH_MESSAGE, DELETE_MESSAGE, SEED_CHAT, SEND_MESSAGE_SOCKET } from '../constants';


const connectionPathFactory = (user) => {
  const { userName } = user;
  let host = null;
  let connectionPath = null;
  try {
    host = process.env.NODE_ENV === 'development' ? document.location.hostname + ':3000' : document.location.hostname;
    connectionPath = `${document.location.protocol}//${host}/${userName ? 'authorized' : 'public'}`;
  } catch (e) {
    connectionPath = `http://localhost:3000/${userName ? 'authorized' : 'public'}`;
  }

  console.log(process.env.NODE_ENV, connectionPath);
  return connectionPath;
};

const connect = (user) => {
  const socket = io(connectionPathFactory(user));
  return new Promise(resolve => {
    socket.on('connect', () => {
      console.log(`Eastblished ${user.userName ? 'private' : 'public'} wS connection!`);
      resolve(socket);
    });
  });
};

function* readChat(socket) {
  console.log('[Chat] Opened socket channel');
  const channel = yield call(subscribeChat, socket);
  socket.emit(SEED_CHAT);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
function* readStreams(socket) {
  console.log('[StreamService] Initialized');
  const channel = yield call(subscribeStream, socket);
  socket.emit('stream:getInitial');
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}


function* write(socket) {
  while (true) {
    let { type, payload } = yield take(action => action.remote);
    console.log(type, payload);
    socket.emit(type, payload);
  }
}

function* handleSockets(socket) {
  yield fork(readChat, socket);
  yield fork(readStreams, socket);
  yield fork(write, socket);
}


function subscribeStream(socket) {
  return eventChannel(emit => {
    socket.on('stream:list', e => {
      // console.log(`[Stream] received list from server:`,e);
      emit(updateStreamList(e));
    });


    return () => {};
  });
}


function subscribeChat(socket) {
  return eventChannel(emit => {
    socket.on(SEED_CHAT, e => {
      emit(seedChat(e));
    });
    socket.on(PUSH_MESSAGE, e => {
      if (e) emit(addMessage(e));
    });
    socket.on(DELETE_MESSAGE, e => {
      if (e) emit(deleteMessage(e));
    });

    return () => {};
  });
}


export function* socketSaga() {
  const selector = (state) => (state.auth);
  const user = yield select(selector);
  const socket = yield call(connect, user);
  const task = yield fork(handleSockets, socket);
}


export default function* rootSaga() {
  yield fork(socketSaga);
}
