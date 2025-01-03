import { SearchResult } from "@/types/search";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
            <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No results found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <article 
          key={index} 
          className="group border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
        >
          <a
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="text-sm text-emerald-700 dark:text-emerald-400 mb-1">
              {result.displayLink}
            </div>
            <h2 className="text-lg text-blue-700 dark:text-blue-400 group-hover:underline mb-1 font-medium">
              {result.title}
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
              {result.snippet}
            </p>
          </a>
        </article>
      ))}
    </div>
  );
}