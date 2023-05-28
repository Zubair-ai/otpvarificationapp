import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthenticationAdminContextProvider from './AuthContext.js/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationAdminContextProvider>
    <App />
    </AuthenticationAdminContextProvider>
  </React.StrictMode>
);


