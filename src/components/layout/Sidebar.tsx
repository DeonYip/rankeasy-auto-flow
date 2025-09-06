import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  Users, 
  Globe, 
  MessageSquare, 
  Bug, 
  Package, 
  Settings,
  Brain,
  Zap
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3, roles: ['operator', 'prompt_manager', 'super_admin'] },
  { name: 'User Management', href: '/admin/users', icon: Users, roles: ['operator', 'super_admin'] },
  { name: 'User Blog Admin', href: '/admin/blogs', icon: Globe, roles: ['operator', 'super_admin'] },
  { name: 'Prompt Management', href: '/admin/prompts', icon: MessageSquare, roles: ['prompt_manager', 'super_admin'] },
  { name: 'Debug Tasks', href: '/admin/debug', icon: Bug, roles: ['prompt_manager', 'super_admin'] },
  { name: 'Products & Generation', href: '/admin/products', icon: Package, roles: ['operator', 'super_admin'] },
  { name: 'System Settings', href: '/admin/settings', icon: Settings, roles: ['super_admin'] },
];

export function Sidebar() {
  const location = useLocation();
  const { user, hasPermission } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    hasPermission(item.roles as any)
  );

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-primary">
              <img 
                src="/lovable-uploads/a02443b5-5412-4d06-b775-84f6abcd2767.png" 
                alt="RankEasy.ai Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">RankEasy.ai</h1>
              <p className="text-sm text-sidebar-foreground/60">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 flex-shrink-0 h-5 w-5 transition-colors',
                    isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/70'
                  )}
                />
                {item.name}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3 px-4 py-3 bg-sidebar-accent rounded-lg">
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-sidebar-accent-foreground/60 capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}