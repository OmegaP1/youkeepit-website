// src/components/layout/Navigation.js
"use client";

import React, { useState, useEffect } from "react";
import { DatabaseService } from "@/services/database";

const Navigation = ({ darkMode }) => {
  const [navigationItems, setNavigationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavigationItems = async () => {
      try {
        setLoading(true);
        const navData = await DatabaseService.getNavigationItems();
        setNavigationItems(navData);
      } catch (error) {
        console.error("Error fetching navigation items:", error);
        // Fallback to default navigation if DB fails
        setNavigationItems([
          { label: "Home", href: "#home" },
          { label: "How It Works", href: "#how-it-works" },
          { label: "Pricing", href: "#pricing" },
          { label: "About", href: "#benefits" },
          { label: "Contact", href: "#faq" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationItems();
  }, []);

  if (loading) {
    return (
      <nav className="hidden md:flex space-x-8">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`h-4 w-20 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            } rounded animate-pulse`}
          ></div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex space-x-8">
      {navigationItems.map((item) => (
        <a
          key={item.id || item.label}
          href={item.href}
          className={`font-medium transition-colors duration-200 hover:text-blue-600 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
