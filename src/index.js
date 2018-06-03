import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import GitHub from './components/GitHub';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<GitHub />, document.getElementById('root'));

registerServiceWorker();