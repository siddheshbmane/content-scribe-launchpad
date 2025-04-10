
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import { 
  CalendarDays, 
  Sparkles, 
  ChevronRight, 
  BarChart3, 
  Users, 
  Zap, 
  Image as ImageIcon,
  Clock,
  Plus,
  Calendar 
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import ContentGenerator from "@/components/ContentGenerator";

const Dashboard = () => {
  const { user } = useAuth();
  const { userPlan, plans, remainingPosts, canAccessCalendar } = usePlan();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleCreateCalendar = () => {
    if (canAccessCalendar) {
      navigate("/calendar");
    } else {
      toast({
        title: "Upgrade Required",
        description: "Calendar access requires a Pro or Pro Plus plan.",
        variant: "destructive",
      });
    }
  };

  const handleQuickGenerate = () => {
    if (remainingPosts <= 0) {
      toast({
        title: "Post Limit Reached",
        description: "You've reached your monthly post limit. Please upgrade your plan for more posts.",
        variant: "destructive",
      });
      return;
    }

    setShowGenerator(true);
  };

  const stats = [
    {
      id: 1,
      name: "Posts Created",
      value: userPlan ? userPlan.postsCreated : 0,
      icon: <Sparkles className="h-5 w-5 text-linkedin-primary" />,
    },
    {
      id: 2,
      name: "Posts Remaining",
      value: remainingPosts,
      icon: <Zap className="h-5 w-5 text-linkedin-primary" />,
    },
    {
      id: 3,
      name: "Your Plan",
      value: userPlan ? plans[userPlan.planType].name : "Free",
      icon: <Users className="h-5 w-5 text-linkedin-primary" />,
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: "5 Strategies to Improve Your LinkedIn Engagement",
      date: "2025-04-15",
      status: "scheduled",
    },
    {
      id: 2,
      title: "How I Grew My Network by 500% in 3 Months",
      date: "2025-04-08",
      status: "published",
    },
    {
      id: 3,
      title: "The Future of Remote Work: Trends to Watch",
      date: "2025-04-01",
      status: "draft",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Here's what's happening with your content.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleQuickGenerate}>
              <Plus className="mr-2 h-4 w-4" />
              Quick Post
            </Button>
            <Button onClick={() => setShowGenerator(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Content
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showGenerator ? (
          <ContentGenerator onClose={() => setShowGenerator(false)} />
        ) : (
          <>
            {/* Content Tabs */}
            <Tabs defaultValue="recent">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="recent">Recent Posts</TabsTrigger>
                  <TabsTrigger value="popular">Popular Ideas</TabsTrigger>
                </TabsList>
                
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Posts</SelectItem>
                    <SelectItem value="draft">Drafts</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="recent" className="space-y-4 mt-6">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-6 flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span 
                            className={`px-2 py-1 text-xs rounded-full ${
                              post.status === 'published' ? 'bg-green-100 text-green-800' :
                              post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.date}
                          </span>
                        </div>
                        
                        <h3 className="font-medium text-lg">{post.title}</h3>
                        
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          {post.status !== "published" && (
                            <Button size="sm">
                              {post.status === "scheduled" ? "Reschedule" : "Schedule"}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 md:w-48 p-6 flex flex-col justify-center items-center">
                        <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Preview Image</span>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Posts <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              
              <TabsContent value="popular" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Inspiration</CardTitle>
                    <CardDescription>
                      Generate these popular post types with one click
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <Button
                      variant="outline"
                      className="h-auto p-4 justify-start flex-col items-start text-left space-y-2"
                      onClick={handleQuickGenerate}
                    >
                      <div className="flex items-center w-full">
                        <span className="bg-linkedin-light p-2 rounded-full">
                          <BarChart3 className="h-5 w-5 text-linkedin-primary" />
                        </span>
                        <span className="ml-2 font-medium">Industry Insights</span>
                      </div>
                      <p className="text-sm text-gray-600 font-normal">
                        Share valuable data and trends from your industry to position yourself as a thought leader.
                      </p>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto p-4 justify-start flex-col items-start text-left space-y-2"
                      onClick={handleQuickGenerate}
                    >
                      <div className="flex items-center w-full">
                        <span className="bg-linkedin-light p-2 rounded-full">
                          <Users className="h-5 w-5 text-linkedin-primary" />
                        </span>
                        <span className="ml-2 font-medium">Career Story</span>
                      </div>
                      <p className="text-sm text-gray-600 font-normal">
                        Share your professional journey, challenges and lessons learned to inspire your network.
                      </p>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto p-4 justify-start flex-col items-start text-left space-y-2"
                      onClick={handleQuickGenerate}
                    >
                      <div className="flex items-center w-full">
                        <span className="bg-linkedin-light p-2 rounded-full">
                          <Sparkles className="h-5 w-5 text-linkedin-primary" />
                        </span>
                        <span className="ml-2 font-medium">How-To Guide</span>
                      </div>
                      <p className="text-sm text-gray-600 font-normal">
                        Share step-by-step instructions to solve a common problem in your industry.
                      </p>
                    </Button>
                    
                    <Button
                      variant="outline" 
                      className="h-auto p-4 justify-start flex-col items-start text-left space-y-2"
                      onClick={handleQuickGenerate}
                    >
                      <div className="flex items-center w-full">
                        <span className="bg-linkedin-light p-2 rounded-full">
                          <CalendarDays className="h-5 w-5 text-linkedin-primary" />
                        </span>
                        <span className="ml-2 font-medium">Day in the Life</span>
                      </div>
                      <p className="text-sm text-gray-600 font-normal">
                        Give your network a behind-the-scenes look at your daily routine and work life.
                      </p>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Call to Action Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-linkedin-light border-0">
                <CardHeader>
                  <CardTitle>Create Your Content Calendar</CardTitle>
                  <CardDescription>
                    Plan and schedule your LinkedIn content 30 days in advance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-12 w-12 text-linkedin-primary" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Generate a full month of engaging content tailored to your professional brand.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleCreateCalendar}>
                    {canAccessCalendar ? "View Calendar" : "Upgrade to Access"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade Your Plan</CardTitle>
                  <CardDescription>
                    Get more posts, image generation, and advanced features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Current plan: <span className="font-medium">{userPlan ? plans[userPlan.planType].name : "Free"}</span>
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Posts per month</span>
                      <span className="font-medium">
                        {userPlan ? plans[userPlan.planType].postsPerMonth : 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>AI Image Generator</span>
                      <span>
                        {userPlan && plans[userPlan.planType].hasImageGenerator ? (
                          <span className="text-green-600">Included</span>
                        ) : (
                          <span className="text-gray-500">Not included</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Calendar Access</span>
                      <span>
                        {userPlan && plans[userPlan.planType].hasCalendarAccess ? (
                          <span className="text-green-600">Included</span>
                        ) : (
                          <span className="text-gray-500">Not included</span>
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => navigate("/settings")}>
                    View Plans
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
