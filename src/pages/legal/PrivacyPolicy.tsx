import { getSettings } from '@/lib/storage';
import { Card } from '@/components/ui/card';
import { BackToHome } from '@/components/BackToHome';

export function PrivacyPolicy() {
  const { siteName } = getSettings();

  return (
    <div className="min-h-screen bg-background relative p-8">
      <BackToHome />
      
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
      
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Information Collection</h2>
          <p className="text-muted-foreground">
            {siteName} collects information that you provide directly to us, including search queries, 
            device information, and usage data to improve our services and user experience.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Data Usage</h2>
          <p className="text-muted-foreground">
            We use collected information to provide, maintain, and improve our services, 
            develop new features, and protect {siteName} and our users.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Data Protection</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cookies</h2>
          <p className="text-muted-foreground">
            We use cookies and similar technologies to enhance your experience, 
            understand usage patterns, and deliver personalized content.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
          <p className="text-muted-foreground">
            Our service may contain links to third-party websites. We are not responsible 
            for the privacy practices or content of these external sites.
          </p>
        </Card>
      </div>
    </div>
  );
}