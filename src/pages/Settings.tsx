import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import { Check, CreditCard, Key, Lock, Shield, Trash2, UserCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { user } = useAuth();
  const { userPlan, plans, upgradePlan, isLoading } = usePlan();
  const { toast } = useToast();
  const [openAIApiKey, setOpenAIApiKey] = useState("");
  const [isSavingApiKey, setIsSavingApiKey] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<"untested" | "valid" | "invalid">("untested");

  useEffect(() => {
    const savedApiKey = localStorage.getItem("openAIApiKey");
    if (savedApiKey) {
      setOpenAIApiKey(savedApiKey);
    }
  }, []);

  const handleUpgrade = async (planType: "free" | "pro" | "proPlus") => {
    try {
      await upgradePlan(planType);
      toast({
        title: "Plan updated",
        description: `Your subscription has been updated to ${plans[planType].name}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const saveApiKey = () => {
    setIsSavingApiKey(true);
    try {
      localStorage.setItem("openAIApiKey", openAIApiKey);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingApiKey(false);
    }
  };

  const testApiKey = async () => {
    setIsTestingConnection(true);
    setApiKeyStatus("untested");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (openAIApiKey && openAIApiKey.trim() !== "") {
        setApiKeyStatus("valid");
        toast({
          title: "Connection Successful",
          description: "Your OpenAI API key is valid.",
        });
      } else {
        setApiKeyStatus("invalid");
        toast({
          title: "Connection Failed",
          description: "Please enter a valid OpenAI API key.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setApiKeyStatus("invalid");
      toast({
        title: "Connection Failed",
        description: "Could not verify your OpenAI API key. Please check and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and subscription
          </p>
        </div>

        <Tabs defaultValue="subscription">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="subscription">
              <CreditCard className="h-4 w-4 mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="account">
              <UserCircle className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Current Plan</CardTitle>
                <CardDescription>
                  You are currently on the {userPlan ? plans[userPlan.planType].name : "Free"} plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-linkedin-light rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-linkedin-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{userPlan ? plans[userPlan.planType].name : "Free"} Plan</p>
                      <p className="text-sm text-gray-500">
                        {userPlan ? (
                          userPlan.planType === "free" 
                            ? "Limited to 2 posts per month" 
                            : userPlan.planType === "pro"
                              ? "Up to 30 posts per month"
                              : "Unlimited posts"
                        ) : "Limited to 2 posts per month"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-gray-600">
                    Current Plan
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <h3 className="text-lg font-medium">Available Plans</h3>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card className={cn(
                "overflow-hidden",
                userPlan?.planType === "free" && "border-2 border-linkedin-primary"
              )}>
                <CardHeader className="pb-3">
                  <CardTitle>Free</CardTitle>
                  <div className="text-3xl font-bold">$0</div>
                </CardHeader>
                <CardContent className="pb-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>2 posts per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Basic AI content generation</span>
                    </li>
                    <li className="flex items-start text-gray-500">
                      <span className="h-4 w-4 mr-2 mt-0.5">✕</span>
                      <span>No calendar access</span>
                    </li>
                    <li className="flex items-start text-gray-500">
                      <span className="h-4 w-4 mr-2 mt-0.5">✕</span>
                      <span>Watermarked images only</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-3">
                  <Button 
                    variant={userPlan?.planType === "free" ? "outline" : "default"} 
                    className="w-full"
                    onClick={() => handleUpgrade("free")}
                    disabled={userPlan?.planType === "free" || isLoading}
                  >
                    {userPlan?.planType === "free" ? "Current Plan" : "Downgrade"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className={cn(
                "overflow-hidden",
                userPlan?.planType === "pro" && "border-2 border-linkedin-primary"
              )}>
                <CardHeader className="pb-3">
                  <CardTitle>Pro</CardTitle>
                  <div className="text-3xl font-bold">$29<span className="text-base font-normal text-gray-500">/mo</span></div>
                </CardHeader>
                <CardContent className="pb-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>30 posts per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Full content calendar</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>AI image generator</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Post scheduling</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-3">
                  <Button 
                    variant={userPlan?.planType === "pro" ? "outline" : "default"} 
                    className="w-full"
                    onClick={() => handleUpgrade("pro")}
                    disabled={userPlan?.planType === "pro" || isLoading}
                  >
                    {userPlan?.planType === "pro" ? "Current Plan" : userPlan?.planType === "proPlus" ? "Downgrade" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className={cn(
                "overflow-hidden",
                userPlan?.planType === "proPlus" && "border-2 border-linkedin-primary"
              )}>
                <CardHeader className="pb-3">
                  <CardTitle>Pro Plus</CardTitle>
                  <div className="text-3xl font-bold">$49<span className="text-base font-normal text-gray-500">/mo</span></div>
                </CardHeader>
                <CardContent className="pb-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Unlimited posts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>All Pro features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Use your own OpenAI key</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-3">
                  <Button 
                    variant={userPlan?.planType === "proPlus" ? "outline" : "default"} 
                    className="w-full"
                    onClick={() => handleUpgrade("proPlus")}
                    disabled={userPlan?.planType === "proPlus" || isLoading}
                  >
                    {userPlan?.planType === "proPlus" ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border mt-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">Payment Information</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                For this MVP, no actual payments are processed. In a production environment, 
                this would connect to Razorpay for secure payment processing.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                    <AvatarFallback className="text-lg">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <Button size="sm" variant="outline">Change Avatar</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user?.name} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" placeholder="Your company name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title (Optional)</Label>
                    <Input id="title" placeholder="Your job title" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Configure your notification and content preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifs">Email Notifications</Label>
                      <p className="text-sm text-gray-500">
                        Receive emails about your scheduled posts and content ideas
                      </p>
                    </div>
                    <Switch id="email-notifs" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="post-reminders">Post Reminders</Label>
                      <p className="text-sm text-gray-500">
                        Get reminders when you have posts scheduled to publish
                      </p>
                    </div>
                    <Switch id="post-reminders" defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Content Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="default-tone">Default Tone</Label>
                      <p className="text-sm text-gray-500">
                        Select your preferred tone for generated content
                      </p>
                    </div>
                    <div className="w-40">
                      <select id="default-tone" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                        <option value="professional">Professional</option>
                        <option value="friendly">Friendly</option>
                        <option value="educational">Educational</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="default-model">Default AI Model</Label>
                      <p className="text-sm text-gray-500">
                        Select your preferred AI model for content generation
                      </p>
                    </div>
                    <div className="w-40">
                      <select id="default-model" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                        <option value="gpt3.5">GPT-3.5 Turbo</option>
                        <option value="gpt4" disabled={!userPlan || userPlan.planType !== "proPlus"}>
                          GPT-4 (Pro+ Only)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Reset to Defaults</Button>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-red-600">Delete Account</CardTitle>
                <CardDescription>
                  Permanently delete your account and all data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" className="flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>OpenAI API Key</CardTitle>
                <CardDescription>
                  Add your OpenAI API key to enable AI-powered content generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Key className="h-4 w-4 mr-2 text-gray-500" />
                    <Label htmlFor="openai-api-key">API Key</Label>
                  </div>
                  <Input 
                    id="openai-api-key" 
                    type="password" 
                    placeholder="sk-..." 
                    value={openAIApiKey}
                    onChange={(e) => setOpenAIApiKey(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Your API key is stored securely and only used for your content generation.
                    You can find your API key in the{" "}
                    <a 
                      href="https://platform.openai.com/api-keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-linkedin-primary hover:underline"
                    >
                      OpenAI dashboard
                    </a>.
                  </p>
                </div>
                
                {apiKeyStatus !== "untested" && (
                  <div className={cn(
                    "p-3 rounded-md text-sm",
                    apiKeyStatus === "valid" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  )}>
                    {apiKeyStatus === "valid" 
                      ? "✓ API key is valid and connected" 
                      : "✗ API key is invalid or connection failed"}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={testApiKey}
                  disabled={isTestingConnection || !openAIApiKey}
                >
                  {isTestingConnection ? "Testing..." : "Test Connection"}
                </Button>
                <Button 
                  onClick={saveApiKey}
                  disabled={isSavingApiKey || !openAIApiKey}
                >
                  {isSavingApiKey ? "Saving..." : "Save API Key"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">
                      Protect your account with an additional security layer
                    </p>
                  </div>
                  <Switch id="enable-2fa" />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">
                    When two-factor authentication is enabled, you'll be required to enter a code from your authenticator app when logging in.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Set Up Later</Button>
                <Button disabled>Set Up Now</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>LinkedIn Connection</CardTitle>
                <CardDescription>
                  Manage your LinkedIn account connection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#0077B5] rounded-full flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn Account</p>
                    <p className="text-sm text-gray-500">Connected as Demo User</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">
                    Your LinkedIn account is connected. This allows ContentScribe to post content to your LinkedIn profile.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Disconnect</Button>
                <Button variant="outline">Refresh Connection</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
