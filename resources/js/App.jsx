import './App.css';
import API from './utils/API';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import Navbar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import { TenantProvider } from './context/TenantContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage';

export default function App() {
    return (
        <div className='min-h-screen relative bg-gray-900'>
            <TenantProvider>
            <AuthProvider>
                    <Navbar />
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<HomePage/>} />
                            <Route path="/:slug" element={<Leaderboard/>}/> 
                        </Routes>
                    </Router>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
            </AuthProvider>
                </TenantProvider>
        </div>
    );
};

if (document.getElementById('root')) {
    createRoot(document.getElementById('root')).render(<App />);
}
