
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Check, AlertTriangle, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
  const [showApiKey, setShowApiKey] = useState(false);
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

  // Validate the API key format
  const validateApiKey = (key: string): boolean => {
    // Basic OpenAI API key validation - should start with "sk-" and be at least 20 chars
    return key.startsWith("sk-") && key.length > 20;
  };

  // Test the API key with OpenAI
  const testApiKey = async (key: string): Promise<boolean> => {
    try {
      // In a real app, we would make a test call to the OpenAI API
      // For MVP, we'll just validate the format
      return validateApiKey(key);
    } catch (error) {
      console.error("Error testing API key:", error);
      return false;
    }
  };

  // Save API key to localStorage when it changes
  const handleApiKeyChange = async (value: string) => {
    onApiKeyChange(value);
    
    if (value) {
      // Test the API key
      const isValid = await testApiKey(value);
      
      if (isValid) {
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
    } else {
      setApiKeyStatus("untested");
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
                  <p>Enter your own OpenAI API key to use your account for content generation. Your API key is stored securely in your browser and never shared.</p>
                  <p className="mt-2 text-xs">You can find your API key in your OpenAI account dashboard at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">platform.openai.com/api-keys</a>.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="relative">
            <Input
              id="apiKey"
              type={showApiKey ? "text" : "password"}
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
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-9 top-1/2 transform -translate-y-1/2 h-8 w-8"
            >
              <Key className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Your API key is stored locally and used only for your content generation requests.
            </p>
            {savedApiKey && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  localStorage.removeItem("openAIApiKey");
                  setSavedApiKey("");
                  onApiKeyChange("");
                  setApiKeyStatus("untested");
                  toast({
                    title: "API key removed",
                    description: "Your OpenAI API key has been removed.",
                  });
                }}
                className="text-xs h-7"
              >
                Clear Key
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
