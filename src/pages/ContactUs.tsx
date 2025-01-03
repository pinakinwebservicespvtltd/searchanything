import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import { getSettings, getContactSettings } from '@/lib/storage';
import { BackToHome } from '@/components/BackToHome';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export function ContactUs() {
  const { siteName } = getSettings();
  const contactInfo = getContactSettings();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background relative p-8">
      <BackToHome />
      
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input placeholder="Your Name" required />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" required />
              </div>
              <div>
                <Input placeholder="Subject" required />
              </div>
              <div>
                <Textarea 
                  placeholder="Your Message" 
                  className="min-h-[150px]" 
                  required 
                />
              </div>
              <Button type="submit" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Support Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.supportHours.days}<br />
                    {contactInfo.supportHours.hours}
                  </p>
                </div>
              </div>

              {(contactInfo.socialMedia.twitter || 
                contactInfo.socialMedia.facebook || 
                contactInfo.socialMedia.linkedin) && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Follow Us</h3>
                  <div className="flex gap-4">
                    {contactInfo.socialMedia.twitter && (
                      <a 
                        href={contactInfo.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {contactInfo.socialMedia.facebook && (
                      <a 
                        href={contactInfo.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Facebook
                      </a>
                    )}
                    {contactInfo.socialMedia.linkedin && (
                      <a 
                        href={contactInfo.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}