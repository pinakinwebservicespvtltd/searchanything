import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SearchAd } from '@/types/ads';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AdEditorProps {
  ad?: SearchAd;
  onSave: (data: { 
    title: string; 
    description: string; 
    displayUrl: string;
    landingUrl: string;
    keywords: string[]; 
    isActive: boolean 
  }) => void;
  onCancel: () => void;
}

export function AdEditor({ ad, onSave, onCancel }: AdEditorProps) {
  const [title, setTitle] = useState(ad?.title ?? '');
  const [description, setDescription] = useState(ad?.description ?? '');
  const [displayUrl, setDisplayUrl] = useState(ad?.displayUrl ?? '');
  const [landingUrl, setLandingUrl] = useState(ad?.landingUrl ?? '');
  const [keywords, setKeywords] = useState(ad?.keywords.join(', ') ?? '');
  const [isActive, setIsActive] = useState(ad?.isActive ?? true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic URL validation
    const url = landingUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('tel:')) {
      setError('Landing URL must start with http://, https://, or tel:');
      return;
    }

    onSave({
      title,
      description,
      displayUrl,
      landingUrl: url,
      keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
      isActive
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Ad Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={70}
        />
      </div>
      
      <div>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={150}
        />
      </div>
      
      <div>
        <Label>Display URL</Label>
        <Input
          value={displayUrl}
          onChange={(e) => setDisplayUrl(e.target.value)}
          required
          placeholder="example.com/products or +1 (555) 123-4567"
        />
        <p className="text-sm text-muted-foreground mt-1">
          This is how the URL or phone number will appear in the ad
        </p>
      </div>

      <div>
        <Label>Landing URL</Label>
        <Input
          value={landingUrl}
          onChange={(e) => {
            setLandingUrl(e.target.value);
            setError('');
          }}
          required
          placeholder="https://example.com/page or tel:+15551234567"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Full URL where users will be directed or phone number with tel: prefix
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <Label>Keywords (comma-separated)</Label>
        <Input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          required
          placeholder="e.g., technology, software, programming"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Switch
          checked={isActive}
          onCheckedChange={setIsActive}
          id="active"
        />
        <Label htmlFor="active">Active</Label>
      </div>
      
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}