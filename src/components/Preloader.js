import React from 'react';
import { createPortal } from 'react-dom';

const Preloader = ({ content }) => createPortal(
  Object.entries(content).map(([ href, as ]) => (
    <link rel="preload" href={href} as={as} />
  )),
  document.head
);

export default Preloader;
