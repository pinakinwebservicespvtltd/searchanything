import { getCache, setCache } from './cache';

const RELATED_CACHE_KEY = 'related_keywords';

// Fallback related terms for common categories
const fallbackRelated: Record<string, string[]> = {
  'technology': ['software', 'hardware', 'programming', 'artificial intelligence', 'cybersecurity'],
  'science': ['physics', 'chemistry', 'biology', 'astronomy', 'mathematics'],
  'entertainment': ['movies', 'music', 'television', 'gaming', 'celebrities'],
  'sports': ['football', 'basketball', 'soccer', 'tennis', 'baseball'],
  'news': ['world news', 'politics', 'business', 'technology news', 'sports news'],
  'health': ['nutrition', 'fitness', 'mental health', 'medicine', 'wellness'],
  'education': ['online courses', 'universities', 'learning', 'teaching', 'academic'],
  'business': ['entrepreneurship', 'marketing', 'finance', 'management', 'startups']
};

function generateRelatedTerms(query: string): string[] {
  // Check if query matches any category
  const category = Object.keys(fallbackRelated).find(cat => 
    query.toLowerCase().includes(cat.toLowerCase())
  );
  
  if (category) {
    return fallbackRelated[category];
  }

  // Generate variations of the query
  const words = query.toLowerCase().split(' ');
  const related: string[] = [];

  // Add "how to" variant
  if (!query.startsWith('how')) {
    related.push(`how to ${query}`);
  }

  // Add "what is" variant
  if (!query.startsWith('what')) {
    related.push(`what is ${query}`);
  }

  // Add "best" variant
  if (!query.startsWith('best')) {
    related.push(`best ${query}`);
  }

  // Add year variant
  const currentYear = new Date().getFullYear();
  related.push(`${query} ${currentYear}`);

  // Add "near me" variant if not already present
  if (!query.includes('near')) {
    related.push(`${query} near me`);
  }

  return related.slice(0, 5);
}

export async function fetchRelatedKeywords(query: string): Promise<string[]> {
  if (!query.trim()) return [];

  // Check cache first
  const cached = getCache<string[]>(`${RELATED_CACHE_KEY}_${query}`);
  if (cached) return cached;

  const related = generateRelatedTerms(query);
  
  // Cache the results
  setCache(`${RELATED_CACHE_KEY}_${query}`, related);
  
  return related;
}