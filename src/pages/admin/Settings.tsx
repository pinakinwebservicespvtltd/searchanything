import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchEngineSettings } from '@/components/admin/SearchEngineSettings';
import { SiteSettings } from '@/components/admin/SiteSettings';
import { ContactSettings } from '@/components/admin/ContactSettings';

export function Settings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <Tabs defaultValue="site">
        <TabsList className="mb-4">
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="search">Search Engine</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="site">
          <SiteSettings />
        </TabsContent>
        
        <TabsContent value="search">
          <SearchEngineSettings />
        </TabsContent>

        <TabsContent value="contact">
          <ContactSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}