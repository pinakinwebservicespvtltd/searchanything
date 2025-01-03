import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AdEditor } from '@/components/admin/AdEditor';
import { Plus, Edit, Trash2, Eye, Play, Pause, BarChart2, RotateCcw } from 'lucide-react';
import { getAds, createAd, updateAd, deleteAd, toggleAdStatus, resetAdStats } from '@/lib/ads';
import { useToast } from '@/hooks/use-toast';
import type { SearchAd } from '@/types/ads';

export function Ads() {
  const [ads, setAds] = useState(getAds);
  const [editingAd, setEditingAd] = useState<SearchAd | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleSave = (data: { 
    title: string; 
    description: string; 
    displayUrl: string;
    landingUrl: string;
    keywords: string[]; 
    isActive: boolean 
  }) => {
    if (editingAd) {
      const updated = updateAd(editingAd.id, data);
      if (updated) {
        setAds(getAds());
        setEditingAd(null);
        toast({ title: 'Success', description: 'Ad updated successfully' });
      }
    } else {
      createAd(data);
      setAds(getAds());
      setIsCreating(false);
      toast({ title: 'Success', description: 'Ad created successfully' });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      deleteAd(id);
      setAds(getAds());
      toast({ title: 'Success', description: 'Ad deleted successfully' });
    }
  };

  const handleToggleStatus = (id: string) => {
    const updated = toggleAdStatus(id);
    if (updated) {
      setAds(getAds());
      toast({
        title: 'Success',
        description: `Ad ${updated.isActive ? 'activated' : 'paused'} successfully`
      });
    }
  };

  const handleResetStats = (id: string) => {
    if (window.confirm('Are you sure you want to reset the statistics for this ad?')) {
      const updated = resetAdStats(id);
      if (updated) {
        setAds(getAds());
        toast({
          title: 'Success',
          description: 'Ad statistics reset successfully'
        });
      }
    }
  };

  if (isCreating || editingAd) {
    return (
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {isCreating ? 'Create Ad' : 'Edit Ad'}
        </h2>
        <AdEditor
          ad={editingAd ?? undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsCreating(false);
            setEditingAd(null);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Search Ads</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Ad
        </Button>
      </div>

      <div className="space-y-4">
        {ads.map((ad) => {
          const impressions = ad.stats?.impressions ?? 0;
          const clicks = ad.stats?.clicks ?? 0;
          const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : '0';

          return (
            <div
              key={ad.id}
              className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{ad.title}</h3>
                  <p className="text-sm text-muted-foreground">{ad.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {ad.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BarChart2 className="w-4 h-4" />
                      <span>{impressions.toLocaleString()} impressions</span>
                    </div>
                    <div>
                      {clicks.toLocaleString()} clicks ({ctr}% CTR)
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2"
                      onClick={() => handleResetStats(ad.id)}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Reset Stats
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleStatus(ad.id)}
                  >
                    {ad.isActive ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(ad.landingUrl, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingAd(ad)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(ad.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <span className={`${ad.isActive ? 'text-green-500' : 'text-red-500'}`}>
                  {ad.isActive ? '● Active' : '● Paused'}
                </span>
              </div>
            </div>
          );
        })}

        {ads.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No ads created yet. Create one to get started.
          </p>
        )}
      </div>
    </div>
  );
}