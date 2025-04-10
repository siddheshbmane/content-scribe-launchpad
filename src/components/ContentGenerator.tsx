
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { usePlan } from "@/contexts/PlanContext";
import { X, Sparkles, HelpCircle, Image as ImageIcon, Wand2, Calendar, FileText, Copy, Edit, Loader2 } from "lucide-react";
import ToneSelector from "./ToneSelector";
import ModelSelector from "./ModelSelector";

interface ContentGeneratorProps {
  onClose: () => void;
  initialTopic?: string;
  initialType?: "single" | "calendar";
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ 
  onClose, 
  initialTopic = "", 
  initialType = "single"
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [tone, setTone] = useState("professional");
  const [model, setModel] = useState("gpt3.5");
  const [apiKey, setApiKey] = useState("");
  const [contentType, setContentType] = useState(initialType);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [generatedCalendar, setGeneratedCalendar] = useState<Array<{title: string, content: string}>>([]);
  const [activeTab, setActiveTab] = useState("generate");
  const [imageGenerating, setImageGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { canUseCustomApiKey, canCreateMorePosts, setPostsCreated, userPlan } = usePlan();

  const generateTitle = (input: string) => {
    const titles = [
      `The Ultimate Guide to ${input}`,
      `5 Ways to Master ${input} in 2025`,
      `Why ${input} Is Critical for Your Career Growth`,
      `${input}: What I Wish I Knew When Starting Out`,
      `How to Leverage ${input} for Professional Success`
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const generateCalendarContent = async (topic: string) => {
    // Generate 30 unique posts for a content calendar
    const posts = [];
    
    // Template structures for variety
    const templates = [
      `# ${generateTitle(topic)}\n\nLooking to improve your ${topic} skills? Here's what most people get wrong...\n\nThe secret isn't working harder, it's about working smarter.\n\nI've helped over 100 professionals master ${topic} using these simple techniques:\n\n- Start with the end goal in mind\n- Break down complex problems into manageable steps\n- Measure progress consistently\n\nWant to learn more? Check out my free guide in the comments! 💡\n\n#${topic.replace(/\s+/g, '')} #CareerGrowth #ProfessionalTips`,
      
      `# ${generateTitle(topic)}\n\nDid you know that LinkedIn posts with personal stories get 3x more engagement than purely promotional content?\n\nHere's what I've learned about ${topic} after 5 years in the industry:\n\n1️⃣ The fundamentals never change - focus on providing value first\n2️⃣ Building relationships matters more than vanity metrics\n3️⃣ Consistency beats perfection every single time\n\nWhat's been your experience with ${topic}? Share in the comments below! 👇\n\n#ProfessionalDevelopment #${topic.replace(/\s+/g, '')} #LinkedInTips`,
      
      `# ${generateTitle(topic)}\n\n"The best investment you can make is in yourself" - Warren Buffett\n\nThis quote completely changed how I approach ${topic}.\n\nInstead of looking for quick wins, I started focusing on:\n\n• Continuous learning\n• Building relationships with industry leaders\n• Practicing ${topic} daily, even when it's difficult\n\nThe results? My ${topic} skills have improved 10x in just 6 months.\n\nAre you investing in yourself? 🤔\n\n#${topic.replace(/\s+/g, '')} #SelfImprovement #ProfessionalGrowth`,
      
      `# ${generateTitle(topic)}\n\nI made a huge mistake with ${topic} last year that cost me a major opportunity.\n\nHere's what happened 👇\n\nI assumed that ${topic} was just about technical skills. But I was wrong.\n\nThe psychological aspects are equally important:\n\n• Mindset matters more than tactics\n• Consistency trumps intensity\n• Community support accelerates growth\n\nDon't make the same mistake I did!\n\n#Lessons #${topic.replace(/\s+/g, '')} #CareerAdvice`,
      
      `# ${generateTitle(topic)}\n\nThe ${topic} framework that transformed my career:\n\n1. Identify your unique value proposition\n2. Build a consistent content strategy\n3. Engage authentically with your network\n4. Measure results and adjust accordingly\n5. Repeat daily for 90 days\n\nThis simple process helped me land 3 dream clients and grow my ${topic} skills exponentially.\n\nWhich step do you struggle with most? Comment below!\n\n#${topic.replace(/\s+/g, '')} #CareerStrategy #LinkedInTips`
    ];
    
    // Generate 30 days of content using the templates
    for (let i = 0; i < 30; i++) {
      const templateIndex = i % templates.length;
      
      // Add small variations to make each post unique
      const variations = [
        `Recently`, `This month`, `Last week`, `Just yesterday`,
        `For the past year`, `Throughout my career`,
        `In my experience`, `According to research`,
        `As I've discovered`, `What I've found is that`
      ];
      
      let content = templates[templateIndex];
      
      // Add a unique modifier based on day number
      const dayModifier = variations[i % variations.length];
      content = content.replace(`Here's what`, `${dayModifier}, here's what`);
      
      // Add unique title by adding day number
      const title = generateTitle(`${topic} - Part ${i+1}`);
      
      posts.push({
        title,
        content
      });
    }
    
    return posts;
  };

  const handleGenerate = async () => {
    if (!topic) {
      toast({
        title: "Missing information",
        description: "Please enter a topic for your content.",
        variant: "destructive",
      });
      return;
    }

    if (!canCreateMorePosts) {
      toast({
        title: "Post limit reached",
        description: "You've reached your monthly post limit. Please upgrade your plan.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);
    setGeneratedCalendar([]);

    try {
      // In a real implementation, this would call the OpenAI API
      // Using stored API key from localStorage if available
      const storedApiKey = localStorage.getItem("openAIApiKey") || apiKey;
      
      if (contentType === "single") {
        // Simulate API call to OpenAI
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Placeholder content - in a real implementation this would use the OpenAI API
        const content = `# ${generateTitle(topic)}\n\nDid you know that LinkedIn posts with personal stories get 3x more engagement than purely promotional content?\n\nHere's what I've learned about ${topic} after 5 years in the industry:\n\n1️⃣ The fundamentals never change - focus on providing value first\n2️⃣ Building relationships matters more than vanity metrics\n3️⃣ Consistency beats perfection every single time\n\nWhat's been your experience with ${topic}? Share in the comments below! 👇\n\n#ProfessionalDevelopment #${topic.replace(/\s+/g, '')} #LinkedInTips`;
        
        setGeneratedContent(content);
        
        // Increment posts created count
        if (userPlan) {
          setPostsCreated(userPlan.postsCreated + 1);
        }
      } else {
        // Generate content calendar
        await new Promise(resolve => setTimeout(resolve, 3500));
        
        // Generate 30 unique posts for the calendar
        const calendarPosts = await generateCalendarContent(topic);
        setGeneratedCalendar(calendarPosts);
        
        // Join all posts together for compatibility with existing code
        const allPostsContent = calendarPosts.map(post => post.content).join('\n\n\n');
        setGeneratedContent(allPostsContent);
        
        // Increment posts created count (counts as one creation even though it's multiple posts)
        if (userPlan) {
          setPostsCreated(userPlan.postsCreated + 1);
        }
      }
      
      setActiveTab("preview");
      
      toast({
        title: "Content generated successfully",
        description: contentType === "single" ? "Your LinkedIn post is ready to review!" : "Your content calendar has been created!",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      toast({
        title: "Copied to clipboard",
        description: "Your generated content has been copied to your clipboard.",
      });
    }
  };

  const handleGenerateImage = async () => {
    setImageGenerating(true);
    
    try {
      // Simulate image generation API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, this would call an image generation API
      // For now, just use a placeholder image
      setGeneratedImage("https://placehold.co/600x400/EEE/31343C?text=AI+Generated+Image+for+" + encodeURIComponent(topic));
      
      toast({
        title: "Image generated",
        description: "Your image has been generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Image generation failed",
        description: "There was an error generating your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setImageGenerating(false);
    }
  };

  const handleSaveAsDraft = () => {
    if (!generatedContent) return;
    
    // Get existing drafts or initialize empty array
    const existingDrafts = JSON.parse(localStorage.getItem('contentDrafts') || '[]');
    
    // Create new draft
    const newDraft = {
      id: Date.now().toString(),
      title: topic ? generateTitle(topic) : "Untitled Draft",
      content: generatedContent,
      date: new Date().toISOString(),
      status: "draft"
    };
    
    // Add to drafts and save
    localStorage.setItem('contentDrafts', JSON.stringify([newDraft, ...existingDrafts]));
    
    toast({
      title: "Saved as draft",
      description: "Your content has been saved as a draft!",
    });
    
    onClose();
  };

  const handleSchedulePost = () => {
    if (!generatedContent) return;
    
    // Get existing posts or initialize empty array
    const existingPosts = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
    
    // Schedule date (default to tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Create new scheduled post
    const newPost = {
      id: Date.now().toString(),
      title: topic ? generateTitle(topic) : "Scheduled Post",
      content: generatedContent,
      date: tomorrow.toISOString(),
      status: "scheduled"
    };
    
    // Add to scheduled posts and save
    localStorage.setItem('scheduledPosts', JSON.stringify([newPost, ...existingPosts]));
    
    toast({
      title: "Post scheduled",
      description: "Your content has been scheduled for tomorrow!",
    });
    
    onClose();
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('#')) {
        return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{line.replace('# ', '')}</h3>;
      } else if (line.startsWith('##')) {
        return <h4 key={i} className="text-lg font-bold mt-3 mb-1">{line.replace('## ', '')}</h4>;
      } else if (line.match(/^\d️⃣|\-|\*/)) {
        return <p key={i} className="my-1 ml-4">{line}</p>;
      } else if (line.trim() === '') {
        return <br key={i} />;
      } else {
        return <p key={i} className="my-2">{line}</p>;
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-2xl">Content Generator</CardTitle>
          <CardDescription>
            Create engaging LinkedIn content in seconds
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!generatedContent}>
              <FileText className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="generate" className="mt-0">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="topic">
                    Topic or Target Audience
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Example topics: "Leadership in tech", "Career development for marketers", "Trends in fintech"</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="topic"
                  placeholder="e.g., Digital Marketing, Leadership, Industry Insights"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Content Type</Label>
                <RadioGroup defaultValue="single" value={contentType} onValueChange={(value) => setContentType(value as "single" | "calendar")} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single" className="cursor-pointer">Single Post</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="calendar" id="calendar" />
                    <Label htmlFor="calendar" className="cursor-pointer">Generate Calendar (30 days)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <ToneSelector value={tone} onChange={setTone} />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>AI Model</Label>
                  {!canUseCustomApiKey && (
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700">
                      Pro+ Upgrade Required for Custom API Key
                    </span>
                  )}
                </div>
                <ModelSelector 
                  value={model} 
                  onChange={setModel} 
                  canUseCustomApiKey={canUseCustomApiKey}
                  apiKey={apiKey}
                  onApiKeyChange={setApiKey}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between px-6 py-4 border-t">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !topic}
              className="flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          <CardContent className="p-6">
            {generatedContent && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Generated Content</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("generate")}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="prose max-w-none">
                    {contentType === "single" ? (
                      formatContent(generatedContent)
                    ) : (
                      <div className="space-y-8">
                        {generatedContent.split('\n\n\n').map((post, i) => (
                          <div key={i} className="bg-white p-4 rounded-md border">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-500 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                              </span>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                            <Separator className="my-2" />
                            {formatContent(post)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-linkedin-light p-4 rounded-lg">
                  <div className="flex items-center">
                    <ImageIcon className="h-10 w-10 text-linkedin-primary p-2 bg-white rounded-full mr-3" />
                    <div>
                      <h4 className="font-medium">Generate Images</h4>
                      <p className="text-sm text-gray-600">Create carousel images for your post</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={handleGenerateImage}
                    disabled={imageGenerating}
                  >
                    {imageGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Images"
                    )}
                  </Button>
                </div>
                
                {generatedImage && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Generated Image</h4>
                    <div className="bg-white p-2 border rounded-lg">
                      <img 
                        src={generatedImage} 
                        alt="AI generated" 
                        className="w-full h-auto rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between px-6 py-4 border-t">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSaveAsDraft}>
                Save as Draft
              </Button>
              <Button onClick={handleSchedulePost}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Post
              </Button>
            </div>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ContentGenerator;
