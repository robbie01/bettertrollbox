import { createAction } from "redux-act"
import moment from "moment"

// users
export const updateUsers = createAction("UPDATE_USERS", users =>
  Object.entries(users).map(([key, user]) => ({
    ...user,
    key
  }))
)

// messages
export const clearChatState = createAction("CLEAR_CHAT_STATE")
export const userJoined = createAction("USER_JOINED", payload => ({ ...payload, date: +moment() }))
export const userLeft = createAction("USER_LEFT", payload => ({ ...payload, date: +moment() }))
export const userChangedNick = createAction("USER_CHANGED_NICK", (oldUser, newUser) => ({ oldUser, newUser, date: +moment() }))
export const messageReceived = createAction("MESSAGE_RECEIVED")

// user
export const changeNick = createAction("CHANGE_NICK")
export const changeColor = createAction("CHANGE_COLOR")
export const changeUser = createAction("CHANGE_USER", (nick, color) => ({ nick, color }))

// commands
export const sendMessage = createAction("SEND_MESSAGE")
export const connectSocket = createAction("CONNECT_SOCKET")
