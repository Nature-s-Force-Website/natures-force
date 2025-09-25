-- =====================================================
-- SECURE RLS POLICIES FOR PRODUCTION
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to enable secure RLS

-- First, clean up any existing policies
DROP POLICY IF EXISTS "Only admins can access admin_users" ON admin_users;
DROP POLICY IF EXISTS "Admins can manage pages" ON pages;
DROP POLICY IF EXISTS "Public can view published pages" ON pages;
DROP POLICY IF EXISTS "Admins can manage media" ON media_assets;
DROP POLICY IF EXISTS "Public can view media" ON media_assets;

-- =====================================================
-- 1. ADMIN_USERS TABLE - SECURE POLICIES
-- =====================================================

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow authenticated users to read admin_users (needed for auth checks)
-- This is safe because it only allows reading, and we control who can authenticate
CREATE POLICY "authenticated_can_read_admin_users" ON admin_users
    FOR SELECT TO authenticated
    USING (true);

-- Policy 2: Only existing active admins can insert new admins
CREATE POLICY "admins_can_insert_admin_users" ON admin_users
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 3: Only existing active admins can update admin_users
CREATE POLICY "admins_can_update_admin_users" ON admin_users
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    )
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 4: Only existing active admins can delete admin_users
CREATE POLICY "admins_can_delete_admin_users" ON admin_users
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 5: Service role can do everything (for manual admin creation)
CREATE POLICY "service_role_admin_users" ON admin_users
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- 2. PAGES TABLE - SECURE POLICIES
-- =====================================================

-- Enable RLS on pages
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public can view published pages
CREATE POLICY "public_can_view_published_pages" ON pages
    FOR SELECT TO anon
    USING (status = 'published');

-- Policy 2: Authenticated users (who are admins) can view all pages
CREATE POLICY "admins_can_view_all_pages" ON pages
    FOR SELECT TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 3: Only admins can insert pages
CREATE POLICY "admins_can_insert_pages" ON pages
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 4: Only admins can update pages
CREATE POLICY "admins_can_update_pages" ON pages
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    )
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 5: Only admins can delete pages
CREATE POLICY "admins_can_delete_pages" ON pages
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- =====================================================
-- 3. MEDIA_ASSETS TABLE - SECURE POLICIES
-- =====================================================

-- Enable RLS on media_assets
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public can view all media (for displaying images on website)
CREATE POLICY "public_can_view_media" ON media_assets
    FOR SELECT TO anon
    USING (true);

-- Policy 2: Authenticated users (who are admins) can view all media
CREATE POLICY "admins_can_view_media" ON media_assets
    FOR SELECT TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 3: Only admins can insert media
CREATE POLICY "admins_can_insert_media" ON media_assets
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 4: Only admins can update media
CREATE POLICY "admins_can_update_media" ON media_assets
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    )
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 5: Only admins can delete media
CREATE POLICY "admins_can_delete_media" ON media_assets
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- =====================================================
-- 4. VERIFICATION QUERIES
-- =====================================================

-- Run these to verify your policies are working:

-- Check if your admin user exists
-- SELECT id, email, is_active FROM admin_users WHERE email = 'harishhona07@gmail.com';

-- Check if you can read pages as an admin
-- SELECT id, title, status FROM pages LIMIT 5;

-- Check RLS is enabled
-- SELECT schemaname, tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE tablename IN ('admin_users', 'pages', 'media_assets');

-- =====================================================
-- 5. PRODUCTION NOTES
-- =====================================================

/*
SECURITY FEATURES:
✅ admin_users: Only admins can modify, authenticated can read (for auth checks)
✅ pages: Public can read published, only admins can modify
✅ media_assets: Public can read (for images), only admins can modify
✅ Service role access preserved for manual operations
✅ No circular dependency issues

WHAT THIS PREVENTS:
🛡️ Unauthorized users cannot create admin accounts
🛡️ Non-admins cannot modify pages or media
🛡️ Anonymous users cannot access draft content
🛡️ API access is properly restricted

WHAT STILL WORKS:
✅ Your admin login and auth checks
✅ Public website displays published content
✅ Admin panel functionality
✅ Manual admin user creation via service role
*/