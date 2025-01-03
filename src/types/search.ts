export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
}

export interface SearchResponse {
  items: SearchResult[];
  totalResults: number;
  currentPage: number;
}