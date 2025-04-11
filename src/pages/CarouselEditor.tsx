
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Save, LayoutList, LayoutGrid } from "lucide-react";
import { usePlan } from "@/contexts/PlanContext";
import CarouselGenerator from "@/components/CarouselGenerator";

const CarouselEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"editor" | "drafts">("editor");
  const { canGenerateImage } = usePlan();
  const [savedCarousels, setSavedCarousels] = useState<any[]>(() => {
    const stored = localStorage.getItem('carousels');
    return stored ? JSON.parse(stored) : [];
  });

  const handleClose = () => {
    navigate('/dashboard');
  };

  const handleDeleteDraft = (id: string) => {
    const updatedCarousels = savedCarousels.filter(carousel => carousel.id !== id);
    setSavedCarousels(updatedCarousels);
    localStorage.setItem('carousels', JSON.stringify(updatedCarousels));
    toast.success("Draft deleted successfully");
  };

  const handleEditDraft = (id: string) => {
    setViewMode("editor");
    // In a real app, this would load the draft data into the editor
    toast.info("Draft editing is not implemented in this MVP");
  };

  return (
    <DashboardLayout>
      <div className="container p-4 mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleClose}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Carousel Creator</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "editor" | "drafts")} className="w-fit">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor" className="flex items-center text-xs px-3">
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  <span>Editor</span>
                </TabsTrigger>
                <TabsTrigger value="drafts" className="flex items-center text-xs px-3">
                  <LayoutList className="h-4 w-4 mr-1" />
                  <span>Drafts</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <TabsContent value="editor" className="mt-0" hidden={viewMode !== "editor"}>
          <div className="space-y-4">
            {!canGenerateImage && (
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <p className="text-amber-800">
                    Image generation is available on the Pro plan or higher. 
                    Consider upgrading to use this feature.
                  </p>
                </CardContent>
              </Card>
            )}
            
            <CarouselGenerator onClose={handleClose} />
          </div>
        </TabsContent>
        
        <TabsContent value="drafts" className="mt-0" hidden={viewMode !== "drafts"}>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Drafts</CardTitle>
              </CardHeader>
              <CardContent>
                {savedCarousels.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No saved drafts yet</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setViewMode("editor")}
                      className="mt-4"
                    >
                      Create New Carousel
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedCarousels.map((carousel) => (
                      <Card key={carousel.id} className="overflow-hidden">
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{carousel.topic}</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {new Date(carousel.createdAt).toLocaleDateString()} • {carousel.slides.length} slides
                          </p>
                          <div className="flex mt-4 space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditDraft(carousel.id)}
                              className="flex-1"
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteDraft(carousel.id)}
                              className="flex-1"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </div>
    </DashboardLayout>
  );
};

export default CarouselEditor;
