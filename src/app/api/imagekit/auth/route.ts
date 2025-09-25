import { createServerImageKit } from '@/lib/imagekit'
import { checkAdminAuth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const { isAdmin } = await checkAdminAuth()
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    // Generate authentication parameters for ImageKit upload
    const imagekit = createServerImageKit()
    const authenticationParameters = imagekit.getAuthenticationParameters()

    return NextResponse.json(authenticationParameters)
  } catch (error) {
    console.error('ImageKit auth error:', error)
    return NextResponse.json(
      { error: 'Failed to generate auth parameters' }, 
      { status: 500 }
    )
  }
}