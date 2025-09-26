-- =====================================================
-- Metadata Migration - Add Site Metadata Support
-- =====================================================

-- Update site_settings table to support metadata
ALTER TABLE site_settings 
DROP CONSTRAINT site_settings_setting_type_check;

ALTER TABLE site_settings 
ADD CONSTRAINT site_settings_setting_type_check 
CHECK (setting_type IN ('header', 'footer', 'metadata'));

-- Insert default metadata settings
INSERT INTO site_settings (setting_type, data, is_active) VALUES
('metadata', '{
    "site_title": "Nature''s Force Packaging",
    "site_description": "Premium eco-friendly packaging solutions for your business needs",
    "site_keywords": "packaging, eco-friendly, sustainable, business, natural products",
    "site_author": "Nature''s Force",
    "og_title": "Nature''s Force Packaging - Premium Eco-Friendly Solutions",
    "og_description": "Transform your packaging needs with our sustainable, premium solutions. Custom formulation, flexible batch sizes, and quality control.",
    "twitter_title": "Nature''s Force Packaging",
    "twitter_description": "Premium eco-friendly packaging solutions for your business needs",
    "favicon_url": "/favicon.ico",
    "site_logo_url": ""
}', true)
ON CONFLICT (setting_type) DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();

-- Add RLS policy for metadata
CREATE POLICY "Admins can manage site_settings" ON site_settings
    FOR ALL TO authenticated
    USING (auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true));

CREATE POLICY "Public can view site_settings" ON site_settings
    FOR SELECT TO anon
    USING (is_active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();