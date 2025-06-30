import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("supplyConnectUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const user = res.data?.data || res.data; // adjust based on your backend response
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("supplyConnectUser", JSON.stringify(user));
        return user;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/register`,
        userData
      );
      console.log(res);

      const user = res.data.data || res.data;
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("supplyConnectUser", JSON.stringify(user));
        return user;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("supplyConnectUser");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
