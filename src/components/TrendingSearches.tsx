import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrendingItem {
  query: string;
  region: string;
}

interface TrendingSearchesProps {
  searches: TrendingItem[];
}

export function TrendingSearches({ searches }: TrendingSearchesProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 px-4 animate-fade-in-up delay-150">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary/70" />
        <h2 className="text-lg font-medium">Trending Searches</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {searches.map((item) => (
          <button
            key={item.query}
            onClick={() => navigate(`/search?q=${encodeURIComponent(item.query)}`)}
            className="p-3 text-sm text-left rounded-lg border border-neutral-200 
                     dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 
                     transition-colors duration-200"
          >
            {item.query}
          </button>
        ))}
      </div>
    </div>
  );
}