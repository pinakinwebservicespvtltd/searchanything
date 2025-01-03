import { SearchBar } from "@/components/SearchBar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { TrendingSearches } from "@/components/TrendingSearches";
import { WeatherDateTime } from "@/components/WeatherDateTime";
import { Search } from "lucide-react";
import { useTrending } from "@/hooks/use-trending";

export function Home() {
  const { trending, isLoading } = useTrending();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background transition-colors duration-300">
      <WeatherDateTime />
      <ThemeSwitcher />
      <div className="text-center mb-12 animate-fade-in">
        <div className="mb-8 flex items-center justify-center">
          <div className="p-6 rounded-full bg-primary/5">
            <Search className="h-20 w-20 text-primary" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Search Anything
        </h1>
        <p className="text-muted-foreground text-lg">
          Fast, reliable, and privacy-focused search engine
        </p>
      </div>
      <div className="w-full max-w-2xl px-4 animate-fade-in-up">
        <SearchBar large />
      </div>
      {!isLoading && <TrendingSearches searches={trending} />}
    </div>
  );
}