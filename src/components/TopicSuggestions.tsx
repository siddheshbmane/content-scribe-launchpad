
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface TopicSuggestionsProps {
  onSelectTopic: (topic: string) => void;
}

const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({ onSelectTopic }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // List of predefined suggestions (in a real app, these would come from an API)
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

  const generateSuggestions = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get 5 random suggestions from the predefined list
      const randomSuggestions = [...predefinedSuggestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      
      setSuggestions(randomSuggestions);
    } catch (error) {
      console.error("Error generating suggestions:", error);
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
          onClick={generateSuggestions}
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
