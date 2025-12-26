-- Setup Portfolio Database
-- Run this SQL in your Supabase SQL Editor

-- Create projects table (if not exists)
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT,
  description TEXT,
  technologies TEXT[],
  image TEXT,
  images TEXT[],
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to manage projects" ON projects;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Create policy for authenticated users to manage projects
CREATE POLICY "Allow authenticated users to manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');