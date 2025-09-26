import { createServerComponentClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createServerComponentClient();
    
    const { data: metadata, error } = await supabase
      .from('site_settings')
      .select('data')
      .eq('setting_type', 'metadata')
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching metadata:', error);
      return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
    }

    return NextResponse.json(metadata?.data || {});
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerComponentClient();
    const metadataData = await request.json();

    const { error } = await supabase
      .from('site_settings')
      .update({
        data: metadataData,
        updated_at: new Date().toISOString()
      })
      .eq('setting_type', 'metadata');

    if (error) {
      console.error('Error updating metadata:', error);
      return NextResponse.json({ error: 'Failed to update metadata' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Metadata updated successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}