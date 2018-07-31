import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(
  <App initialWidth={4} initialHeight={4} cellSize={50} />,
  document.getElementById('root')
);
