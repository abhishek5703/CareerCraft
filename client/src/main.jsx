import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/AuthContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import { RoadmapProvider } from './context/RoadmapContext.jsx'; // ✅ import here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProgressProvider>
        <RoadmapProvider> {/* ✅ wrap your App */}
          <App />
        </RoadmapProvider>
      </ProgressProvider>
    </AuthProvider>
  </React.StrictMode>
);
