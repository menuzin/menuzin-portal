import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { saveDraft } from '@/lib/content-service';
import { SiteContentSchema } from '@/lib/content-schema';

export const runtime = 'nodejs';

/**
 * PUT /api/admin/content/draft
 * Save draft content (admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    // Check admin auth
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session')?.value;
    
    if (!adminSession || adminSession !== 'valid') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Log received client logos for debugging
    if (body.clients?.logos) {
      console.log('Received client logos:', JSON.stringify(body.clients.logos.map((l: any) => ({ name: l.name, url: l.url || 'empty/undefined' })), null, 2));
    }
    
    // Normalize empty strings to undefined for optional URL fields
    if (body.brand?.logoUrl === '') body.brand.logoUrl = undefined;
    if (body.hero?.heroImageUrl === '') body.hero.heroImageUrl = undefined;
    if (body.guestExperience?.imageUrl === '') body.guestExperience.imageUrl = undefined;
    if (body.ownerPortal?.imageUrl === '') body.ownerPortal.imageUrl = undefined;
    
    // Normalize client logos - handle empty strings and null values
    if (body.clients?.logos && Array.isArray(body.clients.logos)) {
      body.clients.logos = body.clients.logos.map((logo: any) => {
        const normalizedLogo = { ...logo };
        // Convert empty string, null, undefined, or falsy values - delete property entirely
        if (normalizedLogo.url === '' || normalizedLogo.url === null || normalizedLogo.url === undefined || !normalizedLogo.url) {
          delete normalizedLogo.url;
        }
        // Normalize link field - delete if empty
        if (normalizedLogo.link === '' || normalizedLogo.link === null || normalizedLogo.link === undefined || !normalizedLogo.link) {
          delete normalizedLogo.link;
        }
        return normalizedLogo;
      });
    }
    
    // Validate content
    const validatedContent = SiteContentSchema.parse(body);
    
    // Save draft
    await saveDraft(validatedContent);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving draft:', error);
    
    // Handle validation errors
    if (error.name === 'ZodError' || error.issues) {
      const zodError = error.name === 'ZodError' ? error : { issues: error.issues || error.errors || [] };
      console.error('Validation errors:', JSON.stringify(zodError.issues || zodError.errors, null, 2));
      return NextResponse.json(
        { 
          error: 'Validation error', 
          details: zodError.issues || zodError.errors,
          message: 'One or more fields failed validation. Check the details array for specific errors.'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}






