import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmailVerifiedForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-primary/10 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 overflow-hidden">
            <img 
              src="/lovable-uploads/992f6f2f-cae4-4dd1-b25e-53c04748d451.png" 
              alt="RankEasy.ai Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Email Verified!
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Your email has been successfully verified. You can now access your account.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Welcome to RankEasy.ai! Your account is now active and ready to use.
            </p>
          </div>

          <Button 
            asChild
            className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Link to="/login">
              Continue to Dashboard
            </Link>
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground text-center">
            Need help? Contact our{' '}
            <Button variant="link" className="p-0 h-auto text-primary text-xs">
              support team
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}