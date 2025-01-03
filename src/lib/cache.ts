interface CacheItem<T> {
  value: T;
  timestamp: number;
}

export function getCache<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const cached: CacheItem<T> = JSON.parse(item);
    const now = Date.now();
    
    // Cache expires after 30 minutes
    if (now - cached.timestamp > 30 * 60 * 1000) {
      localStorage.removeItem(key);
      return null;
    }
    
    return cached.value;
  } catch {
    return null;
  }
}

export function setCache<T>(key: string, value: T): void {
  const item: CacheItem<T> = {
    value,
    timestamp: Date.now()
  };
  localStorage.setItem(key, JSON.stringify(item));
}