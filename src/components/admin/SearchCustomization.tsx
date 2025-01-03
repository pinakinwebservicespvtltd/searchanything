import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getCustomization, saveCustomization } from '@/lib/customization';
import type { SearchPageSettings } from '@/types/customization';

export function SearchCustomization() {
  const { toast } = useToast();
  const { search: initialSettings } = getCustomization();
  const [settings, setSettings] = useState<SearchPageSettings>(initialSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = getCustomization();
    saveCustomization({ ...current, search: settings });
    toast({
      title: 'Success',
      description: 'Search page settings saved successfully'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Results Per Page</Label>
          <Input
            type="number"
            min="5"
            max="50"
            value={settings.resultsPerPage}
            onChange={(e) => setSettings({ 
              ...settings, 
              resultsPerPage: parseInt(e.target.value) 
            })}
          />
        </div>

        <div className="space-y-4">
          <Label>Layout Style</Label>
          <RadioGroup
            value={settings.layout}
            onValueChange={(value) => 
              setSettings({ ...settings, layout: value as 'list' | 'grid' })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="list" id="list" />
              <Label htmlFor="list">List View</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="grid" id="grid" />
              <Label htmlFor="grid">Grid View</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="filters">Show Search Filters</Label>
            <Switch
              id="filters"
              checked={settings.showFilters}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, showFilters: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="thumbnails">Show Result Thumbnails</Label>
            <Switch
              id="thumbnails"
              checked={settings.showThumbnails}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, showThumbnails: checked })
              }
            />
          </div>
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
}