
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { usePlan } from "@/contexts/PlanContext";
import { PlusCircle, FileText, Trash2, Edit, Eye } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Define the Carousel interface
interface Carousel {
  id: string;
  title: string;
  description: string;
  created: string;
  slides: {
    title: string;
    content: string;
    backgroundColor: string;
    textColor: string;
    alignment: "center" | "left" | "right";
    hasImage: boolean;
    imageUrl: string;
    overlay: boolean;
  }[];
}

// Mock data for carousels
const mockCarousels: Carousel[] = [
  {
    id: "1",
    title: "5 LinkedIn Profile Tips",
    description: "Carousel about improving your LinkedIn profile",
    created: "2025-04-05",
    slides: [
      {
        title: "5 Ways to Improve Your LinkedIn Profile",
        content: "A professional LinkedIn profile can open doors to new opportunities. Here are 5 tips to make yours stand out.",
        backgroundColor: "#f3f4f6",
        textColor: "#1f2937",
        alignment: "center",
        hasImage: true,
        imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        overlay: true
      },
      {
        title: "1. Professional Photo",
        content: "Use a high-quality, professional headshot with good lighting and a simple background.",
        backgroundColor: "#eff6ff",
        textColor: "#1e40af",
        alignment: "left",
        hasImage: false,
        imageUrl: "",
        overlay: false
      },
      {
        title: "2. Compelling Headline",
        content: "Craft a headline that goes beyond your job title. Highlight your expertise and value proposition.",
        backgroundColor: "#f0fdf4",
        textColor: "#166534",
        alignment: "left",
        hasImage: false,
        imageUrl: "",
        overlay: false
      },
      {
        title: "3. Detailed Experience",
        content: "Focus on achievements and results, not just responsibilities. Use metrics where possible.",
        backgroundColor: "#fef2f2",
        textColor: "#991b1b",
        alignment: "left",
        hasImage: false,
        imageUrl: "",
        overlay: false
      },
      {
        title: "4. Featured Content",
        content: "Showcase your best work, articles, or media that demonstrate your expertise and skills.",
        backgroundColor: "#f5f3ff",
        textColor: "#5b21b6",
        alignment: "left",
        hasImage: false,
        imageUrl: "",
        overlay: false
      }
    ]
  },
  {
    id: "2",
    title: "Content Marketing Checklist",
    description: "Essential steps for effective content marketing",
    created: "2025-04-10",
    slides: [
      {
        title: "Content Marketing Checklist",
        content: "Follow these steps to create a winning content strategy for your business",
        backgroundColor: "#f8fafc",
        textColor: "#0f172a",
        alignment: "center",
        hasImage: true,
        imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        overlay: true
      },
      {
        title: "1. Define Your Audience",
        content: "Research your target audience. Understand their pain points, needs, and interests.",
        backgroundColor: "#fef3c7",
        textColor: "#92400e",
        alignment: "left",
        hasImage: false,
        imageUrl: "",
        overlay: false
      },
      {
        title: "2. Set Clear Goals",
        content: "Define what success looks like. Are you focused on brand awareness, lead generation, or customer retention?",
        backgroundColor: "#e0f2fe",
        textColor: "#0369a1",
        alignment: "left",
        hasImage: false,
        imageUrl: "",
        overlay: false
      }
    ]
  }
];

const Carousels = () => {
  const navigate = useNavigate();
  const { canCreateMorePosts } = usePlan();
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [carouselToDelete, setCarouselToDelete] = useState<string | null>(null);

  // Filter carousels based on search query
  const filteredCarousels = mockCarousels.filter((carousel) =>
    carousel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    carousel.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCarousel = () => {
    if (!canCreateMorePosts) {
      toast.error("You've reached your plan's limit for posts this month. Please upgrade to create more content.");
      return;
    }
    navigate("/carousel-editor");
  };

  const handleEditCarousel = (id: string) => {
    navigate(`/carousel-editor?id=${id}`);
  };

  const handleViewCarousel = (id: string) => {
    // In a real app, this would navigate to a view-only version of the carousel
    toast.info("Viewing carousel: " + id);
  };

  const handleDeleteCarousel = (id: string) => {
    setCarouselToDelete(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the carousel
    toast.success("Carousel deleted successfully");
    setShowConfirmDelete(false);
    setCarouselToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Carousels</h1>
            <p className="text-muted-foreground">
              Create and manage LinkedIn slide carousels to boost engagement.
            </p>
          </div>
          <Button onClick={handleCreateCarousel} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Carousel
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-72">
            <Input
              placeholder="Search carousels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Carousels</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              {filteredCarousels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCarousels.map((carousel) => (
                    <Card key={carousel.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{carousel.title}</CardTitle>
                        <CardDescription>{carousel.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          Created: {new Date(carousel.created).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Slides: {carousel.slides.length}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCarousel(carousel.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCarousel(carousel.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCarousel(carousel.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No carousels found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Get started by creating a new carousel.
                  </p>
                  <Button onClick={handleCreateCarousel} className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Carousel
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="drafts" className="mt-6">
              <div className="text-center py-10">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No draft carousels</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Drafts you create will appear here.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="published" className="mt-6">
              <div className="text-center py-10">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No published carousels</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Published carousels will appear here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AlertDialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              carousel and remove it from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Carousels;
