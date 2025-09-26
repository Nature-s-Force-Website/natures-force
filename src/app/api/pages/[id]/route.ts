import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase-server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createServerComponentClient();
  
  try {
    const { id } = await params
    
    // Check if user is authenticated admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', success: false },
        { status: 401 }
      );
    }
    
    const pageId = id;    // Check if the page exists and get its details
    const { data: page, error: fetchError } = await supabase
      .from('pages')
      .select('is_homepage, title, slug')
      .eq('id', pageId)
      .single();

    if (fetchError || !page) {
      return NextResponse.json(
        { error: 'Page not found', success: false },
        { status: 404 }
      );
    }

    // Prevent deletion of homepage
    if (page.is_homepage) {
      return NextResponse.json(
        { 
          error: 'Cannot delete homepage. Please set another page as homepage first.',
          success: false 
        },
        { status: 400 }
      );
    }

    // Delete the page
    const { error: deleteError } = await supabase
      .from('pages')
      .delete()
      .eq('id', pageId);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({ 
      message: `Page "${page.title}" deleted successfully`,
      success: true 
    });

  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page', success: false },
      { status: 500 }
    );
  }
}