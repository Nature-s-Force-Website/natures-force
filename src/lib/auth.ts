import { createServerComponentClient } from '@/lib/supabase-server'

export async function checkAdminAuth() {
  const supabase = await createServerComponentClient()
  
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { isAdmin: false, user: null, error: 'Not authenticated' }
    }

    // Check if user exists in admin_users table
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .eq('is_active', true)
      .single()

    if (adminError || !adminUser) {
      return { isAdmin: false, user: null, error: 'Not authorized as admin' }
    }

    return { isAdmin: true, user: adminUser, error: null }
  } catch (error) {
    return { isAdmin: false, user: null, error: 'Authentication check failed' }
  }
}