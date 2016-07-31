/**
 * Created by micha on 15.07.2016.
 */

import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';
import { seedChat, addMessage } from '../reducers/chat';

const connectionPathFactory = (user) => {
  const {userName} = user;
  const host = process.env.NODE_ENV === 'development' ? document.location.hostname + ':3000' : document.location.hostname;
  const connectionPath = `${document.location.protocol}//${host}/${userName ? 'authorized' : 'public'}`
  console.log(process.env.NODE_ENV, connectionPath);
  return connectionPath;
}

const connect = (user) => {
  const socket = io(connectionPathFactory(user));
  return new Promise(resolve => {
    socket.on('connect', () => {
      console.log(`Eastblished ${user.userName ? 'private' : 'public'} wS connection!`);
      resolve(socket);
    });
  });
}

function* read(socket) {
  console.log(`Read socket initialization`);
  const channel = yield call(subscribe, socket);
  socket.emit('chat:getInitial');
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    let { payload } = yield take('SEND_MESSAGE_SOCKET');
    console.log(payload);
    console.log(`Intercepted redux action, going to emit a message to a socket connection`);
    socket.emit('chat:message', payload);
  }
}

function* handleChat(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}


function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('chat:messages', e => {
      emit(seedChat(e));
    });
    socket.on('chat:message', e => {
      console.log(`[Chat] Recieved message from server:`, e);
      if(e) emit(addMessage(e));
    });

    return () => {};
  });
}


export function* socketSaga() {
  const selector = (state) => (state.auth)
  const user = yield select(selector);
  const socket = yield call(connect, user);
  const task = yield fork(handleChat, socket);
}


export default function* rootSaga() {
  yield fork(socketSaga);

};