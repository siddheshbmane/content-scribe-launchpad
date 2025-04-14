
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export type PlanType = "free" | "basic" | "pro" | "proPlus";

export interface UserPlan {
  planType: PlanType;
  postsCreated: number;
  expiresAt: string | null;
  isActive: boolean;
}

export interface PlanFeatures {
  name: string;
  postsPerMonth: number;
  imageGenerationEnabled: boolean;
  customApiKeyEnabled: boolean;
  calendarEnabled: boolean;
  hasImageGeneration: boolean;
  price: number;
}

interface PlanContextType {
  userPlan: UserPlan | null;
  plans: Record<string, PlanFeatures>;
  remainingPosts: number;
  canAccessCalendar: boolean;
  canUseCustomApiKey: boolean;
  canCreateMorePosts: boolean;
  setPostsCreated: (count: number) => void;
  upgradePlan: (planName: PlanType) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLANS: Record<string, PlanFeatures> = {
  free: {
    name: "Free",
    postsPerMonth: 5,
    imageGenerationEnabled: false,
    customApiKeyEnabled: false,
    calendarEnabled: false,
    hasImageGeneration: false,
    price: 0
  },
  basic: {
    name: "Basic",
    postsPerMonth: 10,
    imageGenerationEnabled: false,
    customApiKeyEnabled: false,
    calendarEnabled: false,
    hasImageGeneration: false,
    price: 10
  },
  pro: {
    name: "Pro",
    postsPerMonth: 30,
    imageGenerationEnabled: true,
    customApiKeyEnabled: false,
    calendarEnabled: true,
    hasImageGeneration: true,
    price: 29
  },
  proPlus: {
    name: "Pro Plus",
    postsPerMonth: 150,
    imageGenerationEnabled: true,
    customApiKeyEnabled: true,
    calendarEnabled: true,
    hasImageGeneration: true,
    price: 49
  }
};

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);

  // Initialize or load user plan
  useEffect(() => {
    if (user) {
      // Check if user already has a plan stored
      const storedPlan = localStorage.getItem(`plan_${user.id}`);
      
      if (storedPlan) {
        setUserPlan(JSON.parse(storedPlan));
      } else {
        // Default to free plan
        const defaultPlan: UserPlan = {
          planType: "free",
          postsCreated: 0,
          expiresAt: null,
          isActive: true
        };
        
        setUserPlan(defaultPlan);
        localStorage.setItem(`plan_${user.id}`, JSON.stringify(defaultPlan));
      }
    } else {
      setUserPlan(null);
    }
  }, [user]);

  const setPostsCreated = (count: number) => {
    if (!user || !userPlan) return;
    
    const updatedPlan = {
      ...userPlan,
      postsCreated: count
    };
    
    setUserPlan(updatedPlan);
    localStorage.setItem(`plan_${user.id}`, JSON.stringify(updatedPlan));
  };

  const upgradePlan = (planType: PlanType) => {
    if (!user) return;
    
    const newPlan: UserPlan = {
      planType,
      postsCreated: userPlan?.postsCreated || 0,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      isActive: true
    };
    
    setUserPlan(newPlan);
    localStorage.setItem(`plan_${user.id}`, JSON.stringify(newPlan));
  };

  // Calculate remaining posts
  const remainingPosts = userPlan ? Math.max(0, PLANS[userPlan.planType].postsPerMonth - userPlan.postsCreated) : 0;
  
  // Check if user can access calendar
  const canAccessCalendar = userPlan ? PLANS[userPlan.planType].calendarEnabled : false;
  
  // Check if user can use custom API key
  const canUseCustomApiKey = userPlan ? PLANS[userPlan.planType].customApiKeyEnabled : false;
  
  // Check if user can create more posts
  const canCreateMorePosts = remainingPosts > 0;

  return (
    <PlanContext.Provider 
      value={{
        userPlan,
        plans: PLANS,
        remainingPosts,
        canAccessCalendar,
        canUseCustomApiKey,
        canCreateMorePosts,
        setPostsCreated,
        upgradePlan
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
