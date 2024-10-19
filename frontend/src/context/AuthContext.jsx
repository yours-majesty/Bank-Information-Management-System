

import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token); 
  }, []);

  // Function to handle login
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLogin(true);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

