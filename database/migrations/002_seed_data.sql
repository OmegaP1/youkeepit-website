-- database/migrations/002_seed_data.sql
-- Initial Data Population Script
-- Run this after the initial setup to populate your database with default content

-- Insert default navigation items
INSERT INTO navigation_items (label, href, order_index) VALUES
('Home', '#home', 0),
('How It Works', '#how-it-works', 1),
('Pricing', '#pricing', 2),
('About', '#benefits', 3),
('Contact', '#faq', 4)
ON CONFLICT DO NOTHING;

-- Insert company stats
INSERT INTO company_stats (value, label, description, order_index) VALUES
('87%', 'Cost Reduction', 'Average cost reduction achieved by our clients', 0),
('24hrs', 'Setup Time', 'Quick implementation and setup process', 1),
('500+', 'Companies', 'Trusted by leading organizations worldwide', 2)
ON CONFLICT DO NOTHING;

-- Insert features
INSERT INTO features (title, description, icon, order_index) VALUES
('Enterprise Security', 'Military-grade encryption and compliance with SOC 2, GDPR, and industry standards.', '🔒', 0),
('Employee Portal', 'Self-service marketplace where employees can browse, purchase, and track their orders.', '👥', 1),
('Analytics Dashboard', 'Real-time insights into asset recovery, cost savings, and environmental impact.', '📊', 2),
('Automated Workflows', 'Streamlined processes for device preparation, data wiping, and documentation.', '⚙️', 3),
('Integration Ready', 'Seamlessly connects with your existing HRIS, asset management, and IT systems.', '🔗', 4),
('White-Label Option', 'Customize the platform with your branding for a seamless employee experience.', '🎨', 5)
ON CONFLICT DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (name, role, content, rating, order_index) VALUES
('Sarah Chen', 'IT Director, TechCorp', 'YouKeepIt transformed our equipment transition process. We''ve recovered over $500k in value this year alone while making our employees happy.', 5, 0),
('Marcus Rodriguez', 'HR Manager, GrowthCo', 'The employee marketplace is brilliant. Our staff love getting quality devices at great prices, and we''ve eliminated equipment storage costs.', 5, 1),
('Emma Thompson', 'CFO, ScaleTech', 'The ROI was immediate. We implemented YouKeepIt in one day and started seeing savings within the first week. Incredible platform.', 5, 2)
ON CONFLICT DO NOTHING;

-- Insert pricing plans
INSERT INTO pricing_plans (name, price, period, description, features, is_popular, order_index) VALUES
('Starter', 'Free', '', 'Perfect for small teams', 
 '["Up to 50 devices/year", "Basic marketplace", "Email support", "Standard data wiping"]', 
 false, 0),
('Professional', '$2,999', '/month', 'Most popular for growing companies', 
 '["Up to 500 devices/year", "Advanced analytics", "Priority support", "Custom branding", "API access"]', 
 true, 1),
('Enterprise', 'Custom', '', 'For large organizations', 
 '["Unlimited devices", "Dedicated success manager", "Custom integrations", "Advanced compliance", "SLA guarantee"]', 
 false, 2)
ON CONFLICT DO NOTHING;

-- Insert FAQ items
INSERT INTO faq_items (question, answer, order_index) VALUES
('How quickly can we implement YouKeepIt?', 'Implementation typically takes less than 24 hours. Our team handles the setup, integration with your existing systems, and employee onboarding to ensure a smooth transition.', 0),
('What happens to sensitive data on devices?', 'We use military-grade data wiping protocols that exceed DOD 5220.22-M standards. All data destruction is certified and documented for compliance purposes.', 1),
('How much money can we expect to recover?', 'On average, companies recover 60-80% of their original device investment. The exact amount depends on device age, condition, and market demand.', 2),
('Do employees get discounts on devices?', 'Yes! Employees typically save 40-70% compared to retail prices while getting quality, professionally refurbished devices.', 3),
('What compliance standards do you meet?', 'We''re compliant with SOC 2 Type II, GDPR, HIPAA, and industry-specific regulations. All processes are audited and certified.', 4),
('Can we integrate with our existing IT systems?', 'Absolutely. We integrate with popular HRIS, asset management, and IT service management platforms through APIs and custom integrations.', 5)
ON CONFLICT DO NOTHING;

-- Insert site content (section headers, descriptions, etc.)
INSERT INTO site_content (section_name, content_key, content_value, content_type) VALUES
-- Hero section
('hero', 'title', 'Transform IT Equipment Transitions', 'text'),
('hero', 'subtitle', 'Turn departing employee devices into valuable assets for your team while maximizing recovery and minimizing waste.', 'text'),
('hero', 'cta_primary', 'Start Free Trial', 'text'),
('hero', 'cta_secondary', 'Watch Demo', 'text'),

-- Features section
('features', 'title', 'Powerful Features', 'text'),
('features', 'description', 'Everything you need to manage IT equipment transitions efficiently and securely.', 'text'),

-- Testimonials section
('testimonials', 'title', 'Trusted by Leading Companies', 'text'),
('testimonials', 'description', 'See what our customers are saying about their experience', 'text'),

-- Pricing section
('pricing', 'title', 'Simple, Transparent Pricing', 'text'),
('pricing', 'description', 'Choose the plan that fits your organization size and needs', 'text'),

-- FAQ section
('faq', 'title', 'Frequently Asked Questions', 'text'),
('faq', 'description', 'Get answers to common questions about YouKeepIt', 'text'),

-- Problem section
('problem', 'title', 'The Hidden Cost of IT Equipment Transitions', 'text'),
('problem', 'description', 'When employees leave or upgrade devices, most companies face significant challenges', 'text'),

-- How it works section
('how_it_works', 'title', 'How YouKeepIt Works', 'text'),
('how_it_works', 'description', 'Transform your IT equipment lifecycle in three simple steps', 'text'),

-- Benefits section
('benefits', 'title', 'Why Choose YouKeepIt?', 'text'),
('benefits', 'description', 'Discover the advantages that make us the preferred choice for IT equipment management', 'text')
ON CONFLICT (section_name, content_key) DO NOTHING;

-- Update sequences to avoid conflicts with future inserts
SELECT setval('navigation_items_id_seq', (SELECT MAX(id) FROM navigation_items));
SELECT setval('company_stats_id_seq', (SELECT MAX(id) FROM company_stats));
SELECT setval('features_id_seq', (SELECT MAX(id) FROM features));
SELECT setval('testimonials_id_seq', (SELECT MAX(id) FROM testimonials));
SELECT setval('pricing_plans_id_seq', (SELECT MAX(id) FROM pricing_plans));
SELECT setval('faq_items_id_seq', (SELECT MAX(id) FROM faq_items));
SELECT setval('site_content_id_seq', (SELECT MAX(id) FROM site_content));