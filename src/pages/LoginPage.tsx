import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import RoleSelector from '../components/auth/RoleSelector';
import LoginForm from '../components/auth/LoginForm';
import AdminLoginForm from '../components/auth/AdminLoginForm';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  return (
    <AuthLayout>
      <RoleSelector selectedRole={role} onSelectRole={setRole} />
      {role === 'customer' ? (
        <LoginForm onSwitchToRegister={() => navigate('/register')} />
      ) : (
        <AdminLoginForm />
      )}
    </AuthLayout>
  );
};

export default LoginPage;
