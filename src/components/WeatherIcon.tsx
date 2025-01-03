import {
  Sun,
  Cloud,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  type LucideProps
} from 'lucide-react';
import { type WeatherCondition } from '@/types/weather';

interface WeatherIconProps extends Omit<LucideProps, 'ref'> {
  condition?: WeatherCondition;
}

const icons: Record<WeatherCondition, typeof Sun> = {
  'clear': Sun,
  'partly-cloudy': CloudSun,
  'cloudy': Cloud,
  'overcast': Cloud,
  'foggy': CloudFog,
  'drizzle': CloudDrizzle,
  'rain': CloudRain,
  'snow': CloudSnow,
  'thunderstorm': CloudLightning
};

export function WeatherIcon({ condition = 'clear', ...props }: WeatherIconProps) {
  const Icon = icons[condition];
  return Icon ? <Icon {...props} /> : <Sun {...props} />;
}