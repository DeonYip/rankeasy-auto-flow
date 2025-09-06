import React from 'react';
import { UserSidebar } from './UserSidebar';
import { Header } from './Header';
import { useAuth } from '@/contexts/AuthContext';

interface UserLayoutProps {
  children: React.ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <UserSidebar />
      <div className="lg:pl-72">
        <Header />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}