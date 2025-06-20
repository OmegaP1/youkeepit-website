// src/lib/services/companyService.js
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Company Service Class
export class CompanyService {
  
  // ============================================
  // COMPANY MANAGEMENT
  // ============================================
  
  static async getCompanyBySlug(slug) {
    try {
      const { data, error } = await supabaseAdmin
        .from('companies')
        .select('*')
        .eq('slug', slug)
        .eq('subscription_status', 'active')
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching company by slug:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateCompany(companyId, updates) {
    try {
      const { data, error } = await supabaseAdmin
        .from('companies')
        .update(updates)
        .eq('id', companyId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating company:', error);
      return { success: false, error: error.message };
    }
  }

  // ============================================
  // EMPLOYEES MANAGEMENT
  // ============================================
  
  static async getEmployees(companyId, filters = {}) {
    try {
      let query = supabaseAdmin
        .from('employees')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.department) {
        query = query.eq('department', filters.department);
      }
      if (filters.search) {
        query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching employees:', error);
      return { success: false, error: error.message };
    }
  }

  static async createEmployee(companyId, employeeData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('employees')
        .insert([{ ...employeeData, company_id: companyId }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating employee:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateEmployee(employeeId, companyId, updates) {
    try {
      const { data, error } = await supabaseAdmin
        .from('employees')
        .update(updates)
        .eq('id', employeeId)
        .eq('company_id', companyId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating employee:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteEmployee(employeeId, companyId) {
    try {
      const { error } = await supabaseAdmin
        .from('employees')
        .delete()
        .eq('id', employeeId)
        .eq('company_id', companyId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting employee:', error);
      return { success: false, error: error.message };
    }
  }

  // ============================================
  // DEVICES MANAGEMENT
  // ============================================
  
  static async getDevices(companyId, filters = {}) {
    try {
      let query = supabaseAdmin
        .from('devices')
        .select(`
          *,
          employee:employees(
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.device_type) {
        query = query.eq('device_type', filters.device_type);
      }
      if (filters.employee_id) {
        query = query.eq('employee_id', filters.employee_id);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching devices:', error);
      return { success: false, error: error.message };
    }
  }

  static async createDevice(companyId, deviceData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('devices')
        .insert([{ ...deviceData, company_id: companyId }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating device:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateDevice(deviceId, companyId, updates) {
    try {
      const { data, error } = await supabaseAdmin
        .from('devices')
        .update(updates)
        .eq('id', deviceId)
        .eq('company_id', companyId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating device:', error);
      return { success: false, error: error.message };
    }
  }

  // ============================================
  // OFFERS MANAGEMENT
  // ============================================
  
  static async getOffers(companyId, filters = {}) {
    try {
      let query = supabaseAdmin
        .from('offers')
        .select(`
          *,
          device:devices(
            id,
            device_type,
            brand,
            model,
            serial_number
          ),
          employee:employees(
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.employee_id) {
        query = query.eq('employee_id', filters.employee_id);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching offers:', error);
      return { success: false, error: error.message };
    }
  }

  static async createOffer(companyId, offerData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('offers')
        .insert([{ ...offerData, company_id: companyId }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating offer:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateOfferStatus(offerId, companyId, status, additionalData = {}) {
    try {
      const updates = {
        status,
        ...additionalData,
        [`${status}_at`]: new Date().toISOString(),
      };

      const { data, error } = await supabaseAdmin
        .from('offers')
        .update(updates)
        .eq('id', offerId)
        .eq('company_id', companyId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating offer status:', error);
      return { success: false, error: error.message };
    }
  }

  // ============================================
  // TRANSACTIONS MANAGEMENT
  // ============================================
  
  static async getTransactions(companyId, filters = {}) {
    try {
      let query = supabaseAdmin
        .from('transactions')
        .select(`
          *,
          offer:offers(
            id,
            device:devices(
              device_type,
              brand,
              model
            )
          ),
          employee:employees(
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.transaction_type) {
        query = query.eq('transaction_type', filters.transaction_type);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return { success: false, error: error.message };
    }
  }

  static async createTransaction(companyId, transactionData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('transactions')
        .insert([{ ...transactionData, company_id: companyId }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating transaction:', error);
      return { success: false, error: error.message };
    }
  }

  // ============================================
  // DASHBOARD ANALYTICS
  // ============================================
  
  static async getDashboardStats(companyId) {
    try {
      // Get counts and metrics
      const [
        employeesResult,
        devicesResult,
        offersResult,
        transactionsResult,
      ] = await Promise.all([
        supabaseAdmin
          .from('employees')
          .select('status')
          .eq('company_id', companyId),
        
        supabaseAdmin
          .from('devices')
          .select('status, current_value')
          .eq('company_id', companyId),
        
        supabaseAdmin
          .from('offers')
          .select('status, offer_amount')
          .eq('company_id', companyId),
        
        supabaseAdmin
          .from('transactions')
          .select('status, amount, created_at')
          .eq('company_id', companyId)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
      ]);

      // Process stats
      const stats = {
        employees: {
          total: employeesResult.data?.length || 0,
          active: employeesResult.data?.filter(e => e.status === 'active').length || 0,
        },
        devices: {
          total: devicesResult.data?.length || 0,
          assigned: devicesResult.data?.filter(d => d.status === 'assigned').length || 0,
          available: devicesResult.data?.filter(d => d.status === 'available').length || 0,
          totalValue: devicesResult.data?.reduce((sum, d) => sum + (d.current_value || 0), 0) || 0,
        },
        offers: {
          total: offersResult.data?.length || 0,
          pending: offersResult.data?.filter(o => o.status === 'pending').length || 0,
          accepted: offersResult.data?.filter(o => o.status === 'accepted').length || 0,
          totalValue: offersResult.data?.reduce((sum, o) => sum + (o.offer_amount || 0), 0) || 0,
        },
        transactions: {
          total: transactionsResult.data?.length || 0,
          completed: transactionsResult.data?.filter(t => t.status === 'completed').length || 0,
          totalAmount: transactionsResult.data?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
        },
      };

      return { success: true, data: stats };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return { success: false, error: error.message };
    }
  }

  // ============================================
  // COMPANY SETTINGS
  // ============================================
  
  static async getCompanySettings(companyId, category = null) {
    try {
      let query = supabaseAdmin
        .from('company_settings')
        .select('*')
        .eq('company_id', companyId);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching company settings:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateCompanySetting(companyId, category, settingKey, settingValue, description = null) {
    try {
      const { data, error } = await supabaseAdmin
        .from('company_settings')
        .upsert({
          company_id: companyId,
          category,
          setting_key: settingKey,
          setting_value: settingValue,
          description,
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating company setting:', error);
      return { success: false, error: error.message };
    }
  }

  // ============================================
  // ACTIVITY LOGGING
  // ============================================
  
  static async logActivity(companyId, userId, action, entityType = null, entityId = null, description = null, oldValues = null, newValues = null) {
    try {
      const { data, error } = await supabaseAdmin
        .rpc('log_activity', {
          p_company_id: companyId,
          p_user_id: userId,
          p_action: action,
          p_entity_type: entityType,
          p_entity_id: entityId,
          p_description: description,
          p_old_values: oldValues,
          p_new_values: newValues,
        });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error logging activity:', error);
      return { success: false, error: error.message };
    }
  }

  static async getActivityLogs(companyId, filters = {}) {
    try {
      let query = supabaseAdmin
        .from('activity_logs')
        .select(`
          *,
          user:company_users(
            first_name,
            last_name,
            email
          )
        `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false })
        .limit(filters.limit || 50);

      if (filters.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      if (filters.entity_type) {
        query = query.eq('entity_type', filters.entity_type);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      return { success: false, error: error.message };
    }
  }
}

export default CompanyService;