import { createAction } from 'redux-act';
import moment from 'moment';

// users
export const updateUsers = createAction('update users', users =>
  Object.entries(users).map(([key, user]) => ({
    ...user,
    key
  }))
)

// messages
export const clearChatState = createAction('clear chat state')
export const userJoined = createAction('user joined', payload => ({ ...payload, date: +moment() }))
export const userLeft = createAction('user left', payload => ({ ...payload, date: +moment() }))
export const userChangedNick = createAction('user changed nick', (oldUser, newUser) => ({ oldUser, newUser, date: +moment() }))
export const messageReceived = createAction('message received')

// user
export const changeNick = createAction('change nick')
export const changeColor = createAction('change color')
export const changeUser = createAction('change user', (nick, color) => ({ nick, color }))

// commands
export const sendMessage = createAction('send message')
export const connectSocket = createAction('connect socket')