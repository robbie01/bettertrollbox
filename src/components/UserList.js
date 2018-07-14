import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import crown from '../resources/crown.svg';
import User from './User';
import { unescapeText } from '../utils';

const UserListContainer = styled.div`
  min-width: 240px;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  background: #2f3136;
`;

const UserListMember = styled(User)`
  display: flex;
  align-items: center;
`;

const UserList = ({ users }) => (
  <UserListContainer>
    {users.map(({ nick, color, key }, i) => (
      <UserListMember color={color} key={key}>{unescapeText(nick)}{i === 0 ? (<img src={crown} alt="King" />) : null}</UserListMember>
    ))}
  </UserListContainer>
);

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(UserList);
