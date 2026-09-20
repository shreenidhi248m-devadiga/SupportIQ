import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080D1F] flex items-center justify-center">
        <LoadingSpinner text="Authenticating SupportIQ..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to the role-specific login page based on the current URL
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/user/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
