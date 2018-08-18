import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
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
    dependencies: { io, sock$, localStorage,
      defaultServer: '//www.windows93.net:8081' }
  });

  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    rootReducer,
    {
      user: initialUser != null ? initialUser : undefined
    },
    composeEnhancers(
      applyMiddleware(epicMiddleware)
    )
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;