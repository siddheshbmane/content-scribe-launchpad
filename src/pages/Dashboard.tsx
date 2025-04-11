
import React, { useState, useEffect } from "react";
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
  Calendar,
  Eye,
  Trash2,
  LayoutGrid
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import ContentGenerator from "@/components/ContentGenerator";
import CarouselGenerator from "@/components/CarouselGenerator";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  date: string;
  status: "draft" | "scheduled" | "published";
  content?: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { userPlan, plans, remainingPosts, canAccessCalendar } = usePlan();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showCarouselGenerator, setShowCarouselGenerator] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [generatorTopic, setGeneratorTopic] = useState("");
  const [generatorType, setGeneratorType] = useState<"single" | "calendar">("single");

  // Load posts from localStorage
  useEffect(() => {
    // Load drafts
    const drafts = JSON.parse(localStorage.getItem('contentDrafts') || '[]');
    
    // Load scheduled posts
    const scheduled = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
    
    // Load published posts
    const published = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
    
    // Combine all posts
    const combined = [...drafts, ...scheduled, ...published];
    
    // Sort by date (newest first)
    combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setAllPosts(combined);
    setFilteredPosts(combined);
  }, []);

  // Apply filter when statusFilter changes
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(allPosts.filter(post => post.status === statusFilter));
    }
  }, [statusFilter, allPosts]);

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

  const handleQuickGenerate = (topic?: string) => {
    if (remainingPosts <= 0) {
      toast({
        title: "Post Limit Reached",
        description: "You've reached your monthly post limit. Please upgrade your plan for more posts.",
        variant: "destructive",
      });
      return;
    }

    // Set topic if provided
    if (topic) {
      setGeneratorTopic(topic);
    } else {
      setGeneratorTopic("");
    }

    setGeneratorType("single");
    setShowGenerator(true);
    setShowCarouselGenerator(false);
  };

  const handleCarouselGenerate = () => {
    if (remainingPosts <= 0) {
      toast({
        title: "Post Limit Reached",
        description: "You've reached your monthly post limit. Please upgrade your plan for more posts.",
        variant: "destructive",
      });
      return;
    }

    setShowCarouselGenerator(true);
    setShowGenerator(false);
  };

  const handleEditPost = (post: Post) => {
    // Implement post editing
    toast({
      title: "Edit Post",
      description: `Editing post: ${post.title}`,
    });

    // In a real app, we would open the post editor with this post loaded
  };

  const handlePreviewPost = (post: Post) => {
    // Implement post preview
    toast({
      title: "Preview Post",
      description: `Previewing post: ${post.title}`,
    });

    // In a real app, we would show a preview modal
  };

  const handleDeletePost = (postId: string) => {
    // Find which list the post is in
    const draft = JSON.parse(localStorage.getItem('contentDrafts') || '[]')
      .filter((p: Post) => p.id !== postId);
    
    const scheduled = JSON.parse(localStorage.getItem('scheduledPosts') || '[]')
      .filter((p: Post) => p.id !== postId);
    
    const published = JSON.parse(localStorage.getItem('publishedPosts') || '[]')
      .filter((p: Post) => p.id !== postId);
    
    // Update localStorage
    localStorage.setItem('contentDrafts', JSON.stringify(draft));
    localStorage.setItem('scheduledPosts', JSON.stringify(scheduled));
    localStorage.setItem('publishedPosts', JSON.stringify(published));
    
    // Update state
    const updatedPosts = allPosts.filter(post => post.id !== postId);
    setAllPosts(updatedPosts);
    
    toast({
      title: "Post Deleted",
      description: "The post has been deleted successfully.",
    });
  };

  const handleSchedulePost = (post: Post) => {
    // Implement post scheduling
    toast({
      title: "Schedule Post",
      description: `Scheduling post: ${post.title}`,
    });

    // In a real app, we would open a scheduling dialog
  };

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleViewAllPosts = () => {
    // In a real app, this would navigate to a dedicated posts page
    toast({
      title: "View All Posts",
      description: "Viewing all posts",
    });
  };

  const handleInsightGeneration = (insightType: string) => {
    let topic = "";
    switch (insightType) {
      case "industry":
        topic = "Industry Insights";
        break;
      case "career":
        topic = "Career Story";
        break;
      case "howto":
        topic = "How-To Guide";
        break;
      case "daylife":
        topic = "Day in the Life";
        break;
      default:
        topic = "";
    }
    
    handleQuickGenerate(topic);
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

  // Get recent posts (up to 3)
  const recentPosts = filteredPosts.slice(0, 3);

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
          <div className="flex flex-wrap gap-2 items-center">
            <Button variant="outline" onClick={() => handleQuickGenerate()}>
              <Plus className="mr-2 h-4 w-4" />
              Quick Post
            </Button>
            <Button variant="outline" onClick={handleCarouselGenerate}>
              <LayoutGrid className="mr-2 h-4 w-4" />
              Carousel
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
          <ContentGenerator 
            onClose={() => setShowGenerator(false)} 
            initialTopic={generatorTopic}
            initialType={generatorType}
          />
        ) : showCarouselGenerator ? (
          <CarouselGenerator 
            onClose={() => setShowCarouselGenerator(false)} 
          />
        ) : (
          <>
            {/* Content Tabs */}
            <Tabs defaultValue="recent">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="recent">Recent Posts</TabsTrigger>
                  <TabsTrigger value="popular">Popular Ideas</TabsTrigger>
                </TabsList>
                
                <Select value={statusFilter} onValueChange={handleFilterChange}>
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
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
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
                              {format(new Date(post.date), 'yyyy-MM-dd')}
                            </span>
                          </div>
                          
                          <h3 className="font-medium text-lg">{post.title}</h3>
                          
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handlePreviewPost(post)}>
                              Preview
                            </Button>
                            {post.status !== "published" && (
                              <Button size="sm" onClick={() => handleSchedulePost(post)}>
                                {post.status === "scheduled" ? "Reschedule" : "Schedule"}
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeletePost(post.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 md:w-48 p-6 flex flex-col justify-center items-center">
                          <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Preview Image</span>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No posts to display. Create your first post!</p>
                    <Button className="mt-4" onClick={() => setShowGenerator(true)}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create Your First Post
                    </Button>
                  </div>
                )}
                
                {filteredPosts.length > 3 && (
                  <Button variant="outline" className="w-full" onClick={handleViewAllPosts}>
                    View All Posts <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
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
                      onClick={() => handleInsightGeneration("industry")}
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
                      onClick={() => handleInsightGeneration("career")}
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
                      onClick={() => handleInsightGeneration("howto")}
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
                      onClick={() => handleInsightGeneration("daylife")}
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
