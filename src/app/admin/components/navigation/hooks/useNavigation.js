// src/app/admin/components/navigation/hooks/useNavigation.js
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function useNavigation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("navigation_items")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching navigation items:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateItems = async (navigationItems) => {
    try {
      // First, mark all existing items as inactive
      await supabase
        .from("navigation_items")
        .update({ is_active: false })
        .neq("id", 0);

      // Then insert/update the new items
      const itemsToUpsert = navigationItems.map((item, index) => ({
        ...item,
        order_index: index,
        is_active: true,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from("navigation_items")
        .upsert(itemsToUpsert);

      if (error) throw error;
      await fetchItems();
      return true;
    } catch (error) {
      console.error("Error updating navigation items:", error);
      return false;
    }
  };

  return {
    items,
    loading,
    fetchItems,
    updateItems,
  };
}