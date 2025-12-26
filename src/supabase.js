import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hgqhjdmjfbcszpjegwxs.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncWhqZG1qZmJjc3pwamVnd3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MTMwMzAsImV4cCI6MjA4MjI4OTAzMH0.p1I6rNHr1DvrB49tWiV5mmzgaBDurRF4KBUXu-c02d0'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)