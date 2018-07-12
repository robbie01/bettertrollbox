import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import User from './User';
import { unescapeText } from '../utils';

const UserListContainer = styled.div`
  min-width: 240px;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
`;

const UserList = ({ users }) => (
  <UserListContainer>
    {users.map(({ nick, color, key }) => (
      <User color={color} key={key}>{unescapeText(nick)}</User>
    ))}
  </UserListContainer>
);

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(UserList);
