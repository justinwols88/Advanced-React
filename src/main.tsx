// Initialize tracing first, before any other imports (skip in test environment)
if (!import.meta.env.VITEST) {
  await import('./tracing');
}

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