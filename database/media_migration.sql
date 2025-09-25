-- Migration to add missing columns to media_assets table
-- Run this in your Supabase SQL editor

-- Add missing columns if they don't exist
ALTER TABLE media_assets 
ADD COLUMN IF NOT EXISTS original_filename VARCHAR(255),
ADD COLUMN IF NOT EXISTS width INTEGER,
ADD COLUMN IF NOT EXISTS height INTEGER,
ADD COLUMN IF NOT EXISTS imagekit_file_id VARCHAR(255);

-- Update the comment for file_path to reflect ImageKit usage
COMMENT ON COLUMN media_assets.file_path IS 'ImageKit URL for the media asset';