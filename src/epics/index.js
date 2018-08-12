import { tap, ignoreElements, pluck, distinctUntilChanged } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import socketEpics from './socket';

const localStorageUserEpic = (action$, state$, { localStorage }) =>
  state$.pipe(
    pluck('user'),
    distinctUntilChanged((p, q) => p.nick === q.nick && p.color === q.color),
    tap(user => localStorage.setItem('user', JSON.stringify(user))),
    ignoreElements());

export default combineEpics(
  socketEpics,
  localStorageUserEpic);