import { prisma } from './prisma';
import { SiteContent, SiteContentSchema } from './content-schema';
import { getDefaultContent } from './default-content';

/**
 * Ensure default content exists in database
 */
export async function ensureDefaultContent() {
  const existing = await prisma.siteContent.findUnique({
    where: { pageKey: 'home' },
  });

  if (!existing) {
    const defaultContent = getDefaultContent();
    await prisma.siteContent.create({
      data: {
        pageKey: 'home',
        draft: defaultContent as any,
        published: defaultContent as any,
      },
    });
  }
}

/**
 * Get content (draft or published)
 */
export async function getContent(mode: 'draft' | 'published'): Promise<SiteContent> {
  const content = await prisma.siteContent.findUnique({
    where: { pageKey: 'home' },
  });

  if (!content) {
    // Create default if doesn't exist
    await ensureDefaultContent();
    const updated = await prisma.siteContent.findUnique({
      where: { pageKey: 'home' },
    });
    if (!updated) {
      throw new Error('Failed to create default content');
    }
    return (mode === 'draft' ? updated.draft : updated.published) as SiteContent;
  }

  const contentData = mode === 'draft' ? content.draft : content.published;
  
  // Validate and return
  return SiteContentSchema.parse(contentData);
}

/**
 * Save draft content
 */
export async function saveDraft(draftContent: SiteContent): Promise<void> {
  // Validate content
  const validated = SiteContentSchema.parse(draftContent);

  await prisma.siteContent.upsert({
    where: { pageKey: 'home' },
    create: {
      pageKey: 'home',
      draft: validated as any,
      published: getDefaultContent() as any, // Initialize published with defaults
    },
    update: {
      draft: validated as any,
    },
  });
}

/**
 * Publish draft content (copy draft to published)
 */
export async function publishDraft(): Promise<void> {
  const content = await prisma.siteContent.findUnique({
    where: { pageKey: 'home' },
  });

  if (!content) {
    throw new Error('No draft content found. Please save a draft first.');
  }

  // Validate draft before publishing
  const validated = SiteContentSchema.parse(content.draft);

  await prisma.siteContent.update({
    where: { pageKey: 'home' },
    data: {
      published: validated as any,
    },
  });
}






