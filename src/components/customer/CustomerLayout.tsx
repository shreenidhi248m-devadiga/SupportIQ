import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import LogoutConfirmModal from '../auth/LogoutConfirmModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-[#040612] text-slate-100 font-sans selection:bg-brand-violet selection:text-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar onLogoutClick={() => setShowLogoutModal(true)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar onLogoutClick={() => setShowLogoutModal(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
};

export default CustomerLayout;
