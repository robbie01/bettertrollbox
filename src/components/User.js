import React from 'react';
import styled from 'styled-components';

const User = ({ color, children, ...props }) => (
  <span {...props} style={{ color }}>{children}</span>
);

export default styled(User)`
  word-break: break-all;
`;
