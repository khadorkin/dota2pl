/**
 * Created by micha on 15.07.2016.
 */

import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';
import { seedChat, addMessage } from '../reducers/chat';
import { updateStreamList } from '../reducers/stream';

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

function* readChat(socket) {
  console.log(`[Chat] Opened socket channel`);
  const channel = yield call(subscribeChat, socket);
  socket.emit('chat:getInitial');
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
function* readStreams(socket) {
  console.log(`[StreamService] Initialized`);
  const channel = yield call(subscribeStream, socket);
  socket.emit('stream:getInitial');
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}



function* write(socket) {
  while (true) {
    let { payload } = yield take('SEND_MESSAGE_SOCKET');
    console.log(payload);
    socket.emit('chat:message', payload);
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
    socket.on('chat:messages', e => {
      emit(seedChat(e));
    });
    socket.on('chat:message', e => {
      // console.log(`[Chat] Recieved message from server:`, e);
      if(e) emit(addMessage(e));
    });

    return () => {};
  });
}


export function* socketSaga() {
  const selector = (state) => (state.auth)
  const user = yield select(selector);
  const socket = yield call(connect, user);
  const task = yield fork(handleSockets, socket);
}


export default function* rootSaga() {
  yield fork(socketSaga);

};