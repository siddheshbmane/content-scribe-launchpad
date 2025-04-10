
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // User information
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  
  // Content preferences
  const [contentGoal, setContentGoal] = useState('build_authority');
  const [audienceType, setAudienceType] = useState('');
  const [tone, setTone] = useState('professional');
  
  const handleNextStep = () => {
    // Validate current step
    if (step === 1 && (!jobTitle || !industry)) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields to continue.',
        variant: 'destructive',
      });
      return;
    }
    
    if (step === 2 && (!contentGoal || !audienceType)) {
      toast({
        title: 'Missing information',
        description: 'Please select your content goals and target audience.',
        variant: 'destructive',
      });
      return;
    }
    
    // Move to next step
    setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Save preferences to localStorage for MVP
      // In a real app, these would be saved to a database
      localStorage.setItem('userJobTitle', jobTitle);
      localStorage.setItem('userIndustry', industry);
      localStorage.setItem('contentGoal', contentGoal);
      localStorage.setItem('audienceType', audienceType);
      localStorage.setItem('defaultTone', tone);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Setup complete!',
        description: 'Your preferences have been saved.',
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save your preferences. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-linkedin-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">CS</span>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {step === 1 && 'Welcome to ContentScribe!'}
                  {step === 2 && 'Content Strategy'}
                  {step === 3 && 'Almost Done!'}
                </CardTitle>
                <CardDescription>
                  {step === 1 && 'Let\'s get to know you better'}
                  {step === 2 && 'Tell us about your content goals'}
                  {step === 3 && 'Set your content tone preferences'}
                </CardDescription>
              </div>
              <div className="flex items-center justify-center h-8 w-8 bg-gray-100 rounded-full">
                <span className="text-sm font-medium">{step}/3</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Step 1: Professional Information */}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input
                    id="job-title"
                    placeholder="e.g., Marketing Manager, Freelance Designer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {/* Step 2: Content Goals */}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label>What's your main goal for LinkedIn content?</Label>
                  <RadioGroup value={contentGoal} onValueChange={setContentGoal} className="space-y-2">
                    <div className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="build_authority" id="build_authority" />
                      <Label htmlFor="build_authority" className="cursor-pointer">Build thought leadership</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="generate_leads" id="generate_leads" />
                      <Label htmlFor="generate_leads" className="cursor-pointer">Generate leads for my business</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="career_growth" id="career_growth" />
                      <Label htmlFor="career_growth" className="cursor-pointer">Advance my career</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="networking" id="networking" />
                      <Label htmlFor="networking" className="cursor-pointer">Grow my professional network</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="audience-type">Who is your target audience?</Label>
                  <Select value={audienceType} onValueChange={setAudienceType}>
                    <SelectTrigger id="audience-type">
                      <SelectValue placeholder="Select your target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decision_makers">Decision Makers & Executives</SelectItem>
                      <SelectItem value="industry_peers">Industry Peers & Colleagues</SelectItem>
                      <SelectItem value="customers">Potential Customers</SelectItem>
                      <SelectItem value="recruiters">Recruiters & Hiring Managers</SelectItem>
                      <SelectItem value="general">General Professional Audience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {/* Step 3: Content Tone */}
            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label>What tone would you like for your content?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      className={`border p-4 rounded-md cursor-pointer ${tone === 'professional' ? 'bg-linkedin-light border-linkedin-primary' : 'hover:bg-gray-50'}`}
                      onClick={() => setTone('professional')}
                    >
                      <h3 className="font-medium mb-1">Professional</h3>
                      <p className="text-sm text-gray-500">Polished, authoritative, business-focused</p>
                    </div>
                    <div 
                      className={`border p-4 rounded-md cursor-pointer ${tone === 'friendly' ? 'bg-linkedin-light border-linkedin-primary' : 'hover:bg-gray-50'}`}
                      onClick={() => setTone('friendly')}
                    >
                      <h3 className="font-medium mb-1">Friendly</h3>
                      <p className="text-sm text-gray-500">Warm, conversational, approachable</p>
                    </div>
                    <div 
                      className={`border p-4 rounded-md cursor-pointer ${tone === 'educational' ? 'bg-linkedin-light border-linkedin-primary' : 'hover:bg-gray-50'}`}
                      onClick={() => setTone('educational')}
                    >
                      <h3 className="font-medium mb-1">Educational</h3>
                      <p className="text-sm text-gray-500">Informative, instructional, detailed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-md border">
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 text-linkedin-primary mr-2" />
                    <p className="font-medium">Ready to create your first post!</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    We'll use your preferences to generate personalized LinkedIn content that matches your professional goals.
                  </p>
                </div>
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            ) : (
              <div></div> // Empty div for spacing
            )}
            
            {step < 3 ? (
              <Button onClick={handleNextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  'Get Started'
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
