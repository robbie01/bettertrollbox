import React from 'react';
import styled from 'styled-components';

const User = ({ color, children, ...props }) => (
  <span {...props} style={{ color: color.split(';')[0] || 'white' }}>{children}</span>
);

export default User;
