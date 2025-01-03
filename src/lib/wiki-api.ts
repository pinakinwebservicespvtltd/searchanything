import { getCache, setCache } from './cache';

interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  url: string;
}

const WIKI_CACHE_KEY = 'wiki_summaries';

export async function fetchWikiSummary(query: string): Promise<WikiSummary | null> {
  // Check cache first
  const cached = getCache<WikiSummary>(`${WIKI_CACHE_KEY}_${query}`);
  if (cached) return cached;

  try {
    const searchResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
    );
    
    if (!searchResponse.ok) return null;
    
    const searchData = await searchResponse.json();
    const firstResult = searchData.query.search[0];
    
    if (!firstResult) return null;

    const summaryResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstResult.title)}`
    );
    
    if (!summaryResponse.ok) return null;
    
    const summaryData = await summaryResponse.json();
    
    const summary: WikiSummary = {
      title: summaryData.title,
      extract: summaryData.extract,
      thumbnail: summaryData.thumbnail,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(summaryData.title)}`
    };

    // Cache the result
    setCache(`${WIKI_CACHE_KEY}_${query}`, summary);
    
    return summary;
  } catch (error) {
    console.error('Error fetching Wikipedia summary:', error);
    return null;
  }
}