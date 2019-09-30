import React from "react"
import { render } from "react-dom"
import Root from "./components/Root"
import registerServiceWorker from "./registerServiceWorker"

import "normalize.css"

render(
  <Root />,
  document.getElementById("root")
)
registerServiceWorker()
