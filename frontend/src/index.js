import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { ProfileProvider } from './context/ProfileContext';
import { ClassProvider } from './context/ClassContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProfileProvider>
    <ClassProvider>
      <App />
    </ClassProvider>
  </ProfileProvider>
);
