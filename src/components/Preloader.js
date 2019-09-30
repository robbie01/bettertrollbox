// this component's name is a misnomer because it actually *prefetches* instead of preloading
// it's name will be refactored soon

import React from "react"
import { createPortal } from "react-dom"

const Preloader = ({ content }) => createPortal(
  Object.entries(content).map(([ href, as ]) => (
    <link rel="prefetch" key={href} href={href} as={as} />
  )),
  document.head
)

export default Preloader
