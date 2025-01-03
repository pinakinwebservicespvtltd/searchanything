import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HomeCustomization } from '@/components/admin/HomeCustomization';
import { SearchCustomization } from '@/components/admin/SearchCustomization';

export function Customization() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Page Customization</h2>
      
      <Tabs defaultValue="home">
        <TabsList className="mb-4">
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="search">Search Page</TabsTrigger>
        </TabsList>
        
        <TabsContent value="home">
          <HomeCustomization />
        </TabsContent>
        
        <TabsContent value="search">
          <SearchCustomization />
        </TabsContent>
      </Tabs>
    </div>
  );
}