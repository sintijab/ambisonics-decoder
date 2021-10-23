import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './Assets/normalize.scss';

const text = 'Welcome';
render(<App title={text} />, document.getElementById('root'));
