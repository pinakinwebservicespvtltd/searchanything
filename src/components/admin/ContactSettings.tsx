import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getContactSettings, saveContactSettings } from '@/lib/storage';
import type { ContactSettings as ContactSettingsType } from '@/types/settings';

export function ContactSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ContactSettingsType>(getContactSettings());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      saveContactSettings(settings);
      toast({
        title: 'Success',
        description: 'Contact settings updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save contact settings',
        variant: 'destructive'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Support Email</Label>
          <Input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label>Address</Label>
          <Input
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Support Days</Label>
            <Input
              value={settings.supportHours.days}
              onChange={(e) => setSettings({
                ...settings,
                supportHours: { ...settings.supportHours, days: e.target.value }
              })}
              required
            />
          </div>
          <div>
            <Label>Support Hours</Label>
            <Input
              value={settings.supportHours.hours}
              onChange={(e) => setSettings({
                ...settings,
                supportHours: { ...settings.supportHours, hours: e.target.value }
              })}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Social Media (Optional)</Label>
          <div>
            <Input
              placeholder="Twitter URL"
              value={settings.socialMedia.twitter || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialMedia: { ...settings.socialMedia, twitter: e.target.value }
              })}
            />
          </div>
          <div>
            <Input
              placeholder="Facebook URL"
              value={settings.socialMedia.facebook || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialMedia: { ...settings.socialMedia, facebook: e.target.value }
              })}
            />
          </div>
          <div>
            <Input
              placeholder="LinkedIn URL"
              value={settings.socialMedia.linkedin || ''}
              onChange={(e) => setSettings({
                ...settings,
                socialMedia: { ...settings.socialMedia, linkedin: e.target.value }
              })}
            />
          </div>
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
}