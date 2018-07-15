import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const MessageFormContainer = styled.form`
  flex: 0 0 auto;
  margin: 0 20px;
  box-shadow: 0 -1px 0 hsla(0,0%,100%,.06);
  padding: 20px 0 30px;
`;

const MessageFormTextarea = styled.textarea.attrs({
  style: ({ textRows }) => ({
    height: `${Math.min(24+textRows*20, 220)}px`
  })
})`
  appearance: none;
  box-shadow: none;
  outline: none;
  color: hsla(0,0%,100%,.7);
  box-sizing: border-box;
  width: 100%;
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
`;

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.inputRef = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    if (!e.ctrlKey)
      this.inputRef.current.focus();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    return (
      <MessageFormContainer onSubmit={() => { this.onSubmit(); return false; }}>
        <MessageFormTextarea innerRef={this.inputRef} textRows={this.state.input.split('\n').length}
          placeholder="Message" rows={1} value={this.state.input}
          onInput={e => this.setState({ input: e.target.value })} />
      </MessageFormContainer>
    );
  }
}

export default connect()(MessageForm);