// src/app/admin/components/features/hooks/useFeatures.js
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function useFeatures() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("features")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      setFeatures(data || []);
    } catch (error) {
      console.error("Error fetching features:", error);
      setFeatures([]);
    } finally {
      setLoading(false);
    }
  };

  const createFeature = async (featureData) => {
    try {
      const { error } = await supabase
        .from("features")
        .insert([featureData]);

      if (error) throw error;
      await fetchFeatures();
      return true;
    } catch (error) {
      console.error("Error creating feature:", error);
      return false;
    }
  };

  const updateFeature = async (id, updates) => {
    try {
      const { error } = await supabase
        .from("features")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      await fetchFeatures();
      return true;
    } catch (error) {
      console.error("Error updating feature:", error);
      return false;
    }
  };

  const deleteFeature = async (id) => {
    try {
      const { error } = await supabase
        .from("features")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
      await fetchFeatures();
      return true;
    } catch (error) {
      console.error("Error deleting feature:", error);
      return false;
    }
  };

  return {
    features,
    loading,
    fetchFeatures,
    createFeature,
    updateFeature,
    deleteFeature,
  };
}