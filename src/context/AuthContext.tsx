import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, EntrepreneurProfile, InvestorProfile, Notification } from '../types';
import { mockEntrepreneur, mockInvestor, mockNotifications } from '../data/mockData';

interface AuthContextType {
  user: User | EntrepreneurProfile | InvestorProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'entrepreneur' | 'investor') => Promise<void>;
  logout: () => void;
  notifications: Notification[];
  unreadNotifications: number;
  markNotificationAsRead: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | EntrepreneurProfile | InvestorProfile | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const login = async (email: string, password: string, role: 'entrepreneur' | 'investor') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (role === 'entrepreneur') {
      setUser(mockEntrepreneur);
    } else {
      setUser(mockInvestor);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const unreadNotifications = notifications.filter(n => !n.read && n.userId === user?.id).length;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      notifications: notifications.filter(n => n.userId === user?.id),
      unreadNotifications,
      markNotificationAsRead
    }}>
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
