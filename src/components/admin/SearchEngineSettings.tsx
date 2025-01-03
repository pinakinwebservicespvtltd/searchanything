import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getSearchEngineSettings, saveSearchEngineSettings } from '@/lib/storage';
import type { SearchEngineSettings } from '@/types/settings';

export function SearchEngineSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SearchEngineSettings>({
    apiKey: '',
    searchEngineId: '',
    resultsPerPage: 10
  });
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    const savedSettings = getSearchEngineSettings();
    setSettings(savedSettings);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      saveSearchEngineSettings(settings);
      toast({
        title: 'Success',
        description: 'Search engine settings updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Alert variant="warning" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          These settings are required for the search functionality. You can get them from the 
          <a 
            href="https://programmablesearchengine.google.com/about/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline ml-1"
          >
            Google Programmable Search Engine
          </a>
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div>
          <Label>Google API Key</Label>
          <div className="relative">
            <Input
              type={showApiKey ? 'text' : 'password'}
              value={settings.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              required
              placeholder="Enter your Google API Key"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showApiKey ? 'Hide API Key' : 'Show API Key'}</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Your Google Custom Search API key from the Google Cloud Console
          </p>
        </div>

        <div>
          <Label>Search Engine ID</Label>
          <Input
            value={settings.searchEngineId}
            onChange={(e) => setSettings({ ...settings, searchEngineId: e.target.value })}
            required
            placeholder="Enter your Search Engine ID"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Your Google Custom Search Engine ID (cx) from the Programmable Search Engine
          </p>
        </div>

        <div>
          <Label>Results Per Page</Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={settings.resultsPerPage}
            onChange={(e) => setSettings({ 
              ...settings, 
              resultsPerPage: parseInt(e.target.value) || 10
            })}
            required
          />
          <p className="text-sm text-muted-foreground mt-1">
            Number of search results to display per page (maximum 10)
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit">Save Changes</Button>
        <Button 
          type="button" 
          variant="outline"
          onClick={() => window.open('https://console.cloud.google.com/apis/credentials', '_blank')}
        >
          Get API Key
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.open('https://programmablesearchengine.google.com/controlpanel/all', '_blank')}
        >
          Manage Search Engines
        </Button>
      </div>
    </form>
  );
}