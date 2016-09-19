import { take, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { updateStreamList } from '../../reducers/stream';

function subscribeStream(socket) {
  return eventChannel(emit => {
    socket.on('stream:list', e => {
      // console.log(`[Stream] received list from server:`,e);
      emit(updateStreamList(e));
    });
    return () => {};
  });
}

export function* readStreams(socket) {
  console.log('[StreamService] Initialized');
  const channel = yield call(subscribeStream, socket);
  socket.emit('stream:getInitial');
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

