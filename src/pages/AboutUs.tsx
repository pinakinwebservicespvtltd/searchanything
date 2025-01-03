import { getSettings } from '@/lib/storage';
import { Search, Shield, Zap } from 'lucide-react';
import { BackToHome } from '@/components/BackToHome';
import { Card } from '@/components/ui/card';

export function AboutUs() {
  const { siteName } = getSettings();

  return (
    <div className="min-h-screen bg-background relative p-8">
      <BackToHome />
      
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
      
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 mb-8">
          <p className="text-lg text-center text-muted-foreground mb-8">
            {siteName} is a modern search engine built with a focus on speed, privacy, 
            and user experience. Our mission is to help users find exactly what they're 
            looking for while respecting their privacy.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Get instant results with our optimized search algorithm
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Privacy Focused</h3>
              <p className="text-sm text-muted-foreground">
                Your searches are private and your data is protected
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Results</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent ranking for more relevant search results
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}