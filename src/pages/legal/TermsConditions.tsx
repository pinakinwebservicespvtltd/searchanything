import { getSettings } from '@/lib/storage';
import { Card } from '@/components/ui/card';
import { BackToHome } from '@/components/BackToHome';

export function TermsConditions() {
  const { siteName } = getSettings();

  return (
    <div className="min-h-screen bg-background relative p-8">
      <BackToHome />
      
      <h1 className="text-3xl font-bold text-center mb-8">Terms & Conditions</h1>
      
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using {siteName}, you accept and agree to be bound by these 
            Terms and Conditions and our Privacy Policy.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Responsibilities</h2>
          <p className="text-muted-foreground">
            Users are responsible for ensuring their use of {siteName} complies with applicable 
            laws and regulations. Any misuse of the service is strictly prohibited.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content, features, and functionality of {siteName} are owned by us and 
            protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            {siteName} provides its services "as is" and makes no warranties, expressed or implied, 
            regarding the accuracy, reliability, or availability of the service.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. Continued use of {siteName} 
            after changes constitutes acceptance of the modified terms.
          </p>
        </Card>
      </div>
    </div>
  );
}