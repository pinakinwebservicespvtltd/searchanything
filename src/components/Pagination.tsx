import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  resultsPerPage?: number;
}

export function Pagination({ 
  currentPage, 
  totalResults, 
  resultsPerPage = 10 
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  
  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {[...Array(Math.min(5, totalPages))].map((_, i) => {
        let pageNumber: number;
        if (totalPages <= 5) {
          pageNumber = i + 1;
        } else if (currentPage <= 3) {
          pageNumber = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNumber = totalPages - 4 + i;
        } else {
          pageNumber = currentPage - 2 + i;
        }

        return (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? "default" : "outline"}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}