// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Tables Schema:
// 
// 1. site_content (General site content)
// CREATE TABLE site_content (
//   id SERIAL PRIMARY KEY,
//   section_name VARCHAR(100) NOT NULL,
//   content_key VARCHAR(100) NOT NULL,
//   content_value TEXT,
//   content_type VARCHAR(50) DEFAULT 'text', -- text, json, image_url
//   is_active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW(),
//   UNIQUE(section_name, content_key)
// );
//
// 2. features (Features section)
// CREATE TABLE features (
//   id SERIAL PRIMARY KEY,
//   title VARCHAR(200) NOT NULL,
//   description TEXT,
//   icon VARCHAR(10),
//   order_index INTEGER DEFAULT 0,
//   is_active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );
//
// 3. testimonials (Testimonials section)
// CREATE TABLE testimonials (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   role VARCHAR(100),
//   content TEXT NOT NULL,
//   rating INTEGER DEFAULT 5,
//   company VARCHAR(100),
//   image_url VARCHAR(500),
//   order_index INTEGER DEFAULT 0,
//   is_active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );
//
// 4. pricing_plans (Pricing section)
// CREATE TABLE pricing_plans (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   price VARCHAR(50),
//   period VARCHAR(50),
//   description TEXT,
//   features JSONB, -- Array of features
//   is_popular BOOLEAN DEFAULT false,
//   order_index INTEGER DEFAULT 0,
//   is_active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );
//
// 5. faq_items (FAQ section)
// CREATE TABLE faq_items (
//   id SERIAL PRIMARY KEY,
//   question TEXT NOT NULL,
//   answer TEXT NOT NULL,
//   category VARCHAR(100),
//   order_index INTEGER DEFAULT 0,
//   is_active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );
//
// 6. navigation_items (Navigation menu)
// CREATE TABLE navigation_items (
//   id SERIAL PRIMARY KEY,
//   label VARCHAR(100) NOT NULL,
//   href VARCHAR(200) NOT NULL,
//   order_index INTEGER DEFAULT 0,
//   is_active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );
//
// 7. company_stats (Statistics displayed on site)
// CREATE TABLE company_stats (
//   id SERIAL PRIMARY KEY,
//   value VARCHAR(50) NOT NULL,
//   label VARCHAR(100) NOT NULL,
//   description TEXT,
//   color VARCHAR(50),
//   order_index INTEGER DEFAULT 0,
//   is_active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );

export default supabase