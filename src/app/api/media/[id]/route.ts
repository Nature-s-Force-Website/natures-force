import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'
import { createServerImageKit } from '@/lib/imagekit'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerComponentClient()

    // Check if user is authenticated admin
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin user exists
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (adminError || !adminUser) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // Get media asset to delete
    const { data: mediaAsset, error: fetchError } = await supabase
      .from('media_assets')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchError || !mediaAsset) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    // Delete from ImageKit
    try {
      const imagekit = createServerImageKit()
      await imagekit.deleteFile(mediaAsset.imagekit_file_id)
    } catch (imagekitError) {
      console.warn('ImageKit deletion error:', imagekitError)
      // Continue with database deletion
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('media_assets')
      .delete()
      .eq('id', params.id)

    if (deleteError) {
      console.error('Database delete error:', deleteError)
      return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Media delete API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}