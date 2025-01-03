import { getUserLocation } from './location';
import { getCache, setCache } from './cache';
import { WeatherCondition } from '@/types/weather';

interface WeatherData {
  temp: number;
  city: string;
  condition: WeatherCondition;
}

const WEATHER_CACHE_KEY = 'weather_data';

function mapWeatherCode(code: number): WeatherCondition {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  if (code === 0) return 'clear';
  if (code === 1) return 'partly-cloudy';
  if (code === 2) return 'cloudy';
  if (code === 3) return 'overcast';
  if ([45, 48].includes(code)) return 'foggy';
  if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle';
  if ([61, 63, 65, 66, 67].includes(code)) return 'rain';
  if ([71, 73, 75, 77].includes(code)) return 'snow';
  if ([80, 81, 82].includes(code)) return 'rain';
  if ([85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'thunderstorm';
  return 'clear';
}

export async function fetchWeather(): Promise<WeatherData> {
  const cached = getCache<WeatherData>(WEATHER_CACHE_KEY);
  if (cached) return cached;

  try {
    const { latitude, longitude, city } = await getUserLocation();
    
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    
    if (!response.ok) throw new Error('Primary weather service failed');
    
    const data = await response.json();
    const weather = {
      temp: Math.round(data.current_weather.temperature),
      city,
      condition: mapWeatherCode(data.current_weather.weathercode)
    };
    
    setCache(WEATHER_CACHE_KEY, weather);
    return weather;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return { 
      temp: 20, 
      city: 'Unknown',
      condition: 'clear'
    };
  }
}