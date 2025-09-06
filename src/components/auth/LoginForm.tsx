import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Brain, Loader2 } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const demoUsers = [
    { email: 'admin@rankeasy.ai', role: 'Super Admin', password: 'password' },
    { email: 'operator@rankeasy.ai', role: 'Operations Manager', password: 'password' },
    { email: 'user@rankeasy.ai', role: 'Premium User', password: 'password' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">RankEasy.ai</h1>
          <p className="text-white/80">Sign in to your admin panel</p>
        </div>

        {/* Login Form */}
        <Card className="backdrop-blur-sm bg-card/95 border-card-border shadow-lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rankeasy.ai"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Users */}
        <Card className="backdrop-blur-sm bg-card/95 border-card-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Demo Accounts</CardTitle>
            <CardDescription>
              Click any user to auto-fill credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoUsers.map((user) => (
              <Button
                key={user.email}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-card-hover"
                onClick={() => {
                  setEmail(user.email);
                  setPassword(user.password);
                }}
              >
                <div className="text-left">
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}