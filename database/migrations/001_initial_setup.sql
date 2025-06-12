-- database/migrations/001_initial_setup.sql
-- Supabase Database Setup Script
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security (RLS) for all tables
-- This ensures data security and access control

-- 1. Site Content Table
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section_name VARCHAR(100) NOT NULL,
  content_key VARCHAR(100) NOT NULL,
  content_value TEXT,
  content_type VARCHAR(50) DEFAULT 'text',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section_name, content_key)
);

-- 2. Features Table
CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  company VARCHAR(100),
  image_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Pricing Plans Table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price VARCHAR(50),
  period VARCHAR(50),
  description TEXT,
  features JSONB,
  is_popular BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. FAQ Items Table
CREATE TABLE IF NOT EXISTS faq_items (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Navigation Items Table
CREATE TABLE IF NOT EXISTS navigation_items (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  href VARCHAR(200) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Company Stats Table
CREATE TABLE IF NOT EXISTS company_stats (
  id SERIAL PRIMARY KEY,
  value VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section_name);
CREATE INDEX IF NOT EXISTS idx_features_active_order ON features(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_testimonials_active_order ON testimonials(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_active_order ON pricing_plans(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_faq_items_active_order ON faq_items(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_navigation_items_active_order ON navigation_items(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_company_stats_active_order ON company_stats(is_active, order_index);

-- Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for website display)
CREATE POLICY "Enable read access for all users" ON site_content FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON features FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON pricing_plans FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON faq_items FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON navigation_items FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON company_stats FOR SELECT USING (true);

-- Create policies for admin write access (you can customize these based on your auth setup)
-- For now, we'll allow all operations with service role key
CREATE POLICY "Enable all operations for service role" ON site_content FOR ALL USING (true);
CREATE POLICY "Enable all operations for service role" ON features FOR ALL USING (true);
CREATE POLICY "Enable all operations for service role" ON testimonials FOR ALL USING (true);
CREATE POLICY "Enable all operations for service role" ON pricing_plans FOR ALL USING (true);
CREATE POLICY "Enable all operations for service role" ON faq_items FOR ALL USING (true);
CREATE POLICY "Enable all operations for service role" ON navigation_items FOR ALL USING (true);
CREATE POLICY "Enable all operations for service role" ON company_stats FOR ALL USING (true);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pricing_plans_updated_at BEFORE UPDATE ON pricing_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON faq_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_navigation_items_updated_at BEFORE UPDATE ON navigation_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_stats_updated_at BEFORE UPDATE ON company_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();