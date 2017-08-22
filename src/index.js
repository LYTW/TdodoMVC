import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var TASKS = [
    {name: 'aaa'},
    {name: 'bbb'}
]

ReactDOM.render(<App tasks={TASKS}/>, document.getElementById('root'));
registerServiceWorker();
