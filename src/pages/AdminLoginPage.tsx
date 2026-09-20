import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AdminLoginForm from '../components/auth/AdminLoginForm';

export const AdminLoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <AdminLoginForm />
    </AuthLayout>
  );
};

export default AdminLoginPage;
