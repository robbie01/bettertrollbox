// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';

const User = styled.span.attrs({
  style: ({ color }) => ({
    color: color.split(';')[0]
  })
})`
  color: white;
`;

export default User;
