
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Trash2, Edit, Download, Eye, Copy } from "lucide-react";
import { format } from "date-fns";
import CarouselEditor from "@/components/CarouselEditor";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Carousel {
  id: string;
  name: string;
  date: string;
  slides: Array<{
    title: string;
    content: string;
    backgroundColor: string;
    textColor: string;
    alignment: "left" | "center" | "right";
    hasImage: boolean;
    imageUrl: string;
    overlay: boolean;
  }>;
}

const Carousels = () => {
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedCarousel, setSelectedCarousel] = useState<Carousel | null>(null);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const isMobile = useIsMobile();
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewCarousel, setPreviewCarousel] = useState<Carousel | null>(null);
  
  useEffect(() => {
    // Load carousels from localStorage
    const savedCarousels = JSON.parse(localStorage.getItem('savedCarousels') || '[]');
    setCarousels(savedCarousels);
  }, []);

  const handleCreateCarousel = () => {
    setSelectedCarousel(null);
    setShowEditor(true);
  };

  const handleEditCarousel = (carousel: Carousel) => {
    setSelectedCarousel(carousel);
    setShowEditor(true);
  };

  const handleDeleteCarousel = (id: string) => {
    const updatedCarousels = carousels.filter(carousel => carousel.id !== id);
    setCarousels(updatedCarousels);
    localStorage.setItem('savedCarousels', JSON.stringify(updatedCarousels));
    toast.success("Carousel deleted successfully");
  };

  const handleDuplicateCarousel = (carousel: Carousel) => {
    const newCarousel = {
      ...carousel,
      id: Date.now().toString(),
      name: `${carousel.name} (Copy)`,
      date: new Date().toISOString()
    };
    
    const updatedCarousels = [...carousels, newCarousel];
    setCarousels(updatedCarousels);
    localStorage.setItem('savedCarousels', JSON.stringify(updatedCarousels));
    
    toast.success("Carousel duplicated successfully");
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    
    // Reload carousels from localStorage
    const savedCarousels = JSON.parse(localStorage.getItem('savedCarousels') || '[]');
    setCarousels(savedCarousels);
  };

  const handlePreviewCarousel = (carousel: Carousel) => {
    setPreviewCarousel(carousel);
    setPreviewIndex(0);
  };

  const handleNextSlide = () => {
    if (previewCarousel && previewIndex < previewCarousel.slides.length - 1) {
      setPreviewIndex(previewIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (previewCarousel && previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    }
  };

  const closePreview = () => {
    setPreviewCarousel(null);
  };

  if (showEditor) {
    return <CarouselEditor onClose={handleEditorClose} initialContent={selectedCarousel ?? undefined} />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Carousel Posts</h1>
            <p className="text-muted-foreground">
              Create and manage multi-slide LinkedIn carousel posts.
            </p>
          </div>
          <Button onClick={handleCreateCarousel}>
            <Plus className="mr-2 h-4 w-4" />
            Create Carousel
          </Button>
        </div>

        <Tabs defaultValue="my-carousels" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="my-carousels">My Carousels</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={currentView === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentView("grid")}
                className="hidden md:flex"
              >
                Grid
              </Button>
              <Button
                variant={currentView === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentView("list")}
                className="hidden md:flex"
              >
                List
              </Button>
            </div>
          </div>
          
          <TabsContent value="my-carousels" className="space-y-4">
            {carousels.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">No carousels yet</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">Create your first LinkedIn carousel post</p>
                <Button onClick={handleCreateCarousel}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Carousel
                </Button>
              </div>
            ) : currentView === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {carousels.map((carousel) => (
                  <Card key={carousel.id} className="overflow-hidden">
                    <div 
                      className="aspect-video cursor-pointer p-4 flex items-center justify-center bg-gray-100"
                      onClick={() => handlePreviewCarousel(carousel)}
                      style={{ 
                        backgroundColor: carousel.slides[0].backgroundColor,
                        color: carousel.slides[0].textColor,
                        backgroundImage: carousel.slides[0].hasImage ? `url(${carousel.slides[0].imageUrl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {carousel.slides[0].hasImage && carousel.slides[0].overlay && (
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      )}
                      <div className={`${carousel.slides[0].hasImage && carousel.slides[0].overlay ? 'relative z-10' : ''} text-center`}>
                        <h3 className="font-bold text-lg mb-1">{carousel.slides[0].title}</h3>
                        <p className="text-sm line-clamp-2">{carousel.slides[0].content}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{carousel.name}</h3>
                        <span className="text-xs text-gray-500">
                          {format(new Date(carousel.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{carousel.slides.length} slides</span>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => handlePreviewCarousel(carousel)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => handleEditCarousel(carousel)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => handleDuplicateCarousel(carousel)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this carousel.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteCarousel(carousel.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {carousels.map((carousel) => (
                  <div 
                    key={carousel.id} 
                    className="flex justify-between items-center p-4 bg-white rounded-lg border hover:shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded flex items-center justify-center"
                        style={{ 
                          backgroundColor: carousel.slides[0].backgroundColor,
                          color: carousel.slides[0].textColor
                        }}
                      >
                        {carousel.slides.length}
                      </div>
                      <div>
                        <h3 className="font-medium">{carousel.name}</h3>
                        <p className="text-xs text-gray-500">
                          {format(new Date(carousel.date), 'MMM d, yyyy')} · {carousel.slides.length} slides
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handlePreviewCarousel(carousel)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleEditCarousel(carousel)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleDuplicateCarousel(carousel)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this carousel.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteCarousel(carousel.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 5 Tips Template */}
              <Card className="overflow-hidden">
                <div className="aspect-video p-4 flex items-center justify-center bg-[#0077B5] text-white">
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">5 Tips for Success</h3>
                    <p className="text-sm">Actionable advice for your audience</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">5 Tips Template</h3>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">5 slides</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Share 5 professional tips on your topic</p>
                  <Button onClick={handleCreateCarousel} className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
              
              {/* Before vs After Template */}
              <Card className="overflow-hidden">
                <div className="aspect-video p-4 flex items-center justify-center bg-[#2E7D32] text-white">
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">Before vs After</h3>
                    <p className="text-sm">Show your transformation process</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Before vs After Template</h3>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">3 slides</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Compare before and after scenarios</p>
                  <Button onClick={handleCreateCarousel} className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
              
              {/* Checklist Template */}
              <Card className="overflow-hidden">
                <div className="aspect-video p-4 flex items-center justify-center bg-[#C2185B] text-white">
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">The Ultimate Checklist</h3>
                    <p className="text-sm">Step-by-step guide for your audience</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Checklist Template</h3>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">4 slides</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Step-by-step checklist for a process</p>
                  <Button onClick={handleCreateCarousel} className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview Modal */}
      {previewCarousel && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Preview: {previewCarousel.name}</h3>
              <Button variant="ghost" size="sm" onClick={closePreview}>
                Close
              </Button>
            </div>
            <div className="p-6">
              <div 
                className="aspect-square rounded-lg overflow-hidden relative"
                style={{ 
                  backgroundColor: previewCarousel.slides[previewIndex].hasImage && !previewCarousel.slides[previewIndex].overlay ? 'transparent' : previewCarousel.slides[previewIndex].backgroundColor,
                  color: previewCarousel.slides[previewIndex].textColor,
                  backgroundImage: previewCarousel.slides[previewIndex].hasImage ? `url(${previewCarousel.slides[previewIndex].imageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {previewCarousel.slides[previewIndex].hasImage && previewCarousel.slides[previewIndex].overlay && (
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                )}
                <div className={`${previewCarousel.slides[previewIndex].hasImage && previewCarousel.slides[previewIndex].overlay ? 'relative z-10' : ''} ${previewCarousel.slides[previewIndex].alignment === 'center' ? 'text-center' : previewCarousel.slides[previewIndex].alignment === 'right' ? 'text-right' : 'text-left'} w-full h-full flex flex-col items-center justify-center p-6`}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{previewCarousel.slides[previewIndex].title}</h2>
                  <p className="text-base md:text-lg">{previewCarousel.slides[previewIndex].content}</p>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
                  {previewCarousel.slides.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full cursor-pointer ${index === previewIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                      onClick={() => setPreviewIndex(index)}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevSlide}
                  disabled={previewIndex === 0}
                >
                  Previous
                </Button>
                <div className="text-sm font-medium">
                  {previewIndex + 1} of {previewCarousel.slides.length}
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleNextSlide}
                  disabled={previewIndex === previewCarousel.slides.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
            <div className="p-4 border-t flex justify-between">
              <Button variant="outline" onClick={() => handleEditCarousel(previewCarousel)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Carousels;
