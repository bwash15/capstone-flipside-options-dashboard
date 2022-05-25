import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar';
import {UserProvider} from './context/customer copy'


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,

);



