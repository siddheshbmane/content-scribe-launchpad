
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface UserPlan {
  name: "free" | "pro" | "business";
  postsLimit: number;
  postsCreated: number;
  imageGenerationEnabled: boolean;
  customApiKeyEnabled: boolean;
  calendarEnabled: boolean;
  expiresAt: string | null;
  isActive: boolean;
}

export interface PlanFeatures {
  postsLimit: number;
  imageGenerationEnabled: boolean;
  customApiKeyEnabled: boolean;
  calendarEnabled: boolean;
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
  upgradePlan: (planName: "free" | "pro" | "business") => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLANS: Record<string, PlanFeatures> = {
  free: {
    postsLimit: 5,
    imageGenerationEnabled: false,
    customApiKeyEnabled: false,
    calendarEnabled: false,
    price: 0
  },
  pro: {
    postsLimit: 50,
    imageGenerationEnabled: true,
    customApiKeyEnabled: false,
    calendarEnabled: true,
    price: 29
  },
  business: {
    postsLimit: 150,
    imageGenerationEnabled: true,
    customApiKeyEnabled: true,
    calendarEnabled: true,
    price: 99
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
          name: "free",
          postsLimit: PLANS.free.postsLimit,
          postsCreated: 0,
          imageGenerationEnabled: PLANS.free.imageGenerationEnabled,
          customApiKeyEnabled: PLANS.free.customApiKeyEnabled,
          calendarEnabled: PLANS.free.calendarEnabled,
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

  const upgradePlan = (planName: "free" | "pro" | "business") => {
    if (!user) return;
    
    const newPlan: UserPlan = {
      name: planName,
      postsLimit: PLANS[planName].postsLimit,
      postsCreated: userPlan?.postsCreated || 0,
      imageGenerationEnabled: PLANS[planName].imageGenerationEnabled,
      customApiKeyEnabled: PLANS[planName].customApiKeyEnabled,
      calendarEnabled: PLANS[planName].calendarEnabled,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      isActive: true
    };
    
    setUserPlan(newPlan);
    localStorage.setItem(`plan_${user.id}`, JSON.stringify(newPlan));
  };

  // Calculate remaining posts
  const remainingPosts = userPlan ? Math.max(0, userPlan.postsLimit - userPlan.postsCreated) : 0;
  
  // Check if user can access calendar
  const canAccessCalendar = userPlan?.calendarEnabled || false;
  
  // Check if user can use custom API key
  const canUseCustomApiKey = userPlan?.customApiKeyEnabled || false;
  
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
