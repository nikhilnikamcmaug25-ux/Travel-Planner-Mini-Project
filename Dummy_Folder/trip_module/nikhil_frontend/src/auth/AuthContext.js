import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    if (!localStorage.getItem("token")) return null;
    try {
      const decoded = jwtDecode(localStorage.getItem("token"));
      return { id: decoded.id || decoded.userId, role: decoded.role };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    try {
      const decoded = jwtDecode(newToken);
      setUser({ id: decoded.id || decoded.userId, role: decoded.role });
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
