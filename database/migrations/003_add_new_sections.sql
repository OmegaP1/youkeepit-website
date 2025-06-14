-- database/migrations/003_add_new_sections.sql
-- Migration to add new tables for Problem, How It Works, and Benefits sections

-- First, create the update function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Problem Statistics Table
CREATE TABLE IF NOT EXISTS problem_stats (
  id SERIAL PRIMARY KEY,
  value VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(50) DEFAULT 'text-red-500',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- How It Works Steps Table
CREATE TABLE IF NOT EXISTS howitworks_steps (
  id SERIAL PRIMARY KEY,
  step_number INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(50),
  icon VARCHAR(10),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Benefits Table
CREATE TABLE IF NOT EXISTS benefits (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  value VARCHAR(50),
  label VARCHAR(100),
  icon VARCHAR(10),
  color VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_problem_stats_active_order ON problem_stats(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_howitworks_steps_active_order ON howitworks_steps(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_howitworks_steps_step_number ON howitworks_steps(step_number);
CREATE INDEX IF NOT EXISTS idx_benefits_active_order ON benefits(is_active, order_index);

-- Enable Row Level Security
ALTER TABLE problem_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE howitworks_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for website display)
CREATE POLICY "Enable read access for all users" ON problem_stats FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON howitworks_steps FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON benefits FOR SELECT USING (true);

-- Create policies for admin write access
CREATE POLICY "Enable all operations for service role" ON problem_stats FOR ALL USING (true);
CREATE POLICY "Enable all operations for service role" ON howitworks_steps FOR ALL USING (true);
CREATE POLICY "Enable all operations for service role" ON benefits FOR ALL USING (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_problem_stats_updated_at BEFORE UPDATE ON problem_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_howitworks_steps_updated_at BEFORE UPDATE ON howitworks_steps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_benefits_updated_at BEFORE UPDATE ON benefits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default problem statistics
INSERT INTO problem_stats (value, label, description, color, order_index) VALUES
('$3,200', 'Lost Per Device', 'Average value lost when equipment is improperly disposed of or stored in warehouses.', 'text-red-500', 0),
('2-3', 'Weeks Delay', 'Typical time to complete equipment transitions, affecting productivity and security.', 'text-red-500', 1),
('73%', 'Compliance Risk', 'Companies that don''t properly wipe data face potential security breaches and compliance issues.', 'text-red-500', 2)
ON CONFLICT DO NOTHING;

-- Insert default how it works steps
INSERT INTO howitworks_steps (step_number, title, description, color, order_index) VALUES
(1, 'Upload Inventory', 'Simply upload your device inventory or integrate with existing asset management systems.', 'bg-blue-600', 0),
(2, 'Employee Marketplace', 'Employees browse available devices at discounted rates through our secure platform.', 'bg-green-600', 1),
(3, 'Secure Transfer', 'Automated data wiping, documentation, and secure handover process with full compliance tracking.', 'bg-purple-600', 2)
ON CONFLICT DO NOTHING;

-- Insert default benefits
INSERT INTO benefits (title, description, value, label, color, order_index) VALUES
('Cost Reduction', 'Reduce IT equipment disposal costs by up to 87% while generating revenue from device sales.', '87%', 'Cost Savings', 'text-blue-600', 0),
('Quick Setup', 'Get started in less than 24 hours with our streamlined onboarding process.', '24hrs', 'Setup Time', 'text-green-600', 1),
('Employee Satisfaction', 'Happy employees get quality devices at great prices while supporting sustainability.', '95%', 'Satisfaction Rate', 'text-purple-600', 2),
('Compliance Ready', 'Built-in security features ensure GDPR, SOC 2, and industry compliance requirements.', '100%', 'Compliance', 'text-red-600', 3)
ON CONFLICT DO NOTHING;

-- Add new site content entries for the new sections
INSERT INTO site_content (section_name, content_key, content_value, content_type) VALUES
-- Problem section additional content
('problem', 'subtitle', 'When employees leave or upgrade devices, most companies face significant challenges', 'text'),
('problem', 'cta_text', 'See How We Solve This', 'text'),

-- How it works section additional content  
('how_it_works', 'subtitle', 'Transform your IT equipment lifecycle in three simple steps', 'text'),
('how_it_works', 'cta_text', 'Get Started Today', 'text'),

-- Benefits section additional content
('benefits', 'subtitle', 'Discover the advantages that make us the preferred choice for IT equipment management', 'text'),
('benefits', 'cta_text', 'Explore Features', 'text')
ON CONFLICT (section_name, content_key) DO NOTHING;

-- Update sequences to avoid conflicts with future inserts
SELECT setval('problem_stats_id_seq', (SELECT COALESCE(MAX(id), 0) FROM problem_stats));
SELECT setval('howitworks_steps_id_seq', (SELECT COALESCE(MAX(id), 0) FROM howitworks_steps));
SELECT setval('benefits_id_seq', (SELECT COALESCE(MAX(id), 0) FROM benefits));