import React, { createContext, useState, useContext } from 'react';
import API from '../utils/API';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authTenant, setAuthTenant] = useState({});

  const login = async(params, cb) => {
    console.log("login", params)
    try{
      const response = await API.post('/tenant/login', params);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        setIsLoggedIn(true);
        setAuthTenant(response.data.tenant);
        cb();
        toast.success("Logged in succesfully");
      } else {
        toast.error("Could not log you in.");
      }
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const logout = async() => {
    try {
      const response = await API.post('/tenant/logout');
      if(response.data.status === "success"){
        setIsLoggedIn(false);
        setAuthTenant({});
        localStorage.removeItem('token');
        toast.success("Logged out succesfully");
      } else {
        toast.error("Could not log you in.");
      }
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authTenant, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
