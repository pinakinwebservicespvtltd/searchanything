import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getSettings, saveSettings } from '@/lib/storage';
import type { SiteSettings as SiteSettingsType } from '@/types/settings';

export function SiteSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettingsType>(getSettings());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      saveSettings(settings);
      toast({
        title: 'Success',
        description: 'Site settings updated successfully'
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
      <div className="space-y-4">
        <div>
          <Label>Site Name</Label>
          <Input
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label>SEO Title</Label>
          <Input
            value={settings.seoTitle}
            onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label>SEO Description</Label>
          <Input
            value={settings.seoDescription}
            onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label>SEO Keywords</Label>
          <Input
            value={settings.seoKeywords}
            onChange={(e) => setSettings({ ...settings, seoKeywords: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label>Favicon URL</Label>
          <Input
            value={settings.favicon}
            onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Logo Type</Label>
          <select 
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={settings.logo.type}
            onChange={(e) => setSettings({
              ...settings,
              logo: { ...settings.logo, type: e.target.value as 'text' | 'image' }
            })}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>

        <div>
          <Label>{settings.logo.type === 'text' ? 'Logo Text' : 'Logo URL'}</Label>
          <Input
            value={settings.logo.content}
            onChange={(e) => setSettings({
              ...settings,
              logo: { ...settings.logo, content: e.target.value }
            })}
            required
          />
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
}