import { useParams, Navigate } from 'react-router-dom';
import { getPages } from '@/lib/pages';

export function CustomPage() {
  const { slug } = useParams();
  const pages = getPages();
  const page = pages.find(p => p.slug === slug && p.isPublished);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <article className="prose dark:prose-invert mx-auto">
          <h1>{page.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </article>
      </main>
    </div>
  );
}