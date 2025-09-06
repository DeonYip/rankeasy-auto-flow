import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CheckEmailForm() {
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
          <div className="w-16 h-16 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              We've sent a password reset link to your email address
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Click the link in the email to reset your password. If you don't see the email, check your spam folder.
            </p>
            <p className="text-sm font-medium text-primary">
              example@email.com
            </p>
          </div>

          <Button className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity">
            Open Email App
          </Button>

          <Button variant="outline" className="w-full h-11">
            Resend Email
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link 
            to="/login" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}