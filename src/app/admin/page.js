"use client";

import React, { useState, useEffect } from 'react';
import AdminLogin from '../../components/admin/AdminLogin';
import AdminDashboard from '../../components/admin/AdminDashboard';

// Example constants structure - REPLACE THIS with your actual constants from src/utils/constants.js
const EXAMPLE_CONSTANTS = {
  COMPANY_INFO: {
    name: "YouKeepIt",
    email: "contact@youkeepit.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, City, State 12345",
  },
  HERO_CONTENT: {
    headline: "Transform Your IT Equipment Transitions",
    subheadline:
      "The smart SaaS solution that helps companies manage equipment handovers, sell refurbished devices to employees, and maintain complete IT asset visibility.",
    ctaText: "Get Started Today",
    secondaryCtaText: "Schedule Demo",
  },
  HOW_IT_WORKS: [
    {
      step: 1,
      title: "Employee Departure",
      description:
        "Automated workflows trigger when employees leave, ensuring nothing falls through the cracks.",
      color: "bg-blue-600",
    },
    {
      step: 2,
      title: "Device Assessment",
      description:
        "AI-powered evaluation determines optimal pricing and refurbishment needs for maximum value recovery.",
      color: "bg-green-600",
    },
    {
      step: 3,
      title: "Secure Transfer",
      description:
        "Automated data wiping, documentation, and secure handover process with full compliance tracking.",
      color: "bg-purple-600",
    },
  ],
  FEATURES_LIST: [
    {
      title: "Enterprise Security",
      description:
        "Military-grade encryption and compliance with SOC 2, GDPR, and industry standards.",
      icon: "🔒",
    },
    {
      title: "Employee Portal",
      description:
        "Self-service marketplace where employees can browse, purchase, and track their orders.",
      icon: "👥",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time insights into asset recovery, cost savings, and environmental impact.",
      icon: "📊",
    },
  ],
  TESTIMONIALS: [
    {
      name: "Sarah Chen",
      role: "IT Director, TechCorp",
      content:
        "YouKeepIt transformed our equipment transition process. We've recovered over $500k in value this year alone while making our employees happy.",
      rating: 5,
    },
  ],
  PRICING_PLANS: [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for small teams",
      features: [
        "Up to 50 devices/year",
        "Basic marketplace",
        "Email support",
        "Standard data wiping",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$999",
      period: "/month",
      description: "Most popular for growing companies",
      features: [
        "Up to 500 devices/year",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "API access",
      ],
      popular: true,
    },
  ],
  FAQ_ITEMS: [
    {
      question: "How quickly can we implement YouKeepIt?",
      answer:
        "Most companies are up and running within 24 hours. Our onboarding team guides you through the simple setup process, and integration with existing systems typically takes just a few hours.",
    },
    {
      question: "What happens to sensitive data on devices?",
      answer:
        "We use military-grade data wiping procedures that exceed DOD 5220.22-M standards. All data destruction is certified and documented for compliance purposes.",
    },
  ],
};

// src/app/admin/page.js
const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [constants, setConstants] = useState(() => {
    // Try to load from localStorage, fallback to example constants
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('youkeepit-constants');
      return saved ? JSON.parse(saved) : EXAMPLE_CONSTANTS;
    }
    return EXAMPLE_CONSTANTS;
  });

  // Save constants to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('youkeepit-constants', JSON.stringify(constants));
    }
  }, [constants]);

  const handleLogin = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleUpdateConstants = (newConstants) => {
    setConstants(newConstants);
  };

  return (
    <div>
      {isAuthenticated ? (
        <AdminDashboard 
          constants={constants}
          onUpdateConstants={handleUpdateConstants}
          onLogout={handleLogout}
        />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminPage;