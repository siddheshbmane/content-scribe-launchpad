
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the plan types
export type PlanType = 'free' | 'basic' | 'pro' | 'proPlus';

interface PlanContextType {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  postsRemaining: number;
  setPostsRemaining: (count: number) => void;
  postsLimit: number;
  hasImageGeneration: boolean;
  hasCustomApiKeys: boolean;
  hasPublishing: boolean;
}

const planLimits = {
  free: { posts: 2, images: false, customKeys: false, publishing: false },
  basic: { posts: 10, images: false, customKeys: false, publishing: true },
  pro: { posts: 30, images: true, customKeys: false, publishing: true },
  proPlus: { posts: 999, images: true, customKeys: true, publishing: true },
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<PlanType>('free');
  const [postsRemaining, setPostsRemaining] = useState(planLimits.free.posts);

  // Update posts remaining when plan changes
  useEffect(() => {
    setPostsRemaining(planLimits[plan]?.posts || 0);
  }, [plan]);

  const value = {
    plan,
    setPlan,
    postsRemaining,
    setPostsRemaining,
    postsLimit: planLimits[plan]?.posts || 0,
    hasImageGeneration: planLimits[plan]?.images || false,
    hasCustomApiKeys: planLimits[plan]?.customKeys || false,
    hasPublishing: planLimits[plan]?.publishing || false,
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
