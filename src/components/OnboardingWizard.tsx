import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CheckCircle2, ChevronRight, Briefcase, Users, FileText } from "lucide-react";

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Entertainment",
  "Real Estate",
  "Non-profit",
  "Other"
];

const OnboardingWizard = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Step 1: Profile information
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || "");
  const [industry, setIndustry] = useState(user?.industry || "");
  
  // Step 2: Content goals
  const [contentGoal, setContentGoal] = useState("brand");
  
  // Step 3: Tone preference
  const [tone, setTone] = useState("professional");
  
  // Step 4: Target audience
  const [audience, setAudience] = useState("professionals");

  const handleNextStep = async () => {
    if (step === 1) {
      // Validate profile info
      if (!jobTitle || !industry) {
        toast.error("Please fill in all fields");
        return;
      }
      
      // Save profile info
      try {
        setLoading(true);
        await updateUserProfile({ jobTitle, industry });
        setLoading(false);
        // Proceed to next step after successful update
        setStep(step + 1);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to update profile information");
        return;
      }
    } else if (step < 4) {
      // For steps 2 and 3, just proceed to the next step
      setStep(step + 1);
    } else {
      // Final step submission
      setLoading(true);
      
      // Save all preferences
      try {
        // In a real app, this would save to user preferences in DB
        localStorage.setItem("user_preferences", JSON.stringify({
          contentGoal,
          tone,
          audience
        }));
        
        toast.success("Onboarding complete!");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Failed to save preferences");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Tell us about yourself</CardTitle>
              <CardDescription>
                We'll use this information to personalize your content suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </>
        );
      
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">What are your content goals?</CardTitle>
              <CardDescription>
                This helps us tailor content suggestions to your objectives.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={contentGoal} onValueChange={setContentGoal} className="space-y-3">
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${contentGoal === 'brand' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="brand" id="brand" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="brand" className="font-medium">Brand Awareness</Label>
                    <p className="text-sm text-gray-500">Content to increase visibility and recognition of your personal brand</p>
                  </div>
                </div>
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${contentGoal === 'authority' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="authority" id="authority" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="authority" className="font-medium">Thought Leadership</Label>
                    <p className="text-sm text-gray-500">Content to establish yourself as an authority in your field</p>
                  </div>
                </div>
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${contentGoal === 'engagement' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="engagement" id="engagement" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="engagement" className="font-medium">Network Engagement</Label>
                    <p className="text-sm text-gray-500">Content to boost interactions and grow your professional network</p>
                  </div>
                </div>
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${contentGoal === 'leads' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="leads" id="leads" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="leads" className="font-medium">Lead Generation</Label>
                    <p className="text-sm text-gray-500">Content designed to attract potential clients or opportunities</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        );
      
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">What tone do you prefer?</CardTitle>
              <CardDescription>
                Choose the tone that best represents your professional voice.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={tone} onValueChange={setTone} className="space-y-3">
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${tone === 'friendly' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="friendly" id="friendly" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="friendly" className="font-medium">Friendly & Conversational</Label>
                    <p className="text-sm text-gray-500">Warm, approachable content that feels like a conversation</p>
                  </div>
                </div>
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${tone === 'professional' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="professional" id="professional" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="professional" className="font-medium">Professional & Polished</Label>
                    <p className="text-sm text-gray-500">Refined, business-appropriate content with a touch of formality</p>
                  </div>
                </div>
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${tone === 'educational' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="educational" id="educational" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="educational" className="font-medium">Educational & Informative</Label>
                    <p className="text-sm text-gray-500">Clear, instructional content focused on sharing knowledge</p>
                  </div>
                </div>
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${tone === 'bold' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="bold" id="bold" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="bold" className="font-medium">Bold & Provocative</Label>
                    <p className="text-sm text-gray-500">Confident, thought-provoking content that challenges conventions</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        );
      
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Who's your target audience?</CardTitle>
              <CardDescription>
                We'll tailor your content to resonate with your ideal audience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={audience} onValueChange={setAudience} className="space-y-3">
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${audience === 'professionals' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="professionals" id="professionals" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="professionals" className="font-medium">Industry Professionals</Label>
                    <p className="text-sm text-gray-500">Peers and colleagues in your industry</p>
                  </div>
                </div>
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${audience === 'decision-makers' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="decision-makers" id="decision-makers" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="decision-makers" className="font-medium">Decision Makers</Label>
                    <p className="text-sm text-gray-500">Executives, managers, and other key decision makers</p>
                  </div>
                </div>
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${audience === 'clients' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="clients" id="clients" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="clients" className="font-medium">Potential Clients</Label>
                    <p className="text-sm text-gray-500">People who might hire you or your company</p>
                  </div>
                </div>
                <div className={`flex items-start space-x-3 rounded-md border p-3 ${audience === 'general' ? 'bg-linkedin-light/20 border-linkedin-primary' : ''}`}>
                  <RadioGroupItem value="general" id="general" className="mt-1" />
                  <div className="flex flex-col">
                    <Label htmlFor="general" className="font-medium">General Professional Network</Label>
                    <p className="text-sm text-gray-500">A broad professional audience across various industries</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        );
      
      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-linkedin-primary text-white' : 'bg-gray-200'}`}>
            {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : 1}
          </div>
          <div className={`w-12 h-1 ${step > 1 ? 'bg-linkedin-primary' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-linkedin-primary text-white' : 'bg-gray-200'}`}>
            {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : 2}
          </div>
          <div className={`w-12 h-1 ${step > 2 ? 'bg-linkedin-primary' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-linkedin-primary text-white' : 'bg-gray-200'}`}>
            {step > 3 ? <CheckCircle2 className="h-5 w-5" /> : 3}
          </div>
          <div className={`w-12 h-1 ${step > 3 ? 'bg-linkedin-primary' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 4 ? 'bg-linkedin-primary text-white' : 'bg-gray-200'}`}>
            4
          </div>
        </div>
      </div>
    );
  };

  const getStepIcon = () => {
    switch (step) {
      case 1: return <Briefcase className="h-10 w-10 text-linkedin-primary" />;
      case 2: return <FileText className="h-10 w-10 text-linkedin-primary" />;
      case 3: return <Users className="h-10 w-10 text-linkedin-primary" />;
      case 4: return <Users className="h-10 w-10 text-linkedin-primary" />;
      default: return null;
    }
  };

  return (
    <div className="container max-w-md mx-auto py-10">
      <div className="flex justify-center mb-6">
        {getStepIcon()}
      </div>
      
      {renderStepIndicator()}
      
      <Card>
        {renderStep()}
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBackStep}
            disabled={step === 1 || loading}
          >
            Back
          </Button>
          <Button onClick={handleNextStep} disabled={loading}>
            {loading ? (
              "Processing..."
            ) : step === 4 ? (
              "Complete Setup"
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingWizard;
