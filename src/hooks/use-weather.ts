import { useState, useEffect } from 'react';
import { fetchWeather } from '@/lib/weather-api';
import type { WeatherCondition } from '@/types/weather';

interface WeatherData {
  temp: number;
  city: string;
  condition: WeatherCondition;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData>({ 
    temp: 0, 
    city: '', 
    condition: 'clear' 
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadWeather() {
      try {
        const data = await fetchWeather();
        setWeather(data);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        // Set default values on error
        setWeather({
          temp: 20,
          city: 'Unknown',
          condition: 'clear'
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadWeather();
  }, []);

  return { weather, isLoading };
}