
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TopicSuggestionsProps {
  onSelectTopic: (topic: string) => void;
}

const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({ onSelectTopic }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  // List of predefined suggestions for fallback
  const predefinedSuggestions = [
    "Leadership strategies for remote teams",
    "Digital marketing trends for 2025",
    "Effective networking in a virtual world",
    "Building personal brand on LinkedIn",
    "AI tools for productivity enhancement",
    "Work-life balance in the digital age",
    "Industry insights: Future of e-commerce",
    "Career development for marketing professionals",
    "Data-driven decision making for leaders",
    "Sustainability in business practices",
    "Tech skills every professional needs",
    "Emotional intelligence in the workplace"
  ];

  const generateAISuggestions = async () => {
    setIsLoading(true);
    
    try {
      // Simulating API call to an AI service
      // In a real implementation, this would call an OpenAI API or similar
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Define potential topic areas
      const topicAreas = [
        "Professional Growth", 
        "Industry Trends", 
        "Technology", 
        "Leadership", 
        "Productivity",
        "Career Development",
        "Networking",
        "Work Culture"
      ];
      
      // Randomly select topic areas to focus on
      const selectedAreas = [...topicAreas].sort(() => 0.5 - Math.random()).slice(0, 3);
      
      // Generate AI-like suggestions for each area
      const aiSuggestions: string[] = [];
      
      selectedAreas.forEach(area => {
        switch(area) {
          case "Professional Growth":
            aiSuggestions.push(`5 Skills ${Math.random() > 0.5 ? "I" : "You"} Developed That Transformed My Career Path`);
            aiSuggestions.push(`Why Continuous Learning is the Ultimate Career Strategy`);
            break;
          case "Industry Trends":
            aiSuggestions.push(`The Future of ${Math.random() > 0.5 ? "Remote" : "Hybrid"} Work: What We've Learned`);
            aiSuggestions.push(`${new Date().getFullYear()} Market Shifts Every Professional Should Understand`);
            break;
          case "Technology":
            aiSuggestions.push(`How AI is Revolutionizing ${Math.random() > 0.5 ? "Marketing" : "Content Creation"}`);
            aiSuggestions.push(`Tech Tools That Have Dramatically Improved My Workflow`);
            break;
          case "Leadership":
            aiSuggestions.push(`Building Teams That Thrive: Leadership Lessons from ${Math.random() > 0.5 ? "Startups" : "Global Companies"}`);
            aiSuggestions.push(`The Quiet Power of ${Math.random() > 0.5 ? "Empathetic" : "Authentic"} Leadership`);
            break;
          case "Productivity":
            aiSuggestions.push(`My ${Math.random() > 0.5 ? "Morning" : "Weekly"} Ritual That Doubled My Productivity`);
            aiSuggestions.push(`Beyond To-Do Lists: A Systems Approach to Getting Things Done`);
            break;
          case "Career Development":
            aiSuggestions.push(`What ${Math.random() > 0.5 ? "I" : "My Team"} Learned From Our Biggest Project Failure`);
            aiSuggestions.push(`Career Pivots: When to Make the Jump and How to Land Successfully`);
            break;
          case "Networking":
            aiSuggestions.push(`How I Built a Valuable Network ${Math.random() > 0.5 ? "Without Attending a Single Networking Event" : "During a Global Pandemic"}`);
            aiSuggestions.push(`The Art of Meaningful ${Math.random() > 0.5 ? "Digital" : "Professional"} Relationships`);
            break;
          case "Work Culture":
            aiSuggestions.push(`Creating a Culture of ${Math.random() > 0.5 ? "Innovation" : "Belonging"}: Lessons from Our Company Transformation`);
            aiSuggestions.push(`Why ${Math.random() > 0.5 ? "Psychological Safety" : "Radical Candor"} is the Foundation of High-Performing Teams`);
            break;
        }
      });
      
      // Shuffle and select 5 suggestions
      const randomizedSuggestions = [...aiSuggestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      
      setSuggestions(randomizedSuggestions);
      
    } catch (error) {
      console.error("Error generating suggestions:", error);
      // Fallback to predefined suggestions if AI fails
      const fallbackSuggestions = [...predefinedSuggestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      
      setSuggestions(fallbackSuggestions);
      
      toast({
        title: "Could not generate AI suggestions",
        description: "Using our curated suggestions instead. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Need inspiration?</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={generateAISuggestions}
          disabled={isLoading}
          className="h-8 text-xs flex items-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3 mr-1" />
              Suggest Topics
            </>
          )}
        </Button>
      </div>
      
      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 gap-2 mt-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="h-auto py-2 px-3 text-xs text-left justify-start font-normal"
              onClick={() => onSelectTopic(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicSuggestions;
