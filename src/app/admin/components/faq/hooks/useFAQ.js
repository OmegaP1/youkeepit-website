// src/app/admin/components/faq/hooks/useFAQ.js
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function useFAQ() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("faq_items")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching FAQ items:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData) => {
    try {
      const { error } = await supabase
        .from("faq_items")
        .insert([itemData]);

      if (error) throw error;
      await fetchItems();
      return true;
    } catch (error) {
      console.error("Error creating FAQ item:", error);
      return false;
    }
  };

  const updateItem = async (id, updates) => {
    try {
      const { error } = await supabase
        .from("faq_items")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      await fetchItems();
      return true;
    } catch (error) {
      console.error("Error updating FAQ item:", error);
      return false;
    }
  };

  const deleteItem = async (id) => {
    try {
      const { error } = await supabase
        .from("faq_items")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
      await fetchItems();
      return true;
    } catch (error) {
      console.error("Error deleting FAQ item:", error);
      return false;
    }
  };

  return {
    items,
    loading,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
}