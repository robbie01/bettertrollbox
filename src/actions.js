import { createAction } from 'redux-act';

// users
export const updateUsers = createAction('update users', users =>
  Object.entries(users).map(([key, user]) => ({
    ...user,
    key
  }))
)

// messages
export const userJoined = createAction('user joined')
export const userLeft = createAction('user left')
export const userChangedNick = createAction('user changed nick', (oldUser, newUser) => ({ oldUser, newUser }))
export const messageReceived = createAction('message received')

// commands
export const changeNick = createAction('change nick')
export const changeColor = createAction('change color')
export const sendMessage = createAction('send message')
