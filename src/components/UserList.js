import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { unescapeText } from '../utils';

const UserListContainer = styled.div`
  display: flex;
  overflow: scroll;
  flex-direction: column;
`;

const UserListMember = styled.div.attrs({
  style: ({ color }) => ({
    color: color
  })
})``; // todo

const UserList = ({ users }) => (
  <UserListContainer>
    {users.map(({ nick, color, key }) => (
      <UserListMember color={color} key={key}>{unescapeText(nick)}</UserListMember>
    ))}
  </UserListContainer>
);

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(UserList);
