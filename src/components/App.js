import React from 'react';
import styled from 'styled-components';
import MessagesList from './MessagesList';
import UserList from './UserList';

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  color: white;
`;

const App = () => (
  <AppContainer>
    <MessagesList />
    <UserList />
  </AppContainer>
);

export default App;
