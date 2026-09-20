import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

export const UserLoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <LoginForm onSwitchToRegister={() => navigate('/register')} />
    </AuthLayout>
  );
};

export default UserLoginPage;
