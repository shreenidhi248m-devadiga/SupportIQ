import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Auth Components & Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
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
    <div className="min-h-screen flex flex-col bg-[#040612] text-slate-100 font-sans selection:bg-brand-violet selection:text-white">
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route path="/ai-support" element={<AISupportPage />} />

          {/* Protected Customer Routes */}
          <Route element={<ProtectedRoute allowedRole="customer" />}>
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />
            <Route path="/customer/tickets" element={<MyTicketsPage />} />
            <Route path="/customer/tickets/new" element={<CreateTicketPage />} />
          </Route>

          {/* Shared Ticket Details (Customer & Admin) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/customer/tickets/:ticketId" element={<TicketDetailsPage />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/tickets" element={<AdminTicketsPage />} />
            <Route path="/admin/customers" element={<AdminCustomersPage />} />
            <Route path="/admin/customers/:customerId/intelligence" element={<CustomerIntelligencePage />} />
            <Route path="/admin/intelligence" element={<AnalyticsPage />} />
            <Route path="/admin/security" element={<SecurityDashboardPage />} />
            <Route path="/admin/deployment" element={<DeploymentPage />} />
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
