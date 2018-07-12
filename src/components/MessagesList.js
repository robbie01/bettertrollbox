import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import User from './User';
import { unescapeText } from '../utils';

const MessagesListContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Message = styled.div`
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
       <Timestamp>{moment.unix(msg.date).format('hh:mm A')}</Timestamp>
       {msg.type === 'changed nick' ? (
         <React.Fragment>
           <PaddedUser color={msg.oldUser.color}>{unescapeText(msg.oldUser.nick)}</PaddedUser>
           <PaddedText>is now</PaddedText>
           <User color={msg.newUser.color}>{unescapeText(msg.newUser.nick)}</User>
         </React.Fragment>
       ) : (
         <React.Fragment>
           <PaddedUser color={msg.color}>{unescapeText(msg.nick)}</PaddedUser>
           <span>{msg.type === 'message' ? msg.msg : msg.type}</span>
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
