-- 🌱 COMPANY PORTAL SEED DATA
-- Test data for development and testing
-- Run this AFTER the main schema

-- ==================================================
-- SAMPLE COMPANIES
-- ==================================================

INSERT INTO companies (
  id,
  name,
  slug,
  email,
  phone,
  address,
  website,
  industry,
  employee_count,
  subscription_plan,
  subscription_status,
  billing_email,
  timezone,
  currency,
  onboarded_at
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Acme Corporation',
  'acme-corp',
  'contact@acme-corp.com',
  '+1 (555) 123-4567',
  '123 Business Ave, San Francisco, CA 94105',
  'https://acme-corp.com',
  'Technology',
  150,
  'premium',
  'active',
  'billing@acme-corp.com',
  'America/Los_Angeles',
  'USD',
  NOW() - INTERVAL '6 months'
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'TechStart Inc',
  'techstart-inc',
  'hello@techstart.io',
  '+1 (555) 987-6543',
  '456 Innovation St, Austin, TX 78701',
  'https://techstart.io',
  'Software',
  75,
  'basic',
  'active',
  'finance@techstart.io',
  'America/Chicago',
  'USD',
  NOW() - INTERVAL '3 months'
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'Global Solutions Ltd',
  'global-solutions',
  'info@globalsolutions.com',
  '+44 20 7123 4567',
  '789 Corporate Plaza, London, UK EC1A 1BB',
  'https://globalsolutions.com',
  'Consulting',
  300,
  'enterprise',
  'active',
  'accounts@globalsolutions.com',
  'Europe/London',
  'GBP',
  NOW() - INTERVAL '1 year'
);

-- ==================================================
-- SAMPLE COMPANY USERS
-- ==================================================

INSERT INTO company_users (
  id,
  company_id,
  email,
  password_hash,
  role,
  first_name,
  last_name,
  phone,
  status,
  email_verified
) VALUES 
-- Acme Corporation Users
(
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  'admin@acme-corp.com',
  crypt('admin123', gen_salt('bf')), -- Password: admin123
  'admin',
  'John',
  'Smith',
  '+1 (555) 123-4568',
  'active',
  true
),
(
  '660e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440001',
  'manager@acme-corp.com',
  crypt('manager123', gen_salt('bf')), -- Password: manager123
  'manager',
  'Sarah',
  'Johnson',
  '+1 (555) 123-4569',
  'active',
  true
),
-- TechStart Inc Users
(
  '660e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440002',
  'admin@techstart.io',
  crypt('techstart123', gen_salt('bf')), -- Password: techstart123
  'admin',
  'Mike',
  'Davis',
  '+1 (555) 987-6544',
  'active',
  true
),
-- Global Solutions Users
(
  '660e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440003',
  'admin@globalsolutions.com',
  crypt('global123', gen_salt('bf')), -- Password: global123
  'admin',
  'Emma',
  'Wilson',
  '+44 20 7123 4568',
  'active',
  true
);

-- ==================================================
-- SAMPLE EMPLOYEES
-- ==================================================

INSERT INTO employees (
  id,
  company_id,
  first_name,
  last_name,
  email,
  phone,
  employee_id,
  department,
  position,
  manager_email,
  start_date,
  status,
  city,
  state,
  country
) VALUES 
-- Acme Corporation Employees
(
  '770e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  'Alice',
  'Brown',
  'alice.brown@acme-corp.com',
  '+1 (555) 234-5678',
  'EMP001',
  'Engineering',
  'Senior Software Engineer',
  'admin@acme-corp.com',
  '2023-01-15',
  'active',
  'San Francisco',
  'CA',
  'USA'
),
(
  '770e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440001',
  'Bob',
  'Wilson',
  'bob.wilson@acme-corp.com',
  '+1 (555) 345-6789',
  'EMP002',
  'Marketing',
  'Marketing Manager',
  'manager@acme-corp.com',
  '2023-03-20',
  'active',
  'San Francisco',
  'CA',
  'USA'
),
(
  '770e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440001',
  'Carol',
  'Martinez',
  'carol.martinez@acme-corp.com',
  '+1 (555) 456-7890',
  'EMP003',
  'HR',
  'HR Specialist',
  'admin@acme-corp.com',
  '2023-06-10',
  'active',
  'San Francisco',
  'CA',
  'USA'
),
(
  '770e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440001',
  'David',
  'Lee',
  'david.lee@acme-corp.com',
  '+1 (555) 567-8901',
  'EMP004',
  'Sales',
  'Sales Representative',
  'manager@acme-corp.com',
  '2022-09-05',
  'inactive',
  'San Francisco',
  'CA',
  'USA'
),
-- TechStart Inc Employees
(
  '770e8400-e29b-41d4-a716-446655440005',
  '550e8400-e29b-41d4-a716-446655440002',
  'Emily',
  'Taylor',
  'emily.taylor@techstart.io',
  '+1 (555) 678-9012',
  'TS001',
  'Engineering',
  'Frontend Developer',
  'admin@techstart.io',
  '2023-02-14',
  'active',
  'Austin',
  'TX',
  'USA'
),
(
  '770e8400-e29b-41d4-a716-446655440006',
  '550e8400-e29b-41d4-a716-446655440002',
  'Frank',
  'Anderson',
  'frank.anderson@techstart.io',
  '+1 (555) 789-0123',
  'TS002',
  'Product',
  'Product Manager',
  'admin@techstart.io',
  '2023-04-01',
  'active',
  'Austin',
  'TX',
  'USA'
),
-- Global Solutions Employees
(
  '770e8400-e29b-41d4-a716-446655440007',
  '550e8400-e29b-41d4-a716-446655440003',
  'Grace',
  'Thompson',
  'grace.thompson@globalsolutions.com',
  '+44 20 7234 5678',
  'GS001',
  'Consulting',
  'Senior Consultant',
  'admin@globalsolutions.com',
  '2022-11-15',
  'active',
  'London',
  '',
  'UK'
),
(
  '770e8400-e29b-41d4-a716-446655440008',
  '550e8400-e29b-41d4-a716-446655440003',
  'Henry',
  'Clark',
  'henry.clark@globalsolutions.com',
  '+44 20 7345 6789',
  'GS002',
  'Operations',
  'Operations Manager',
  'admin@globalsolutions.com',
  '2023-01-20',
  'active',
  'London',
  '',
  'UK'
);

-- ==================================================
-- SAMPLE DEVICES
-- ==================================================

INSERT INTO devices (
  id,
  company_id,
  employee_id,
  device_type,
  brand,
  model,
  serial_number,
  asset_tag,
  specifications,
  status,
  condition,
  purchase_price,
  current_value,
  purchase_date,
  warranty_end_date,
  location
) VALUES 
-- Acme Corporation Devices
(
  '880e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  '770e8400-e29b-41d4-a716-446655440001',
  'laptop',
  'Apple',
  'MacBook Pro 16"',
  'C02XD0ABMD6T',
  'ACME-LAP-001',
  '{"ram": "32GB", "storage": "1TB SSD", "cpu": "M1 Pro", "screen": "16-inch Liquid Retina XDR"}',
  'assigned',
  'excellent',
  2499.00,
  1899.00,
  '2023-01-20',
  '2026-01-20',
  'San Francisco Office'
),
(
  '880e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440001',
  '770e8400-e29b-41d4-a716-446655440002',
  'laptop',
  'Dell',
  'XPS 13',
  'DELL123456789',
  'ACME-LAP-002',
  '{"ram": "16GB", "storage": "512GB SSD", "cpu": "Intel i7", "screen": "13.3-inch FHD"}',
  'assigned',
  'good',
  1299.00,
  899.00,
  '2023-03-25',
  '2026-03-25',
  'San Francisco Office'
),
(
  '880e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440001',
  '770e8400-e29b-41d4-a716-446655440004',
  'phone',
  'Apple',
  'iPhone 14 Pro',
  'IMEI123456789012345',
  'ACME-PHN-001',
  '{"storage": "256GB", "color": "Space Black", "network": "5G"}',
  'available',
  'good',
  999.00,
  699.00,
  '2022-09-16',
  '2024-09-16',
  'HR Department'
),
(
  '880e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440001',
  '770e8400-e29b-41d4-a716-446655440003',
  'monitor',
  'LG',
  '27UP850-W',
  'LG27UP850123',
  'ACME-MON-001',
  '{"size": "27-inch", "resolution": "4K UHD", "panel": "IPS", "connectivity": "USB-C"}',
  'assigned',
  'excellent',
  399.00,
  299.00,
  '2023-06-15',
  '2026-06-15',
  'HR Department'
),
-- TechStart Inc Devices
(
  '880e8400-e29b-41d4-a716-446655440005',
  '550e8400-e29b-41d4-a716-446655440002',
  '770e8400-e29b-41d4-a716-446655440005',
  'laptop',
  'Lenovo',
  'ThinkPad X1 Carbon',
  'LENOVO987654321',
  'TS-LAP-001',
  '{"ram": "16GB", "storage": "512GB SSD", "cpu": "Intel i7", "screen": "14-inch WQHD"}',
  'assigned',
  'good',
  1599.00,
  1199.00,
  '2023-02-20',
  '2026-02-20',
  'Austin Office'
),
(
  '880e8400-e29b-41d4-a716-446655440006',
  '550e8400-e29b-41d4-a716-446655440002',
  '770e8400-e29b-41d4-a716-446655440006',
  'tablet',
  'Apple',
  'iPad Pro 12.9"',
  'IPAD123456789',
  'TS-TAB-001',
  '{"storage": "256GB", "connectivity": "Wi-Fi + Cellular", "color": "Silver"}',
  'assigned',
  'excellent',
  1099.00,
  799.00,
  '2023-04-10',
  '2024-04-10',
  'Austin Office'
),
-- Global Solutions Devices
(
  '880e8400-e29b-41d4-a716-446655440007',
  '550e8400-e29b-41d4-a716-446655440003',
  '770e8400-e29b-41d4-a716-446655440007',
  'laptop',
  'HP',
  'EliteBook 840 G9',
  'HP840G9123456',
  'GS-LAP-001',
  '{"ram": "32GB", "storage": "1TB SSD", "cpu": "Intel i7", "screen": "14-inch FHD"}',
  'assigned',
  'excellent',
  1799.00,
  1399.00,
  '2022-12-01',
  '2025-12-01',
  'London Office'
),
(
  '880e8400-e29b-41d4-a716-446655440008',
  '550e8400-e29b-41d4-a716-446655440003',
  '770e8400-e29b-41d4-a716-446655440008',
  'desktop',
  'Dell',
  'OptiPlex 7000',
  'DELL7000123456',
  'GS-DES-001',
  '{"ram": "32GB", "storage": "1TB SSD", "cpu": "Intel i7", "graphics": "Integrated"}',
  'assigned',
  'good',
  1299.00,
  899.00,
  '2023-02-01',
  '2026-02-01',
  'London Office'
);

-- ==================================================
-- SAMPLE OFFERS
-- ==================================================

INSERT INTO offers (
  id,
  company_id,
  device_id,
  employee_id,
  offer_amount,
  estimated_value,
  condition_assessment,
  status,
  offered_at,
  response_deadline,
  pickup_address,
  payment_method,
  assessment_notes
) VALUES 
-- Acme Corporation Offers
(
  '990e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  '880e8400-e29b-41d4-a716-446655440003',
  '770e8400-e29b-41d4-a716-446655440004',
  699.00,
  699.00,
  'good',
  'pending',
  NOW() - INTERVAL '2 days',
  NOW() + INTERVAL '5 days',
  '123 Business Ave, San Francisco, CA 94105',
  'bank_transfer',
  'Device shows minor wear on corners but screen and functionality are perfect'
),
(
  '990e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440001',
  '880e8400-e29b-41d4-a716-446655440002',
  '770e8400-e29b-41d4-a716-446655440002',
  850.00,
  899.00,
  'good',
  'accepted',
  NOW() - INTERVAL '1 week',
  NOW() - INTERVAL '2 days',
  '123 Business Ave, San Francisco, CA 94105',
  'bank_transfer',
  'Excellent condition with original packaging'
),
-- TechStart Inc Offers
(
  '990e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440002',
  '880e8400-e29b-41d4-a716-446655440006',
  '770e8400-e29b-41d4-a716-446655440006',
  750.00,
  799.00,
  'excellent',
  'completed',
  NOW() - INTERVAL '2 weeks',
  NOW() - INTERVAL '10 days',
  '456 Innovation St, Austin, TX 78701',
  'paypal',
  'Like new condition, barely used'
);

-- ==================================================
-- SAMPLE TRANSACTIONS
-- ==================================================

INSERT INTO transactions (
  id,
  company_id,
  offer_id,
  employee_id,
  transaction_type,
  amount,
  currency,
  status,
  payment_method,
  payment_reference,
  payment_gateway,
  platform_fee,
  processing_fee,
  net_amount,
  processed_at,
  completed_at,
  description
) VALUES 
(
  'aa0e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  '990e8400-e29b-41d4-a716-446655440002',
  '770e8400-e29b-41d4-a716-446655440002',
  'payment',
  850.00,
  'USD',
  'completed',
  'bank_transfer',
  'TXN-ACME-001',
  'stripe',
  25.50,
  8.50,
  816.00,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '2 days',
  'Payment for Dell XPS 13 laptop buyback'
),
(
  'aa0e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440002',
  '990e8400-e29b-41d4-a716-446655440003',
  '770e8400-e29b-41d4-a716-446655440006',
  'payment',
  750.00,
  'USD',
  'completed',
  'paypal',
  'TXN-TS-001',
  'paypal',
  22.50,
  7.50,
  720.00,
  NOW() - INTERVAL '1 week',
  NOW() - INTERVAL '6 days',
  'Payment for iPad Pro 12.9" buyback'
);

-- ==================================================
-- SAMPLE COMPANY SETTINGS
-- ==================================================

INSERT INTO company_settings (
  company_id,
  category,
  setting_key,
  setting_value,
  description
) VALUES 
-- Acme Corporation Settings
(
  '550e8400-e29b-41d4-a716-446655440001',
  'general',
  'company_logo',
  '{"url": "/logos/acme-corp.png", "alt": "Acme Corporation"}',
  'Company logo configuration'
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  'notifications',
  'email_notifications',
  '{"offer_updates": true, "payment_confirmations": true, "weekly_reports": true}',
  'Email notification preferences'
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  'security',
  'two_factor_required',
  '{"enabled": false, "required_for_admins": false}',
  'Two-factor authentication settings'
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  'billing',
  'auto_payment',
  '{"enabled": true, "method": "credit_card", "backup_method": "bank_transfer"}',
  'Automatic payment configuration'
),
-- TechStart Inc Settings
(
  '550e8400-e29b-41d4-a716-446655440002',
  'general',
  'company_logo',
  '{"url": "/logos/techstart.png", "alt": "TechStart Inc"}',
  'Company logo configuration'
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'notifications',
  'slack_integration',
  '{"enabled": true, "webhook_url": "https://hooks.slack.com/services/...", "channels": ["#general", "#it"]}',
  'Slack integration settings'
),
-- Global Solutions Settings
(
  '550e8400-e29b-41d4-a716-446655440003',
  'general',
  'multi_currency',
  '{"enabled": true, "base_currency": "GBP", "supported_currencies": ["GBP", "USD", "EUR"]}',
  'Multi-currency support settings'
);

-- ==================================================
-- SAMPLE ACTIVITY LOGS
-- ==================================================

INSERT INTO activity_logs (
  company_id,
  user_id,
  action,
  entity_type,
  entity_id,
  description
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  'user_login',
  'user',
  '660e8400-e29b-41d4-a716-446655440001',
  'Admin user John Smith logged in'
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  'offer_created',
  'offer',
  '990e8400-e29b-41d4-a716-446655440001',
  'Created offer for iPhone 14 Pro (David Lee)'
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440002',
  'offer_accepted',
  'offer',
  '990e8400-e29b-41d4-a716-446655440002',
  'Offer accepted for Dell XPS 13 (Bob Wilson)'
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  '660e8400-e29b-41d4-a716-446655440003',
  'device_added',
  'device',
  '880e8400-e29b-41d4-a716-446655440005',
  'Added new device: Lenovo ThinkPad X1 Carbon'
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  '660e8400-e29b-41d4-a716-446655440003',
  'transaction_completed',
  'transaction',
  'aa0e8400-e29b-41d4-a716-446655440002',
  'Payment completed for iPad Pro buyback'
);

-- ==================================================
-- UPDATE EMPLOYEE COUNTS
-- ==================================================

UPDATE companies SET employee_count = (
  SELECT COUNT(*) FROM employees 
  WHERE company_id = companies.id AND status = 'active'
);

-- ==================================================
-- SUCCESS MESSAGE
-- ==================================================

DO $ 
BEGIN 
  RAISE NOTICE '🎉 Company portal seed data has been successfully created!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Sample Data Summary:';
  RAISE NOTICE '   • 3 Companies created';
  RAISE NOTICE '   • 4 Company users created';
  RAISE NOTICE '   • 8 Employees created';
  RAISE NOTICE '   • 8 Devices created';
  RAISE NOTICE '   • 3 Offers created';
  RAISE NOTICE '   • 2 Transactions created';
  RAISE NOTICE '   • Multiple settings configured';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 Test Login Credentials:';
  RAISE NOTICE '   Acme Corp:';
  RAISE NOTICE '     Admin: admin@acme-corp.com / admin123';
  RAISE NOTICE '     Manager: manager@acme-corp.com / manager123';
  RAISE NOTICE '     URL: /company/acme-corp';
  RAISE NOTICE '';
  RAISE NOTICE '   TechStart Inc:';
  RAISE NOTICE '     Admin: admin@techstart.io / techstart123';
  RAISE NOTICE '     URL: /company/techstart-inc';
  RAISE NOTICE '';
  RAISE NOTICE '   Global Solutions:';
  RAISE NOTICE '     Admin: admin@globalsolutions.com / global123';
  RAISE NOTICE '     URL: /company/global-solutions';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Ready for development and testing!';
END $;