export interface HomePageSettings {
  title: string;
  subtitle: string;
  showTrending: boolean;
  showWeather: boolean;
  backgroundType: 'color' | 'gradient';
  backgroundColor: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export interface SearchPageSettings {
  resultsPerPage: number;
  showFilters: boolean;
  showThumbnails: boolean;
  layout: 'list' | 'grid';
}

export interface PageCustomization {
  home: HomePageSettings;
  search: SearchPageSettings;
}