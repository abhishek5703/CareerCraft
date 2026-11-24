import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    setLoading(false);
  }, []);

  const login = useCallback((nextToken, userData, firebaseData = {}) => {
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(userData));
    if (firebaseData.firebaseIdToken) localStorage.setItem("firebaseIdToken", firebaseData.firebaseIdToken);
    if (firebaseData.firebaseRefreshToken) localStorage.setItem("firebaseRefreshToken", firebaseData.firebaseRefreshToken);
    setToken(nextToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("firebaseIdToken");
    localStorage.removeItem("firebaseRefreshToken");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  }, []);

  const value = useMemo(() => ({ token, user, login, logout, loading }), [token, user, login, logout, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};