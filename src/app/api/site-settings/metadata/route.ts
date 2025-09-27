import { createServerComponentClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

// Allow this route to be dynamic for client-side requests but provide defaults for static generation
export const dynamic = 'force-dynamic';

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
      // Return default metadata for static generation compatibility
      return NextResponse.json(getDefaultMetadata());
    }

    return NextResponse.json(metadata?.data || getDefaultMetadata());
  } catch (error) {
    console.error('Unexpected error:', error);
    // Return default metadata for static generation compatibility
    return NextResponse.json(getDefaultMetadata());
  }
}

function getDefaultMetadata() {
  return {
    title: "NaturesForce Contract Packing - Professional Packaging Services",
    description: "Leading contract packing services provider offering professional packaging, assembly, and logistics solutions for businesses across industries.",
    keywords: "contract packing, packaging services, product assembly, logistics, quality control",
    author: "NaturesForce Contract Packing",
    robots: "index, follow",
    openGraph: {
      title: "NaturesForce Contract Packing",
      description: "Professional contract packing services for your business needs",
      type: "website",
      locale: "en_US"
    }
  };
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