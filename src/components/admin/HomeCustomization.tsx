import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getCustomization, saveCustomization } from '@/lib/customization';
import type { HomePageSettings } from '@/types/customization';

export function HomeCustomization() {
  const { toast } = useToast();
  const { home: initialSettings } = getCustomization();
  const [settings, setSettings] = useState<HomePageSettings>(initialSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = getCustomization();
    saveCustomization({ ...current, home: settings });
    toast({
      title: 'Success',
      description: 'Home page settings saved successfully'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Page Title</Label>
          <Input
            value={settings.title}
            onChange={(e) => setSettings({ ...settings, title: e.target.value })}
          />
        </div>

        <div>
          <Label>Subtitle</Label>
          <Input
            value={settings.subtitle}
            onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <Label>Background Style</Label>
          <RadioGroup
            value={settings.backgroundType}
            onValueChange={(value) => 
              setSettings({ ...settings, backgroundType: value as 'color' | 'gradient' })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="color" id="color" />
              <Label htmlFor="color">Solid Color</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gradient" id="gradient" />
              <Label htmlFor="gradient">Gradient</Label>
            </div>
          </RadioGroup>
        </div>

        {settings.backgroundType === 'color' ? (
          <div>
            <Label>Background Color</Label>
            <Input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
              className="h-10 w-20"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Gradient From</Label>
              <Input
                type="color"
                value={settings.gradientFrom}
                onChange={(e) => setSettings({ ...settings, gradientFrom: e.target.value })}
                className="h-10 w-20"
              />
            </div>
            <div>
              <Label>Gradient To</Label>
              <Input
                type="color"
                value={settings.gradientTo}
                onChange={(e) => setSettings({ ...settings, gradientTo: e.target.value })}
                className="h-10 w-20"
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="trending">Show Trending Searches</Label>
            <Switch
              id="trending"
              checked={settings.showTrending}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, showTrending: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="weather">Show Weather Widget</Label>
            <Switch
              id="weather"
              checked={settings.showWeather}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, showWeather: checked })
              }
            />
          </div>
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
}