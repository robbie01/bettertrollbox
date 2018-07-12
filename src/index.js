import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

render(<h1>Hello, world!</h1>, document.getElementById('root'));
registerServiceWorker();
