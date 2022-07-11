import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ToggleButton from './ToggleButton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToggleButton />
    <App />
  </React.StrictMode>
);
