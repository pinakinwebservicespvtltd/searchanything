import { useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { searchGoogle } from "@/lib/search-api";
import { SearchResults as SearchResultsList } from "@/components/SearchResults";
import { Pagination } from "@/components/Pagination";
import { SearchSidebar } from "@/components/SearchSidebar";
import { SearchAds } from "@/components/SearchAds";
import { SearchResponse } from "@/types/search";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const [searchResponse, setSearchResponse] = useState<SearchResponse>({
    items: [],
    totalResults: 0,
    currentPage: 1
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const response = await searchGoogle(query, currentPage);
        setSearchResponse(response);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [query, currentPage]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <ThemeSwitcher />
      <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-10">
        <div className="container mx-auto py-3 px-4 flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Search className="h-6 w-6" />
            <span className="font-semibold">Search</span>
          </Link>
          <SearchBar initialQuery={query} />
        </div>
      </header>
      <main className="container mx-auto py-6 px-4">
        <div className="flex gap-8">
          <div className="flex-1 max-w-3xl">
            {!isLoading && searchResponse.items.length > 0 && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                About {searchResponse.totalResults.toLocaleString()} results
              </p>
            )}
            
            {/* Search Ads Section */}
            <div className="mb-8">
              <SearchAds query={query} />
            </div>

            {/* Search Results */}
            <SearchResultsList results={searchResponse.items} isLoading={isLoading} />
            <Pagination 
              currentPage={currentPage}
              totalResults={searchResponse.totalResults}
            />
          </div>
          
          <SearchSidebar query={query} />
        </div>
      </main>
    </div>
  );
}