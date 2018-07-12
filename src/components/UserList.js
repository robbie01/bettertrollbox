import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

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
    {users.map(({ nick, color }) => (
      <UserListMember color={color}>{nick}</UserListMember>
    )}
  </UserListContainer>
);

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(UserList);
