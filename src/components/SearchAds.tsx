import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink, Phone } from 'lucide-react';
import { getMatchingAds, recordAdClick } from '@/lib/ads';
import type { SearchAd } from '@/types/ads';

interface SearchAdsProps {
  query: string;
}

export function SearchAds({ query }: SearchAdsProps) {
  const [ads, setAds] = useState<SearchAd[]>([]);

  useEffect(() => {
    const matchingAds = getMatchingAds(query);
    setAds(matchingAds);
  }, [query]);

  const handleAdClick = (ad: SearchAd) => {
    recordAdClick(ad.id);
  };

  if (ads.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Sponsored</p>
      {ads.map((ad) => (
        <Card key={ad.id} className="p-4">
          <a
            href={ad.landingUrl}
            target={ad.landingUrl.startsWith('tel:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="block group"
            onClick={() => handleAdClick(ad)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {ad.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {ad.description}
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  {ad.landingUrl.startsWith('tel:') ? (
                    <>
                      <Phone className="w-3 h-3" />
                      {ad.displayUrl}
                    </>
                  ) : (
                    ad.displayUrl
                  )}
                </p>
              </div>
              {!ad.landingUrl.startsWith('tel:') && (
                <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          </a>
        </Card>
      ))}
    </div>
  );
}