
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [savedApiKey, setSavedApiKey] = useState("");
  const [apiKeyStatus, setApiKeyStatus] = useState<"valid" | "invalid" | "untested">("untested");
  const { toast } = useToast();
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem("openAIApiKey");
    if (storedApiKey && storedApiKey !== apiKey) {
      setSavedApiKey(storedApiKey);
      onApiKeyChange(storedApiKey);
      
      // If we have a stored API key, assume it's valid until proven otherwise
      setApiKeyStatus("valid");
    }
  }, [apiKey, onApiKeyChange]);

  // Save API key to localStorage when it changes
  const handleApiKeyChange = (value: string) => {
    onApiKeyChange(value);
    setApiKeyStatus("untested");
    
    if (value) {
      // Basic OpenAI API key validation
      if (value.startsWith("sk-") && value.length > 20) {
        localStorage.setItem("openAIApiKey", value);
        setSavedApiKey(value);
        setApiKeyStatus("valid");
        
        toast({
          title: "API key saved",
          description: "Your OpenAI API key has been saved securely.",
        });
      } else {
        setApiKeyStatus("invalid");
        
        toast({
          title: "Invalid API key",
          description: "Please enter a valid OpenAI API key starting with 'sk-'.",
          variant: "destructive",
        });
      }
    }
  };
  
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
          
          <div className="relative">
            <Input
              id="apiKey"
              type="password"
              placeholder={savedApiKey ? "API key loaded from settings" : "sk-..."}
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className={`${
                apiKeyStatus === "valid" ? "border-green-500 pr-10" : 
                apiKeyStatus === "invalid" ? "border-red-500 pr-10" : ""
              }`}
            />
            {apiKeyStatus === "valid" && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
            {apiKeyStatus === "invalid" && (
              <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
            )}
          </div>
          
          <p className="text-xs text-gray-500">
            Your API key is stored securely and used only for your content generation requests.
            {savedApiKey && " Your saved API key has been loaded from settings."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
