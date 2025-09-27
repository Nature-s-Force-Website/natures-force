-- =====================================================
-- UPDATE FAVICON URL IN ADMIN PANEL
-- =====================================================
-- Use this SQL to update the favicon URL in your site settings
-- Replace 'YOUR_FAVICON_URL_HERE' with your actual favicon URL

UPDATE site_settings 
SET data = jsonb_set(
  COALESCE(data, '{}'::jsonb), 
  '{favicon_url}', 
  '"YOUR_FAVICON_URL_HERE"'::jsonb
)
WHERE setting_type = 'metadata' AND is_active = true;

-- Example with ImageKit URL (replace with your actual favicon URL):
-- UPDATE site_settings 
-- SET data = jsonb_set(
--   COALESCE(data, '{}'::jsonb), 
--   '{favicon_url}', 
--   '"https://ik.imagekit.io/naturesforce/favicon.ico"'::jsonb
-- )
-- WHERE setting_type = 'metadata' AND is_active = true;

-- =====================================================
-- VERIFY THE UPDATE
-- =====================================================
-- Run this to check the favicon URL is set correctly:
SELECT 
  setting_type,
  data->>'favicon_url' as favicon_url,
  data->>'site_title' as site_title
FROM site_settings 
WHERE setting_type = 'metadata' AND is_active = true;