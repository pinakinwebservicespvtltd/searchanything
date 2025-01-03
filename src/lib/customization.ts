import { PageCustomization, HomePageSettings, SearchPageSettings } from '@/types/customization';

const CUSTOMIZATION_KEY = 'page_customization';

const defaultHome: HomePageSettings = {
  title: 'Search Anything',
  subtitle: 'Fast, reliable, and privacy-focused search engine',
  showTrending: true,
  showWeather: true,
  backgroundType: 'color',
  backgroundColor: 'bg-background'
};

const defaultSearch: SearchPageSettings = {
  resultsPerPage: 10,
  showFilters: true,
  showThumbnails: true,
  layout: 'list'
};

export function getCustomization(): PageCustomization {
  const stored = localStorage.getItem(CUSTOMIZATION_KEY);
  const defaults = { home: defaultHome, search: defaultSearch };
  if (!stored) return defaults;
  
  try {
    return { ...defaults, ...JSON.parse(stored) };
  } catch {
    return defaults;
  }
}

export function saveCustomization(settings: PageCustomization): void {
  localStorage.setItem(CUSTOMIZATION_KEY, JSON.stringify(settings));
}