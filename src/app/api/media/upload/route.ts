import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth } from '@/lib/auth'
import { createServerComponentClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const { isAdmin, user } = await checkAdminAuth()
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const body = await request.json()
    const { 
      filename, 
      file_path, 
      file_size, 
      mime_type, 
      width, 
      height, 
      alt_text, 
      imagekit_file_id 
    } = body

    const supabase = await createServerComponentClient()

    // Save media info to database
    const { data, error } = await supabase
      .from('media_assets')
      .insert([
        {
          filename,
          original_filename: filename,
          file_path,
          file_size,
          mime_type,
          width,
          height,
          alt_text: alt_text || '',
          imagekit_file_id,
          uploaded_by: user?.id,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save media to database' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      media: data 
    })

  } catch (error) {
    console.error('Upload callback error:', error)
    return NextResponse.json(
      { error: 'Failed to process upload' }, 
      { status: 500 }
    )
  }
}