import { select, takeEvery, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
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
  sock.on('update users', users => emit(updateUsers(users)))
  sock.on('user joined', user => emit(userJoined(user)))
  sock.on('user left', user => emit(userLeft(user)))
  sock.on('user change nick', (oldUser, newUser) => emit(userChangedNick(oldUser, newUser)))
  sock.on('message', msg => emit(messageReceived(msg)))
  return () => {
    sock.close();
  };
});

export default function* () {
  const sock = yield createSocket();
  yield takeEvery(subscribe(sock), function* (action) {
    yield put(action);
  });
  yield takeEvery(changeNick.getType(), function* (action) {
    yield call(sock.emit.bind(sock), 'user joined', action.payload, yield select(getColor));
  });
  yield takeEvery(changeColor.getType(), function* (action) {
    yield call(sock.emit.bind(sock), 'user joined', yield select(getNick), action.payload);
  });
  yield takeEvery(sendMessage.getType(), function* (action) {
    yield call(sock.emit.bind(sock), 'message', action.payload);
  });
  yield call(sock.emit.bind(sock), 'user joined', yield select(getNick), yield select(getColor));
};
