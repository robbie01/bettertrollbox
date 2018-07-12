import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import User from './User';
import { unescapeText } from '../utils';

const MessagesListContainer = styled.div`
  flex: 1 0 auto;
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

const PaddedUser = styled(User)`
  padding-right: 5px;
`;

const MessagesList = ({ messages }) => (
  <MessagesListContainer>
    {messages.map((msg, i) => (
      <Message key={i}>
       <PaddedText>{moment.unix(msg.date).format('hh:mm A')}</PaddedText>
       {msg.type === 'changed nick' ? (
         <React.Fragment>
           <User color={msg.oldUser.color}>{unescapeText(msg.oldUser.nick)}</User>
           {' is now '}
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
