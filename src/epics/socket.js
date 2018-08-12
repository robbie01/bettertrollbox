import { Observable, EMPTY } from 'rxjs';
import { switchMap, startWith, tap, ignoreElements, pluck, distinctUntilChanged } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import {
  updateUsers,
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
    switchMap(dest =>
      new Observable(o => {
        const sock = io(dest);
        sock.on('connect', () => o.next(sock));
        sock.on('disconnect', () => o.next(null));
        return () => {
          sock.close();
        };
      })),
    tap(sock$),
    ignoreElements(),
    startWith(connectSocket()));

const socketReceiveEpic = (action$, state$, { sock$ }) =>
  sock$.pipe(
    switchMap(sock => sock == null ? EMPTY :
      new Observable(o => {
        let evts = [];
        const on = (evt, fn) => { sock.on(evt, fn); evts.push({ evt, fn }); };
        on('update users', users => o.next(updateUsers(users)));
        on('user joined', user => o.next(userJoined(user)));
        on('user left', user => { if (user.nick) o.next(userLeft(user)) });
        on('user change nick', (oldUser, newUser) => o.next(userChangedNick(oldUser, newUser)));
        on('message', msg => o.next(messageReceived(msg)));
        return () => {
          evts.forEach(({ evt, fn }) => sock.off(evt, fn));
        };
      })));

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