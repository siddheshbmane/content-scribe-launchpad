
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon, Loader2, X, Plus, ChevronLeft, ChevronRight, Copy, Download, Wand2 } from "lucide-react";
import { usePlan } from "@/contexts/PlanContext";

interface CarouselSlide {
  id: string;
  imageUrl: string | null;
  caption: string;
  generating: boolean;
}

const carouselTemplates = [
  { id: "tips", name: "5 Tips", slides: 5, prompt: "5 important tips about" },
  { id: "beforeafter", name: "Before vs After", slides: 2, prompt: "Before and after transformation of" },
  { id: "checklist", name: "Checklist", slides: 3, prompt: "Checklist for" },
  { id: "stats", name: "Key Statistics", slides: 4, prompt: "4 key statistics about" },
  { id: "process", name: "Process Steps", slides: 3, prompt: "3 steps to accomplish" }
];

const CarouselGenerator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [topic, setTopic] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("template");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { toast } = useToast();
  const { canGenerateImage } = usePlan();

  const initializeSlides = (count: number) => {
    const newSlides = [];
    for (let i = 0; i < count; i++) {
      newSlides.push({
        id: `slide-${Date.now()}-${i}`,
        imageUrl: null,
        caption: "",
        generating: false
      });
    }
    setSlides(newSlides);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = carouselTemplates.find(t => t.id === templateId);
    if (template) {
      initializeSlides(template.slides);
    }
  };

  const generateCarousel = async () => {
    if (!topic) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your carousel.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTemplate) {
      toast({
        title: "Template Required",
        description: "Please select a template for your carousel.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const template = carouselTemplates.find(t => t.id === selectedTemplate);
      if (!template) throw new Error("Template not found");
      
      // Generate captions for each slide
      const newSlides = [...slides];
      
      for (let i = 0; i < newSlides.length; i++) {
        // Simulate caption generation
        await new Promise(resolve => setTimeout(resolve, 700));
        
        let caption = "";
        const templateType = template.id;
        
        if (templateType === "tips") {
          caption = `Tip #${i+1}: ${getRandomTip(topic, i)}`;
        } else if (templateType === "beforeafter") {
          caption = i === 0 ? `BEFORE: Common challenges with ${topic}` : `AFTER: The benefits of implementing ${topic} correctly`;
        } else if (templateType === "checklist") {
          caption = `${i+1}. ${getRandomChecklistItem(topic, i)}`;
        } else if (templateType === "stats") {
          caption = getRandomStat(topic, i);
        } else if (templateType === "process") {
          caption = `Step ${i+1}: ${getRandomProcessStep(topic, i)}`;
        }
        
        newSlides[i] = {
          ...newSlides[i],
          caption
        };
      }
      
      setSlides(newSlides);
      setActiveTab("edit");
      
      toast({
        title: "Carousel Generated",
        description: "Your carousel slides have been created. You can now edit and generate images."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error creating your carousel. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async (index: number) => {
    if (!canGenerateImage) {
      toast({
        title: "Feature Not Available",
        description: "Image generation requires a Pro plan or higher. Please upgrade your plan.",
        variant: "destructive"
      });
      return;
    }
    
    const slide = slides[index];
    if (!slide) return;
    
    const openAIApiKey = localStorage.getItem("openAIApiKey");
    
    if (!openAIApiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key in Settings to generate images.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Update slide status to generating
      const newSlides = [...slides];
      newSlides[index] = {
        ...newSlides[index],
        generating: true
      };
      setSlides(newSlides);
      
      // Simulate image generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock image generation - in a real app, this would call the API
      const encodedTopic = encodeURIComponent(slide.caption);
      const randomId = Math.floor(Math.random() * 1000);
      const imageUrl = `https://source.unsplash.com/featured/?${encodedTopic}&sig=${randomId}`;
      
      // Update the slide with the generated image
      newSlides[index] = {
        ...newSlides[index],
        imageUrl,
        generating: false
      };
      setSlides(newSlides);
      
      toast({
        title: "Image Generated",
        description: "Your image has been generated successfully!"
      });
    } catch (error) {
      toast({
        title: "Image Generation Failed",
        description: "There was an error generating your image. Please try again.",
        variant: "destructive"
      });
      
      // Reset generating status
      const newSlides = [...slides];
      newSlides[index] = {
        ...newSlides[index],
        generating: false
      };
      setSlides(newSlides);
    }
  };

  const updateSlideCaption = (index: number, caption: string) => {
    const newSlides = [...slides];
    newSlides[index] = {
      ...newSlides[index],
      caption
    };
    setSlides(newSlides);
  };

  const saveCarouselAsDraft = () => {
    const carousel = {
      id: `carousel-${Date.now()}`,
      topic,
      template: selectedTemplate,
      slides,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingCarousels = JSON.parse(localStorage.getItem('carousels') || '[]');
    localStorage.setItem('carousels', JSON.stringify([carousel, ...existingCarousels]));
    
    toast({
      title: "Carousel Saved",
      description: "Your carousel has been saved as a draft"
    });
    
    onClose();
  };

  // Helper functions to generate random content
  const getRandomTip = (topic: string, index: number) => {
    const tips = [
      `Always research ${topic} thoroughly before starting`,
      `Focus on quality over quantity when working with ${topic}`,
      `Regularly review and update your ${topic} strategy`,
      `Collaborate with others to improve your ${topic} results`,
      `Track metrics to measure your success with ${topic}`
    ];
    return tips[index % tips.length];
  };
  
  const getRandomChecklistItem = (topic: string, index: number) => {
    const items = [
      `Define your ${topic} goals and objectives`,
      `Create a detailed ${topic} action plan`,
      `Implement tracking and measurement for ${topic}`,
      `Review and optimize your ${topic} approach regularly`
    ];
    return items[index % items.length];
  };
  
  const getRandomStat = (topic: string, index: number) => {
    const stats = [
      `73% of professionals say ${topic} improved their results`,
      `Organizations using ${topic} see 42% higher engagement`,
      `${topic} implementation leads to 3.5x better outcomes`,
      `91% of industry leaders prioritize ${topic} in their strategy`
    ];
    return stats[index % stats.length];
  };
  
  const getRandomProcessStep = (topic: string, index: number) => {
    const steps = [
      `Analyze your current ${topic} situation`,
      `Develop a strategic ${topic} plan`,
      `Implement your ${topic} approach with careful monitoring`
    ];
    return steps[index % steps.length];
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-2xl">Carousel Generator</CardTitle>
          <CardDescription>
            Create engaging LinkedIn carousel posts
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="template">
              Template
            </TabsTrigger>
            <TabsTrigger value="edit" disabled={slides.length === 0}>
              Edit Slides
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="template" className="mt-0">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Carousel Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Digital Marketing Strategies, Leadership Tips"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Choose a Template</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {carouselTemplates.map(template => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id ? 'border-2 border-linkedin-primary' : ''
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{template.name}</h3>
                        <span className="text-sm text-gray-500">{template.slides} slides</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{template.prompt}...</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between px-6 py-4 border-t">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={generateCarousel} 
              disabled={isGenerating || !topic || !selectedTemplate}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Carousel
                </>
              )}
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="edit" className="mt-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeSlideIndex === 0}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  Slide {activeSlideIndex + 1} of {slides.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setActiveSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                  disabled={activeSlideIndex === slides.length - 1}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => generateImage(activeSlideIndex)}
                  disabled={slides[activeSlideIndex]?.generating}
                >
                  {slides[activeSlideIndex]?.generating ? (
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  ) : (
                    <ImageIcon className="mr-2 h-3 w-3" />
                  )}
                  Generate Image
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-4">
                <Label>Slide Caption</Label>
                <Textarea
                  placeholder="Enter slide caption"
                  value={slides[activeSlideIndex]?.caption || ""}
                  onChange={(e) => updateSlideCaption(activeSlideIndex, e.target.value)}
                  className="min-h-[150px]"
                />
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-500">
                    {slides[activeSlideIndex]?.caption.length} / 500 characters
                  </span>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <Label>Preview</Label>
                <div className="bg-gray-100 rounded-md border aspect-square flex items-center justify-center overflow-hidden">
                  {slides[activeSlideIndex]?.generating ? (
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Generating image...</span>
                    </div>
                  ) : slides[activeSlideIndex]?.imageUrl ? (
                    <img 
                      src={slides[activeSlideIndex].imageUrl}
                      alt={`Slide ${activeSlideIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">No image generated</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => generateImage(activeSlideIndex)}
                      >
                        Generate Image
                      </Button>
                    </div>
                  )}
                </div>
                
                {slides[activeSlideIndex]?.imageUrl && (
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Download Image
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex mt-6 overflow-x-auto space-x-2 py-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`flex-shrink-0 w-16 h-16 rounded-md border overflow-hidden cursor-pointer ${
                    index === activeSlideIndex ? 'ring-2 ring-linkedin-primary' : ''
                  }`}
                  onClick={() => setActiveSlideIndex(index)}
                >
                  {slide.imageUrl ? (
                    <img 
                      src={slide.imageUrl} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      {slide.generating ? (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      ) : (
                        <span className="text-xs text-gray-500">{index + 1}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between px-6 py-4 border-t">
            <Button variant="ghost" onClick={() => setActiveTab("template")}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Template
            </Button>
            
            <div className="space-x-2">
              <Button variant="outline" onClick={saveCarouselAsDraft}>
                Save as Draft
              </Button>
              <Button>
                Schedule Carousel
              </Button>
            </div>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CarouselGenerator;
