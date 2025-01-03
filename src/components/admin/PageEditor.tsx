import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CustomPage } from '@/types/page';

interface PageEditorProps {
  page?: CustomPage;
  onSave: (data: { title: string; slug: string; content: string; isPublished: boolean }) => void;
  onCancel: () => void;
}

export function PageEditor({ page, onSave, onCancel }: PageEditorProps) {
  const [title, setTitle] = useState(page?.title ?? '');
  const [slug, setSlug] = useState(page?.slug ?? '');
  const [content, setContent] = useState(page?.content ?? '');
  const [isPublished, setIsPublished] = useState(page?.isPublished ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, slug, content, isPublished });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Slug</label>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          title="Lowercase letters, numbers, and hyphens only"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Content</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[200px]"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Switch
          checked={isPublished}
          onCheckedChange={setIsPublished}
          id="published"
        />
        <label htmlFor="published" className="text-sm font-medium">
          Published
        </label>
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