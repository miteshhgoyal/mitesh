// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { tokenService } from "../services/tokenService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [config, setConfig] = useState(null); // holds config/profile data
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateConfig = (configData) => {
    setConfig(configData);
  };

  const checkAuth = async () => {
    try {
      const token = tokenService.getToken();

      // No token or expired token → clear and exit
      if (!token || tokenService.isTokenExpired(token)) {
        tokenService.removeToken();
        setConfig(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Backend will validate token and return config/profile
      const response = await api.get("/auth/profile");

      if (response.data.success && response.data.data) {
        setConfig(response.data.data);
        setIsAuthenticated(true);
      } else {
        tokenService.removeToken();
        setConfig(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      tokenService.removeToken();
      setConfig(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // loginData should be what /auth/login returns
  // { success, data: { name, lastLogin, token } }
  const login = (loginData) => {
    const { token, ...configData } = loginData;

    // Store token
    tokenService.setToken(token);

    // Set config data (name, lastLogin, etc.)
    setConfig(configData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    tokenService.removeToken();
    setConfig(null);
    setIsAuthenticated(false);
  };

  const value = {
    user: config, // keep prop name "user" for compatibility
    config,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
    updateUser: updateConfig,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
