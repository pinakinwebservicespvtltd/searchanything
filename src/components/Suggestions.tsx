import { useEffect, useRef, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface SuggestionsProps {
  suggestions: string[];
  query: string;
  onSelect: (suggestion: string) => void;
  visible: boolean;
  activeIndex: number;
  onKeyNav: (direction: 'up' | 'down') => void;
}

export function Suggestions({ 
  suggestions, 
  query, 
  onSelect, 
  visible, 
  activeIndex,
  onKeyNav 
}: SuggestionsProps) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onSelect('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onSelect]);

  if (!visible || suggestions.length === 0) return null;

  return (
    <div 
      ref={ref}
      className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden z-50"
    >
      <div className="py-1">
        {suggestions.map((suggestion, index) => {
          // Split suggestion to highlight matching part
          const lowerSuggestion = suggestion.toLowerCase();
          const lowerQuery = query.toLowerCase();
          const matchIndex = lowerSuggestion.indexOf(lowerQuery);
          
          let before = suggestion;
          let match = '';
          let after = '';
          
          if (matchIndex >= 0) {
            before = suggestion.slice(0, matchIndex);
            match = suggestion.slice(matchIndex, matchIndex + query.length);
            after = suggestion.slice(matchIndex + query.length);
          }

          return (
            <button
              key={index}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                activeIndex === index 
                  ? 'bg-neutral-100 dark:bg-neutral-700' 
                  : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
              onClick={() => {
                onSelect(suggestion);
                navigate(`/search?q=${encodeURIComponent(suggestion)}`);
              }}
              onMouseEnter={() => onKeyNav('down')}
            >
              <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
              <span className="text-neutral-700 dark:text-neutral-200">
                {before}
                <span className="font-semibold">{match}</span>
                {after}
              </span>
              <div className="ml-auto flex items-center gap-1 text-xs text-neutral-400">
                <ArrowUpIcon className="w-3 h-3" />
                <ArrowDownIcon className="w-3 h-3" />
                <span>to navigate</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}