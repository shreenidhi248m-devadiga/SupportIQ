import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import EmailVerification from '../components/auth/EmailVerification';

export const VerifyEmailPage: React.FC = () => {
  return (
    <AuthLayout>
      <EmailVerification />
    </AuthLayout>
  );
};

export default VerifyEmailPage;
