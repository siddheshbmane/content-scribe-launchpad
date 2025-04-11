
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, ChevronLeft, Check, UserCircle2, Target, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const industries = [
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Consulting",
  "Entertainment",
  "Legal",
  "Nonprofit",
  "Other"
];

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    jobTitle: "",
    industry: "",
    tone: "professional",
    primaryGoal: "brand",
    targetAudience: "professionals"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Save preferences
      localStorage.setItem("userProfile", JSON.stringify(formData));
      localStorage.setItem("defaultTone", formData.tone);
      localStorage.setItem("hasCompletedOnboarding", "true");
      
      toast({
        title: "Profile Complete!",
        description: "Your preferences have been saved. Let's get started with your content!"
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Unable to save your preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1 && (!formData.name || !formData.jobTitle || !formData.industry)) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields before continuing.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Progress indicator
  const renderProgress = () => {
    return (
      <div className="flex items-center justify-between w-full max-w-xs mx-auto mb-8">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step < currentStep ? 'bg-green-500 text-white' :
                step === currentStep ? 'bg-linkedin-primary text-white' : 
                'bg-gray-200 text-gray-500'
              }`}
            >
              {step < currentStep ? <Check className="h-5 w-5" /> : step}
            </div>
            <div className={`text-xs mt-1 ${step === currentStep ? 'text-linkedin-primary font-medium' : 'text-gray-500'}`}>
              {step === 1 ? 'Profile' : step === 2 ? 'Preferences' : 'Goals'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-linkedin-primary text-white mb-4">
            <UserCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">Set up your profile</h2>
          <p className="text-gray-600 mt-1">Let's personalize your experience</p>
        </div>

        {renderProgress()}

        <div className="bg-white shadow-md rounded-lg p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input 
                  id="jobTitle" 
                  name="jobTitle" 
                  value={formData.jobTitle} 
                  onChange={handleInputChange} 
                  placeholder="Marketing Manager"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select 
                  value={formData.industry} 
                  onValueChange={handleSelectChange("industry")}
                >
                  <SelectTrigger id="industry" className="mt-1">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base">Content Tone</Label>
                <p className="text-sm text-gray-500 mb-3">How do you want your content to sound?</p>
                
                <RadioGroup value={formData.tone} onValueChange={handleSelectChange("tone")} className="gap-2">
                  <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="friendly" id="tone-friendly" />
                    <Label htmlFor="tone-friendly" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium">Friendly & Casual</span>
                      <p className="text-sm text-gray-500">Conversational, approachable, uses simple language</p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="professional" id="tone-professional" />
                    <Label htmlFor="tone-professional" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium">Professional & Polished</span>
                      <p className="text-sm text-gray-500">Clear, authoritative, industry-appropriate</p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="educational" id="tone-educational" />
                    <Label htmlFor="tone-educational" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium">Educational & Informative</span>
                      <p className="text-sm text-gray-500">Explanatory, detailed, fact-based approach</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base">Primary Goal</Label>
                <p className="text-sm text-gray-500 mb-3">What are you trying to accomplish?</p>
                
                <RadioGroup value={formData.primaryGoal} onValueChange={handleSelectChange("primaryGoal")} className="gap-2">
                  <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="brand" id="goal-brand" />
                    <Label htmlFor="goal-brand" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium">Build Personal Brand</span>
                      <p className="text-sm text-gray-500">Establish yourself as a thought leader</p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="leads" id="goal-leads" />
                    <Label htmlFor="goal-leads" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium">Generate Leads</span>
                      <p className="text-sm text-gray-500">Attract potential clients and opportunities</p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="network" id="goal-network" />
                    <Label htmlFor="goal-network" className="font-normal cursor-pointer flex-1">
                      <span className="font-medium">Grow Network</span>
                      <p className="text-sm text-gray-500">Connect with more industry professionals</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label className="text-base">Target Audience</Label>
                <p className="text-sm text-gray-500 mb-3">Who are you creating content for?</p>
                
                <Select 
                  value={formData.targetAudience} 
                  onValueChange={handleSelectChange("targetAudience")}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professionals">Industry Professionals</SelectItem>
                    <SelectItem value="clients">Potential Clients</SelectItem>
                    <SelectItem value="employers">Potential Employers</SelectItem>
                    <SelectItem value="general">General Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
