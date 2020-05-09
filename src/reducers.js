import { createReducer } from "redux-act"
import { combineReducers } from "redux"

import {
  updateUsers,
  clearChatState,
  userJoined,
  userLeft,
  userChangedNick,
  messageReceived,
  changeNick,
  changeColor,
  changeUser
} from "./actions"

const users = createReducer({
  [updateUsers]: (state, payload) => payload,
  [clearChatState]: () => []
}, [])

const messages = createReducer({
  [clearChatState]: () => [],
  [userJoined]: (state, payload) => [ ...state, { ...payload, type: "joined" } ],
  [userLeft]: (state, payload) => [ ...state, { ...payload, type: "left" } ],
  [userChangedNick]: (state, payload) => [ ...state, { ...payload, type: "changed nick" } ],
  [messageReceived]: (state, { msg, ...payload }) => {
    // attempt to fold messages, apparently breaks because home is IP-based
    /*let [lastMsg] = state.slice(-1)
    let stateInit = state.slice(0, -1)
    return lastMsg.type === "message" && payload.home === lastMsg.home ?
      [ ...stateInit, { ...lastMsg, msg: [ ...lastMsg.msg, msg ] } ] :
      [ ...state, { ...payload, msg: [msg], type: "message" } ]*/
    return [ ...state, { ...payload, msg: [msg], type: "message" } ]
  }
}, [])

const user = createReducer({
  [changeNick]: (state, payload) => ({
    ...state,
    nick: payload
  }),
  [changeColor]: (state, payload) => ({
    ...state,
    color: payload
  }),
  [changeUser]: (state, payload) => ({
    ...state,
    ...payload
  })
}, {
  nick: "anonymous",
  color: "#ffffff"
})

export default combineReducers({
  users,
  messages,
  user
})
