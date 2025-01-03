import { Link } from 'react-router-dom';
import { getSettings } from '@/lib/storage';
import { Home } from 'lucide-react';

export function Footer() {
  const { siteName } = getSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <Link 
            to="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact Us
          </Link>
          <Link 
            to="/privacy" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>
        
        <p className="text-sm text-center text-muted-foreground">
          © {currentYear} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}