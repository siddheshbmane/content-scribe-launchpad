
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  role: "user" | "admin";
  jobTitle?: string;
  industry?: string;
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
  updateUserProfile: (data: Partial<User>) => Promise<void>;
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
    role: "user" as const,
    jobTitle: "Marketing Specialist",
    industry: "Technology"
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    profileImage: "https://i.pravatar.cc/150?img=2",
    role: "admin" as const,
    jobTitle: "Marketing Director",
    industry: "Software"
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
  }, []);

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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithLinkedIn = async () => {
    setIsLoading(true);
    try {
      // Simulate LinkedIn OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For the MVP, just log in as the demo user
      const mockUser = MOCK_USERS[0];
      const { password: _, ...userWithoutPassword } = mockUser;
      
      // In a real LinkedIn OAuth flow, we would receive user profile data including:
      // - Name
      // - Email
      // - Profile Image URL
      // - Potentially job title and industry

      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast.success("Successfully logged in with LinkedIn!");
    } catch (error) {
      toast.error("LinkedIn login failed");
      throw error;
    } finally {
      setIsLoading(false);
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
        role: "user" as const,
        jobTitle: "",
        industry: ""
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error("No user logged in");
      }
      
      // Update user object
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
      return;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
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
        isAdmin,
        updateUserProfile
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
