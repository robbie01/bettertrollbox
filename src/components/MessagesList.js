import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import User from './User';
import AutoScroller from './AutoScroller';
import { unescapeText } from '../utils';

const MessagesScroller = styled.div`
  &::-webkit-scrollbar {
    width: 14px;
  }

  &::-webkit-scrollbar-thumb, &::-webkit-scrollbar-track-piece {
    background-clip: padding-box;
    border: 3px solid;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: #202225;
    border-color: #36393f;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: #2f3136;
    border-color: #36393f;    
  }
`;

const MessagesListContainer = styled(AutoScroller(MessagesScroller))`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  background: #36393f;
`;

const Message = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
`;

const PaddedText = styled.span`
  padding-right: 5px;
`;

const Timestamp = styled(PaddedText)`
  flex 0 0 auto;
  font-size: 0.6875rem;
  line-height: 1rem;
  overflow: hidden;
  text-align: right;
  vertical-align: text-bottom;
  width: 65px;
`;

const PaddedUser = styled(User)`
  padding-right: 5px;
`;

const MessagesList = ({ messages }) => (
  <MessagesListContainer>
    {messages.map((msg, i) => (
      <Message key={i}>
       <Timestamp>{msg.date.format('hh:mm A')}</Timestamp>
       {msg.type === 'changed nick' ? (
         <React.Fragment>
           <PaddedUser color={msg.oldUser.color}>{unescapeText(msg.oldUser.nick)}</PaddedUser>
           <PaddedText>is now</PaddedText>
           <User color={msg.newUser.color}>{unescapeText(msg.newUser.nick)}</User>
         </React.Fragment>
       ) : (
         <React.Fragment>
           <PaddedUser color={msg.color}>{unescapeText(msg.nick)}</PaddedUser>
           <span>{msg.type === 'message' ? unescapeText(msg.msg) : msg.type}</span>
         </React.Fragment>
       )}
      </Message>
    ))}
  </MessagesListContainer>
);

const mapStateToProps = ({ messages }) => ({
  messages
});

export default connect(mapStateToProps)(MessagesList)
