
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle2 } from "lucide-react";

const industries = [
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Real Estate",
  "Media",
  "Hospitality",
  "Other"
];

const OnboardingWizard = () => {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [contentGoal, setContentGoal] = useState("");
  const [postFrequency, setPostFrequency] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && (!jobTitle || !industry)) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !contentGoal) {
      toast({
        title: "Missing information",
        description: "Please select a content goal to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 3 && !postFrequency) {
      toast({
        title: "Missing information",
        description: "Please select a posting frequency to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    
    try {
      // Update user profile with job title and industry
      if (user) {
        await updateUserProfile({
          jobTitle,
          industry,
        });
      }
      
      // Save preferences to localStorage
      const preferences = {
        jobTitle,
        industry,
        contentGoal,
        postFrequency,
        completed: true,
        completedAt: new Date().toISOString()
      };
      
      localStorage.setItem("user_preferences", JSON.stringify(preferences));
      
      toast({
        title: "Onboarding complete!",
        description: "Your preferences have been saved.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Step {step} of 3</div>
            <div className="flex space-x-1">
              {[1, 2, 3].map(i => (
                <div 
                  key={i}
                  className={`h-2 w-12 rounded-full ${
                    i <= step ? "bg-linkedin-primary" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Tell us about yourself</h2>
              <p className="text-gray-600 text-sm">
                This information helps us personalize your content suggestions.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Marketing Manager"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">What's your LinkedIn goal?</h2>
              <p className="text-gray-600 text-sm">
                We'll customize your content strategy based on your objectives.
              </p>
            </div>
            
            <RadioGroup value={contentGoal} onValueChange={setContentGoal}>
              <div className="space-y-3">
                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  contentGoal === "brand" ? "border-linkedin-primary bg-linkedin-light" : "hover:bg-gray-50"
                }`}>
                  <RadioGroupItem value="brand" id="goal-brand" className="sr-only" />
                  <Label htmlFor="goal-brand" className="flex items-start cursor-pointer">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                      contentGoal === "brand" ? "border-linkedin-primary" : "border-gray-300"
                    }`}>
                      {contentGoal === "brand" && (
                        <CheckCircle2 className="h-4 w-4 text-linkedin-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Build Personal Brand</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Establish yourself as a thought leader in your industry
                      </div>
                    </div>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  contentGoal === "leads" ? "border-linkedin-primary bg-linkedin-light" : "hover:bg-gray-50"
                }`}>
                  <RadioGroupItem value="leads" id="goal-leads" className="sr-only" />
                  <Label htmlFor="goal-leads" className="flex items-start cursor-pointer">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                      contentGoal === "leads" ? "border-linkedin-primary" : "border-gray-300"
                    }`}>
                      {contentGoal === "leads" && (
                        <CheckCircle2 className="h-4 w-4 text-linkedin-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Generate Leads & Opportunities</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Create content that attracts potential clients or employers
                      </div>
                    </div>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  contentGoal === "network" ? "border-linkedin-primary bg-linkedin-light" : "hover:bg-gray-50"
                }`}>
                  <RadioGroupItem value="network" id="goal-network" className="sr-only" />
                  <Label htmlFor="goal-network" className="flex items-start cursor-pointer">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                      contentGoal === "network" ? "border-linkedin-primary" : "border-gray-300"
                    }`}>
                      {contentGoal === "network" && (
                        <CheckCircle2 className="h-4 w-4 text-linkedin-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Grow My Network</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Expand your connections and engage with your community
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">How often do you want to post?</h2>
              <p className="text-gray-600 text-sm">
                We'll help you maintain this schedule with content suggestions.
              </p>
            </div>
            
            <RadioGroup value={postFrequency} onValueChange={setPostFrequency}>
              <div className="space-y-3">
                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  postFrequency === "daily" ? "border-linkedin-primary bg-linkedin-light" : "hover:bg-gray-50"
                }`}>
                  <RadioGroupItem value="daily" id="freq-daily" className="sr-only" />
                  <Label htmlFor="freq-daily" className="flex items-start cursor-pointer">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                      postFrequency === "daily" ? "border-linkedin-primary" : "border-gray-300"
                    }`}>
                      {postFrequency === "daily" && (
                        <CheckCircle2 className="h-4 w-4 text-linkedin-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Daily (5-7 posts per week)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Maximum visibility and growth
                      </div>
                    </div>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  postFrequency === "regular" ? "border-linkedin-primary bg-linkedin-light" : "hover:bg-gray-50"
                }`}>
                  <RadioGroupItem value="regular" id="freq-regular" className="sr-only" />
                  <Label htmlFor="freq-regular" className="flex items-start cursor-pointer">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                      postFrequency === "regular" ? "border-linkedin-primary" : "border-gray-300"
                    }`}>
                      {postFrequency === "regular" && (
                        <CheckCircle2 className="h-4 w-4 text-linkedin-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Regular (2-3 posts per week)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Balanced consistency without overwhelm
                      </div>
                    </div>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  postFrequency === "occasional" ? "border-linkedin-primary bg-linkedin-light" : "hover:bg-gray-50"
                }`}>
                  <RadioGroupItem value="occasional" id="freq-occasional" className="sr-only" />
                  <Label htmlFor="freq-occasional" className="flex items-start cursor-pointer">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                      postFrequency === "occasional" ? "border-linkedin-primary" : "border-gray-300"
                    }`}>
                      {postFrequency === "occasional" && (
                        <CheckCircle2 className="h-4 w-4 text-linkedin-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Occasional (1 post per week)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Quality over quantity approach
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}
        
        <div className="flex justify-between pt-6 mt-8 border-t">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button onClick={handleNext} disabled={isSubmitting}>
            {step < 3 ? (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : isSubmitting ? (
              "Saving..."
            ) : (
              "Complete Setup"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingWizard;
