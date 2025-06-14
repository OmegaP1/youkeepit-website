// src/app/admin/components/testimonials/hooks/useTestimonials.js
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const createTestimonial = async (testimonialData) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .insert([testimonialData]);

      if (error) throw error;
      await fetchTestimonials();
      return true;
    } catch (error) {
      console.error("Error creating testimonial:", error);
      return false;
    }
  };

  const updateTestimonial = async (id, updates) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      await fetchTestimonials();
      return true;
    } catch (error) {
      console.error("Error updating testimonial:", error);
      return false;
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
      await fetchTestimonials();
      return true;
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      return false;
    }
  };

  return {
    testimonials,
    loading,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
}