import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { sendMessage } from "../actions"

const MessageFormContainer = styled.form`
  flex: 0 0 auto;
  margin: 0 20px;
  box-shadow: 0 -1px 0 hsla(0,0%,100%,.06);
  padding: 20px 0 30px;
`

const MessageFormTextarea = styled.textarea`
  font-family: 'Ubuntu Mono', monospace;
  appearance: none;
  box-shadow: none;
  outline: none;
  color: hsla(0,0%,100%,.7);
  box-sizing: border-box;
  width: 100%;
  max-height: 220px;
  padding: 12px;
  font-size: 0.9375rem;
  font-weight: 400;
  letter-spacing: -0.025rem;
  line-height: 1.25rem;
  resize: none;
  overflow-x: hidden;
  overflow-y: auto;
  word-break: break-all;
  word-wrap: break-word;
  border: 0;
  border-radius: 5px;
  background-color: hsla(218,5%,47%,.3);

  &::-webkit-scrollbar {
    margin-right: 2px;
    height: 4px;
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(32,34,37,.6);
    border-radius: 2px;
    cursor: move;
  }

  &::-webkit-scrollbar-corner {
    background: none;
    border: none;
  }

  &::placeholder {
    color: hsla(0,0%,100%,0.3);
  }
`

const MessageForm = ({ onSubmit }) => {
  const [input, setInput] = useState("")
  const inputEl = useRef(null)
  
  const onKeyDown = e => {
    if (!e.ctrlKey)
      inputEl.current.focus()
    if (e.key === "Enter" && !e.shiftKey)
      e.preventDefault()
  }

  const onKeyUp = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e.target.value)
      setInput("")
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <MessageFormContainer onSubmit={() => false}>
      <MessageFormTextarea ref={inputEl} onKeyUp={onKeyUp}
        rows={input.split("\n").length} placeholder="Message"
        value={input} onChange={e => setInput(e.target.value)} />
    </MessageFormContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  onSubmit: msg => dispatch(sendMessage(msg))
})

export default connect(() => ({}), mapDispatchToProps)(MessageForm)
