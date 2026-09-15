import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: 'customer' | 'admin' | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('supportiq_token');
      const storedUserStr = localStorage.getItem('supportiq_user');

      if (storedToken && storedUserStr) {
        const storedUser = JSON.parse(storedUserStr);
        setToken(storedToken);
        setUser(storedUser);
      }
    } catch (err) {
      console.error('Error hydrating AuthContext:', err);
      localStorage.removeItem('supportiq_token');
      localStorage.removeItem('supportiq_user');
    } finally {
      setLoading(false);
    }

    const handleSessionExpired = () => {
      setToken(null);
      setUser(null);
    };

    window.addEventListener('supportiq_session_expired', handleSessionExpired);
    return () => {
      window.removeEventListener('supportiq_session_expired', handleSessionExpired);
    };
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('supportiq_token', newToken);
    localStorage.setItem('supportiq_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('supportiq_token');
    localStorage.removeItem('supportiq_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('supportiq_user', JSON.stringify(updatedUser));
  };

  const role = user ? user.role : null;
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;