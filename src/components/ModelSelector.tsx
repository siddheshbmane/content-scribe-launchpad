
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

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
  onApiKeyChange
}) => {
  return (
    <div className="space-y-4">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an AI model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt3.5">GPT-3.5 Turbo</SelectItem>
          <SelectItem value="gpt4" disabled={!canUseCustomApiKey}>
            GPT-4 (Pro+ Only)
          </SelectItem>
          <SelectItem value="claude" disabled={!canUseCustomApiKey}>
            Claude 3 (Pro+ Only)
          </SelectItem>
        </SelectContent>
      </Select>
      
      {canUseCustomApiKey && (
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="apiKey" className="mr-2">OpenAI API Key</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-3">
                  <p>Enter your own OpenAI API key to use your account for content generation. Your API key is stored securely and never shared.</p>
                  <p className="mt-2 text-xs">You can find your API key in your OpenAI account dashboard.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="apiKey"
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Your API key is stored securely and used only for your content generation requests.
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
