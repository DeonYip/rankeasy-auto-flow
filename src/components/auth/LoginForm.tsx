import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Brain, Loader2, Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
            <img 
              src="/lovable-uploads/992f6f2f-cae4-4dd1-b25e-53c04748d451.png" 
              alt="RankEasy.ai Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="auth-title bg-gradient-primary bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="auth-subtitle mt-3">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-8 auth-form-spacing">
            <form onSubmit={handleSubmit} className="auth-input-spacing">
              <div className="space-y-2">
                <Label htmlFor="email" className="auth-label">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="auth-input h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="auth-label">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="auth-input h-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label
                    htmlFor="remember"
                    className="auth-helper-text"
                  >
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="auth-link px-0 text-primary hover:text-primary-hover">
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="auth-button w-full h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
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

            {/* Social Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 auth-helper-text">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="auth-button w-full h-12">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="auth-helper-text">
                Don't have an account?{' '}
                <Button variant="link" className="auth-link px-0 text-primary hover:text-primary-hover">
                  Sign up
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Users */}
        <Card className="mt-6 bg-muted/30 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="auth-label">Demo Accounts</CardTitle>
            <CardDescription className="auth-helper-text">
              Click any user to auto-fill credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoUsers.map((user) => (
              <Button
                key={user.email}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-background/50"
                onClick={() => {
                  setEmail(user.email);
                  setPassword(user.password);
                }}
              >
                <div className="text-left">
                  <p className="auth-helper-text font-medium">{user.email}</p>
                  <p className="auth-helper-text text-xs">{user.role}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}