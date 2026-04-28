import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge Tailwind classes safely
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format currency for display
export function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format percentage for display
export function formatPercentage(value, decimals = 0) {
  return `${value.toFixed(decimals)}%`;
}

// Scroll to element with offset
export function scrollToElement(elementId, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const offsetTop = element.offsetTop - offset;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// Debounce function for performance
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Track events for analytics
export function trackEvent(eventName, properties = {}) {
  // This would integrate with your analytics service
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, properties);
  }

  // Vercel Analytics
  if (typeof window !== "undefined" && window.va) {
    window.va.track(eventName, properties);
  }

  console.log("Event tracked:", eventName, properties);
}

// Copy text to clipboard
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
}

// Generate meta tags for pages
export function generateMetaTags({
  title,
  description,
  image = '/og-image.jpg',
  url = 'https://KeepMyKit-website.vercel.app',
  type = 'website',
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Calculate ROI
export function calculateROI(devices, avgValue, recoveryRate) {
  const totalValue = devices * avgValue;
  const recoveredValue = totalValue * (recoveryRate / 100);
  return {
    totalValue,
    recoveredValue,
    savings: recoveredValue,
    roi: ((recoveredValue / totalValue) * 100).toFixed(1),
  };
}

// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};
