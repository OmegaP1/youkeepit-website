// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  console.error("Supabase error:", error);
  return {
    success: false,
    error: error.message || "An unexpected error occurred",
  };
};

// Helper function for successful responses
export const handleSupabaseSuccess = (
  data,
  message = "Operation successful"
) => {
  return {
    success: true,
    data,
    message,
  };
};