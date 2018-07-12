import React from 'react';
import styled from 'styled-components';
import MessagesList from './MessagesList';
import UserList from './UserList';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const App = () => (
  <AppContainer>
    <MessagesList />
    <UserList />
  </AppContainer>
);

export default App;
