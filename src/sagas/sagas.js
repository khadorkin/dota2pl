/**
 * Created by mnickkk on 15.07.2016.
 */

import { fork, call, select } from 'redux-saga/effects';

// Socket related sagas
import { connect, write } from './sockets'; // Socket connection
import { readChat } from './chat/chat';
import { readStreams } from './stream/stream';
// import notificationSaga from './notification';
function* handleSockets(socket) {
  yield fork(readChat, socket);
  yield fork(readStreams, socket);
  yield fork(write, socket);
}

const userSelector = (state) => (state.auth);

export function* socketSaga() {
  const user = yield select(userSelector);
  const socket = yield call(connect, user);
  const task = yield fork(handleSockets, socket);
}

export default function* rootSaga() {
  yield fork(socketSaga);
  // yield fork(notificationSaga);
}
