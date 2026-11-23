-- ==============================================================================
-- LOHITH VARMA PORTFOLIO - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- to initialize the database tables for contact messages, live telemetry, and CMS sync.

-- 1. Contact Messages Table (Visitor inquiries submitted via the Contact Section)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  read_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Grant table privileges to anon and authenticated roles
GRANT ALL ON TABLE contact_messages TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Allow anonymous visitors to submit messages (INSERT only)
CREATE POLICY "Allow public insert on contact_messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated/admin to read messages
CREATE POLICY "Allow admin to view contact_messages"
  ON contact_messages
  FOR SELECT
  TO anon, authenticated
  USING (true);


-- 2. Portfolio Configuration & Profile Table
CREATE TABLE IF NOT EXISTS portfolio_profile (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL DEFAULT 'Lohith Varma',
  title TEXT NOT NULL DEFAULT 'Software Engineer & Systems Builder',
  tagline TEXT DEFAULT 'Forging high-performance distributed systems, low-level runtimes, and resilient software architectures.',
  bio TEXT DEFAULT 'Designing high-throughput distributed systems, low-level storage engines, and high-performance interactive interfaces. Passionate about systems internals and scalable computing.',
  location TEXT DEFAULT 'Bengaluru, India',
  status_badge TEXT DEFAULT 'Available for 2027 SWE Internships & Roles',
  photo_url TEXT DEFAULT '/lohith_varma.png',
  github_username TEXT DEFAULT 'lohithvarma2208-tech',
  github_url TEXT DEFAULT 'https://github.com/lohithvarma2208-tech',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/lohith-varma-3b4153421/',
  leetcode_username TEXT DEFAULT '_CodeMaster_1',
  leetcode_url TEXT DEFAULT 'https://leetcode.com/u/_CodeMaster_1/',
  email TEXT DEFAULT 'lohithvarma2208@gmail.com',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_profile ENABLE ROW LEVEL SECURITY;

-- Allow public read access to profile
CREATE POLICY "Allow public read on portfolio_profile"
  ON portfolio_profile
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated/admin update on profile
CREATE POLICY "Allow admin update on portfolio_profile"
  ON portfolio_profile
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default row if not exists
INSERT INTO portfolio_profile (id, name, title, photo_url, github_username, leetcode_username)
VALUES ('main', 'Lohith Varma', 'Software Engineer & Systems Builder', '/lohith_varma.png', 'lohithvarma2208-tech', '_CodeMaster_1')
ON CONFLICT (id) DO NOTHING;


-- 3. Qualifications Hub Table (Skills, Certifications, Experience, OSS, Honors)
CREATE TABLE IF NOT EXISTS portfolio_qualifications (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL, -- 'skills' | 'certifications' | 'experience' | 'oss' | 'honors'
  title TEXT NOT NULL,
  subtitle TEXT,
  period TEXT,
  description TEXT,
  badge TEXT,
  level TEXT,
  icon TEXT,
  skills_tags TEXT[],
  link_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_qualifications ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read on portfolio_qualifications"
  ON portfolio_qualifications
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated update
CREATE POLICY "Allow admin manage portfolio_qualifications"
  ON portfolio_qualifications
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
