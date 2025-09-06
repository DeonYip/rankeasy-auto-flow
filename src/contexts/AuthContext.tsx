import React, { createContext, useContext, useState } from 'react';
import { User, AuthState, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUsers: Record<string, User> = {
  'admin@rankeasy.ai': {
    id: '1',
    email: 'admin@rankeasy.ai',
    name: 'Admin User',
    role: 'super_admin',
    tokenBalance: 10000,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  'operator@rankeasy.ai': {
    id: '2',
    email: 'operator@rankeasy.ai',
    name: 'Operations Manager',
    role: 'operator',
    tokenBalance: 5000,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  'user@rankeasy.ai': {
    id: '3',
    email: 'user@rankeasy.ai',
    name: 'Premium User',
    role: 'user',
    tokenBalance: 1000,
    status: 'active',
    createdAt: new Date().toISOString(),
  }
};

const roleHierarchy: Record<UserRole, number> = {
  user: 1,
  operator: 2,
  prompt_manager: 3,
  super_admin: 4,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers[email];
    if (user && password === 'password') {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const hasPermission = (requiredRole: UserRole | UserRole[]) => {
    if (!authState.user) return false;
    
    const userLevel = roleHierarchy[authState.user.role];
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.some(role => userLevel >= roleHierarchy[role]);
    }
    
    return userLevel >= roleHierarchy[requiredRole];
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      hasPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}