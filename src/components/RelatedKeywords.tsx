import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchRelatedKeywords } from '@/lib/related-keywords';

interface RelatedKeywordsProps {
  query: string;
}

export function RelatedKeywords({ query }: RelatedKeywordsProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadKeywords() {
      setIsLoading(true);
      const data = await fetchRelatedKeywords(query);
      setKeywords(data);
      setIsLoading(false);
    }

    if (query) {
      loadKeywords();
    }
  }, [query]);

  if (isLoading) {
    return (
      <Card className="p-4 space-y-2 mt-4">
        <Skeleton className="h-4 w-1/2" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-8" />
        ))}
      </Card>
    );
  }

  if (keywords.length === 0) return null;

  return (
    <Card className="p-4 mt-4">
      <h3 className="text-sm font-medium mb-3">Related Searches</h3>
      <div className="space-y-2">
        {keywords.map((keyword) => (
          <Button
            key={keyword}
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => navigate(`/search?q=${encodeURIComponent(keyword)}`)}
          >
            <Search className="w-4 h-4 mr-2 text-muted-foreground" />
            {keyword}
          </Button>
        ))}
      </div>
    </Card>
  );
}