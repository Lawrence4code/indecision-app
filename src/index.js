import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IndecisionApp from './App';
import registerServiceWorker from './registerServiceWorker';
// import CounterApp from './playground/counter-example';

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
// ReactDOM.render(<CounterApp />, document.getElementById('root'));
registerServiceWorker();
