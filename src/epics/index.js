import { tap, map, ignoreElements, pluck, distinctUntilChanged } from "rxjs/operators"
import { combineEpics } from "redux-observable"
import socketEpics from "./socket"

const localStorageUserEpic = (action$, state$, { localStorage }) =>
  state$.pipe(
    pluck("user"),
    distinctUntilChanged((p, q) => p.nick === q.nick && p.color === q.color),
    map(user => JSON.stringify(user)),
    tap(user => localStorage.setItem("user", user)),
    ignoreElements())

export default combineEpics(
  socketEpics,
  localStorageUserEpic)
