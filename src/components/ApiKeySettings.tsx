
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { usePlan } from "@/contexts/PlanContext";
import { Key, Save, EyeOff, Eye } from "lucide-react";

const ApiKeySettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();
  const { canUseCustomApiKey } = usePlan();
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem("openAIApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);
  
  const handleSaveApiKey = () => {
    if (!apiKey) {
      // If clearing the API key
      localStorage.removeItem("openAIApiKey");
      toast({
        title: "API Key Cleared",
        description: "Your OpenAI API key has been removed from settings.",
      });
      return;
    }
    
    // Basic validation for OpenAI API key
    if (!apiKey.startsWith("sk-") || apiKey.length < 10) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key starting with 'sk-'.",
        variant: "destructive",
      });
      return;
    }
    
    // Save API key to localStorage
    localStorage.setItem("openAIApiKey", apiKey);
    
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved successfully.",
    });
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
          <div className="flex">
            <Input
              id="openai-api-key"
              type={showApiKey ? "text" : "password"}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
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
          <p className="text-xs text-gray-500">
            Your API key is stored locally and used for content generation. 
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-linkedin-primary hover:underline ml-1"
            >
              Get your OpenAI API key
            </a>
          </p>
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
