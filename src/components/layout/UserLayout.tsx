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
    <div className="min-h-screen bg-background-alt">
      <UserSidebar />
      <div className="lg:pl-80">
        <Header />
        <main className="py-6 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}