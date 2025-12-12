import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin } from '../services/api'; // On importera la future fonction de l'api.js
import { jwtDecode } from "jwt-decode"; // On aura besoin de cette librairie


// 1. Création du Contexte
const AuthContext = createContext(null);

// 2. Création du Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem('authToken');
    return savedToken ? jwtDecode(savedToken) : null;
  });

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      const decodedUser = jwtDecode(data.token);
      
      setToken(data.token);
      setUser(decodedUser);
      localStorage.setItem('authToken', data.token);
      return true; // Succès
    } catch (error) {
      console.error('Login failed:', error);
      // On pourrait gérer l'état d'erreur ici
      return false; // Échec
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  // Les valeurs que nous rendons disponibles à toute l'application
  const value = {
    token,
    user,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'ADMIN',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Création du Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
