import { Observable } from 'rxjs';
import { tap, ignoreElements, pluck, distinctUntilChanged } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import {
  updateUsers,
  userJoined,
  userLeft,
  userChangedNick,
  messageReceived,
  sendMessage
} from './actions';

const socketReceiveEpic = (action$, state$, { sock }) =>
  new Observable(observer => {
    const next = observer.next.bind(observer)
    sock.on('update users', users => next(updateUsers(users)))
    sock.on('user joined', user => next(userJoined(user)))
    sock.on('user left', user => { if (user.nick) next(userLeft(user)) })
    sock.on('user change nick', (oldUser, newUser) => next(userChangedNick(oldUser, newUser)))
    sock.on('message', msg => next(messageReceived(msg)))
    return () => {
      sock.close();
    };
  });

const socketUserEpic = (action$, state$, { sock }) =>
  state$.pipe(
    pluck('user'),
    distinctUntilChanged((p, q) => p.nick === q.nick && p.color === q.color),
    tap(({ nick, color }) => sock.emit('user joined', nick, color)),
    ignoreElements())

const socketMessageEpic = (action$, state$, { sock }) =>
  action$.ofType(sendMessage.getType()).pipe(
    tap(({ payload }) => sock.emit('message', payload)),
    ignoreElements())

export default combineEpics(
  socketReceiveEpic,
  socketUserEpic,
  socketMessageEpic)