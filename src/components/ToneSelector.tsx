
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ToneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ value, onChange }) => {
  const tones = [
    { id: "professional", label: "Professional", description: "Formal and business-oriented" },
    { id: "casual", label: "Casual", description: "Relaxed and conversational" },
    { id: "enthusiastic", label: "Enthusiastic", description: "Upbeat and energetic" },
    { id: "informative", label: "Informative", description: "Educational and detailed" },
    { id: "inspirational", label: "Inspirational", description: "Motivational and uplifting" },
    { id: "authoritative", label: "Authoritative", description: "Expert and commanding" },
    { id: "storytelling", label: "Storytelling", description: "Narrative and engaging" },
    { id: "humorous", label: "Humorous", description: "Light-hearted and funny" },
    { id: "analytical", label: "Analytical", description: "Data-driven and logical" },
    { id: "empathetic", label: "Empathetic", description: "Understanding and supportive" },
    { id: "persuasive", label: "Persuasive", description: "Convincing and influential" },
    { id: "controversial", label: "Controversial", description: "Thought-provoking and debatable" },
    { id: "reflective", label: "Reflective", description: "Thoughtful and introspective" },
    { id: "visionary", label: "Visionary", description: "Forward-thinking and innovative" },
    { id: "technical", label: "Technical", description: "Specialized and detailed" },
    { id: "conversational", label: "Conversational", description: "Friendly and approachable" },
    { id: "educational", label: "Educational", description: "Teaching and instructive" },
    { id: "authentic", label: "Authentic", description: "Genuine and transparent" },
    { id: "diplomatic", label: "Diplomatic", description: "Tactful and balanced" },
    { id: "confident", label: "Confident", description: "Assured and self-assured" },
    { id: "direct", label: "Direct", description: "Straightforward and to the point" },
    { id: "intellectual", label: "Intellectual", description: "Scholarly and academic" },
    { id: "passionate", label: "Passionate", description: "Intense and fervent" },
    { id: "practical", label: "Practical", description: "Useful and applicable" }
  ];

  return (
    <div className="space-y-2">
      <Label>Content Tone</Label>
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
    </div>
  );
};

export default ToneSelector;
