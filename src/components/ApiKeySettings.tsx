
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { usePlan } from "@/contexts/PlanContext";
import { Key, Save, EyeOff, Eye, Check, AlertTriangle } from "lucide-react";

const ApiKeySettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<"valid" | "invalid" | "untested">("untested");
  const { toast } = useToast();
  const { canUseCustomApiKey } = usePlan();
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem("openAIApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setApiKeyStatus("valid");
    }
  }, []);
  
  const handleSaveApiKey = () => {
    if (!apiKey) {
      // If clearing the API key
      localStorage.removeItem("openAIApiKey");
      setApiKeyStatus("untested");
      toast({
        title: "API Key Cleared",
        description: "Your OpenAI API key has been removed from settings.",
      });
      return;
    }
    
    // Basic validation for OpenAI API key
    if (!apiKey.startsWith("sk-") || apiKey.length < 20) {
      setApiKeyStatus("invalid");
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key starting with 'sk-'.",
        variant: "destructive",
      });
      return;
    }
    
    // Save API key to localStorage
    localStorage.setItem("openAIApiKey", apiKey);
    setApiKeyStatus("valid");
    
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved successfully.",
    });
  };
  
  const validateApiKey = (value: string) => {
    setApiKey(value);
    
    if (!value) {
      setApiKeyStatus("untested");
      return;
    }
    
    // Basic validation
    if (value.startsWith("sk-") && value.length > 20) {
      setApiKeyStatus("valid");
    } else {
      setApiKeyStatus("invalid");
    }
  };
  
  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };
  
  if (!canUseCustomApiKey) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Manage your API keys for content generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 text-amber-800 p-4 rounded-md border border-amber-200">
            <p className="text-sm">
              Custom API keys are only available with a Pro+ plan. Upgrade your plan to use your own OpenAI API key.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-5 w-5" />
          API Keys
        </CardTitle>
        <CardDescription>
          Manage your API keys for content generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai-api-key">OpenAI API Key</Label>
          <div className="relative flex">
            <Input
              id="openai-api-key"
              type={showApiKey ? "text" : "password"}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => validateApiKey(e.target.value)}
              className={`flex-1 ${
                apiKeyStatus === "valid" ? "border-green-500 pr-10" : 
                apiKeyStatus === "invalid" ? "border-red-500 pr-10" : ""
              }`}
            />
            {apiKeyStatus === "valid" && (
              <Check className="absolute right-12 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
            {apiKeyStatus === "invalid" && (
              <AlertTriangle className="absolute right-12 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleShowApiKey}
              className="ml-2"
              type="button"
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-xs text-gray-500">
              Your API key is required for content and image generation. 
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-linkedin-primary hover:underline ml-1"
              >
                Get your OpenAI API key
              </a>
            </p>
            {apiKeyStatus === "valid" && (
              <p className="text-xs text-green-600 flex items-center">
                <Check className="h-3 w-3 mr-1" /> Your API key is valid and ready to use
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveApiKey} className="flex items-center">
          <Save className="mr-2 h-4 w-4" />
          Save API Key
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiKeySettings;
