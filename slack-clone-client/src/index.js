import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';

const App = <Routes />
ReactDOM.render(App, document.getElementById('root'));
 
serviceWorker.unregister();
