// src/app/admin/components/pricing/hooks/usePricing.js
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function usePricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error("Error fetching pricing plans:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const createPlan = async (planData) => {
    try {
      const { error } = await supabase
        .from("pricing_plans")
        .insert([planData]);

      if (error) throw error;
      await fetchPlans();
      return true;
    } catch (error) {
      console.error("Error creating plan:", error);
      return false;
    }
  };

  const updatePlan = async (id, updates) => {
    try {
      const { error } = await supabase
        .from("pricing_plans")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      await fetchPlans();
      return true;
    } catch (error) {
      console.error("Error updating plan:", error);
      return false;
    }
  };

  const deletePlan = async (id) => {
    try {
      const { error } = await supabase
        .from("pricing_plans")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
      await fetchPlans();
      return true;
    } catch (error) {
      console.error("Error deleting plan:", error);
      return false;
    }
  };

  return {
    plans,
    loading,
    fetchPlans,
    createPlan,
    updatePlan,
    deletePlan,
  };
}