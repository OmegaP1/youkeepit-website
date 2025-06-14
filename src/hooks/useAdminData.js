// src/hooks/useAdminData.js
"use client";

import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export function useAdminData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic data fetching function
  const fetchData = useCallback(async (table, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase.from(table).select("*");
      
      // Apply common filters
      if (options.activeOnly !== false) {
        query = query.eq("is_active", true);
      }
      
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending !== false });
      }
      
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      setError(err.message);
      console.error(`Error fetching ${table}:`, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Generic create function
  const createRecord = useCallback(async (table, data) => {
    try {
      const { error } = await supabase
        .from(table)
        .insert([data]);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message);
      console.error(`Error creating record in ${table}:`, err);
      return false;
    }
  }, []);

  // Generic update function
  const updateRecord = useCallback(async (table, id, updates) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message);
      console.error(`Error updating record in ${table}:`, err);
      return false;
    }
  }, []);

  // Generic soft delete function
  const deleteRecord = useCallback(async (table, id) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message);
      console.error(`Error deleting record in ${table}:`, err);
      return false;
    }
  }, []);

  // Bulk operations
  const bulkUpdate = useCallback(async (table, records) => {
    try {
      const { error } = await supabase
        .from(table)
        .upsert(records);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message);
      console.error(`Error bulk updating ${table}:`, err);
      return false;
    }
  }, []);

  return {
    loading,
    error,
    setError,
    fetchData,
    createRecord,
    updateRecord,
    deleteRecord,
    bulkUpdate,
  };
}