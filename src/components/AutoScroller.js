import React, { useRef, useEffect, useState } from "react"

const getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component"
}

const autoScroller = InnerComponent => {
  const AutoScroller = props => {
    const [autoScroll, setAutoScroll] = useState(true)
    const rootRef = useRef(null)
    const userScroll = useRef(false)
    
    const onManualScroll = () => {
      const rootEl = rootRef.current
      setAutoScroll(rootEl.scrollTop > rootEl.scrollHeight - rootEl.clientHeight - 5)
    }

    const onScroll = () => {
      if (userScroll.current) onManualScroll()
    }

    useEffect(() => {
      if (autoScroll) {
        userScroll.current = false
        const rootEl = rootRef.current
        rootEl.scrollTop = rootEl.scrollHeight
        setTimeout(() => userScroll.current = true, 100)
      }
    })

    return (
      <InnerComponent {...props} ref={rootRef} onScroll={onScroll} onWheel={() => userScroll.current = true} />
    )
  }
  AutoScroller.displayName = `AutoScroller(${getDisplayName(InnerComponent)})`
  return AutoScroller
}

export default autoScroller
