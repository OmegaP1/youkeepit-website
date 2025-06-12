// src/app/admin/page.js
"use client";

import React, { useState } from "react";
import { ContentProvider } from "@/context/ContentContext";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-gray-100">
        <AdminDashboard />
      </div>
    </ContentProvider>
  );
}
