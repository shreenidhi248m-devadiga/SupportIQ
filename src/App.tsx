import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Auth Components & Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import UserLoginPage from './pages/UserLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AccessDeniedPage from './pages/AccessDeniedPage';

// App Pages
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerProfile from './pages/CustomerProfile';
import CreateTicketPage from './pages/CreateTicketPage';
import MyTicketsPage from './pages/MyTicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import AISupportPage from './pages/AISupportPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminTicketsPage from './pages/AdminTicketsPage';
import AdminCustomersPage from './pages/AdminCustomersPage';
import CustomerIntelligencePage from './pages/CustomerIntelligencePage';
import AnalyticsPage from './pages/AnalyticsPage';
import SecurityDashboardPage from './pages/SecurityDashboardPage';
import DeploymentPage from './pages/DeploymentPage';

import AdminChurnPage from './pages/AdminChurnPage';
import AdminAIPage from './pages/AdminAIPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

// Modals
import SessionExpiredModal from './components/auth/SessionExpiredModal';

export const AppContent: React.FC = () => {
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const handleExpired = () => setSessionExpired(true);
    window.addEventListener('supportiq_session_expired', handleExpired);
    return () => window.removeEventListener('supportiq_session_expired', handleExpired);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080D1F] text-[#102A56] dark:text-[#F8FAFC] font-sans selection:bg-[#EFF6FF] selection:text-[#2563EB]">
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* Role-Specific Login Routes (public, outside ProtectedRoute) */}
          <Route path="/user/login" element={<UserLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Customer Routes */}
            <Route element={<RoleProtectedRoute allowedRole="customer" />}>
              <Route path="/user" element={<CustomerDashboard />} />
              <Route path="/user/ai-playground" element={<AISupportPage />} />
              <Route path="/user/profile" element={<CustomerProfile />} />
              <Route path="/user/tickets" element={<MyTicketsPage />} />
              <Route path="/user/create-ticket" element={<CreateTicketPage />} />
              <Route path="/user/tickets/:ticketId" element={<TicketDetailsPage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<RoleProtectedRoute allowedRole="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/tickets" element={<AdminTicketsPage />} />
              <Route path="/admin/tickets/:ticketId" element={<TicketDetailsPage />} />
              <Route path="/admin/customers" element={<AdminCustomersPage />} />
              <Route path="/admin/customers/:customerId/intelligence" element={<CustomerIntelligencePage />} />
              <Route path="/admin/analytics" element={<AnalyticsPage />} />
              <Route path="/admin/churn" element={<AdminChurnPage />} />
              <Route path="/admin/ai" element={<AdminAIPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>

          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      <SessionExpiredModal
        isOpen={sessionExpired}
        onClose={() => setSessionExpired(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
