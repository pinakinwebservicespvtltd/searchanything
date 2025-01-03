import { SearchAd, CreateAdInput, UpdateAdInput, AdStats } from '@/types/ads';

const ADS_STORAGE_KEY = 'search_ads';

export function getAds(): SearchAd[] {
  try {
    const stored = localStorage.getItem(ADS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function createAd(input: CreateAdInput): SearchAd {
  const ads = getAds();
  const now = new Date().toISOString();
  
  const newAd: SearchAd = {
    ...input,
    id: crypto.randomUUID(),
    stats: {
      impressions: 0,
      clicks: 0,
      lastUpdated: now
    },
    createdAt: now,
    updatedAt: now,
  };
  
  ads.push(newAd);
  localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(ads));
  return newAd;
}

export function updateAd(id: string, input: UpdateAdInput): SearchAd | null {
  const ads = getAds();
  const index = ads.findIndex(ad => ad.id === id);
  
  if (index === -1) return null;
  
  const updatedAd = {
    ...ads[index],
    ...input,
    stats: {
      ...ads[index].stats,
      ...(input.stats || {}),
    },
    updatedAt: new Date().toISOString(),
  };
  
  ads[index] = updatedAd;
  localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(ads));
  return updatedAd;
}

export function resetAdStats(id: string): SearchAd | null {
  const ads = getAds();
  const ad = ads.find(ad => ad.id === id);
  
  if (!ad) return null;
  
  return updateAd(id, {
    stats: {
      impressions: 0,
      clicks: 0,
      lastUpdated: new Date().toISOString()
    }
  });
}

export function toggleAdStatus(id: string): SearchAd | null {
  const ads = getAds();
  const ad = ads.find(ad => ad.id === id);
  
  if (!ad) return null;
  
  return updateAd(id, { isActive: !ad.isActive });
}

export function recordAdImpression(id: string): void {
  const ads = getAds();
  const ad = ads.find(ad => ad.id === id);
  
  if (!ad) return;
  
  updateAd(id, {
    stats: {
      ...ad.stats,
      impressions: (ad.stats?.impressions || 0) + 1,
      lastUpdated: new Date().toISOString()
    }
  });
}

export function recordAdClick(id: string): void {
  const ads = getAds();
  const ad = ads.find(ad => ad.id === id);
  
  if (!ad) return;
  
  updateAd(id, {
    stats: {
      ...ad.stats,
      clicks: (ad.stats?.clicks || 0) + 1,
      lastUpdated: new Date().toISOString()
    }
  });
}

export function deleteAd(id: string): boolean {
  const ads = getAds();
  const filtered = ads.filter(ad => ad.id !== id);
  
  if (filtered.length === ads.length) return false;
  
  localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function getMatchingAds(query: string): SearchAd[] {
  const ads = getAds();
  const searchTerms = query.toLowerCase().split(' ');
  
  const matchingAds = ads.filter(ad => 
    ad.isActive && 
    ad.keywords.some(keyword => 
      searchTerms.some(term => 
        keyword.toLowerCase().includes(term) || 
        term.includes(keyword.toLowerCase())
      )
    )
  );

  // Record impressions for matching ads
  matchingAds.forEach(ad => recordAdImpression(ad.id));
  
  return matchingAds;
}