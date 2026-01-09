import { NextRequest, NextResponse } from 'next/server';
import { getContent } from '@/lib/content-service';

export const runtime = 'nodejs';

/**
 * GET /api/content?preview=1
 * Get published content (public), or draft if preview=1 (public route)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const preview = searchParams.get('preview') === '1';
    
    // Use draft if preview mode, otherwise published
    const mode = preview ? 'draft' : 'published';
    const content = await getContent(mode);
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error fetching public content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}






