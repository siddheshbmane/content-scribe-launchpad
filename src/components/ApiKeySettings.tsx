
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertTriangle, Key, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeySettingsProps {
  serviceName: string;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  keyPrefix?: string;
  minLength?: number;
  description?: string;
  learnMoreUrl?: string;
}

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({
  serviceName,
  apiKey,
  onApiKeyChange,
  keyPrefix = "sk-",
  minLength = 20,
  description,
  learnMoreUrl
}) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<"valid" | "invalid" | "untested">("untested");
  const { toast } = useToast();

  // Validate key on mount or when it changes
  useEffect(() => {
    if (apiKey) {
      validateApiKey(apiKey);
    }
  }, [apiKey]);

  const validateApiKey = (key: string) => {
    // Basic API key validation
    if (key.startsWith(keyPrefix) && key.length >= minLength) {
      setApiKeyStatus("valid");
      return true;
    } else if (key) {
      setApiKeyStatus("invalid");
      return false;
    } else {
      setApiKeyStatus("untested");
      return false;
    }
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    onApiKeyChange(newKey);
    
    // Validate input
    const isValid = validateApiKey(newKey);
    
    if (newKey && isValid) {
      // Store in localStorage
      localStorage.setItem(serviceName.toLowerCase().replace(/\s+/g, '') + "ApiKey", newKey);
      
      toast({
        title: `${serviceName} API Key Saved`,
        description: `Your ${serviceName} API key has been saved securely.`,
      });
    }
  };

  const handleClearApiKey = () => {
    onApiKeyChange("");
    setApiKeyStatus("untested");
    localStorage.removeItem(serviceName.toLowerCase().replace(/\s+/g, '') + "ApiKey");
    
    toast({
      title: `${serviceName} API Key Removed`,
      description: `Your ${serviceName} API key has been removed.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${serviceName.toLowerCase()}-api-key`} className="text-base font-medium">
          {serviceName} API Key
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      
      <div className="relative">
        <Input
          id={`${serviceName.toLowerCase()}-api-key`}
          type={showApiKey ? "text" : "password"}
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder={`${keyPrefix}...`}
          className={`pr-20 ${
            apiKeyStatus === "valid" ? "border-green-500" : 
            apiKeyStatus === "invalid" ? "border-red-500" : ""
          }`}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex">
          <Button 
            variant="ghost" 
            size="icon" 
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="h-7 w-7 mr-1"
          >
            <Key className="h-3.5 w-3.5" />
          </Button>
          
          {apiKeyStatus === "valid" && (
            <span className="h-7 w-7 flex items-center justify-center text-green-500">
              <Check className="h-4 w-4" />
            </span>
          )}
          
          {apiKeyStatus === "invalid" && (
            <span className="h-7 w-7 flex items-center justify-center text-red-500">
              <AlertTriangle className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Your API key is stored locally and never shared
        </p>
        
        {apiKey && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearApiKey}
            className="h-7 text-xs"
          >
            Clear Key
          </Button>
        )}
      </div>
      
      {learnMoreUrl && (
        <Alert variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
            <AlertDescription className="text-sm">
              <a 
                href={learnMoreUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Learn how to get a {serviceName} API key
              </a>
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default ApiKeySettings;
