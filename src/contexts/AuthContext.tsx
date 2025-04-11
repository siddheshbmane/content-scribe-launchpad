
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  role: "user" | "admin";
  linkedInProfile?: {
    id: string;
    accessToken: string;
    refreshToken?: string;
  };
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithLinkedIn: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    password: "password",
    profileImage: "https://i.pravatar.cc/150?img=1",
    role: "user" as const
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    profileImage: "https://i.pravatar.cc/150?img=2",
    role: "admin" as const
  }
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
    
    // Handle LinkedIn OAuth redirect
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    
    if (code && state && state === localStorage.getItem('linkedin_state')) {
      handleLinkedInCallback(code);
    }
  }, []);
  
  const handleLinkedInCallback = async (code: string) => {
    // In a real implementation, we would exchange this code for tokens
    // For this MVP, we'll simulate a successful LinkedIn login
    setIsLoading(true);
    
    try {
      // Simulate API call to exchange code for tokens
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For the MVP, create a mock user with LinkedIn profile
      const mockLinkedInUser = {
        id: "linkedin-" + Math.random().toString(36).substring(7),
        name: "LinkedIn User",
        email: "linkedin@example.com",
        profileImage: "https://i.pravatar.cc/150?img=3",
        role: "user" as const,
        linkedInProfile: {
          id: "linkedin-id-123",
          accessToken: "mock-access-token"
        }
      };
      
      setUser(mockLinkedInUser);
      localStorage.setItem("user", JSON.stringify(mockLinkedInUser));
      
      // Clear the state from localStorage
      localStorage.removeItem('linkedin_state');
      
      // Remove the code and state from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      toast.success("Successfully logged in with LinkedIn!");
      
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
      if (!hasCompletedOnboarding) {
        window.location.href = '/onboarding';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      toast.error("LinkedIn login failed");
      console.error("LinkedIn login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!mockUser) {
        throw new Error("Invalid credentials");
      }
      
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast.success("Successfully logged in!");
      
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
      if (!hasCompletedOnboarding) {
        window.location.href = '/onboarding';
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithLinkedIn = async () => {
    try {
      // In a real implementation, this would redirect to LinkedIn OAuth
      // For this MVP, we'll mock the OAuth flow
      
      // Generate a random state parameter for security
      const state = Math.random().toString(36).substring(7);
      localStorage.setItem('linkedin_state', state);
      
      // Mock LinkedIn OAuth URL
      // In a real implementation, this would be the actual LinkedIn authorization URL
      const clientId = "77j8dhsapg9bel";
      const redirectUri = encodeURIComponent(`${window.location.origin}/login`);
      const scope = encodeURIComponent("r_liteprofile r_emailaddress w_member_social");
      
      // This is just for simulation - in a real app, you'd use the LinkedIn API
      const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
      
      // For the MVP, simulate the redirect and callback
      toast.info("Simulating LinkedIn OAuth flow...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data that would normally come from LinkedIn
      const mockLinkedInUser = {
        id: "linkedin-" + Math.random().toString(36).substring(7),
        name: "LinkedIn User",
        email: "linkedin@example.com",
        profileImage: "https://i.pravatar.cc/150?img=3",
        role: "user" as const,
        linkedInProfile: {
          id: "linkedin-id-123",
          accessToken: "mock-access-token"
        }
      };
      
      setUser(mockLinkedInUser);
      localStorage.setItem("user", JSON.stringify(mockLinkedInUser));
      toast.success("Successfully logged in with LinkedIn!");
      
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
      if (!hasCompletedOnboarding) {
        window.location.href = '/onboarding';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      toast.error("LinkedIn login failed");
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error("User already exists");
      }
      
      // Create a new user (in a real app this would be saved to the database)
      const newUser = {
        id: Math.random().toString(36).substring(7),
        name,
        email,
        role: "user" as const
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Account created successfully!");
      
      // Redirect to onboarding
      window.location.href = '/onboarding';
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithLinkedIn,
        register,
        logout,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
