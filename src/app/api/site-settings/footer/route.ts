import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  const supabase = await createServerComponentClient();
  
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('setting_type', 'footer')
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return NextResponse.json({ 
      data: data?.data || null,
      success: true 
    });
  } catch (error) {
    console.error('Error fetching footer settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer settings', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createServerComponentClient();
  
  try {
    const body = await request.json();
    const { data: footerData } = body;

    // Check if user is authenticated admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    // Upsert footer settings
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        setting_type: 'footer',
        data: footerData,
        is_active: true,
        updated_by: user.id,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'setting_type'
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ 
      data: data.data,
      success: true 
    });
  } catch (error) {
    console.error('Error updating footer settings:', error);
    return NextResponse.json(
      { error: 'Failed to update footer settings', success: false },
      { status: 500 }
    );
  }
}