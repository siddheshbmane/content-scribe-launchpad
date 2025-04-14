
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import OnboardingWizard from "@/components/OnboardingWizard";

const Onboarding = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!isLoading && !user) {
      navigate("/login");
      return;
    }

    // If user has already completed onboarding, redirect to dashboard
    if (!isLoading && user) {
      const hasCompletedOnboarding = localStorage.getItem("user_preferences");
      if (hasCompletedOnboarding) {
        navigate("/dashboard");
      }
      setIsChecking(false);
    }
  }, [user, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-linkedin-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8 pb-4 px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome to ContentScribe</h1>
          <p className="text-gray-600 mt-2">
            Let's set up your account to create engaging LinkedIn content.
          </p>
        </div>
        <OnboardingWizard />
      </div>
    </div>
  );
};

export default Onboarding;
