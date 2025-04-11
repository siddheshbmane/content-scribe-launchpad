
import React, { useState } from "react";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  CreditCard,
  User,
  Settings as SettingsIcon,
  Key,
  Lock,
  BellRing,
  Rocket,
  Check,
  ArrowRight,
  UserPlus,
  Calendar,
  ImagePlus,
  Zap,
  Infinity,
  X
} from "lucide-react";
import ApiKeySettings from "@/components/ApiKeySettings";

const Settings = () => {
  const { user } = useAuth();
  const { userPlan, plans, upgradePlan, canUseCustomApiKey } = usePlan();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro" | "proPlus">(
    userPlan?.planType || "free"
  );

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast.success("Profile updated successfully");
    }, 1500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate password inputs
    if (passwordNew !== passwordConfirm) {
      setIsSubmitting(false);
      toast.error("New passwords do not match");
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setPasswordCurrent("");
      setPasswordNew("");
      setPasswordConfirm("");
      
      toast.success("Password updated successfully");
    }, 1500);
  };

  const handleNotificationUpdate = () => {
    setEmailNotifications(!emailNotifications);
    
    toast.success("Notification preferences updated");
  };

  const handlePlanSelect = (plan: "free" | "pro" | "proPlus") => {
    setSelectedPlan(plan);
  };

  const handlePlanUpgrade = async () => {
    setIsSubmitting(true);
    
    try {
      await upgradePlan(selectedPlan);
      toast.success(`Successfully upgraded to ${plans[selectedPlan].name} plan`);
    } catch (error) {
      toast.error("Failed to upgrade plan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const planFeatures = {
    free: [
      { feature: "2 AI posts per month", available: true },
      { feature: "Basic templates", available: true },
      { feature: "Watermark on images", available: true },
      { feature: "Calendar access", available: false },
      { feature: "Image generation", available: false },
      { feature: "Custom API key", available: false },
    ],
    pro: [
      { feature: "30 AI posts per month", available: true },
      { feature: "All templates", available: true },
      { feature: "No watermarks", available: true },
      { feature: "Calendar access", available: true },
      { feature: "Image generation", available: true },
      { feature: "Custom API key", available: false },
    ],
    proPlus: [
      { feature: "Unlimited AI posts", available: true },
      { feature: "All templates", available: true },
      { feature: "No watermarks", available: true },
      { feature: "Calendar access", available: true },
      { feature: "Image generation", available: true },
      { feature: "Custom API key", available: true },
    ],
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="account" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center">
              <Key className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">API</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <BellRing className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information and email settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself and your professional background"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Update your password and security settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordCurrent}
                      onChange={(e) => setPasswordCurrent(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordNew}
                        onChange={(e) => setPasswordNew(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  You are currently on the {userPlan ? plans[userPlan.planType].name : "Free"} plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <RadioGroup
                    value={selectedPlan}
                    onValueChange={(value) => handlePlanSelect(value as "free" | "pro" | "proPlus")}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className={`relative rounded-md border p-4 ${selectedPlan === "free" ? "border-linkedin-primary bg-linkedin-light/20" : ""}`}>
                      <RadioGroupItem
                        value="free"
                        id="free"
                        className="absolute right-4 top-4"
                      />
                      <div className="mb-4 flex items-center">
                        <div className="mr-2 rounded-full bg-gray-100 p-2">
                          <UserPlus className="h-4 w-4" />
                        </div>
                        <Label htmlFor="free" className="font-semibold">
                          Free Plan
                        </Label>
                      </div>
                      <p className="text-2xl font-bold">$0<span className="text-sm font-normal text-gray-500">/month</span></p>
                      <p className="mt-1 text-sm text-gray-500">Perfect for getting started with LinkedIn content.</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        {planFeatures.free.map((item, i) => (
                          <li key={i} className="flex items-center">
                            {item.available ? (
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                              <X className="mr-2 h-4 w-4 text-gray-300" />
                            )}
                            <span className={!item.available ? "text-gray-400" : ""}>{item.feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`relative rounded-md border p-4 ${selectedPlan === "pro" ? "border-linkedin-primary bg-linkedin-light/20" : ""}`}>
                      <RadioGroupItem
                        value="pro"
                        id="pro"
                        className="absolute right-4 top-4"
                      />
                      <div className="mb-4 flex items-center">
                        <div className="mr-2 rounded-full bg-linkedin-light p-2">
                          <Rocket className="h-4 w-4 text-linkedin-primary" />
                        </div>
                        <Label htmlFor="pro" className="font-semibold">
                          Pro Plan
                        </Label>
                      </div>
                      <p className="text-2xl font-bold">$29<span className="text-sm font-normal text-gray-500">/month</span></p>
                      <p className="mt-1 text-sm text-gray-500">For professionals serious about LinkedIn growth.</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        {planFeatures.pro.map((item, i) => (
                          <li key={i} className="flex items-center">
                            {item.available ? (
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                              <X className="mr-2 h-4 w-4 text-gray-300" />
                            )}
                            <span className={!item.available ? "text-gray-400" : ""}>{item.feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`relative rounded-md border p-4 ${selectedPlan === "proPlus" ? "border-linkedin-primary bg-linkedin-light/20" : ""}`}>
                      <RadioGroupItem
                        value="proPlus"
                        id="proPlus"
                        className="absolute right-4 top-4"
                      />
                      <div className="mb-4 flex items-center">
                        <div className="mr-2 rounded-full bg-purple-100 p-2">
                          <Zap className="h-4 w-4 text-purple-600" />
                        </div>
                        <Label htmlFor="proPlus" className="font-semibold">
                          Pro Plus Plan
                        </Label>
                      </div>
                      <p className="text-2xl font-bold">$49<span className="text-sm font-normal text-gray-500">/month</span></p>
                      <p className="mt-1 text-sm text-gray-500">For power users who want maximum flexibility.</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        {planFeatures.proPlus.map((item, i) => (
                          <li key={i} className="flex items-center">
                            {item.available ? (
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                              <X className="mr-2 h-4 w-4 text-gray-300" />
                            )}
                            <span className={!item.available ? "text-gray-400" : ""}>{item.feature}</span>
                          </li>
                        ))}
                      </ul>
                      {selectedPlan === "proPlus" && (
                        <div className="absolute -top-2 -right-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-2 py-0.5 text-xs font-medium text-white">
                          BEST VALUE
                        </div>
                      )}
                    </div>
                  </RadioGroup>

                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-4 w-4 text-linkedin-primary" />
                      <span>Monthly posts: {selectedPlan === "free" ? "2" : selectedPlan === "pro" ? "30" : "Unlimited"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ImagePlus className="mr-1 h-4 w-4 text-linkedin-primary" />
                      <span>Image generation: {selectedPlan === "free" ? "No" : "Yes"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Lock className="mr-1 h-4 w-4 text-linkedin-primary" />
                      <span>Custom API keys: {selectedPlan === "proPlus" ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col md:flex-row justify-between gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={userPlan?.planType === selectedPlan || isSubmitting}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? "Processing..." : `Upgrade to ${plans[selectedPlan].name}`}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Plan Change</AlertDialogTitle>
                      <AlertDialogDescription>
                        You are about to upgrade to the {plans[selectedPlan].name} Plan for ${plans[selectedPlan].price}/month. This will be charged immediately.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => setTimeout(() => handlePlanUpgrade(), 0)}>
                        Confirm Upgrade
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <p className="text-xs text-muted-foreground">
                  You can cancel or change your plan anytime from this dashboard.
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Add or update your payment method.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-dashed p-6 text-center">
                  <CreditCard className="mx-auto h-8 w-8 text-gray-400" />
                  <h3 className="mt-2 font-medium">No payment method added</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add a payment method to upgrade to a paid plan.
                  </p>
                  <Button className="mt-4">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api" className="space-y-6">
            <ApiKeySettings canUseCustomApiKey={canUseCustomApiKey} />
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your posts and account.
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={handleNotificationUpdate}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="post-reminders">Post Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded when it's time to publish your scheduled posts.
                    </p>
                  </div>
                  <Switch id="post-reminders" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="product-updates">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive news about new features and improvements.
                    </p>
                  </div>
                  <Switch id="product-updates" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
