import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import { Check, Clock, CreditCard, Info, Lock, Settings2, User, Trash2, Shield, Bell, Key } from "lucide-react";
import ApiKeySettings from "@/components/ApiKeySettings";

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { userPlan, plans, canUseCustomApiKey, upgradePlan } = usePlan();
  
  const [openAIKey, setOpenAIKey] = useState("");
  const [savedName, setSavedName] = useState(user?.name || "");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [timezone, setTimezone] = useState("UTC");
  const [isLoading, setIsLoading] = useState(false);
  
  // Load stored API key on mount
  useEffect(() => {
    const storedOpenAIKey = localStorage.getItem("openAIApiKey");
    if (storedOpenAIKey) {
      setOpenAIKey(storedOpenAIKey);
    }
    
    // Load user preferences from localStorage
    const storedPreferences = localStorage.getItem("userPreferences");
    if (storedPreferences) {
      const preferences = JSON.parse(storedPreferences);
      setEmailNotifications(preferences.emailNotifications ?? true);
      setWeeklyDigest(preferences.weeklyDigest ?? true);
      setTimezone(preferences.timezone || "UTC");
    }
  }, []);
  
  const handleProfileUpdate = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSavedName(name);
      localStorage.setItem("userName", name);
      
      toast.success("Profile updated successfully");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleNotificationUpdate = () => {
    setIsLoading(true);
    
    // Save preferences to localStorage
    const preferences = {
      emailNotifications,
      weeklyDigest,
      timezone
    };
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("userPreferences", JSON.stringify(preferences));
      
      toast.success("Notification preferences updated");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success("Account deleted");
        logout();
        navigate("/");
      }, 1500);
    }
  };
  
  const formatPlanPrice = (plan) => {
    if (plan.price === 0) return "Free";
    return `$${plan.price}/month`;
  };
  
  const handleUpgrade = (planType) => {
    setIsLoading(true);
    
    // Simulate payment process
    setTimeout(async () => {
      try {
        await upgradePlan(planType);
        toast.success(`Successfully upgraded to ${plans[planType].name} plan`);
      } catch (error) {
        toast.error("Failed to upgrade plan. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="container p-4 mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="w-full md:w-auto border">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="plan" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center">
              <Key className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">API Keys</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information and email settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email"
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">
                    Your email cannot be changed after registration
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" disabled={isLoading}>Cancel</Button>
                <Button onClick={handleProfileUpdate} disabled={isLoading || name === savedName}>
                  {isLoading ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Permanent account actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="bg-red-50 text-red-800 border-red-200">
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <AlertDescription>
                    Deleting your account will remove all of your content and data. This action cannot be undone.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                >
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about your account activity
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
                    <Label htmlFor="weekly-digest">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of your content performance
                    </p>
                  </div>
                  <Switch 
                    id="weekly-digest" 
                    checked={weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                      <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                      <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                      <SelectItem value="IST">IST (Indian Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleNotificationUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Preferences"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="plan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-card text-card-foreground p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Current Plan: {userPlan ? plans[userPlan.planType].name : "Free"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {userPlan ? `${userPlan.postsCreated} of ${userPlan.postsLimit === Infinity ? 'Unlimited' : userPlan.postsLimit} posts used this month` : ""}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-lg">{userPlan ? formatPlanPrice(plans[userPlan.planType]) : "Free"}</span>
                      {userPlan && userPlan.planType !== "free" && (
                        <Button 
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpgrade("free")}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3 my-6">
                  {Object.values(plans).map((plan) => (
                    <Card key={plan.type} className={`flex flex-col ${userPlan?.planType === plan.type ? 'border-linkedin-primary' : ''}`}>
                      <CardHeader className="pb-3">
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>
                          <div className="mt-1 text-2xl font-bold">
                            ${plan.price}
                            {plan.price > 0 && <span className="text-sm font-normal">/month</span>}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            <span>{plan.postsPerMonth === Infinity ? 'Unlimited' : plan.postsPerMonth} posts per month</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            <span>{plan.hasImageGenerator ? 'Image generation included' : 'No image generation'}</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            <span>{plan.hasCalendarAccess ? 'Content calendar access' : 'Basic scheduling only'}</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            <span>{plan.canUseOwnApiKey ? 'Use your own API keys' : 'Shared API usage'}</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        {userPlan?.planType === plan.type ? (
                          <Button className="w-full" disabled>
                            Current Plan
                          </Button>
                        ) : (
                          <Button 
                            variant={plan.price === 0 ? "outline" : "default"} 
                            className="w-full"
                            onClick={() => handleUpgrade(plan.type)}
                            disabled={isLoading}
                          >
                            {isLoading ? "Processing..." : (plan.price === 0 ? "Downgrade" : "Upgrade")}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Key Settings</CardTitle>
                <CardDescription>
                  Configure external API keys for enhanced functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {!canUseCustomApiKey && (
                  <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                    <Info className="h-4 w-4 text-amber-500" />
                    <AlertDescription>
                      Custom API keys are only available on the Pro Plus plan. <Button variant="link" className="h-auto p-0 text-amber-600" onClick={() => document.querySelector('[data-value="plan"]').click()}>Upgrade your plan</Button> to use your own API keys.
                    </AlertDescription>
                  </Alert>
                )}
                
                <ApiKeySettings
                  serviceName="OpenAI"
                  apiKey={openAIKey}
                  onApiKeyChange={setOpenAIKey}
                  keyPrefix="sk-"
                  minLength={20}
                  description="Required for content generation and AI features"
                  learnMoreUrl="https://platform.openai.com/account/api-keys"
                />
                
              </CardContent>
            </Card>
          </TabsContent>
          
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
