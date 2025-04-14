
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  canUseCustomApiKey: boolean;
  apiKey: string;
  onApiKeyChange: (value: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  value,
  onChange,
  canUseCustomApiKey,
  apiKey,
  onApiKeyChange,
}) => {
  const models = [
    { id: "gpt3.5", label: "GPT-3.5 Turbo", description: "Fast and efficient" },
    { id: "gpt4", label: "GPT-4", description: "Most capable model" },
    { id: "gpt4o", label: "GPT-4o", description: "Latest optimized model" },
    { id: "gpt4o-mini", label: "GPT-4o Mini", description: "Efficient optimized model" },
    { id: "gpt4-turbo", label: "GPT-4 Turbo", description: "Fast and powerful" },
    { id: "claude3", label: "Claude 3 Opus", description: "Anthropic's premium model" },
    { id: "claude3-sonnet", label: "Claude 3 Sonnet", description: "Balanced performance and efficiency" },
    { id: "claude3-haiku", label: "Claude 3 Haiku", description: "Fast and efficient responses" },
  ];

  return (
    <div className="space-y-4">
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        {models.map((model) => (
          <div
            key={model.id}
            className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${
              value === model.id ? "bg-primary/5 border-primary" : "hover:bg-gray-50"
            }`}
            onClick={() => onChange(model.id)}
          >
            <RadioGroupItem value={model.id} id={model.id} />
            <div className="space-y-0.5">
              <Label htmlFor={model.id} className="cursor-pointer">
                {model.label}
              </Label>
              <p className="text-xs text-gray-500">{model.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>

      {canUseCustomApiKey && (
        <div className="space-y-2 mt-4 border-t pt-4">
          <Label htmlFor="openai-api-key">OpenAI API Key</Label>
          <Input
            id="openai-api-key"
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Enter your API key to use your own OpenAI account. Your key is stored locally
            and never sent to our servers.
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
