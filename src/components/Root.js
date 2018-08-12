import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BehaviorSubject } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import io from 'socket.io-client';
import rootReducer from '../reducers';
import rootEpic from '../epics';
import App from './App';

let initialUser;
try {
  initialUser = JSON.parse(localStorage.getItem('user'));
} catch (ex) {
  // nothing
}

const sock$ = new BehaviorSubject(null);

const epicMiddleware = createEpicMiddleware({
  dependencies: { sock$, localStorage }
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {
    user: initialUser || undefined
  },
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
);

epicMiddleware.run(rootEpic);
const sock = io('//www.windows93.net:8081');
sock.on('connect', () => sock$.next(sock));

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;