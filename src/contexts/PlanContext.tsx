
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the plan types
export type PlanType = 'free' | 'basic' | 'pro' | 'proPlus';

interface Plan {
  posts: number;
  images: boolean;
  customKeys: boolean;
  publishing: boolean;
}

interface UserPlan {
  planType: PlanType;
  postsCreated: number;
}

interface Plans {
  [key: string]: {
    name: string;
    postsPerMonth: number;
    hasImageGeneration: boolean;
    hasCustomApiKeys: boolean;
    hasPublishing: boolean;
  };
}

interface PlanContextType {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  postsRemaining: number;
  setPostsRemaining: (count: number) => void;
  postsLimit: number;
  hasImageGeneration: boolean;
  hasCustomApiKeys: boolean;
  hasPublishing: boolean;
  canUseCustomApiKey: boolean;
  canCreateMorePosts: boolean;
  canAccessCalendar: boolean;
  setPostsCreated: (count: number) => void;
  userPlan: UserPlan | null;
  plans: Plans;
  remainingPosts: number;
}

const planLimits = {
  free: { posts: 2, images: false, customKeys: false, publishing: false },
  basic: { posts: 10, images: false, customKeys: false, publishing: true },
  pro: { posts: 30, images: true, customKeys: false, publishing: true },
  proPlus: { posts: 999, images: true, customKeys: true, publishing: true },
};

const defaultPlans: Plans = {
  free: {
    name: "Free",
    postsPerMonth: 2,
    hasImageGeneration: false,
    hasCustomApiKeys: false,
    hasPublishing: false
  },
  basic: {
    name: "Basic",
    postsPerMonth: 10,
    hasImageGeneration: false,
    hasCustomApiKeys: false,
    hasPublishing: true
  },
  pro: {
    name: "Pro",
    postsPerMonth: 30,
    hasImageGeneration: true,
    hasCustomApiKeys: false,
    hasPublishing: true
  },
  proPlus: {
    name: "Pro Plus",
    postsPerMonth: 999,
    hasImageGeneration: true,
    hasCustomApiKeys: true,
    hasPublishing: true
  }
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<PlanType>('free');
  const [postsRemaining, setPostsRemaining] = useState(planLimits.free.posts);
  const [postsCreated, setPostsCreated] = useState(0);

  // Create a userPlan object
  const userPlan: UserPlan = {
    planType: plan,
    postsCreated: postsCreated
  };

  // Update posts remaining when plan changes
  useEffect(() => {
    setPostsRemaining(planLimits[plan]?.posts || 0);
  }, [plan]);

  const canCreateMorePosts = postsRemaining > 0;
  const canAccessCalendar = plan === 'pro' || plan === 'proPlus';
  const canUseCustomApiKey = plan === 'proPlus';
  const remainingPosts = postsRemaining;

  const value = {
    plan,
    setPlan,
    postsRemaining,
    setPostsRemaining,
    postsLimit: planLimits[plan]?.posts || 0,
    hasImageGeneration: planLimits[plan]?.images || false,
    hasCustomApiKeys: planLimits[plan]?.customKeys || false,
    hasPublishing: planLimits[plan]?.publishing || false,
    canUseCustomApiKey,
    canCreateMorePosts,
    canAccessCalendar,
    setPostsCreated,
    userPlan,
    plans: defaultPlans,
    remainingPosts
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export const usePlan = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};
