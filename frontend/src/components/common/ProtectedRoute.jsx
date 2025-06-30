import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, isAuthenticated, userRole, loading } = useAuth();
  
  if (loading) {
    return <Loader />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login\" replace />;
  }
  
  if (allowedRole && userRole !== allowedRole) {
    // Redirect to the appropriate dashboard based on user role
    return <Navigate to={`/${userRole}`} replace />;
  }
  
  return children;
};

export default ProtectedRoute;