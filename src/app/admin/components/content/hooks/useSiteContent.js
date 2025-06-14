// src/app/admin/components/content/hooks/useSiteContent.js
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function useSiteContent() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section_name", { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error("Error fetching site content:", error);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id, updates) => {
    try {
      const { error } = await supabase
        .from("site_content")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      await fetchContent(); // Refresh data
      return true;
    } catch (error) {
      console.error("Error updating content:", error);
      return false;
    }
  };

  return {
    content,
    loading,
    fetchContent,
    updateContent,
  };
}