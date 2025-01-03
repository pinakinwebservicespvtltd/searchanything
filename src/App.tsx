import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { SearchResults } from '@/pages/SearchResults';
import { CustomPage } from '@/pages/CustomPage';
import { Login } from '@/pages/admin/Login';
import { Dashboard } from '@/pages/admin/Dashboard';
import { Settings } from '@/pages/admin/Settings';
import { Customization } from '@/pages/admin/Customization';
import { Pages } from '@/pages/admin/Pages';
import { Security } from '@/pages/admin/Security';
import { Ads } from '@/pages/admin/Ads';
import { AboutUs } from '@/pages/AboutUs';
import { ContactUs } from '@/pages/ContactUs';
import { PrivacyPolicy } from '@/pages/legal/PrivacyPolicy';
import { TermsConditions } from '@/pages/legal/TermsConditions';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Settings />} />
            <Route path="customization" element={<Customization />} />
            <Route path="pages" element={<Pages />} />
            <Route path="security" element={<Security />} />
            <Route path="ads" element={<Ads />} />
          </Route>
          <Route path="/:slug" element={<CustomPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;