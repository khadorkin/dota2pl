import io from 'socket.io-client';
import { take } from 'redux-saga/effects';
import logger from 'utils/logger';
const log = logger('sagas:socketio-connect');

const connectionPathFactory = (user) => {
  const { userName } = user;
  let host = null;
  let connectionPath = null;
  try {
    host = process.env.NODE_ENV === 'development'
      ? document.location.hostname + ':3000'
      : document.location.hostname;
    connectionPath = `${document.location.protocol}//${host}/${userName ? 'authorized' : 'public'}`;
  } catch (e) {
    connectionPath = `http://localhost:3000/${userName ? 'authorized' : 'public'}`;
  }

  console.log(process.env.NODE_ENV, connectionPath);
  return connectionPath;
};

export const connect = (user) => {
  const socket = io(connectionPathFactory(user));
  return new Promise(resolve => {
    socket.on('connect', () => {
      log.log(`Eastblished ${user.userName ? 'private' : 'public'} wS connection!`);
      resolve(socket);
    });
  });
};

export function* write(socket) {
  while (true) {
    let { type, payload } = yield take(action => action.remote);
    log.info(type, payload);
    socket.emit(type, payload);
  }
}
