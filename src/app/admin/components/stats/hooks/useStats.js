// src/app/admin/components/stats/hooks/useStats.js
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function useStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("company_stats")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      setStats(data || []);
    } catch (error) {
      console.error("Error fetching company stats:", error);
      setStats([]);
    } finally {
      setLoading(false);
    }
  };

  const createStat = async (statData) => {
    try {
      const { error } = await supabase
        .from("company_stats")
        .insert([statData]);

      if (error) throw error;
      await fetchStats();
      return true;
    } catch (error) {
      console.error("Error creating stat:", error);
      return false;
    }
  };

  const updateStat = async (id, updates) => {
    try {
      const { error } = await supabase
        .from("company_stats")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      await fetchStats();
      return true;
    } catch (error) {
      console.error("Error updating stat:", error);
      return false;
    }
  };

  const deleteStat = async (id) => {
    try {
      const { error } = await supabase
        .from("company_stats")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
      await fetchStats();
      return true;
    } catch (error) {
      console.error("Error deleting stat:", error);
      return false;
    }
  };

  return {
    stats,
    loading,
    fetchStats,
    createStat,
    updateStat,
    deleteStat,
  };
}