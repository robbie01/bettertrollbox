import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createEpicMiddleware } from "redux-observable"
import io from "socket.io-client"
import rootReducer from "./reducers"
import rootEpic from "./epics"

const configureStore = () => {
  let initialUser
  try {
    initialUser = JSON.parse(localStorage.getItem("user"))
  } catch (ex) {
    // nothing
  }

  const epicMiddleware = createEpicMiddleware({
    dependencies: { io, localStorage,
      defaultServer: localStorage.getItem("server") || "ws://darkok.xyz:8042" }
  })

  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    rootReducer,
    {
      user: initialUser != null ? initialUser : undefined
    },
    composeEnhancers(
      applyMiddleware(epicMiddleware)
    )
  )

  epicMiddleware.run(rootEpic)

  return store
}

export default configureStore
