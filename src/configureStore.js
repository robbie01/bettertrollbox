import { createStore, applyMiddleware, compose } from 'redux';
import { BehaviorSubject } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import io from 'socket.io-client';
import rootReducer from './reducers';
import rootEpic from './epics';

const configureStore = () => {
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
  sock.on('disconnect', () => sock$.next(null));

  return store;
};

export default configureStore;