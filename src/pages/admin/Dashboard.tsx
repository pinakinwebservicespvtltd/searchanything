import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { 
  Settings as SettingsIcon, 
  FileText, 
  Shield, 
  Palette,
  LogOut,
  MessageSquareMore
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <nav className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            <span className="font-semibold">Admin Dashboard</span>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8 flex gap-8">
        <aside className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            <Link
              to="/admin"
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                isActive('/admin') 
                  ? "bg-neutral-100 dark:bg-neutral-800 text-primary"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              <SettingsIcon className="w-4 h-4" />
              Settings
            </Link>
            <Link
              to="/admin/customization"
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                isActive('/admin/customization')
                  ? "bg-neutral-100 dark:bg-neutral-800 text-primary"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              <Palette className="w-4 h-4" />
              Customization
            </Link>
            <Link
              to="/admin/pages"
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                isActive('/admin/pages')
                  ? "bg-neutral-100 dark:bg-neutral-800 text-primary"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              <FileText className="w-4 h-4" />
              Pages
            </Link>
            <Link
              to="/admin/ads"
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                isActive('/admin/ads')
                  ? "bg-neutral-100 dark:bg-neutral-800 text-primary"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              <MessageSquareMore className="w-4 h-4" />
              Search Ads
            </Link>
            <Link
              to="/admin/security"
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                isActive('/admin/security')
                  ? "bg-neutral-100 dark:bg-neutral-800 text-primary"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              <Shield className="w-4 h-4" />
              Security
            </Link>
          </nav>
        </aside>
        
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}