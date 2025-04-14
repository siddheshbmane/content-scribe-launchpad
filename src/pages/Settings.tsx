
import React, { useState } from "react";
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
  
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    jobTitle: "Marketing Manager",
    company: "Acme Inc.",
    industry: "Technology",
  });
  
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    contentSuggestions: true,
    accountAlerts: true,
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
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast({
        title: "Error",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });
  };
  
  const handleNotificationChange = (checked: boolean, key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: checked }));
    toast({
      title: "Notification Preferences Updated",
      description: `Your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} preference has been updated.`,
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
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
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
                    <li>• {plans.free.postsPerMonth} posts per month</li>
                    <li>• {plans.free.hasImageGeneration ? 'Image generation' : 'No image generation'}</li>
                    <li>• Basic scheduling</li>
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
                    <li>• {plans.basic.postsPerMonth} posts per month</li>
                    <li>• {plans.basic.hasImageGeneration ? 'Image generation' : 'No image generation'}</li>
                    <li>• Basic scheduling</li>
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
                    <li>• {plans.pro.postsPerMonth} posts per month</li>
                    <li>• {plans.pro.hasImageGeneration ? 'Image generation' : 'No image generation'}</li>
                    <li>• Calendar scheduling</li>
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
                      <li>• {plans.proPlus.postsPerMonth} posts per month</li>
                      <li>• Priority support</li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li>• {plans.proPlus.customApiKeyEnabled ? 'Custom API keys' : 'No custom API keys'}</li>
                      <li>• Advanced analytics</li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li>• {plans.proPlus.hasImageGeneration ? 'Image generation' : 'No image generation'}</li>
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
            <ApiKeySettings canUseCustomApiKey={canUseCustomApiKey} />
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
