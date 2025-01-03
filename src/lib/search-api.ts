import { SearchResult, SearchResponse } from '@/types/search';
import { getSearchEngineSettings } from '@/lib/storage';

export async function searchGoogle(query: string, page: number = 1): Promise<SearchResponse> {
  try {
    const settings = getSearchEngineSettings();
    
    if (!settings.apiKey || !settings.searchEngineId) {
      throw new Error('Search engine not configured');
    }

    const startIndex = (page - 1) * settings.resultsPerPage + 1;
    
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${settings.apiKey}&cx=${settings.searchEngineId}&q=${encodeURIComponent(query)}&start=${startIndex}&num=${settings.resultsPerPage}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Search API error:', error);
      throw new Error(error.error?.message || 'Search request failed');
    }

    const data = await response.json();
    
    return {
      items: data.items?.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        displayLink: item.displayLink,
      })) || [],
      totalResults: parseInt(data.searchInformation?.totalResults || '0'),
      currentPage: page,
    };
  } catch (error) {
    console.error('Search error:', error);
    return {
      items: [],
      totalResults: 0,
      currentPage: page,
      error: error instanceof Error ? error.message : 'An error occurred'
    };
  }
}