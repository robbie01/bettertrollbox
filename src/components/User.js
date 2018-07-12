import React from 'react';

const User = ({ color, children, ...props }) => (
  <span {...props} style={{ color }}>{children}</span>
);

export default User;
