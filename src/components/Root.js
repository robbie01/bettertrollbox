import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
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

const epicMiddleware = createEpicMiddleware({
  dependencies: { sock: io('//www.windows93.net:8081') }
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
store.subscribe(() => {
  localStorage.setItem('user', JSON.stringify(store.getState().user));
});
epicMiddleware.run(rootEpic);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;