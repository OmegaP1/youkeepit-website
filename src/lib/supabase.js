// src/lib/supabase.js
// Enhanced Supabase configuration with error handling and connection management
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create Supabase client with enhanced configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database helper functions
export const dbHelpers = {
  // Generic fetch function with error handling
  async fetchData(table, options = {}) {
    try {
      let query = supabase.from(table).select('*');
      
      if (options.filter) {
        query = query.eq(options.filter.column, options.filter.value);
      }
      
      if (options.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error(`Error fetching from ${table}:`, error);
      return { data: null, error };
    }
  },

  // Generic insert function
  async insertData(table, data) {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select();
      
      if (error) throw error;
      return { data: result?.[0], error: null };
    } catch (error) {
      console.error(`Error inserting into ${table}:`, error);
      return { data: null, error };
    }
  },

  // Generic update function
  async updateData(table, id, data) {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return { data: result?.[0], error: null };
    } catch (error) {
      console.error(`Error updating ${table}:`, error);
      return { data: null, error };
    }
  },

  // Generic soft delete function
  async softDelete(table, id) {
    try {
      const { data, error } = await supabase
        .from(table)
        .update({ 
          is_active: false, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return { data: data?.[0], error: null };
    } catch (error) {
      console.error(`Error soft deleting from ${table}:`, error);
      return { data: null, error };
    }
  }
};

// Connection test function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('count', { count: 'exact', head: true });
    
    if (error) throw error;
    return { connected: true, error: null };
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return { connected: false, error };
  }
};

export default supabase;