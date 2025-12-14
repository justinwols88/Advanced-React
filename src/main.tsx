// Initialize tracing first, before any other imports
// import './tracing'; // Temporarily disabled due to version mismatch

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Main.tsx - React version:', React.version);

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);