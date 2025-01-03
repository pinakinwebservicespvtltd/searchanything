import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageEditor } from '@/components/admin/PageEditor';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { getPages, createPage, updatePage, deletePage } from '@/lib/pages';
import { useToast } from '@/hooks/use-toast';
import type { CustomPage } from '@/types/page';

export function Pages() {
  const [pages, setPages] = useState(getPages);
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleSave = (data: { title: string; slug: string; content: string; isPublished: boolean }) => {
    if (editingPage) {
      const updated = updatePage(editingPage.id, data);
      if (updated) {
        setPages(getPages());
        setEditingPage(null);
        toast({ title: 'Success', description: 'Page updated successfully' });
      }
    } else {
      createPage(data);
      setPages(getPages());
      setIsCreating(false);
      toast({ title: 'Success', description: 'Page created successfully' });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      deletePage(id);
      setPages(getPages());
      toast({ title: 'Success', description: 'Page deleted successfully' });
    }
  };

  if (isCreating || editingPage) {
    return (
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {isCreating ? 'Create Page' : 'Edit Page'}
        </h2>
        <PageEditor
          page={editingPage ?? undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsCreating(false);
            setEditingPage(null);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Custom Pages</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Page
        </Button>
      </div>

      <div className="space-y-4">
        {pages.map((page) => (
          <div
            key={page.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm"
          >
            <div>
              <h3 className="font-medium">{page.title}</h3>
              <p className="text-sm text-muted-foreground">/{page.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(`/${page.slug}`, '_blank')}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingPage(page)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(page.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {pages.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No custom pages yet. Create one to get started.
          </p>
        )}
      </div>
    </div>
  );
}