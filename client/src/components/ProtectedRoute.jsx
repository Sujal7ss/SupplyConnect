import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  console.log("user" , user)

  return user ? <Outlet /> : <Navigate to="/signin" />;
}