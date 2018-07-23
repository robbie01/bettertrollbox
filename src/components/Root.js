import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import App from './App';

let initialUser;
try {
  initialUser = JSON.parse(localStorage.getItem('user'));
} catch (ex) {
  // nothing
}

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {
    user: initialUser
  },
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);
store.subscribe(() => {
  localStorage.setItem('user', JSON.stringify(store.getState().user));
});
sagaMiddleware.run(rootSaga);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;