import { getUserLocation } from './location';

interface TrendingItem {
  query: string;
  region: string;
}

export async function fetchTrendingSearches(): Promise<TrendingItem[]> {
  try {
    const location = await getUserLocation();
    
    // In production, this would make an API call with the location
    // For now, returning mock data based on location
    const trendingByRegion: Record<string, TrendingItem[]> = {
      US: [
        { query: "Super Bowl", region: "US" },
        { query: "Taylor Swift", region: "US" },
        { query: "NBA Playoffs", region: "US" },
        { query: "iPhone 15", region: "US" },
        { query: "ChatGPT", region: "US" },
        { query: "Tesla", region: "US" }
      ],
      UK: [
        { query: "Premier League", region: "UK" },
        { query: "Eurovision", region: "UK" },
        { query: "Royal Family", region: "UK" },
        { query: "Love Island", region: "UK" },
        { query: "British Weather", region: "UK" },
        { query: "London Events", region: "UK" }
      ],
      // Add more regions as needed
    };

    return trendingByRegion[location] || trendingByRegion.US;
  } catch (error) {
    console.error('Error fetching trending searches:', error);
    return [];
  }
}