import { WikiSummary } from './WikiSummary';
import { RelatedKeywords } from './RelatedKeywords';

interface SearchSidebarProps {
  query: string;
}

export function SearchSidebar({ query }: SearchSidebarProps) {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="sticky top-24 space-y-4">
        <RelatedKeywords query={query} />
        <WikiSummary query={query} />
      </div>
    </div>
  );
}