import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface RoleProtectedRouteProps {
  allowedRole: 'customer' | 'admin';
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRole }) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080D1F] flex items-center justify-center">
        <LoadingSpinner text="Verifying access..." />
      </div>
    );
  }

  // If not authenticated, they shouldn't even be here, but just in case:
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but wrong role
  if (role !== allowedRole) {
    if (role === 'customer') {
      return <Navigate to="/user" replace />;
    } else if (role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
