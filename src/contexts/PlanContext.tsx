
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

export type PlanType = "free" | "basic" | "pro" | "proPlus";

export interface Plan {
  type: PlanType;
  name: string;
  postsPerMonth: number;
  hasWatermark: boolean;
  hasCalendarAccess: boolean;
  hasImageGenerator: boolean;
  canPublish: boolean;
  canUseOwnApiKey: boolean;
  price: number;
}

export interface UserPlan {
  planType: PlanType;
  postsCreated: number;
  postsLimit: number;
  isImageGeneratorEnabled: boolean;
}

interface PlanContextType {
  plans: Record<PlanType, Plan>;
  userPlan: UserPlan | null;
  isLoading: boolean;
  upgradePlan: (planType: PlanType) => Promise<void>;
  canGenerateImage: boolean;
  canCreateMorePosts: boolean;
  canAccessCalendar: boolean;
  canUseCustomApiKey: boolean;
  remainingPosts: number;
  setPostsCreated: (count: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_DETAILS: Record<PlanType, Plan> = {
  free: {
    type: "free",
    name: "Free",
    postsPerMonth: 2,
    hasWatermark: true,
    hasCalendarAccess: false,
    hasImageGenerator: false,
    canPublish: false,
    canUseOwnApiKey: false,
    price: 0
  },
  basic: {
    type: "basic",
    name: "Basic",
    postsPerMonth: 10,
    hasWatermark: true,
    hasCalendarAccess: true,
    hasImageGenerator: false,
    canPublish: false,
    canUseOwnApiKey: false,
    price: 10
  },
  pro: {
    type: "pro",
    name: "Pro",
    postsPerMonth: 30,
    hasWatermark: false, 
    hasCalendarAccess: true,
    hasImageGenerator: true,
    canPublish: true,
    canUseOwnApiKey: false,
    price: 29
  },
  proPlus: {
    type: "proPlus",
    name: "Pro Plus",
    postsPerMonth: Infinity,
    hasWatermark: false,
    hasCalendarAccess: true,
    hasImageGenerator: true,
    canPublish: true,
    canUseOwnApiKey: true,
    price: 49
  }
};

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load user plan from localStorage
  const loadUserPlan = useCallback(async () => {
    setIsLoading(true);
    
    if (!user) {
      setUserPlan(null);
      setIsLoading(false);
      return;
    }
    
    try {
      // In a real app, this would be fetched from the backend
      // For MVP, we'll use localStorage with initial mock data
      const storedPlan = localStorage.getItem(`userPlan_${user.id}`);
      
      if (storedPlan) {
        setUserPlan(JSON.parse(storedPlan));
      } else {
        // Default plan for new users
        const defaultPlan: UserPlan = {
          planType: "free",
          postsCreated: 0,
          postsLimit: PLAN_DETAILS.free.postsPerMonth,
          isImageGeneratorEnabled: PLAN_DETAILS.free.hasImageGenerator
        };
        
        setUserPlan(defaultPlan);
        localStorage.setItem(`userPlan_${user.id}`, JSON.stringify(defaultPlan));
      }
    } catch (error) {
      console.error("Failed to load user plan:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initialize user plan on component mount or when user changes
  useEffect(() => {
    loadUserPlan();
  }, [user, loadUserPlan]);

  const upgradePlan = async (planType: PlanType): Promise<void> => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPlan: UserPlan = {
        planType,
        postsCreated: userPlan?.postsCreated || 0,
        postsLimit: PLAN_DETAILS[planType].postsPerMonth,
        isImageGeneratorEnabled: PLAN_DETAILS[planType].hasImageGenerator
      };
      
      setUserPlan(newPlan);
      localStorage.setItem(`userPlan_${user.id}`, JSON.stringify(newPlan));
    } catch (error) {
      console.error("Failed to upgrade plan:", error);
      throw new Error("Failed to upgrade plan");
    } finally {
      setIsLoading(false);
    }
  };

  const setPostsCreated = (count: number) => {
    if (!user || !userPlan) return;
    
    const updatedPlan = {
      ...userPlan,
      postsCreated: count
    };
    
    setUserPlan(updatedPlan);
    localStorage.setItem(`userPlan_${user.id}`, JSON.stringify(updatedPlan));
  };

  // Derived state for feature access
  const canGenerateImage = userPlan?.isImageGeneratorEnabled || false;
  const canCreateMorePosts = userPlan ? (
    userPlan.planType === "proPlus" || userPlan.postsCreated < userPlan.postsLimit
  ) : false;
  const canAccessCalendar = userPlan ? PLAN_DETAILS[userPlan.planType].hasCalendarAccess : false;
  const canUseCustomApiKey = userPlan ? PLAN_DETAILS[userPlan.planType].canUseOwnApiKey : false;
  const remainingPosts = userPlan ? 
    (userPlan.planType === "proPlus" ? 999 : Math.max(0, userPlan.postsLimit - userPlan.postsCreated)) : 0;

  return (
    <PlanContext.Provider
      value={{
        plans: PLAN_DETAILS,
        userPlan,
        isLoading,
        upgradePlan,
        canGenerateImage,
        canCreateMorePosts,
        canAccessCalendar,
        canUseCustomApiKey,
        remainingPosts,
        setPostsCreated
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
