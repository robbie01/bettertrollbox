import { select, takeEvery, put, call, eventChannel } from 'redux-saga/effects';
import io from 'socket.io-client';
import {
  updateUsers,
  userJoined,
  userLeft,
  userChangedNick,
  messageReceived,
  changeNick,
  changeColor,
  sendMessage
} from './actions';

const getNick = state => state.user.nick;
const getColor = state => state.user.color;

const createSocket = () => new Promise((resolve, reject) => {
  const sock = io("//www.windows93.net:8081");
  sock.on('connect', () => resolve(sock));
  sock.on('connect_error', err => {
    sock.close();
    reject(err);
  });
});

const subscribe = sock => eventChannel(emit => {
  sock.on('update users', users => emit(updateUsers(Object.values(users))))
  sock.on('user joined', user => emit(userJoined(user)))
  sock.on('user left', user => emit(userLeft(user)))
  sock.on('user change nick', (oldUser, newUser) => emit(userChangedNick(oldUser, newUser)))
  sock.on('message received', msg => emit(messageReceived(msg)))
  return () => {
    sock.close();
  };
});

export default function* () {
  const sock = yield createSocket();
  yield takeEvery(subscribe(sock), function* (action) {
    yield put(action);
  });
  yield takeEvery(changeNick, function* (action) {
    yield call(sock.emit, 'user joined', action.payload, yield select(getColor));
  });
  yield takeEvery(changeColor, function* (action) {
    yield call(sock.emit, 'user joined', yield select(getNick), action.payload);
  });
  yield takeEvery(sendMessage, function* (action) {
    yield call(sock.emit, 'message', action.payload);
  });
};
