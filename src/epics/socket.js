import { EMPTY, fromEvent, merge } from 'rxjs';
import { map, filter, switchMap, startWith, tap, ignoreElements, pluck, distinctUntilChanged, finalize } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import {
  updateUsers,
  clearChatState,
  userJoined,
  userLeft,
  userChangedNick,
  messageReceived,
  sendMessage,
  connectSocket
} from '../actions';

const socketConnectEpic = (action$, state$, { io, sock$ }) =>
  action$.pipe(
    ofType(connectSocket.getType()),
    pluck('payload'),
    map(dest => io(dest)),
    switchMap(sock => 
      merge(
        fromEvent(sock, 'connect').pipe(
          map(() => sock)),
        fromEvent(sock, 'disconnect').pipe(
          map(() => null))
      ).pipe(
          finalize(() => sock.close()))
    ),
    tap(sock$),
    ignoreElements(),
    startWith(connectSocket()));

const socketReceiveEpic = (action$, state$, { sock$ }) =>
  sock$.pipe(
    switchMap(sock => sock == null ? EMPTY : 
      merge(
        fromEvent(sock, 'update users').pipe(
          map(users => updateUsers(users))),
        fromEvent(sock, 'user joined').pipe(
          map(user => userJoined(user))),
        fromEvent(sock, 'user left').pipe(
          filter(user => !!user.nick),
          map(user => userLeft(user))),
        fromEvent(sock, 'user change nick',
          (oldUser, newUser) => ({ oldUser, newUser })
        ).pipe(
          map(({ oldUser, newUser }) => userChangedNick(oldUser, newUser))),
        fromEvent(sock, 'message').pipe(
          map(msg => messageReceived(msg)))
      ).pipe(
        startWith(clearChatState()))
    ));

const socketUserEpic = (action$, state$, { sock$ }) =>
  sock$.pipe(
    switchMap(sock => sock == null ? EMPTY :
      state$.pipe(
        pluck('user'),
        distinctUntilChanged((p, q) => p.nick === q.nick && p.color === q.color),
        tap(({ nick, color }) => sock.emit('user joined', nick, color)),
        ignoreElements())));

const socketMessageEpic = (action$, state$, { sock$ }) =>
  sock$.pipe(
    switchMap(sock => sock == null ? EMPTY :
      action$.pipe(
        ofType(sendMessage.getType()),
        pluck('payload'),
        tap(msg => sock.emit('message', msg)),
        ignoreElements())));

export default combineEpics(
  socketConnectEpic,
  socketReceiveEpic,
  socketUserEpic,
  socketMessageEpic);