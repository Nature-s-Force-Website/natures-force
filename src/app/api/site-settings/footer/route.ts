import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase-server';

// Allow this route to be dynamic for client-side requests but provide defaults for static generation
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerComponentClient();
    
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('setting_type', 'footer')
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching footer settings:', error);
      return NextResponse.json({ 
        data: getDefaultFooterData(),
        success: true 
      });
    }

    return NextResponse.json({ 
      data: data?.data || getDefaultFooterData(),
      success: true 
    });
  } catch (error) {
    console.error('Error fetching footer settings:', error);
    // Return default data for static generation compatibility
    return NextResponse.json({ 
      data: getDefaultFooterData(),
      success: true 
    });
  }
}

function getDefaultFooterData() {
  return {
    logo: {
      src: "/logo.png",
      alt: "NaturesForce Contract Packing",
      width: 150,
      height: 50
    },
    description: "Professional contract packing services for your business needs.",
    sections: [
      {
        title: "Services",
        links: [
          { label: "Contract Packing", href: "/services/contract-packing" },
          { label: "Product Assembly", href: "/services/assembly" },
          { label: "Quality Control", href: "/services/quality" },
          { label: "Logistics", href: "/services/logistics" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Careers", href: "/careers" },
          { label: "News", href: "/news" }
        ]
      }
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/company/naturesforce" },
      { platform: "twitter", url: "https://twitter.com/naturesforce" }
    ],
    bottomText: "Quality contract packing services since 2020",
    copyright: "© 2024 NaturesForce Contract Packing. All rights reserved."
  };
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