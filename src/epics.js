import { Observable, EMPTY } from 'rxjs';
import { switchMap, tap, ignoreElements, pluck, distinctUntilChanged } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import {
  updateUsers,
  userJoined,
  userLeft,
  userChangedNick,
  messageReceived,
  sendMessage
} from './actions';

const socketReceiveEpic = (action$, state$, { sock$ }) =>
  sock$.pipe(
    switchMap(sock => sock == null ? EMPTY :
      new Observable(observer => {
        const next = observer.next.bind(observer)
        let evts = []
        const on = (evt, fn) => { sock.on(evt, fn); evts.push({ evt, fn }); }
        on('update users', users => next(updateUsers(users)))
        on('user joined', user => next(userJoined(user)))
        on('user left', user => { if (user.nick) next(userLeft(user)) })
        on('user change nick', (oldUser, newUser) => next(userChangedNick(oldUser, newUser)))
        on('message', msg => next(messageReceived(msg)))
        return () => {
          evts.forEach(({ evt, fn }) => sock.off(evt, fn))
        }
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
      action$.ofType(sendMessage.getType()).pipe(
        tap(({ payload }) => sock.emit('message', payload)),
        ignoreElements())));

const localStorageUserEpic = (action$, state$, { localStorage }) =>
  state$.pipe(
    pluck('user'),
    distinctUntilChanged((p, q) => p.nick === q.nick && p.color === q.color),
    tap(user => localStorage.setItem('user', JSON.stringify(user))),
    ignoreElements());

export default combineEpics(
  socketReceiveEpic,
  socketUserEpic,
  socketMessageEpic,
  localStorageUserEpic);