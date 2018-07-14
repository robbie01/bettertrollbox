import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import crown from '../resources/crown.svg';
import User from './User';
import { unescapeText } from '../utils';

const UserListContainer = styled.div`
  min-width: 240px;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  background: #2f3136;
  padding: 8px 0;
`;

const UserListMember = styled(User)`
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 8px;
  border-radius: 3px;
  margin: 1px 8px;

  &:hover {
    background: #36393f;
  }
`;

const UserListCrown = styled.img.attrs({
  src: crown,
  width: 14,
  height: 14,
  alt: "King"
})`
  margin-left: 4px;
`

const UserList = ({ users }) => (
  <UserListContainer>
    {users.map(({ nick, color, key }, i) => (
      <UserListMember color={color} key={key}>{unescapeText(nick)}{i === 0 ? (<UserListCrown />) : null}</UserListMember>
    ))}
  </UserListContainer>
);

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(UserList);
