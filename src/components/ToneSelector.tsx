
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { LucideIcon, MessagesSquare, Briefcase, GraduationCap } from "lucide-react";

type ToneOption = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

interface ToneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ value, onChange }) => {
  const tones: ToneOption[] = [
    {
      value: "professional",
      label: "Professional",
      description: "Polished and industry-focused",
      icon: Briefcase,
    },
    {
      value: "friendly",
      label: "Friendly",
      description: "Conversational and approachable",
      icon: MessagesSquare,
    },
    {
      value: "educational",
      label: "Educational",
      description: "Informative and instructional",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-2">
      <Label>Content Tone</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tones.map((tone) => (
          <Button
            key={tone.value}
            type="button"
            variant="outline"
            className={cn(
              "h-auto flex-col py-4 px-3 justify-start items-start text-left",
              value === tone.value && "border-linkedin-primary bg-linkedin-light"
            )}
            onClick={() => onChange(tone.value)}
          >
            <div className="flex items-center w-full">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                value === tone.value ? "bg-linkedin-primary text-white" : "bg-gray-100 text-gray-500"
              )}>
                <tone.icon className="h-4 w-4" />
              </div>
              <span className="ml-2 font-medium">{tone.label}</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">{tone.description}</p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
