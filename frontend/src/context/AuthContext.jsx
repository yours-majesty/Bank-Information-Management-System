// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); 
    setIsLogin(!!storedToken); 
  }, []);

  // Function to handle login
  const login = (token) => {
    console.log("Logging in..."); // Debugging log
    localStorage.setItem("token", token);
    setToken(token); 
    setIsLogin(true); 
  };

  // Function to handle logout
  const logout = () => {
    console.log("Logging out..."); 
    localStorage.removeItem("token");
    setToken(null); 
    setIsLogin(false); 
  };

  return (
    <AuthContext.Provider value={{ isLogin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

