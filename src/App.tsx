import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { CheckEmailForm } from "@/components/auth/CheckEmailForm";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import { EmailVerifiedForm } from "@/components/auth/EmailVerifiedForm";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { UserLayout } from "@/components/layout/UserLayout";
import Dashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/Dashboard";
import AutomationPage from "./pages/user/Automation";
import BrandingPage from "./pages/user/automation/Branding";
import ArticlePage from "./pages/user/automation/Article";
import ProductPage from "./pages/user/automation/Product";
import KeywordsPage from "./pages/user/Keywords";
import BlogPage from "./pages/user/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/check-email" element={<CheckEmailForm />} />
        <Route path="/verify-email" element={<VerifyEmailForm />} />
        <Route path="/email-verified" element={<EmailVerifiedForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Route based on user role
  if (user?.role === 'user') {
    return (
      <UserLayout>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/automation" element={<AutomationPage />} />
          <Route path="/user/automation/branding" element={<BrandingPage />} />
          <Route path="/user/automation/article" element={<ArticlePage />} />
          <Route path="/user/automation/product" element={<ProductPage />} />
          <Route path="/user/keywords" element={<KeywordsPage />} />
          <Route path="/user/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserLayout>
    );
  }

  // Admin routes for super_admin, operator, prompt_manager
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        {/* Other admin routes will be added here */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AdminLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
