
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  // Group models by provider for better organization
  const modelGroups = {
    openai: [
      { id: "gpt3.5", label: "GPT-3.5 Turbo", description: "Fast and efficient" },
      { id: "gpt4", label: "GPT-4", description: "Most capable model" },
      { id: "gpt4o", label: "GPT-4o", description: "Latest optimized model" },
      { id: "gpt4o-mini", label: "GPT-4o Mini", description: "Efficient optimized model" },
      { id: "gpt4-turbo", label: "GPT-4 Turbo", description: "Fast and powerful" },
    ],
    anthropic: [
      { id: "claude3", label: "Claude 3 Opus", description: "Anthropic's premium model" },
      { id: "claude3-sonnet", label: "Claude 3 Sonnet", description: "Balanced performance and efficiency" },
      { id: "claude3-haiku", label: "Claude 3 Haiku", description: "Fast and efficient responses" },
      { id: "claude3.5-sonnet", label: "Claude 3.5 Sonnet", description: "Latest enhanced Sonnet model" },
    ],
    google: [
      { id: "gemini-pro", label: "Gemini Pro", description: "Google's advanced language model" },
      { id: "gemini-ultra", label: "Gemini Ultra", description: "Google's most capable model" },
      { id: "gemini-flash", label: "Gemini Flash", description: "Fast, cost-effective model" },
    ],
    meta: [
      { id: "llama3-70b", label: "Llama 3 70B", description: "Meta's premium open model" },
      { id: "llama3-8b", label: "Llama 3 8B", description: "Smaller efficient model" },
    ],
    mistral: [
      { id: "mistral-large", label: "Mistral Large", description: "Powerful open source model" },
      { id: "mistral-medium", label: "Mistral Medium", description: "Balanced performance model" },
      { id: "mistral-small", label: "Mistral Small", description: "Fast, efficient model" },
    ],
    cohere: [
      { id: "cohere-command", label: "Command", description: "Versatile model for various tasks" },
      { id: "cohere-command-r", label: "Command-R", description: "Enhanced reasoning capabilities" },
    ],
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="openai" className="w-full">
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="openai">OpenAI</TabsTrigger>
          <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
          <TabsTrigger value="google">Google</TabsTrigger>
          <TabsTrigger value="meta">Meta</TabsTrigger>
          <TabsTrigger value="mistral">Mistral</TabsTrigger>
          <TabsTrigger value="cohere">Cohere</TabsTrigger>
        </TabsList>
        
        {Object.entries(modelGroups).map(([provider, models]) => (
          <TabsContent key={provider} value={provider} className="mt-0">
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
          </TabsContent>
        ))}
      </Tabs>

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
