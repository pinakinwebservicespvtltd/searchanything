import { Clock } from "lucide-react";
import { useWeather } from "@/hooks/use-weather";
import { useDateTime } from "@/hooks/use-datetime";
import { WeatherIcon } from "@/components/WeatherIcon";

export function WeatherDateTime() {
  const { weather, isLoading: weatherLoading } = useWeather();
  const { dateTime } = useDateTime();

  return (
    <div className="fixed top-4 left-4 flex items-center gap-4 text-sm animate-fade-in">
      <div className="flex items-center gap-2 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full px-4 py-2 transition-colors">
        <Clock className="w-4 h-4" />
        <time className="tabular-nums">{dateTime}</time>
      </div>
      {!weatherLoading && (
        <div className="flex items-center gap-2 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full px-4 py-2 transition-colors">
          <WeatherIcon condition={weather.condition} className="w-4 h-4" />
          <span>{weather.temp}°C in {weather.city}</span>
        </div>
      )}
    </div>
  );
}