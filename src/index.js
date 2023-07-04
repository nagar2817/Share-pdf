import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ContextProvider from './AuthContext';
// import  ContextProvider  from './StorageContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ContextProvider >
  <ThemeProvider>
    <Router>
      <App/>
    </Router>
  </ThemeProvider>
  </ContextProvider>


);

