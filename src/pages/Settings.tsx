import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePlan, PlanType } from "@/contexts/PlanContext";
import ApiKeySettings from "@/components/ApiKeySettings";

const Settings = () => {
  const { userPlan, plans, upgradePlan, canUseCustomApiKey } = usePlan();
  const { toast } = useToast();
  
  // Load profile from localStorage on component mount
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: "John Doe",
      email: "john.doe@example.com",
      jobTitle: "Marketing Manager",
      company: "Acme Inc.",
      industry: "Technology",
    };
  });
  
  // Load notifications settings from localStorage
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('userNotifications');
    return savedNotifications ? JSON.parse(savedNotifications) : {
      emailDigest: true,
      contentSuggestions: true,
      accountAlerts: true,
    };
  });
  
  const [billing, setBilling] = useState({
    plan: userPlan?.planType || "free",
    card: "**** **** **** 4242",
    expiry: "12/25",
  });
  
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
  }, [notifications]);
  
  const updatePlan = (newPlan: PlanType) => {
    upgradePlan(newPlan);
    setBilling(prev => ({ ...prev, plan: newPlan }));
    toast({
      title: "Plan Updated",
      description: `Your plan has been updated to ${plans[newPlan].name}.`,
    });
  };
  
  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    if (!password.current) {
      toast({
        title: "Error",
        description: "Please enter your current password.",
        variant: "destructive",
      });
      return;
    }
    
    if (!password.new) {
      toast({
        title: "Error",
        description: "Please enter a new password.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.new !== password.confirm) {
      toast({
        title: "Error",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API to update the password
    // For now, just show success toast and reset form
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });
    
    // Reset password fields
    setPassword({
      current: "",
      new: "",
      confirm: "",
    });
  };
  
  const handleNotificationChange = (checked: boolean, key: keyof typeof notifications) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: checked };
      // Save to localStorage
      localStorage.setItem('userNotifications', JSON.stringify(updated));
      return updated;
    });
    
    toast({
      title: "Notification Preferences Updated",
      description: `Your ${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase()} preference has been updated.`,
    });
  };

  const handleChangeEmail = () => {
    // This would normally trigger an email verification flow
    toast({
      title: "Verification Email Sent",
      description: `A verification email has been sent to ${profile.email}. Please check your inbox to confirm this change.`,
    });
  };
  
  return (
    <DashboardLayout>
      <div className="container max-w-6xl py-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 md:w-auto w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <form onSubmit={(e) => handleSubmitProfile(e)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                      <Button type="button" variant="outline" onClick={handleChangeEmail}>
                        Verify
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Changing your email requires verification.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input
                      id="job-title"
                      value={profile.jobTitle}
                      onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={profile.industry}
                      onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <form onSubmit={(e) => handleSubmitPassword(e)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={password.current}
                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={password.new}
                      onChange={(e) => setPassword({ ...password, new: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={password.confirm}
                      onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Update Password</Button>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Subscription Plan</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className={`border rounded-lg p-4 ${billing.plan === 'free' ? 'ring-2 ring-primary' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Free</h4>
                    {billing.plan === 'free' && <Badge>Current</Badge>}
                  </div>
                  <p className="text-2xl font-bold mb-2">$0<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <ul className="space-y-2 mb-4 text-sm">
                    <li>• Limited posts per month</li>
                    <li>• Basic content options</li>
                    <li>• Simple scheduling</li>
                  </ul>
                  <Button
                    variant={billing.plan === 'free' ? "outline" : "default"}
                    className="w-full"
                    onClick={() => updatePlan('free')}
                    disabled={billing.plan === 'free'}
                  >
                    {billing.plan === 'free' ? 'Current Plan' : 'Downgrade'}
                  </Button>
                </div>
                
                <div className={`border rounded-lg p-4 ${billing.plan === 'basic' ? 'ring-2 ring-primary' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Basic</h4>
                    {billing.plan === 'basic' && <Badge>Current</Badge>}
                  </div>
                  <p className="text-2xl font-bold mb-2">$10<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <ul className="space-y-2 mb-4 text-sm">
                    <li>• More posts per month</li>
                    <li>• Enhanced content creation</li>
                    <li>• Advanced scheduling</li>
                  </ul>
                  <Button
                    variant={billing.plan === 'basic' ? "outline" : "default"}
                    className="w-full"
                    onClick={() => updatePlan('basic')}
                    disabled={billing.plan === 'basic'}
                  >
                    {billing.plan === 'basic' ? 'Current Plan' : billing.plan === 'free' ? 'Upgrade' : 'Downgrade'}
                  </Button>
                </div>
                
                <div className={`border rounded-lg p-4 ${billing.plan === 'pro' ? 'ring-2 ring-primary' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Pro</h4>
                    {billing.plan === 'pro' && <Badge>Current</Badge>}
                  </div>
                  <p className="text-2xl font-bold mb-2">$29<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <ul className="space-y-2 mb-4 text-sm">
                    <li>• More content creation options</li>
                    <li>• Premium scheduling tools</li>
                    <li>• Calendar view</li>
                  </ul>
                  <Button
                    variant={billing.plan === 'pro' ? "outline" : "default"}
                    className="w-full"
                    onClick={() => updatePlan('pro')}
                    disabled={billing.plan === 'pro'}
                  >
                    {billing.plan === 'pro' ? 'Current Plan' : billing.plan === 'proPlus' ? 'Downgrade' : 'Upgrade'}
                  </Button>
                </div>
                
                <div className={`border rounded-lg p-4 md:col-span-3 ${billing.plan === 'proPlus' ? 'ring-2 ring-primary' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Pro Plus</h4>
                    {billing.plan === 'proPlus' && <Badge>Current</Badge>}
                  </div>
                  <p className="text-2xl font-bold mb-2">$49<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <ul className="space-y-2 text-sm">
                      <li>• Premium content tools</li>
                      <li>• Priority support</li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li>• Custom API key support</li>
                      <li>• Advanced analytics</li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li>• Premium image tools</li>
                      <li>• Calendar scheduling</li>
                    </ul>
                  </div>
                  <Button
                    variant={billing.plan === 'proPlus' ? "outline" : "default"}
                    className="w-full md:w-auto"
                    onClick={() => updatePlan('proPlus')}
                    disabled={billing.plan === 'proPlus'}
                  >
                    {billing.plan === 'proPlus' ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Payment Method</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                      <span className="text-xs font-medium">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium">**** **** **** 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
                <Separator />
                <div className="pt-2">
                  <Button variant="outline" size="sm">Add Payment Method</Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Billing History</h3>
              <div className="text-center py-8 text-muted-foreground">
                <p>No billing history available.</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">API Keys</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-api-key">OpenAI API Key</Label>
                  <Input
                    id="openai-api-key"
                    type="password"
                    placeholder="sk-..."
                    value={localStorage.getItem("openAIApiKey") || ""}
                    onChange={(e) => {
                      localStorage.setItem("openAIApiKey", e.target.value);
                      toast({
                        title: "API Key Updated",
                        description: "Your OpenAI API key has been updated.",
                      });
                    }}
                  />
                  <p className="text-xs text-gray-500">
                    Used for content generation and image creation. Your key is stored locally
                    and never sent to our servers.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-digest">Weekly Email Digest</Label>
                    <p className="text-sm text-muted-foreground">Get a summary of your content performance</p>
                  </div>
                  <Switch
                    id="email-digest"
                    checked={notifications.emailDigest}
                    onCheckedChange={(checked) => handleNotificationChange(checked, 'emailDigest')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="content-suggestions">Content Suggestions</Label>
                    <p className="text-sm text-muted-foreground">Receive personalized content ideas based on your industry</p>
                  </div>
                  <Switch
                    id="content-suggestions"
                    checked={notifications.contentSuggestions}
                    onCheckedChange={(checked) => handleNotificationChange(checked, 'contentSuggestions')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="account-alerts">Account Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about important account updates</p>
                  </div>
                  <Switch
                    id="account-alerts"
                    checked={notifications.accountAlerts}
                    onCheckedChange={(checked) => handleNotificationChange(checked, 'accountAlerts')}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button>Save Preferences</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
