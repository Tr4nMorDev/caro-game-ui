import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Tự động lấy user info từ token nếu có
  useEffect(() => {
    if (token) {
      const userData = parseJwt(token);
      setUser(userData);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    const userData = parseJwt(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook để dùng context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Helper: parse JWT
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
