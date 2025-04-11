
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Image as ImageIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Type,
  Save,
  Download,
  ArrowLeft,
  Layout,
  Palette
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CarouselEditorProps {
  onClose: () => void;
  initialContent?: {
    slides: Array<{
      title: string;
      content: string;
      background: string;
    }>;
  };
}

const carouselTemplates = [
  {
    id: "tips",
    name: "5 Tips",
    description: "Share 5 professional tips on your topic",
    slides: 5,
    defaults: {
      titles: ["Introduction", "Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],
      color: "#0077B5"
    }
  },
  {
    id: "before-after",
    name: "Before vs After",
    description: "Compare before and after scenarios",
    slides: 3,
    defaults: {
      titles: ["The Problem", "The Process", "The Solution"],
      color: "#2E7D32"
    }
  },
  {
    id: "checklist",
    name: "Checklist",
    description: "Step-by-step checklist for a process",
    slides: 4,
    defaults: {
      titles: ["The Checklist", "Step 1", "Step 2", "Step 3"],
      color: "#C2185B"
    }
  },
  {
    id: "case-study",
    name: "Case Study",
    description: "Present a business case study",
    slides: 5,
    defaults: {
      titles: ["Case Study", "Challenge", "Approach", "Solution", "Results"],
      color: "#4527A0"
    }
  }
];

const backgroundColors = [
  "#FFFFFF", "#F5F5F5", "#E0F7FA", "#E8F5E9", 
  "#FFF8E1", "#FFEBEE", "#EDE7F6", "#0077B5",
  "#333333", "#162238"
];

const textColors = ["#FFFFFF", "#000000", "#0077B5", "#2E7D32", "#C2185B", "#4527A0"];

const CarouselEditor: React.FC<CarouselEditorProps> = ({ onClose, initialContent }) => {
  const [currentStep, setCurrentStep] = useState<"template" | "edit" | "preview">("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [slides, setSlides] = useState<Array<{
    title: string;
    content: string;
    backgroundColor: string;
    textColor: string;
    alignment: "left" | "center" | "right";
    hasImage: boolean;
    imageUrl: string;
    overlay: boolean;
  }>>(initialContent?.slides.map(slide => ({
    title: slide.title,
    content: slide.content,
    backgroundColor: slide.background,
    textColor: "#FFFFFF",
    alignment: "center" as const,
    hasImage: false,
    imageUrl: "",
    overlay: false
  })) || []);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = carouselTemplates.find(t => t.id === templateId);
    
    if (template) {
      const newSlides = [];
      for (let i = 0; i < template.slides; i++) {
        newSlides.push({
          title: template.defaults.titles[i] || `Slide ${i + 1}`,
          content: "",
          backgroundColor: template.defaults.color,
          textColor: "#FFFFFF",
          alignment: "center" as const,
          hasImage: false,
          imageUrl: "",
          overlay: false
        });
      }
      setSlides(newSlides);
      setCurrentStep("edit");
    }
  };

  const handleAddSlide = () => {
    if (slides.length < 10) {
      setSlides([...slides, {
        title: `Slide ${slides.length + 1}`,
        content: "",
        backgroundColor: slides[0].backgroundColor,
        textColor: slides[0].textColor,
        alignment: "center" as const,
        hasImage: false,
        imageUrl: "",
        overlay: false
      }]);
    } else {
      toast.warning("Maximum 10 slides allowed");
    }
  };

  const handleRemoveSlide = (index: number) => {
    if (slides.length > 1) {
      const newSlides = [...slides];
      newSlides.splice(index, 1);
      setSlides(newSlides);
      if (currentSlide >= newSlides.length) {
        setCurrentSlide(newSlides.length - 1);
      }
    } else {
      toast.warning("Cannot remove the only slide");
    }
  };

  const handleUpdateSlide = (index: number, field: string, value: any) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSlides(newSlides);
  };

  const handleImageGeneration = async () => {
    setIsGenerating(true);
    
    // Simulate image generation
    setTimeout(() => {
      // For MVP, assign a placeholder image
      const placeholderUrls = [
        "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1364&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1661956602153-23384936a1d3?q=80&w=1364&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1476&auto=format&fit=crop",
      ];
      
      const randomIndex = Math.floor(Math.random() * placeholderUrls.length);
      
      handleUpdateSlide(currentSlide, "hasImage", true);
      handleUpdateSlide(currentSlide, "imageUrl", placeholderUrls[randomIndex]);
      
      setIsGenerating(false);
      toast.success("Image generated successfully!");
    }, 2000);
  };

  const handleSaveCarousel = () => {
    // In a real app, this would save to database
    // For MVP, save to localStorage
    
    const savedCarousels = JSON.parse(localStorage.getItem('savedCarousels') || '[]');
    const newCarousel = {
      id: Date.now().toString(),
      name: `Carousel ${savedCarousels.length + 1}`,
      date: new Date().toISOString(),
      slides: slides
    };
    
    savedCarousels.push(newCarousel);
    localStorage.setItem('savedCarousels', JSON.stringify(savedCarousels));
    
    toast.success("Carousel saved successfully!");
    onClose();
  };

  const handleExportCarousel = () => {
    // In a real app, this would export the carousel to LinkedIn
    // For MVP, just show a success message
    
    toast.success("Carousel ready for export!");
    // Could also download as images/PDF in a real implementation
  };

  const renderTemplateSelector = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Create Carousel</h2>
            <p className="text-gray-500">Select a template to get started</p>
          </div>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {carouselTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all hover:border-linkedin-primary ${selectedTemplate === template.id ? 'border-linkedin-primary bg-linkedin-light/10' : ''}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem 
                    value={template.id} 
                    id={template.id} 
                    checked={selectedTemplate === template.id}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.description}</p>
                    <p className="text-xs text-gray-400">{template.slides} slides</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button 
            disabled={!selectedTemplate} 
            onClick={() => handleTemplateSelect(selectedTemplate)}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  };

  const renderSlideEditor = () => {
    const slide = slides[currentSlide];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCurrentStep("template")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">Edit Carousel</h2>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setCurrentStep("preview")}>Preview</Button>
            <Button onClick={handleSaveCarousel}>Save</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Slide Editor */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Slide {currentSlide + 1} of {slides.length}</h3>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  disabled={currentSlide === 0}
                  onClick={() => setCurrentSlide(currentSlide - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  disabled={currentSlide === slides.length - 1}
                  onClick={() => setCurrentSlide(currentSlide + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleRemoveSlide(currentSlide)}
                  disabled={slides.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="title">Slide Title</Label>
                <Input
                  id="title"
                  value={slide.title}
                  onChange={(e) => handleUpdateSlide(currentSlide, "title", e.target.value)}
                  placeholder="Enter slide title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Slide Content</Label>
                <Textarea
                  id="content"
                  value={slide.content}
                  onChange={(e) => handleUpdateSlide(currentSlide, "content", e.target.value)}
                  placeholder="Enter slide content"
                  className="h-24"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Background</Label>
                  <div className="flex flex-wrap gap-2">
                    {backgroundColors.map((color) => (
                      <div
                        key={color}
                        className={`w-6 h-6 rounded-full cursor-pointer border ${slide.backgroundColor === color ? 'ring-2 ring-black' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleUpdateSlide(currentSlide, "backgroundColor", color)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {textColors.map((color) => (
                      <div
                        key={color}
                        className={`w-6 h-6 rounded-full cursor-pointer border ${slide.textColor === color ? 'ring-2 ring-black' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleUpdateSlide(currentSlide, "textColor", color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Text Alignment</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={slide.alignment === "left" ? "default" : "outline"}
                    size="icon"
                    onClick={() => handleUpdateSlide(currentSlide, "alignment", "left")}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant={slide.alignment === "center" ? "default" : "outline"}
                    size="icon"
                    onClick={() => handleUpdateSlide(currentSlide, "alignment", "center")}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant={slide.alignment === "right" ? "default" : "outline"}
                    size="icon"
                    onClick={() => handleUpdateSlide(currentSlide, "alignment", "right")}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Background Image</Label>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="overlay" className="text-sm">Overlay Text</Label>
                    <Switch
                      id="overlay"
                      checked={slide.overlay}
                      onCheckedChange={(checked) => handleUpdateSlide(currentSlide, "overlay", checked)}
                      disabled={!slide.hasImage}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {slide.hasImage ? (
                    <div className="relative group">
                      <img 
                        src={slide.imageUrl} 
                        alt="Background" 
                        className="h-40 w-full object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            handleUpdateSlide(currentSlide, "hasImage", false);
                            handleUpdateSlide(currentSlide, "imageUrl", "");
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="h-40"
                      onClick={handleImageGeneration}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Generating...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="h-8 w-8 mb-2 text-gray-400" />
                          <span>Generate Image</span>
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleAddSlide}
              className="w-full"
              disabled={slides.length >= 10}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </div>
          
          {/* Preview */}
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="aspect-square rounded-lg overflow-hidden relative">
              <div 
                className="w-full h-full flex flex-col items-center justify-center p-6"
                style={{ 
                  backgroundColor: slide.hasImage && !slide.overlay ? 'transparent' : slide.backgroundColor,
                  color: slide.textColor,
                  textAlign: slide.alignment,
                  backgroundImage: slide.hasImage ? `url(${slide.imageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {slide.hasImage && slide.overlay && (
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                )}
                <div className={`${slide.hasImage && slide.overlay ? 'relative z-10' : ''} ${slide.alignment === 'center' ? 'text-center' : slide.alignment === 'right' ? 'text-right' : 'text-left'} w-full`}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-base md:text-lg">{slide.content}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full ${index === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCurrentStep("edit")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">Preview Carousel</h2>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleExportCarousel}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleSaveCarousel}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <div className="aspect-square rounded-lg overflow-hidden relative border">
              <div 
                className="w-full h-full flex flex-col items-center justify-center p-6"
                style={{ 
                  backgroundColor: slides[currentSlide].hasImage && !slides[currentSlide].overlay ? 'transparent' : slides[currentSlide].backgroundColor,
                  color: slides[currentSlide].textColor,
                  textAlign: slides[currentSlide].alignment,
                  backgroundImage: slides[currentSlide].hasImage ? `url(${slides[currentSlide].imageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {slides[currentSlide].hasImage && slides[currentSlide].overlay && (
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                )}
                <div className={`${slides[currentSlide].hasImage && slides[currentSlide].overlay ? 'relative z-10' : ''} ${slides[currentSlide].alignment === 'center' ? 'text-center' : slides[currentSlide].alignment === 'right' ? 'text-right' : 'text-left'} w-full`}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{slides[currentSlide].title}</h2>
                  <p className="text-base md:text-lg">{slides[currentSlide].content}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full ${index === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                    onClick={() => setCurrentSlide(index)}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-6 space-x-4">
              <Button 
                variant="outline" 
                size="icon" 
                disabled={currentSlide === 0}
                onClick={() => setCurrentSlide(currentSlide - 1)}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div className="flex items-center space-x-3">
                <p className="text-sm font-medium">
                  {currentSlide + 1} / {slides.length}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                disabled={currentSlide === slides.length - 1}
                onClick={() => setCurrentSlide(currentSlide + 1)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case "template":
        return renderTemplateSelector();
      case "edit":
        return renderSlideEditor();
      case "preview":
        return renderPreview();
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {renderContent()}
    </div>
  );
};

export default CarouselEditor;
