import { getCache, setCache } from './cache';

interface LocationData {
  latitude: number;
  longitude: number;
  country_code: string;
  city: string;
}

const LOCATION_CACHE_KEY = 'user_location';

export async function getUserLocation(): Promise<LocationData> {
  // Check cache first
  const cached = getCache<LocationData>(LOCATION_CACHE_KEY);
  if (cached) return cached;

  try {
    // Try primary service
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('Primary location service failed');
    
    const data = await response.json();
    const location = {
      latitude: data.latitude,
      longitude: data.longitude,
      country_code: data.country_code,
      city: data.city
    };
    
    setCache(LOCATION_CACHE_KEY, location);
    return location;
  } catch (error) {
    try {
      // Fallback to secondary service
      const response = await fetch('https://ipwho.is');
      if (!response.ok) throw new Error('Secondary location service failed');
      
      const data = await response.json();
      const location = {
        latitude: data.latitude,
        longitude: data.longitude,
        country_code: data.country_code,
        city: data.city
      };
      
      setCache(LOCATION_CACHE_KEY, location);
      return location;
    } catch (error) {
      console.error('Error getting user location:', error);
      // Default to New York if all services fail
      return {
        latitude: 40.7128,
        longitude: -74.0060,
        country_code: 'US',
        city: 'New York'
      };
    }
  }
}