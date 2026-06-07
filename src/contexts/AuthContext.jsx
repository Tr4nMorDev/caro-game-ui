import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      return;
    }

    let isActive = true;

    const refreshCurrentUser = async () => {
      try {
        const data = await getCurrentUser(token);
        if (!isActive) return;

        sessionStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } catch (e) {
        console.error("Failed to refresh user profile", e);
        if (isActive) {
          logout();
        }
      }
    };

    refreshCurrentUser();

    return () => {
      isActive = false;
    };
  }, [token]);

  const login = ({ token, user }) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const updateUser = (nextUser) => {
    sessionStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
