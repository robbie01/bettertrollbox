import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'styled-components';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css';

injectGlobal`
  html {
    font-size: 100%;
  }

  html, body, #root {
    height: 100%;
  }
`;

render(
  <Root />,
  document.getElementById('root')
);
registerServiceWorker();
