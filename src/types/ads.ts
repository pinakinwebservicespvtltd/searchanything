export interface AdStats {
  impressions: number;
  clicks: number;
  lastUpdated: string;
}

export interface SearchAd {
  id: string;
  title: string;
  description: string;
  displayUrl: string;
  landingUrl: string;
  keywords: string[];
  isActive: boolean;
  stats: AdStats;
  createdAt: string;
  updatedAt: string;
}

export type CreateAdInput = Omit<SearchAd, 'id' | 'stats' | 'createdAt' | 'updatedAt'>;
export type UpdateAdInput = Partial<Omit<SearchAd, 'id'>>;

export type UrlType = 'web' | 'tel';

export function isValidUrl(url: string, type: UrlType = 'web'): boolean {
  if (type === 'tel') {
    return /^tel:[+]?[0-9\-\s()]+$/.test(url);
  }
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}