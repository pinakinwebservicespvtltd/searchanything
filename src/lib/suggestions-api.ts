import { getCache, setCache } from './cache';

const SUGGESTIONS_CACHE_KEY = 'search_suggestions';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fallback suggestions for common queries
const fallbackSuggestions: Record<string, string[]> = {
  'n': ['NBA', 'Netflix', 'Nintendo', 'News', 'NFL'],
  'nba': ['NBA playoffs', 'NBA standings', 'NBA schedule', 'NBA scores', 'NBA draft'],
  'net': ['Netflix', 'Netflix movies', 'Netflix series', 'Netherlands', 'Net worth'],
  // Add more fallbacks as needed
};

function getFallbackSuggestions(query: string): string[] {
  const key = query.toLowerCase();
  return fallbackSuggestions[key] || 
         Object.entries(fallbackSuggestions)
           .filter(([k]) => k.startsWith(key))
           .flatMap(([, v]) => v)
           .slice(0, 5);
}

// Use JSONP for cross-origin requests with timeout
function jsonp(url: string, timeout = 3000): Promise<any> {
  return new Promise((resolve, reject) => {
    const callbackName = 'jsonp_' + Math.random().toString(36).slice(2);
    let timeoutId: number;

    // Create script element
    const script = document.createElement('script');
    script.src = `${url}&callback=${callbackName}`;
    
    // Define the callback function
    (window as any)[callbackName] = (data: any) => {
      cleanup();
      resolve(data);
    };
    
    // Handle errors and timeout
    script.onerror = () => {
      cleanup();
      reject(new Error('JSONP request failed'));
    };

    timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('JSONP request timeout'));
    }, timeout);

    // Cleanup function
    function cleanup() {
      document.body.removeChild(script);
      delete (window as any)[callbackName];
      window.clearTimeout(timeoutId);
    }
    
    // Add script to document
    document.body.appendChild(script);
  });
}

export async function fetchSuggestions(query: string): Promise<string[]> {
  if (!query.trim()) return [];

  try {
    // Check cache first
    const cached = getCache<string[]>(`${SUGGESTIONS_CACHE_KEY}_${query}`);
    if (cached) return cached;

    const params = new URLSearchParams({
      client: 'chrome',
      q: query,
      hl: 'en'
    });

    const data = await jsonp(`https://suggestqueries.google.com/complete/search?${params}`);
    const suggestions = (data[1] || []).slice(0, 8);

    // Cache successful results
    if (suggestions.length > 0) {
      setCache(`${SUGGESTIONS_CACHE_KEY}_${query}`, suggestions);
    }

    return suggestions;
  } catch (error) {
    console.error('Failed to fetch suggestions:', error);
    // Return fallback suggestions on error
    return getFallbackSuggestions(query);
  }
}