
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import { HelpCircle, Linkedin, Key, Check, AlertTriangle, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ApiKeySettings from "@/components/ApiKeySettings";
import ModelSelector from "@/components/ModelSelector";

const Settings = () => {
  const { user } = useAuth();
  const { userPlan, upgradePlan, plans, isLoading } = usePlan();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("account");
  
  // API Key state
  const [openAIApiKey, setOpenAIApiKey] = useState("");
  const [apiKeyStatus, setApiKeyStatus] = useState<"valid" | "invalid" | "untested">("untested");
  
  // Account settings state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [contentReminders, setContentReminders] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // LinkedIn settings state
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  
  // Content preferences state
  const [defaultTone, setDefaultTone] = useState("professional");
  const [defaultModel, setDefaultModel] = useState("gpt3.5");
  
  // Load stored API key on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem("openAIApiKey");
    if (storedApiKey) {
      setOpenAIApiKey(storedApiKey);
      setApiKeyStatus("valid");
    }
  }, []);

  const handleSaveAccount = () => {
    // In a real app, this would update the user's account info in the database
    toast({
      title: "Account Updated",
      description: "Your account information has been updated successfully."
    });
  };

  const handleSaveNotifications = () => {
    // In a real app, this would update the user's notification settings in the database
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated successfully."
    });
  };
  
  const handleConnectLinkedIn = () => {
    // In a real app, this would initiate the LinkedIn OAuth flow
    toast({
      title: "LinkedIn Integration",
      description: "LinkedIn authentication is not implemented in this MVP version."
    });
  };
  
  const handleDisconnectLinkedIn = () => {
    setLinkedInConnected(false);
    toast({
      title: "LinkedIn Disconnected",
      description: "Your LinkedIn account has been disconnected."
    });
  };
  
  const handleSaveContentPreferences = () => {
    // In a real app, this would update the user's content preferences in the database
    localStorage.setItem("defaultTone", defaultTone);
    localStorage.setItem("defaultModel", defaultModel);
    
    toast({
      title: "Content Preferences Saved",
      description: "Your content preferences have been updated successfully."
    });
  };

  const handleUpgradePlan = async (planType: "free" | "pro" | "proPlus") => {
    if (isLoading) return;

    try {
      await upgradePlan(planType);
      toast({
        title: "Plan Updated",
        description: `Your plan has been updated to ${plans[planType].name}!`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update your plan. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleApiKeyChange = (key: string) => {
    setOpenAIApiKey(key);
    
    // Basic OpenAI API key validation
    if (key) {
      if (key.startsWith("sk-") && key.length > 20) {
        setApiKeyStatus("valid");
        localStorage.setItem("openAIApiKey", key);
      } else {
        setApiKeyStatus("invalid");
      }
    } else {
      setApiKeyStatus("untested");
    }
  };
  
  const handleApiKeyClear = () => {
    setOpenAIApiKey("");
    setApiKeyStatus("untested");
    localStorage.removeItem("openAIApiKey");
    
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed."
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-5 md:w-[600px]">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* Account Settings Tab */}
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled />
                  <p className="text-xs text-muted-foreground">Your email address cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g., Marketing Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g., Technology" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAccount}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>LinkedIn Integration</CardTitle>
                <CardDescription>
                  Connect your LinkedIn account for publishing posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {linkedInConnected ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Linkedin className="h-5 w-5 text-linkedin-primary" />
                      <div>
                        <p className="font-medium">LinkedIn Connected</p>
                        <p className="text-sm text-muted-foreground">Your account is connected and ready to publish</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleDisconnectLinkedIn}>Disconnect</Button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Connecting your LinkedIn account allows for direct posting and scheduling from ContentScribe
                    </p>
                    <Button className="flex items-center" onClick={handleConnectLinkedIn}>
                      <Linkedin className="mr-2 h-4 w-4" />
                      Connect LinkedIn
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* API Keys Tab */}
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage your API keys for AI services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">OpenAI API Key</h3>
                      <p className="text-sm text-muted-foreground">
                        Used for content generation with models like GPT-3.5 and GPT-4
                      </p>
                    </div>
                    
                    {userPlan && !plans[userPlan.planType].canUseOwnApiKey && (
                      <Badge variant="outline" className="text-amber-600 border-amber-600">Pro+ Required</Badge>
                    )}
                  </div>
                  
                  {userPlan && plans[userPlan.planType].canUseOwnApiKey ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="password"
                          value={openAIApiKey}
                          onChange={(e) => handleApiKeyChange(e.target.value)}
                          placeholder="sk-..."
                          className={`${
                            apiKeyStatus === "valid" ? "border-green-500 pr-10" : 
                            apiKeyStatus === "invalid" ? "border-red-500 pr-10" : ""
                          }`}
                        />
                        {apiKeyStatus === "valid" && (
                          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                        )}
                        {apiKeyStatus === "invalid" && (
                          <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Your API key is stored locally and used only for your content generation
                        </p>
                        
                        {openAIApiKey && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleApiKeyClear}
                            className="text-xs"
                          >
                            Clear Key
                          </Button>
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <Alert variant="outline">
                          <div className="flex items-center">
                            <Sparkles className="h-4 w-4 text-amber-600 mr-2" />
                            <AlertDescription className="text-sm">
                              Using your own API key allows access to premium models like GPT-4 and lets you control usage limits
                            </AlertDescription>
                          </div>
                        </Alert>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm">
                        Upgrade to Pro+ plan to use your own API keys for content generation
                      </p>
                      <Button 
                        className="mt-2" 
                        onClick={() => handleUpgradePlan("proPlus")}
                        disabled={isLoading}
                      >
                        Upgrade to Pro+
                      </Button>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Stable Diffusion API Key</h3>
                      <p className="text-sm text-muted-foreground">
                        Used for image generation in carousel posts
                      </p>
                    </div>
                    
                    <Badge variant="outline" className="text-gray-600">Coming Soon</Badge>
                  </div>
                  
                  <Input placeholder="Coming soon..." disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Current Plan</p>
                      <p className="text-2xl font-bold">
                        {userPlan ? plans[userPlan.planType].name : "Free"}
                      </p>
                    </div>
                    
                    {userPlan && userPlan.planType !== "free" && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {/* Free Plan */}
                  <Card className={`border ${userPlan?.planType === "free" ? "border-linkedin-primary" : ""}`}>
                    <CardHeader className="pb-3">
                      <CardTitle>Free</CardTitle>
                      <CardDescription>Basic access to content tools</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-2xl font-bold">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                      <Separator className="my-4" />
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>2 AI posts per month</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Basic content templates</span>
                        </li>
                        <li className="flex items-center text-muted-foreground">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          <span>Watermark on images</span>
                        </li>
                        <li className="flex items-center text-muted-foreground">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          <span>No publishing features</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {userPlan?.planType === "free" ? (
                        <Button className="w-full" disabled>Current Plan</Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleUpgradePlan("free")}
                          disabled={isLoading}
                        >
                          Downgrade
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                  
                  {/* Pro Plan */}
                  <Card className={`border ${userPlan?.planType === "pro" ? "border-linkedin-primary" : ""}`}>
                    <CardHeader className="pb-3">
                      <CardTitle>Pro</CardTitle>
                      <CardDescription>For serious content creators</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-2xl font-bold">$29<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                      <Separator className="my-4" />
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>30 AI posts per month</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Content calendar access</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Image generation</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>No watermarks</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {userPlan?.planType === "pro" ? (
                        <Button className="w-full" disabled>Current Plan</Button>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => handleUpgradePlan("pro")}
                          disabled={isLoading}
                        >
                          {userPlan?.planType === "proPlus" ? "Downgrade" : "Upgrade"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                  
                  {/* Pro Plus Plan */}
                  <Card className={`border ${userPlan?.planType === "proPlus" ? "border-linkedin-primary" : ""}`}>
                    <CardHeader className="pb-3">
                      <CardTitle>Pro Plus</CardTitle>
                      <CardDescription>Maximum content power</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-2xl font-bold">$49<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                      <Separator className="my-4" />
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Unlimited AI posts</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>All Pro features</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Use your own API keys</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {userPlan?.planType === "proPlus" ? (
                        <Button className="w-full" disabled>Current Plan</Button>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => handleUpgradePlan("proPlus")}
                          disabled={isLoading}
                        >
                          Upgrade
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Manage your payment details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Payment methods will be enabled for paid plans in the full version
                </p>
                <Button disabled>Add Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
                <CardDescription>
                  Set your default content generation preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Default Tone</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${defaultTone === "friendly" ? "bg-linkedin-light border-linkedin-primary" : ""}`}
                      onClick={() => setDefaultTone("friendly")}
                    >
                      <h3 className="font-medium">Friendly</h3>
                      <p className="text-sm text-muted-foreground">Conversational and approachable</p>
                    </div>
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${defaultTone === "professional" ? "bg-linkedin-light border-linkedin-primary" : ""}`}
                      onClick={() => setDefaultTone("professional")}
                    >
                      <h3 className="font-medium">Professional</h3>
                      <p className="text-sm text-muted-foreground">Polished and business-oriented</p>
                    </div>
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${defaultTone === "educational" ? "bg-linkedin-light border-linkedin-primary" : ""}`}
                      onClick={() => setDefaultTone("educational")}
                    >
                      <h3 className="font-medium">Educational</h3>
                      <p className="text-sm text-muted-foreground">Informative and instructional</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Default AI Model</Label>
                  <ModelSelector 
                    value={defaultModel}
                    onChange={setDefaultModel}
                    canUseCustomApiKey={userPlan ? plans[userPlan.planType].canUseOwnApiKey : false}
                    apiKey={openAIApiKey}
                    onApiKeyChange={handleApiKeyChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveContentPreferences}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important account updates via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="content-reminders">Content Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when it's time to post new content
                    </p>
                  </div>
                  <Switch
                    id="content-reminders"
                    checked={contentReminders}
                    onCheckedChange={setContentReminders}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features and special offers
                    </p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
