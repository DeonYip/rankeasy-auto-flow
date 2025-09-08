import React, { useState } from 'react';
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
  Coins,
  ChevronDown,
  ChevronRight,
  Building2,
  Settings,
  Package
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/user/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/user/profile', icon: User },
  { 
    name: 'Automation', 
    icon: Bot, 
    subItems: [
      { name: 'Branding', href: '/user/automation/branding', icon: Building2 },
      { name: 'Article', href: '/user/automation/article', icon: Settings },
      { name: 'Product', href: '/user/automation/product', icon: Package },
    ]
  },
  { name: 'Keywords', href: '/user/keywords', icon: Hash },
  { name: 'Blog', href: '/user/blog', icon: FileText },
];

export function UserSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({
    Automation: true // Keep automation expanded by default
  });

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}
      
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-sidebar-background border border-sidebar-border shadow-lg"
      >
        <svg className="h-6 w-6 text-sidebar-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:block`}>
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="admin-card-title text-sidebar-foreground">RankEasy.ai</h1>
              <p className="text-xs text-sidebar-foreground/60">Premium Panel</p>
            </div>
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={closeMobileSidebar}
            className="ml-auto lg:hidden p-1 rounded text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          if (item.subItems) {
            const isExpanded = expandedItems[item.name];
            const hasActiveSubItem = item.subItems.some(subItem => location.pathname === subItem.href);
            
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className={cn(
                    'group flex items-center w-full px-3 py-2.5 rounded-lg transition-colors duration-200 admin-nav-item',
                    hasActiveSubItem
                      ? 'bg-primary/10 text-primary'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-4 w-4 transition-colors duration-200',
                      hasActiveSubItem
                        ? 'text-primary'
                        : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground'
                    )}
                  />
                  <span className="text-sm font-medium flex-1 text-left">{item.name}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-sidebar-foreground/60" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-sidebar-foreground/60" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      const isActive = location.pathname === subItem.href;
                      return (
                         <Link
                           key={subItem.name}
                           to={subItem.href}
                           onClick={closeMobileSidebar}
                           className={cn(
                             'group flex items-center px-3 py-2 rounded-lg transition-colors duration-200 admin-nav-item',
                             isActive
                               ? 'bg-primary text-primary-foreground shadow-sm'
                               : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                           )}
                         >
                          <subItem.icon
                            className={cn(
                              'mr-3 h-3.5 w-3.5 transition-colors duration-200',
                              isActive
                                ? 'text-primary-foreground'
                                : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground'
                            )}
                          />
                          <span className="text-sm">{subItem.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={closeMobileSidebar}
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

      {/* Articles Usage Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-sidebar-foreground">Premium Plan</span>
            <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-md hover:bg-primary/90 transition-colors">
              Upgrade
            </button>
          </div>
          <div className="text-xs text-sidebar-foreground/60 mb-1">
            1,360 Articles left
          </div>
          <div className="w-full bg-sidebar-border/30 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{width: '75%'}}></div>
          </div>
        </div>
      </div>

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
    </>
  );
}