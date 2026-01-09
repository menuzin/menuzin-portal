import { ensureDefaultContent, getContent } from "@/lib/content-service";
import ContentRenderer from "@/components/ContentRenderer";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ preview?: string }>;
}) {
  // Ensure default content exists
  await ensureDefaultContent();
  
  // Await searchParams before accessing properties (Next.js 15+)
  const params = await searchParams;
  
  // Check if preview mode
  const preview = params?.preview === '1';
  
  // Fetch content (draft if preview, otherwise published)
  const content = await getContent(preview ? 'draft' : 'published');

  return <ContentRenderer content={content} />;
}