import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

import DriverNavbar from "../components/DriverNavbar";

const PrivateRoute = () => {
  const auth = useAuth();
  console.log("auth", auth);

  if (!auth || !auth.token || auth.token === "") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const DriverProtected = () => {
  const auth = useAuth();

  if (!auth || !auth.token || auth.token !== "driver") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <DriverNavbar />
      <Outlet />
    </>
  );
};

export const SupplierProtected = () => {
  const auth = useAuth();
  if (!auth || !auth.token || auth.token !== "supplier") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
