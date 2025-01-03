import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Suggestions } from "@/components/Suggestions";
import { useSuggestions } from "@/hooks/use-suggestions";

interface SearchBarProps {
  large?: boolean;
  initialQuery?: string;
}

export function SearchBar({ large = false, initialQuery = '' }: SearchBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    activeIndex,
    handleKeyNav
  } = useSuggestions(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleKeyNav('down');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleKeyNav('up');
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const selectedSuggestion = suggestions[activeIndex];
      if (selectedSuggestion) {
        setQuery(selectedSuggestion);
        setShowSuggestions(false);
        navigate(`/search?q=${encodeURIComponent(selectedSuggestion)}`);
      }
    }
  };

  // Only show suggestions on the home page
  const shouldShowSuggestions = location.pathname === '/' && showSuggestions;

  return (
    <div className="w-full max-w-2xl relative">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => location.pathname === '/' && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className={`${large ? 'h-14 text-lg' : 'h-10'}`}
        />
        <Button type="submit" className={`${large ? 'h-14 px-6' : 'h-10'}`}>
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
      <Suggestions
        suggestions={suggestions}
        query={query}
        onSelect={setQuery}
        visible={shouldShowSuggestions}
        activeIndex={activeIndex}
        onKeyNav={handleKeyNav}
      />
    </div>
  );
}