import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from 'lucide-react';
import { fetchWikiSummary } from '@/lib/wiki-api';

interface WikiSummaryProps {
  query: string;
}

export function WikiSummary({ query }: WikiSummaryProps) {
  const [summary, setSummary] = useState<{
    title: string;
    extract: string;
    thumbnail?: { source: string; width: number; height: number };
    url: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      setIsLoading(true);
      const data = await fetchWikiSummary(query);
      setSummary(data);
      setIsLoading(false);
    }

    if (query) {
      loadSummary();
    }
  }, [query]);

  if (isLoading) {
    return (
      <Card className="p-4 space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </Card>
    );
  }

  if (!summary) return null;

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">{summary.title}</h3>
      
      {summary.thumbnail && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <img
            src={summary.thumbnail.source}
            alt={summary.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-5">
        {summary.extract}
      </p>
      
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => window.open(summary.url, '_blank')}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Read more on Wikipedia
      </Button>
    </Card>
  );
}