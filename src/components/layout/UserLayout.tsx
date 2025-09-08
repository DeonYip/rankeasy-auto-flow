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
    <div className="min-h-screen bg-background">
      <UserSidebar />
      <div className="lg:pl-72">
        <Header />
        <main className="pt-0 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}