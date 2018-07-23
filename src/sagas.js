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

const subscribe = sock => eventChannel(put => {
  sock.on('update users', users => put(updateUsers(users)))
  sock.on('user joined', user => put(userJoined(user)))
  sock.on('user left', user => { if (user.nick) put(userLeft(user)) })
  sock.on('user change nick', (oldUser, newUser) => put(userChangedNick(oldUser, newUser)))
  sock.on('message', msg => put(messageReceived(msg)))
  return () => {
    sock.close();
  };
});

export default function* () {
  const sock = yield createSocket();
  const emit = sock.emit.bind(sock);
  yield takeEvery(subscribe(sock), function* (action) {
    yield put(action);
  });
  yield takeEvery(changeNick.getType(), function* (action) {
    yield call(emit, 'user joined', action.payload, yield select(getColor));
  });
  yield takeEvery(changeColor.getType(), function* (action) {
    yield call(emit, 'user joined', yield select(getNick), action.payload);
  });
  yield takeEvery(sendMessage.getType(), function* (action) {
    yield call(emit, 'message', action.payload);
  });
  yield call(emit, 'user joined', yield select(getNick), yield select(getColor));
};
