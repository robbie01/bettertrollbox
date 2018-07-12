import 'createReducer' from 'redux-act';
import 'combineReducers' from 'redux';

import {
  updateUsers,
  userJoined,
  userLeft,
  userChangedNick,
  messageReceived,
  changeNick,
  changeColor
} from './actions';

const users = createReducer({
  [updateUsers]: (state, action) => action.payload
}, []);

const messages = createReducer({
  [userJoined]: (state, action) => [ ...state, action ],
  [userLeft]: (state, action) => [ ...state, action ],
  [userChangedNick]: (state, action) => [ ...state, action ],
  [messageReceived]: (state, action) => [ ...state, action ]
}, []);

const user = createReducer({
  [changeNick]: (state, action) => ({
    ...state,
    nick: action.payload
  }),
  [changeColor]: (state, action) => ({
    ...state,
    color: action.payload
  })
}, {
  nick: 'anonymous',
  color: '#ffffff'
});

export default combineReducers({
  users,
  messages,
  user
});
