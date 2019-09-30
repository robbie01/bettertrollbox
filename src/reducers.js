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
  [messageReceived]: (state, payload) => [ ...state, { ...payload, type: "message" } ]
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
