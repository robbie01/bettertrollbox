import React from 'react';
import styled from 'styled-components';

const User = styled.span.attrs({
  style: ({ color }) => ({
    color: color.split(';')[0] || 'white'
  })
})`
  color: white;
`;

export default User;
