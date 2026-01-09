import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { publishDraft } from '@/lib/content-service';

export const runtime = 'nodejs';

/**
 * POST /api/admin/content/publish
 * Publish draft content (copy draft to published) - admin only
 */
export async function POST(request: NextRequest) {
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

    await publishDraft();
    
    console.log('Content published successfully');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error publishing content:', error);
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}






