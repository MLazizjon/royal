// src/main.jsx yoki src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// BrowserRouter o'rniga HashRouter'ni import qiling
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* App komponentini HashRouter ichiga oling */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);