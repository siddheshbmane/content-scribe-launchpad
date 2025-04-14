
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Linkedin } from "lucide-react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLinkedInLoggingIn, setIsLinkedInLoggingIn] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  
  const { toast } = useToast();
  const { login, loginWithLinkedIn, user, forgotPassword } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoggingIn(true);
    
    try {
      await login(email, password);
      
      // Check if user needs onboarding
      const hasCompletedOnboarding = localStorage.getItem("user_preferences");
      
      if (hasCompletedOnboarding) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (error) {
      // Error is already handled in the auth context
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLinkedInLogin = async () => {
    setIsLinkedInLoggingIn(true);
    
    try {
      await loginWithLinkedIn();
      
      // Check if user needs onboarding
      const hasCompletedOnboarding = localStorage.getItem("user_preferences");
      
      if (hasCompletedOnboarding) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (error) {
      // Error is already handled in the auth context
    } finally {
      setIsLinkedInLoggingIn(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsResetting(true);
    
    try {
      await forgotPassword(resetEmail);
      setShowResetPassword(false);
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions to reset your password.",
      });
    } catch (error) {
      // Error is already handled in the auth context
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 bg-linkedin-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">CS</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">ContentScribe</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to start creating your LinkedIn content
          </p>
        </div>
        
        <div className="mt-8">
          <Button 
            className="w-full bg-[#0077B5] hover:bg-[#006699] h-12"
            disabled={isLinkedInLoggingIn}
            onClick={handleLinkedInLogin}
          >
            <Linkedin className="mr-2 h-5 w-5" />
            {isLinkedInLoggingIn ? "Connecting to LinkedIn..." : "Sign in with LinkedIn"}
          </Button>
          
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>
          
          <form className="mt-6 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <div className="text-sm">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowResetPassword(true);
                      setResetEmail(email);
                    }}
                    className="font-medium text-linkedin-primary hover:text-linkedin-primary/80"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="font-medium text-linkedin-primary hover:text-linkedin-primary/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <AlertDialog open={showResetPassword} onOpenChange={setShowResetPassword}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset your password</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your email address and we'll send you instructions to reset your password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email address</Label>
              <Input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isResetting}
              onClick={(e) => {
                e.preventDefault();
                handleResetPassword();
              }}
            >
              {isResetting ? "Sending..." : "Send reset instructions"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Login;
