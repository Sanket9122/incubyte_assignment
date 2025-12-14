import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await authApi.login(email, password);
      setUser(userData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
        const userData = await authApi.register(email, password);
        setUser(userData);
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const isLoggedIn = !!user;
  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};