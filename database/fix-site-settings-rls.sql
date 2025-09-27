-- =====================================================
-- QUICK FIX: Enable RLS for site_settings table
-- =====================================================
-- Run this in your Supabase SQL Editor to immediately fix the security issue

-- Clean up any existing site_settings policies
DROP POLICY IF EXISTS "Public can read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Admins can manage site_settings" ON site_settings;
DROP POLICY IF EXISTS "public_can_read_site_settings" ON site_settings;
DROP POLICY IF EXISTS "admins_can_insert_site_settings" ON site_settings;
DROP POLICY IF EXISTS "admins_can_update_site_settings" ON site_settings;
DROP POLICY IF EXISTS "admins_can_delete_site_settings" ON site_settings;
DROP POLICY IF EXISTS "service_role_full_access_site_settings" ON site_settings;

-- Enable RLS on site_settings table
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone can read site_settings (needed for header/footer/metadata)
CREATE POLICY "public_can_read_site_settings" ON site_settings
    FOR SELECT TO anon, authenticated
    USING (true);

-- Policy 2: Only active admins can insert site_settings
CREATE POLICY "admins_can_insert_site_settings" ON site_settings
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 3: Only active admins can update site_settings
CREATE POLICY "admins_can_update_site_settings" ON site_settings
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    )
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 4: Only active admins can delete site_settings
CREATE POLICY "admins_can_delete_site_settings" ON site_settings
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
    );

-- Policy 5: Service role can do everything (for migrations and manual operations)
CREATE POLICY "service_role_full_access_site_settings" ON site_settings
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify the policies are working:

-- 1. Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'site_settings';

-- 2. List all policies on site_settings
SELECT policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'site_settings';

-- 3. Test public read access (should work)
-- SELECT * FROM site_settings;

-- =====================================================
-- NOTES
-- =====================================================
/*
🛡️ SECURITY FIXED:
- RLS is now enabled on site_settings table
- Public users can only READ site settings (header, footer, metadata)
- Only authenticated admins can INSERT/UPDATE/DELETE site settings
- Service role retains full access for migrations

✅ FUNCTIONALITY PRESERVED:
- Your website can still load header/footer data
- Admin panel can still update site settings
- API routes still work for authenticated admins
*/