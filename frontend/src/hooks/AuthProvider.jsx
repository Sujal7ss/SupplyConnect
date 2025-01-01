import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = async (userType, data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          ...data,
          type: userType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (res.data.success) {
        setToken(userType);
        setUser(userType === 'driver' ? res.data.data.driver : res.data.data.supplier);
        localStorage.setItem("token", userType);
        localStorage.setItem("user", JSON.stringify(userType === 'driver' ? res.data.data.driver : res.data.data.supplier));
        setTimeout(() => {
          userType === 'driver' ? navigate("/homepage") : navigate("/dashboard");
        }, 1000);
        return;
      }

      throw new Error(res.message || "Login failed");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
