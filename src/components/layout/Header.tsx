import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Bell, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-card border-b border-border px-4 md:px-6 py-3 md:py-4 hidden lg:block">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="admin-section-title text-foreground text-lg md:text-xl truncate">
            Welcome back, {user?.name}
          </h2>
          <p className="admin-subtitle text-sm hidden sm:block">
            Manage your AI content generation platform
          </p>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Token Balance - Hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-2 bg-background-alt px-3 md:px-4 py-2 rounded-lg border border-border">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="admin-label text-foreground text-sm">
              {user?.tokenBalance?.toLocaleString()} tokens
            </span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-10 md:w-10">
            <Bell className="h-4 w-4 md:h-5 md:w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-2 md:px-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <span className="admin-label hidden md:inline-block">{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="admin-label leading-none">{user?.name}</p>
                  <p className="admin-stats-label leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}