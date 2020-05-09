import { EMPTY, fromEvent, merge } from "rxjs"
import {
  map, filter, switchMap, startWith, tap,
  ignoreElements, pluck, distinctUntilChanged,
  finalize, mapTo
} from "rxjs/operators"
import { ofType } from "redux-observable"
import {
  updateUsers,
  clearChatState,
  userJoined,
  userLeft,
  userChangedNick,
  messageReceived,
  sendMessage,
  connectSocket
} from "../actions"

const socketReceiveEpic = (action$, state$, sock) =>
  merge(
    fromEvent(sock, "update users").pipe(
      map(users => updateUsers(users))),
    fromEvent(sock, "user joined").pipe(
      map(user => userJoined(user))),
    fromEvent(sock, "user left").pipe(
      filter(user => "nick" in user),
      map(user => userLeft(user))),
    fromEvent(sock, "user change nick",
      (oldUser, newUser) => ({ oldUser, newUser })
    ).pipe(
      map(({ oldUser, newUser }) => userChangedNick(oldUser, newUser))),
    fromEvent(sock, "message").pipe(
      map(msg => messageReceived(msg)))
  ).pipe(
    startWith(clearChatState()))

const socketUserEpic = (action$, state$, sock) =>
  state$.pipe(
    pluck("user"),
    distinctUntilChanged((p, q) => p.nick === q.nick && p.color === q.color),
    tap(({ nick, color }) => sock.emit("user joined", nick, color)),
    ignoreElements())

const socketMessageEpic = (action$, state$, sock) =>
  action$.pipe(
    ofType(sendMessage.getType()),
    pluck("payload"),
    tap(msg => sock.emit("message", msg)),
    ignoreElements())

const socketEpic = (action$, state$, { io, defaultServer }) =>
  action$.pipe(
    ofType(connectSocket.getType()),
    pluck("payload"),
    map(dest => io(dest)),
    switchMap(sock => 
      merge(
        fromEvent(sock, "connect").pipe(mapTo(sock)),
        fromEvent(sock, "disconnect").pipe(mapTo(null))
      ).pipe(
        startWith(null),
        finalize(() => sock.close()))),
    switchMap(sock => sock == null ? EMPTY :
      merge(
        socketReceiveEpic(action$, state$, sock),
        socketUserEpic(action$, state$, sock),
        socketMessageEpic(action$, state$, sock))),
    startWith(connectSocket(defaultServer)))

export default socketEpic
