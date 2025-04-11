
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, Copy, Key, AlertTriangle } from "lucide-react";

interface ApiKeySettingsProps {
  canUseCustomApiKey: boolean;
}

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ canUseCustomApiKey }) => {
  const [openAIKey, setOpenAIKey] = useState("");
  const [stableDiffusionKey, setStableDiffusionKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAIKeyStatus, setOpenAIKeyStatus] = useState<"valid" | "invalid" | "untested">("untested");
  const [stableDiffusionKeyStatus, setStableDiffusionKeyStatus] = useState<"valid" | "invalid" | "untested">("untested");
  const [copied, setCopied] = useState<string | null>(null);

  // Load stored API keys on component mount
  React.useEffect(() => {
    const storedOpenAIKey = localStorage.getItem("openai_api_key");
    const storedStableDiffusionKey = localStorage.getItem("stable_diffusion_api_key");
    
    if (storedOpenAIKey) {
      setOpenAIKey(storedOpenAIKey);
      setOpenAIKeyStatus("valid");
    }
    
    if (storedStableDiffusionKey) {
      setStableDiffusionKey(storedStableDiffusionKey);
      setStableDiffusionKeyStatus("valid");
    }
  }, []);

  const handleSaveKeys = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate OpenAI API key format
      if (openAIKey && !openAIKey.startsWith("sk-")) {
        setOpenAIKeyStatus("invalid");
        throw new Error("Invalid OpenAI API key format. It should start with 'sk-'");
      } else if (openAIKey) {
        setOpenAIKeyStatus("valid");
        localStorage.setItem("openai_api_key", openAIKey);
      }
      
      // Validate Stable Diffusion API key (basic check)
      if (stableDiffusionKey && stableDiffusionKey.length < 10) {
        setStableDiffusionKeyStatus("invalid");
        throw new Error("Invalid Stable Diffusion API key. It should be at least 10 characters");
      } else if (stableDiffusionKey) {
        setStableDiffusionKeyStatus("valid");
        localStorage.setItem("stable_diffusion_api_key", stableDiffusionKey);
      }
      
      toast.success("API keys saved successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save API keys");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (key: string, type: string) => {
    navigator.clipboard.writeText(key);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
    toast.success(`${type} API key copied to clipboard`);
  };

  const handleRevokeKey = (type: "openai" | "stablediffusion") => {
    if (type === "openai") {
      setOpenAIKey("");
      setOpenAIKeyStatus("untested");
      localStorage.removeItem("openai_api_key");
    } else {
      setStableDiffusionKey("");
      setStableDiffusionKeyStatus("untested");
      localStorage.removeItem("stable_diffusion_api_key");
    }
    toast.success(`${type === "openai" ? "OpenAI" : "Stable Diffusion"} API key removed`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Settings</CardTitle>
          <CardDescription>
            {canUseCustomApiKey 
              ? "Configure your API keys for AI content generation" 
              : "You need to upgrade to Pro+ plan to use custom API keys"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="openai_key">OpenAI API Key</Label>
            <div className="relative">
              <Input
                id="openai_key"
                type="password"
                value={openAIKey}
                onChange={(e) => {
                  setOpenAIKey(e.target.value);
                  setOpenAIKeyStatus("untested");
                }}
                placeholder="sk-..."
                disabled={!canUseCustomApiKey}
                className={`${
                  openAIKeyStatus === "valid" ? "border-green-500 pr-10" : 
                  openAIKeyStatus === "invalid" ? "border-red-500 pr-10" : ""
                }`}
              />
              {openAIKeyStatus === "valid" && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {openAIKeyStatus === "invalid" && (
                <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Used for generating content with GPT models. Get your key from{" "}
              <a 
                href="https://platform.openai.com/account/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-linkedin-primary hover:underline"
              >
                OpenAI Platform
              </a>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stable_diffusion_key">Stable Diffusion API Key</Label>
            <div className="relative">
              <Input
                id="stable_diffusion_key"
                type="password"
                value={stableDiffusionKey}
                onChange={(e) => {
                  setStableDiffusionKey(e.target.value);
                  setStableDiffusionKeyStatus("untested");
                }}
                placeholder="Your Stable Diffusion API key"
                disabled={!canUseCustomApiKey}
                className={`${
                  stableDiffusionKeyStatus === "valid" ? "border-green-500 pr-10" : 
                  stableDiffusionKeyStatus === "invalid" ? "border-red-500 pr-10" : ""
                }`}
              />
              {stableDiffusionKeyStatus === "valid" && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {stableDiffusionKeyStatus === "invalid" && (
                <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Used for generating images. Get your key from{" "}
              <a 
                href="https://stability.ai/platform" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-linkedin-primary hover:underline"
              >
                Stability AI
              </a>
            </p>
          </div>
          
          <div className="pt-2">
            <h3 className="font-medium mb-2">Steps to get Stable Diffusion API access:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm pl-2">
              <li>Create an account on <a href="https://stability.ai" target="_blank" rel="noopener noreferrer" className="text-linkedin-primary hover:underline">Stability AI</a></li>
              <li>Navigate to the API keys section in your account dashboard</li>
              <li>Generate a new API key</li>
              <li>Copy and paste the key above</li>
              <li>Click "Save API Keys" below</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <Button 
            onClick={handleSaveKeys} 
            disabled={isSubmitting || !canUseCustomApiKey}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Saving..." : "Save API Keys"}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRevokeKey("openai")}
              disabled={!openAIKey || !canUseCustomApiKey}
            >
              <Key className="h-4 w-4 mr-1" /> Revoke OpenAI Key
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRevokeKey("stablediffusion")}
              disabled={!stableDiffusionKey || !canUseCustomApiKey}
            >
              <Key className="h-4 w-4 mr-1" /> Revoke SD Key
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApiKeySettings;
