import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-alt">
      <Sidebar />
      <div className="lg:pl-80">
        <Header />
        <main className="py-6 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}