import { tap, ignoreElements, pluck, distinctUntilChanged } from "rxjs/operators"
import { combineEpics, ofType } from "redux-observable"
import socketEpic from "./socket"
import { connectSocket } from "../actions"

const localStorageUserEpic = (action$, state$, { localStorage }) =>
  state$.pipe(
    pluck("user"),
    distinctUntilChanged((p, q) => p.nick === q.nick && p.color === q.color),
    tap(user => localStorage.setItem("user", JSON.stringify(user))),
    ignoreElements())

const localStorageServerEpic = (action$, state$, { localStorage }) =>
  action$.pipe(
    ofType(connectSocket.getType()),
    pluck("payload"),
    tap(server => localStorage.setItem("server", server)),
    ignoreElements())

export default combineEpics(
  socketEpic,
  localStorageUserEpic,
  localStorageServerEpic)
