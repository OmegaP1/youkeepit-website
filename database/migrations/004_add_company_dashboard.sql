-- 🏢 COMPANY PORTAL DATABASE SCHEMA
-- Supabase Schema for Multi-tenant Company Management System
-- Run this in your Supabase SQL Editor

-- ==================================================
-- COMPANIES TABLE (Main tenant table)
-- ==================================================
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL, -- For URL routing: /company/acme-corp
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  website VARCHAR(255),
  logo_url VARCHAR(500),
  industry VARCHAR(100),
  employee_count INTEGER DEFAULT 0,
  
  -- Subscription & billing
  subscription_plan VARCHAR(50) DEFAULT 'basic', -- basic, premium, enterprise
  subscription_status VARCHAR(20) DEFAULT 'active', -- active, suspended, cancelled
  billing_email VARCHAR(255),
  
  -- Settings
  timezone VARCHAR(50) DEFAULT 'UTC',
  currency VARCHAR(3) DEFAULT 'USD',
  settings JSONB DEFAULT '{}',
  
  -- Metadata
  onboarded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT companies_slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT companies_email_format CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ==================================================
-- COMPANY USERS TABLE (Authentication for companies)
-- ==================================================
CREATE TABLE IF NOT EXISTS company_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Authentication
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'manager', -- admin, manager
  
  -- Profile
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(500),
  phone VARCHAR(50),
  
  -- Status & settings
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
  email_verified BOOLEAN DEFAULT false,
  last_login_at TIMESTAMP WITH TIME ZONE,
  settings JSONB DEFAULT '{}',
  
  -- Security
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE,
  password_changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(company_id, email),
  CONSTRAINT company_users_role_check CHECK (role IN ('admin', 'manager')),
  CONSTRAINT company_users_status_check CHECK (status IN ('active', 'inactive', 'suspended')),
  CONSTRAINT company_users_email_format CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ==================================================
-- COMPANY USER SESSIONS
-- ==================================================
CREATE TABLE IF NOT EXISTS company_user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES company_users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Security tracking
  ip_address INET,
  user_agent TEXT,
  device_info JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================================================
-- EMPLOYEES TABLE (Company's staff members)
-- ==================================================
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Personal info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  avatar_url VARCHAR(500),
  
  -- Employment details
  employee_id VARCHAR(50), -- Company's internal ID
  department VARCHAR(100),
  position VARCHAR(150),
  manager_email VARCHAR(255),
  start_date DATE,
  end_date DATE,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, terminated
  
  -- Address
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(company_id, email),
  UNIQUE(company_id, employee_id),
  CONSTRAINT employees_status_check CHECK (status IN ('active', 'inactive', 'terminated')),
  CONSTRAINT employees_email_format CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ==================================================
-- DEVICES TABLE (IT Equipment inventory)
-- ==================================================
CREATE TABLE IF NOT EXISTS devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
  
  -- Device details
  device_type VARCHAR(50) NOT NULL, -- laptop, desktop, phone, tablet, monitor, etc.
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(150) NOT NULL,
  serial_number VARCHAR(200),
  asset_tag VARCHAR(100),
  
  -- Specifications
  specifications JSONB DEFAULT '{}', -- {ram: "16GB", storage: "512GB", cpu: "M1 Pro", etc.}
  
  -- Status & condition
  status VARCHAR(20) DEFAULT 'assigned', -- assigned, available, maintenance, retired, lost
  condition VARCHAR(20) DEFAULT 'good', -- excellent, good, fair, poor
  
  -- Financial
  purchase_price DECIMAL(10,2),
  current_value DECIMAL(10,2),
  purchase_date DATE,
  warranty_end_date DATE,
  
  -- Tracking
  location VARCHAR(200),
  last_seen_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(company_id, serial_number),
  UNIQUE(company_id, asset_tag),
  CONSTRAINT devices_status_check CHECK (status IN ('assigned', 'available', 'maintenance', 'retired', 'lost')),
  CONSTRAINT devices_condition_check CHECK (condition IN ('excellent', 'good', 'fair', 'poor'))
);

-- ==================================================
-- OFFERS TABLE (Device buy-back offers)
-- ==================================================
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
  
  -- Offer details
  offer_amount DECIMAL(10,2) NOT NULL,
  estimated_value DECIMAL(10,2),
  condition_assessment VARCHAR(20),
  
  -- Status workflow
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, rejected, completed, cancelled
  
  -- Timestamps for workflow
  offered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  response_deadline TIMESTAMP WITH TIME ZONE,
  accepted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Additional details
  pickup_scheduled_at TIMESTAMP WITH TIME ZONE,
  pickup_address TEXT,
  payment_method VARCHAR(50), -- bank_transfer, check, paypal, etc.
  payment_details JSONB DEFAULT '{}',
  
  -- Assessment details
  assessment_notes TEXT,
  photos JSONB DEFAULT '[]', -- Array of photo URLs
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT offers_status_check CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
  CONSTRAINT offers_condition_check CHECK (condition_assessment IN ('excellent', 'good', 'fair', 'poor'))
);

-- ==================================================
-- TRANSACTIONS TABLE (Financial transactions)
-- ==================================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  offer_id UUID REFERENCES offers(id) ON DELETE SET NULL,
  employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
  
  -- Transaction details
  transaction_type VARCHAR(20) NOT NULL, -- payment, refund, fee, commission
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, failed, cancelled
  
  -- Payment details
  payment_method VARCHAR(50),
  payment_reference VARCHAR(200),
  payment_gateway VARCHAR(50), -- stripe, paypal, bank_transfer, etc.
  gateway_transaction_id VARCHAR(200),
  
  -- Fees and commissions
  platform_fee DECIMAL(10,2) DEFAULT 0,
  processing_fee DECIMAL(10,2) DEFAULT 0,
  net_amount DECIMAL(10,2),
  
  -- Timestamps
  processed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT transactions_type_check CHECK (transaction_type IN ('payment', 'refund', 'fee', 'commission')),
  CONSTRAINT transactions_status_check CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  CONSTRAINT transactions_amount_positive CHECK (amount >= 0)
);

-- ==================================================
-- COMPANY SETTINGS TABLE
-- ==================================================
CREATE TABLE IF NOT EXISTS company_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Categories
  category VARCHAR(50) NOT NULL, -- general, notifications, security, billing, integrations
  setting_key VARCHAR(100) NOT NULL,
  setting_value JSONB NOT NULL,
  
  -- Metadata
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(company_id, category, setting_key),
  CONSTRAINT settings_category_check CHECK (category IN ('general', 'notifications', 'security', 'billing', 'integrations'))
);

-- ==================================================
-- ACTIVITY LOGS TABLE (Audit trail)
-- ==================================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES company_users(id) ON DELETE SET NULL,
  
  -- Activity details
  action VARCHAR(100) NOT NULL, -- create_employee, update_device, accept_offer, etc.
  entity_type VARCHAR(50), -- employee, device, offer, transaction
  entity_id UUID,
  
  -- Changes tracking
  old_values JSONB,
  new_values JSONB,
  
  -- Context
  ip_address INET,
  user_agent TEXT,
  
  -- Metadata
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================================================
-- INDEXES FOR PERFORMANCE
-- ==================================================

-- Companies
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_subscription_status ON companies(subscription_status);

-- Company Users
CREATE INDEX IF NOT EXISTS idx_company_users_company_id ON company_users(company_id);
CREATE INDEX IF NOT EXISTS idx_company_users_email ON company_users(email);
CREATE INDEX IF NOT EXISTS idx_company_users_status ON company_users(status);

-- Sessions
CREATE INDEX IF NOT EXISTS idx_company_user_sessions_token ON company_user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_company_user_sessions_user_id ON company_user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_company_user_sessions_expires_at ON company_user_sessions(expires_at);

-- Employees
CREATE INDEX IF NOT EXISTS idx_employees_company_id ON employees(company_id);
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(company_id, email);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(company_id, department);

-- Devices
CREATE INDEX IF NOT EXISTS idx_devices_company_id ON devices(company_id);
CREATE INDEX IF NOT EXISTS idx_devices_employee_id ON devices(employee_id);
CREATE INDEX IF NOT EXISTS idx_devices_status ON devices(status);
CREATE INDEX IF NOT EXISTS idx_devices_serial_number ON devices(company_id, serial_number);

-- Offers
CREATE INDEX IF NOT EXISTS idx_offers_company_id ON offers(company_id);
CREATE INDEX IF NOT EXISTS idx_offers_device_id ON offers(device_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_created_at ON offers(created_at);

-- Transactions
CREATE INDEX IF NOT EXISTS idx_transactions_company_id ON transactions(company_id);
CREATE INDEX IF NOT EXISTS idx_transactions_offer_id ON transactions(offer_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

-- Activity Logs
CREATE INDEX IF NOT EXISTS idx_activity_logs_company_id ON activity_logs(company_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);

-- ==================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==================================================

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Company Users can only access their own company's data
CREATE POLICY "Company users can only access their company data" ON companies
  FOR ALL USING (id IN (
    SELECT company_id FROM company_users 
    WHERE id = auth.uid()::uuid
  ));

CREATE POLICY "Company users can only access their company users" ON company_users
  FOR ALL USING (company_id IN (
    SELECT company_id FROM company_users 
    WHERE id = auth.uid()::uuid
  ));

CREATE POLICY "Company users can only access their company sessions" ON company_user_sessions
  FOR ALL USING (company_id IN (
    SELECT company_id FROM company_users 
    WHERE id = auth.uid()::uuid
  ));

CREATE POLICY "Company users can only access their company employees" ON employees
  FOR ALL USING (company_id IN (
    SELECT company_id FROM company_users 
    WHERE id = auth.uid()::uuid
  ));

CREATE POLICY "Company users can only access their company devices" ON devices
  FOR ALL USING (company_id IN (
    SELECT company_id FROM company_users 
    WHERE id = auth.uid()::uuid
  ));

CREATE POLICY "Company users can only access their company offers" ON offers
  FOR ALL USING (company_id IN (
    SELECT company_id FROM company_users 
    WHERE id = auth.uid()::uuid
  ));

CREATE POLICY "Company users can only access their company transactions" ON transactions
  FOR ALL USING (company_id IN (
    SELECT company_id FROM company_users 
    WHERE id = auth.uid()::uuid
  ));

CREATE POLICY "Company users can only access their company settings" ON company_settings
  FOR ALL USING (company_id IN (
    SELECT company_id FROM company_users 
    WHERE id = auth.uid()::uuid
  ));

CREATE POLICY "Company users can only access their company logs" ON activity_logs
  FOR ALL USING (company_id IN (
    SELECT company_id FROM company_users 
    WHERE id = auth.uid()::uuid
  ));

-- ==================================================
-- FUNCTIONS FOR BUSINESS LOGIC
-- ==================================================

-- Function to generate company slug from name
CREATE OR REPLACE FUNCTION generate_company_slug(company_name TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  counter INTEGER := 0;
  final_slug TEXT;
BEGIN
  -- Convert to lowercase, replace spaces and special chars with hyphens
  base_slug := lower(trim(regexp_replace(company_name, '[^a-zA-Z0-9\s]', '', 'g')));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := trim(base_slug, '-');
  
  -- Ensure slug is not empty
  IF base_slug = '' THEN
    base_slug := 'company';
  END IF;
  
  final_slug := base_slug;
  
  -- Check for uniqueness and add counter if needed
  WHILE EXISTS (SELECT 1 FROM companies WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Function to authenticate company users
CREATE OR REPLACE FUNCTION authenticate_company_user(
  p_email TEXT,
  p_password TEXT
) RETURNS JSONB AS $$
DECLARE
  user_record RECORD;
  company_record RECORD;
  result JSONB;
BEGIN
  -- Find user by email
  SELECT cu.*, c.slug as company_slug, c.name as company_name
  INTO user_record
  FROM company_users cu
  JOIN companies c ON cu.company_id = c.id
  WHERE cu.email = p_email AND cu.status = 'active';
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid email or password'
    );
  END IF;
  
  -- Check if account is locked
  IF user_record.locked_until IS NOT NULL AND user_record.locked_until > NOW() THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Account is temporarily locked due to failed login attempts'
    );
  END IF;
  
  -- Verify password (you'll need to implement password hashing)
  -- For now, this is a placeholder - implement proper bcrypt verification
  IF crypt(p_password, user_record.password_hash) != user_record.password_hash THEN
    -- Increment failed attempts
    UPDATE company_users 
    SET 
      failed_login_attempts = failed_login_attempts + 1,
      locked_until = CASE 
        WHEN failed_login_attempts >= 4 THEN NOW() + INTERVAL '30 minutes'
        ELSE locked_until
      END
    WHERE id = user_record.id;
    
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid email or password'
    );
  END IF;
  
  -- Reset failed attempts and update last login
  UPDATE company_users 
  SET 
    failed_login_attempts = 0,
    locked_until = NULL,
    last_login_at = NOW()
  WHERE id = user_record.id;
  
  -- Return success with user data
  RETURN jsonb_build_object(
    'success', true,
    'user', jsonb_build_object(
      'id', user_record.id,
      'email', user_record.email,
      'first_name', user_record.first_name,
      'last_name', user_record.last_name,
      'role', user_record.role,
      'company_id', user_record.company_id,
      'company_slug', user_record.company_slug,
      'company_name', user_record.company_name
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create activity log entry
CREATE OR REPLACE FUNCTION log_activity(
  p_company_id UUID,
  p_user_id UUID,
  p_action TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL,
  p_description TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO activity_logs (
    company_id,
    user_id,
    action,
    entity_type,
    entity_id,
    old_values,
    new_values,
    description
  ) VALUES (
    p_company_id,
    p_user_id,
    p_action,
    p_entity_type,
    p_entity_id,
    p_old_values,
    p_new_values,
    p_description
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ==================================================

-- Update timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to all tables with updated_at
CREATE TRIGGER update_companies_updated_at 
  BEFORE UPDATE ON companies 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_users_updated_at 
  BEFORE UPDATE ON company_users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at 
  BEFORE UPDATE ON employees 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_devices_updated_at 
  BEFORE UPDATE ON devices 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offers_updated_at 
  BEFORE UPDATE ON offers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at 
  BEFORE UPDATE ON transactions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_settings_updated_at 
  BEFORE UPDATE ON company_settings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();