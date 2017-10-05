import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import registerServiceWorker from './registerServiceWorker';
import './dialogPolyfill';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
