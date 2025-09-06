import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Bot,
  Hash,
  FileText,
  LogOut,
  User,
  Coins
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/user/dashboard', icon: LayoutDashboard },
  { name: 'Automation', href: '/user/automation', icon: Bot },
  { name: 'Keywords', href: '/user/keywords', icon: Hash },
  { name: 'Blog', href: '/user/blog', icon: FileText },
];

export function UserSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar-background border-r border-sidebar-border lg:block hidden">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="admin-card-title text-sidebar-foreground">RankEasy.ai</h1>
            <p className="text-xs text-sidebar-foreground/60">Premium Panel</p>
          </div>
        </div>
      </div>

      {/* User info */}
      {user && (
        <div className="px-6 py-4 border-b border-sidebar-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-sidebar-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="admin-label text-sidebar-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {user.email}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <Coins className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-sidebar-foreground">
              {user.tokenBalance.toLocaleString()} tokens
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 admin-nav-item',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-4 w-4 transition-colors duration-200',
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground'
                )}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border/50">
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-200 admin-nav-item"
        >
          <LogOut className="mr-3 h-4 w-4 text-sidebar-foreground/60" />
          <span className="text-sm font-medium">Sign out</span>
        </button>
      </div>
    </div>
  );
}