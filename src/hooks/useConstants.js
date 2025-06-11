// src/hooks/useConstants.js
import { useState, useEffect } from 'react';

// THIS SHOULD MATCH YOUR ACTUAL CONSTANTS FROM src/utils/constants.js
// Replace this with your actual constants structure
const DEFAULT_CONSTANTS = {
  COMPANY_INFO: {
    name: "YouKeepIt",
    email: "contact@youkeepit.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, City, State 12345"
  },
  HERO_CONTENT: {
    headline: "Transform Your IT Equipment Transitions",
    subheadline: "The smart SaaS solution that helps companies manage equipment handovers, sell refurbished devices to employees, and maintain complete IT asset visibility.",
    ctaText: "Get Started Today",
    secondaryCtaText: "Schedule Demo"
  },
  HOW_IT_WORKS: [
    {
      step: 1,
      title: "Employee Departure",
      description: "Automated workflows trigger when employees leave, ensuring nothing falls through the cracks.",
      color: "bg-blue-600"
    },
    {
      step: 2,
      title: "Device Assessment",
      description: "AI-powered evaluation determines optimal pricing and refurbishment needs for maximum value recovery.",
      color: "bg-green-600"
    },
    {
      step: 3,
      title: "Secure Transfer",
      description: "Automated data wiping, documentation, and secure handover process with full compliance tracking.",
      color: "bg-purple-600"
    }
  ],
  FEATURES_LIST: [
    {
      title: "Enterprise Security",
      description: "Military-grade encryption and compliance with SOC 2, GDPR, and industry standards.",
      icon: "🔒"
    },
    {
      title: "Employee Portal",
      description: "Self-service marketplace where employees can browse, purchase, and track their orders.",
      icon: "👥"
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time insights into asset recovery, cost savings, and environmental impact.",
      icon: "📊"
    },
    {
      title: "Automated Workflows",
      description: "Streamlined processes for device preparation, data wiping, and documentation.",
      icon: "⚙️"
    },
    {
      title: "Integration Ready",
      description: "Seamlessly connects with your existing HRIS, asset management, and IT systems.",
      icon: "🔗"
    },
    {
      title: "White-Label Option",
      description: "Customize the platform with your branding for a seamless employee experience.",
      icon: "🎨"
    }
  ],
  TESTIMONIALS: [
    {
      name: "Sarah Chen",
      role: "IT Director, TechCorp",
      content: "YouKeepIt transformed our equipment transition process. We've recovered over $500k in value this year alone while making our employees happy.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "HR Manager, GrowthCo",
      content: "The employee marketplace is brilliant. Our staff love getting quality devices at great prices, and we've eliminated equipment storage costs.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "CFO, ScaleTech",
      content: "The ROI was immediate. We implemented YouKeepIt in one day and started seeing savings within the first week. Incredible platform.",
      rating: 5
    }
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
        "Standard data wiping"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$2,999",
      period: "/month",
      description: "Most popular for growing companies",
      features: [
        "Up to 500 devices/year",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Unlimited devices",
        "Dedicated success manager",
        "Custom integrations",
        "Advanced compliance",
        "SLA guarantee"
      ],
      popular: false
    }
  ],
  FAQ_ITEMS: [
    {
      question: "How quickly can we implement YouKeepIt?",
      answer: "Most companies are up and running within 24 hours. Our onboarding team guides you through the simple setup process, and integration with existing systems typically takes just a few hours."
    },
    {
      question: "What happens to sensitive data on devices?",
      answer: "We use military-grade data wiping procedures that exceed DOD 5220.22-M standards. All data destruction is certified and documented for compliance purposes."
    },
    {
      question: "How do you determine device pricing for employees?",
      answer: "Our AI-powered pricing engine considers market value, device condition, age, and specs to offer fair pricing that benefits both the company and employees."
    },
    {
      question: "Can employees finance their purchases?",
      answer: "Yes, we offer flexible payment options including payroll deduction, monthly payment plans, and third-party financing options."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 technical support, dedicated customer success managers for Enterprise clients, and comprehensive documentation and training resources."
    }
  ]
};

const useConstants = () => {
  const [constants, setConstants] = useState(() => {
    // Load from localStorage if available, otherwise use defaults
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('youkeepit-constants');
        return saved ? JSON.parse(saved) : DEFAULT_CONSTANTS;
      } catch (error) {
        console.error('Error loading constants from localStorage:', error);
        return DEFAULT_CONSTANTS;
      }
    }
    return DEFAULT_CONSTANTS;
  });

  // Save to localStorage whenever constants change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('youkeepit-constants', JSON.stringify(constants));
      } catch (error) {
        console.error('Error saving constants to localStorage:', error);
      }
    }
  }, [constants]);

  const updateConstants = (newConstants) => {
    setConstants(newConstants);
  };

  const resetConstants = () => {
    setConstants(DEFAULT_CONSTANTS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('youkeepit-constants');
    }
  };

  return {
    constants,
    updateConstants,
    resetConstants
  };
};

export default useConstants;