import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackToHome() {
  return (
    <Link to="/" className="absolute top-4 left-4">
      <Button variant="ghost" size="sm" className="gap-1">
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </Button>
    </Link>
  );
}