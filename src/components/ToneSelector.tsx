
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ToneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ value, onChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Group tones by category for better organization
  const toneGroups = {
    professional: [
      { id: "professional", label: "Professional", description: "Formal and business-oriented" },
      { id: "technical", label: "Technical", description: "Specialized and detailed" },
      { id: "analytical", label: "Analytical", description: "Data-driven and logical" },
      { id: "authoritative", label: "Authoritative", description: "Expert and commanding" },
      { id: "informative", label: "Informative", description: "Educational and detailed" },
      { id: "diplomatic", label: "Diplomatic", description: "Tactful and balanced" },
      { id: "direct", label: "Direct", description: "Straightforward and to the point" },
      { id: "intellectual", label: "Intellectual", description: "Scholarly and academic" },
    ],
    conversational: [
      { id: "casual", label: "Casual", description: "Relaxed and conversational" },
      { id: "conversational", label: "Conversational", description: "Friendly and approachable" },
      { id: "authentic", label: "Authentic", description: "Genuine and transparent" },
      { id: "humorous", label: "Humorous", description: "Light-hearted and funny" },
      { id: "empathetic", label: "Empathetic", description: "Understanding and supportive" },
    ],
    persuasive: [
      { id: "persuasive", label: "Persuasive", description: "Convincing and influential" },
      { id: "inspirational", label: "Inspirational", description: "Motivational and uplifting" },
      { id: "enthusiastic", label: "Enthusiastic", description: "Upbeat and energetic" },
      { id: "confident", label: "Confident", description: "Assured and self-assured" },
      { id: "passionate", label: "Passionate", description: "Intense and fervent" },
    ],
    creative: [
      { id: "storytelling", label: "Storytelling", description: "Narrative and engaging" },
      { id: "reflective", label: "Reflective", description: "Thoughtful and introspective" },
      { id: "visionary", label: "Visionary", description: "Forward-thinking and innovative" },
      { id: "educational", label: "Educational", description: "Teaching and instructive" },
      { id: "controversial", label: "Controversial", description: "Thought-provoking and debatable" },
      { id: "practical", label: "Practical", description: "Useful and applicable" }
    ],
  };
  
  // Flat list of all tones for searching
  const allTones = Object.values(toneGroups).flat();
  
  // Filter tones based on search query
  const filteredTones = searchQuery 
    ? allTones.filter(tone => 
        tone.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tone.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tone-search">Search Tones</Label>
        <Input
          id="tone-search"
          placeholder="Search for a tone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
      </div>
      
      {searchQuery ? (
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        >
          {filteredTones.length > 0 ? filteredTones.map((tone) => (
            <div
              key={tone.id}
              className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${
                value === tone.id ? "bg-primary/5 border-primary" : "hover:bg-gray-50"
              }`}
              onClick={() => onChange(tone.id)}
            >
              <RadioGroupItem value={tone.id} id={tone.id} />
              <div className="space-y-0.5">
                <Label htmlFor={tone.id} className="cursor-pointer">
                  {tone.label}
                </Label>
                <p className="text-xs text-gray-500">{tone.description}</p>
              </div>
            </div>
          )) : (
            <p className="text-sm text-gray-500 col-span-full">No matching tones found</p>
          )}
        </RadioGroup>
      ) : (
        <Tabs defaultValue="professional" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="conversational">Conversational</TabsTrigger>
            <TabsTrigger value="persuasive">Persuasive</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
          </TabsList>
          
          {Object.entries(toneGroups).map(([category, tones]) => (
            <TabsContent key={category} value={category} className="mt-4">
              <RadioGroup
                value={value}
                onValueChange={onChange}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
              >
                {tones.map((tone) => (
                  <div
                    key={tone.id}
                    className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${
                      value === tone.id ? "bg-primary/5 border-primary" : "hover:bg-gray-50"
                    }`}
                    onClick={() => onChange(tone.id)}
                  >
                    <RadioGroupItem value={tone.id} id={tone.id} />
                    <div className="space-y-0.5">
                      <Label htmlFor={tone.id} className="cursor-pointer">
                        {tone.label}
                      </Label>
                      <p className="text-xs text-gray-500">{tone.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default ToneSelector;
