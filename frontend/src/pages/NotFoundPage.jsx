import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const NotFoundPage = () => {
  const { isAuthenticated, userRole } = useAuth();
  
  const homePath = isAuthenticated 
    ? userRole === 'supplier' ? '/supplier' : '/driver' 
    : '/login';
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-red-50 rounded-full flex items-center justify-center">
            <MapPin className="h-12 w-12 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Oops! Looks like this delivery took a wrong turn. The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to={homePath}
          className="btn btn-primary flex items-center justify-center mx-auto w-full max-w-xs"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;