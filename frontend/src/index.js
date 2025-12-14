import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- CRUCIAL IMPORT
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.js';
import theme from './theme/theme.js';
import { AuthProvider, useAuth } from './context/AuthContext.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
     
      <BrowserRouter> 
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
      
    </ThemeProvider>
  </React.StrictMode>,
);