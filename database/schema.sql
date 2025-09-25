-- =====================================================
-- NaturesForce CMS - Minimal Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ADMIN USERS (Simple)
-- =====================================================

-- Admin users table (minimal)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. PAGES (Simple)
-- =====================================================

-- Main pages table
CREATE TABLE IF NOT EXISTS pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    content JSONB DEFAULT '[]', -- Simple array of content blocks
    featured_image_url TEXT,
    is_homepage BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES admin_users(id),
    updated_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. MEDIA (Simple)
-- =====================================================

-- Media assets (simple)
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_path TEXT NOT NULL, -- ImageKit URL
    file_size INTEGER,
    mime_type VARCHAR(100),
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    imagekit_file_id VARCHAR(255),
    uploaded_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. GLOBAL SETTINGS (Header & Footer)
-- =====================================================

-- Global site settings for header and footer
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    setting_type VARCHAR(50) NOT NULL UNIQUE CHECK (setting_type IN ('header', 'footer')),
    data JSONB DEFAULT '{}', -- Flexible JSON structure for different content types
    is_active BOOLEAN DEFAULT true,
    updated_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. BASIC INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);

-- =====================================================
-- 5. ROW LEVEL SECURITY (Simple)
-- =====================================================

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Admin users policies
CREATE POLICY "Only admins can access admin_users" ON admin_users
    FOR ALL TO authenticated
    USING (auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true));

-- Pages policies
CREATE POLICY "Admins can manage pages" ON pages
    FOR ALL TO authenticated
    USING (auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true));

CREATE POLICY "Public can view published pages" ON pages
    FOR SELECT TO anon
    USING (status = 'published');

-- Media policies
CREATE POLICY "Admins can manage media" ON media_assets
    FOR ALL TO authenticated
    USING (auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true));

CREATE POLICY "Public can view media" ON media_assets
    FOR SELECT TO anon
    USING (true);

-- =====================================================
-- 6. BASIC TRIGGERS
-- =====================================================

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. EXAMPLE DATA
-- =====================================================

-- Note: You'll manually add admin users by:
-- 1. Creating user in Supabase Auth
-- 2. Inserting their UUID into admin_users table

-- Example pages
INSERT INTO pages (title, slug, meta_title, meta_description, status, content, is_homepage) VALUES
('Home', 'home', 'NaturesForce - Contract Packing & Manufacturing', 'Precision contract packing and white-label manufacturing for natural brands', 'published', '[
    {
        "type": "hero",
        "content": {
            "title": "Precision Contract Packing & White-Label Manufacturing",
            "subtitle": "For Natural Brands",
            "description": "At NaturesForce, we help natural and wellness brands scale with confidence. From formulation and blending to eco-friendly packaging and labelling.",
            "image": "",
            "button_text": "Get Your Free Quote",
            "button_link": "/contact"
        }
    },
    {
        "type": "text",
        "content": {
            "title": "Our Services",
            "text": "<p>We offer comprehensive contract packing services including custom formulation, flexible batch sizes, and quality control.</p>"
        }
    }
]', true),

('About', 'about', 'About NaturesForce', 'Learn more about our contract packing and manufacturing services', 'published', '[
    {
        "type": "text",
        "content": {
            "title": "About NaturesForce",
            "text": "<p>Founded on the belief that natural brands deserve contract packing solutions that match their ethos, NaturesForce was established to provide more than just packing.</p>"
        }
    }
]', false),

('Contact', 'contact', 'Contact NaturesForce', 'Get in touch for a free consultation and quote', 'published', '[
    {
        "type": "text",
        "content": {
            "title": "Contact Us",
            "text": "<p>Ready to bring your product idea to life? Get in touch for a free consultation and quote.</p>"
        }
    }
]', false);