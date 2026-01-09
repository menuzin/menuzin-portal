import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getContent } from '@/lib/content-service';

export const runtime = 'nodejs';

/**
 * GET /api/admin/content?mode=draft|published
 * Get draft or published content (admin only)
 */
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'draft';
    
    if (mode !== 'draft' && mode !== 'published') {
      return NextResponse.json(
        { error: 'Invalid mode. Must be "draft" or "published"' },
        { status: 400 }
      );
    }

    const content = await getContent(mode as 'draft' | 'published');
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}






