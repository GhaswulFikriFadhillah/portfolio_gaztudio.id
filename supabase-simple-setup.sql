-- Simple Portfolio Database Setup
-- Copy and paste this entire script into Supabase SQL Editor

-- Step 1: Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT,
  description TEXT,
  technologies TEXT[],
  image TEXT,
  image2 TEXT, -- Secondary image field
  images TEXT[],
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Step 2.1: Add image2 column if it doesn't exist (for existing tables)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image2 TEXT;

-- Step 3: Create policies for public access
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access" ON projects;
DROP POLICY IF EXISTS "Public full access" ON projects;

-- Create new policies
-- Allow everyone to read projects
CREATE POLICY "Public read access" ON projects
  FOR SELECT USING (true);

-- Allow everyone to manage projects (for admin panel - use with caution in production)
-- Dalam production, sebaiknya gunakan authentication yang proper
CREATE POLICY "Public full access" ON projects
  FOR ALL USING (true);

-- Step 4: Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Step 5: Create storage policies
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for images" ON storage.objects;
DROP POLICY IF EXISTS "Public upload images" ON storage.objects;
DROP POLICY IF EXISTS "Public update images" ON storage.objects;
DROP POLICY IF EXISTS "Public delete images" ON storage.objects;

-- Create new policies
CREATE POLICY "Public read access for images" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-images');

-- Allow everyone to upload/manage images (for admin panel - use with caution in production)
CREATE POLICY "Public upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Public update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'portfolio-images');

CREATE POLICY "Public delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'portfolio-images');

-- Step 6: Optional - Insert sample data (remove this in production)
-- INSERT INTO projects (title, category, year, description, technologies, image, link) VALUES
-- ('Sample Project', 'Web Design', '2024', 'This is a sample project', ARRAY['React', 'Tailwind'], 'https://example.com/image.jpg', 'https://example.com');

-- Check if table was created successfully
SELECT * FROM projects LIMIT 5;