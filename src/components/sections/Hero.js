'use client'

import React from 'react'
import { motion } from "framer-motion";
import { ArrowRight, Play, Users, Shield, TrendingUp } from "lucide-react";
import {
  scrollToElement,
  trackEvent,
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "@/utils/helpers";
import toast from "react-hot-toast";

const EnhancedHero = ({ darkMode }) => {
  const handleDemoRequest = () => {
    trackEvent("demo_request_clicked", { location: "hero_primary_cta" });
    scrollToElement("pricing");
    toast.success("🚀 Let's get you set up with a demo!", {
      duration: 3000,
      position: "top-center",
    });
  };

  const handleWatchDemo = () => {
    trackEvent("watch_demo_clicked", { location: "hero_secondary_cta" });
    scrollToElement("how-it-works");
    toast("📹 Check out how YouKeepIt works!", {
      icon: "👀",
      duration: 2000,
    });
  };

  return (
    <section
      id="home"
      className={`pt-24 pb-20 overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
          : "bg-gradient-to-br from-blue-50 via-white to-green-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="space-y-4" variants={fadeInUp}>
              <motion.h1
                className={`text-4xl md:text-6xl font-bold leading-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
                variants={slideInLeft}
              >
                Streamline Your
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block"
                  variants={fadeInUp}
                >
                  IT Equipment
                </motion.span>
                Transitions
              </motion.h1>
              <motion.p
                className={`text-xl leading-relaxed max-w-2xl ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}
                variants={slideInLeft}
              >
                Transform how your company handles employee departures and
                equipment upgrades. Create value from old devices while ensuring
                smooth, secure transitions.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <motion.button
                onClick={handleDemoRequest}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 group shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Demo
                <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={handleWatchDemo}
                className={`border-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                  darkMode
                    ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8"
              variants={staggerContainer}
            >
              {[
                { value: "87%", label: "Cost Reduction" },
                { value: "24hrs", label: "Setup Time" },
                { value: "500+", label: "Companies" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`text-3xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <motion.div
            className="relative"
            initial="initial"
            animate="animate"
            variants={slideInRight}
          >
            <motion.div
              className={`relative z-10 p-8 rounded-2xl backdrop-blur-lg ${
                darkMode
                  ? "bg-slate-800/60 border border-slate-700/50"
                  : "bg-white/60 border border-white/20"
              } shadow-2xl`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="space-y-6" variants={staggerContainer}>
                <FeatureCard
                  icon={Users}
                  iconColor="bg-gradient-to-r from-blue-500 to-blue-600"
                  title="Employee Marketplace"
                  description="Discounted devices for staff"
                  darkMode={darkMode}
                  delay={0.1}
                />

                <FeatureCard
                  icon={Shield}
                  iconColor="bg-gradient-to-r from-green-500 to-green-600"
                  title="Secure Transitions"
                  description="Data wiping & compliance"
                  darkMode={darkMode}
                  delay={0.2}
                />

                <FeatureCard
                  icon={TrendingUp}
                  iconColor="bg-gradient-to-r from-purple-500 to-purple-600"
                  title="Asset Recovery"
                  description="Maximize equipment value"
                  darkMode={darkMode}
                  delay={0.3}
                />
              </motion.div>
            </motion.div>

            {/* Animated Background Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Feature Card Component
const FeatureCard = ({
  icon: Icon,
  iconColor,
  title,
  description,
  darkMode,
  delay = 0,
}) => (
  <motion.div
    className="flex items-center space-x-3"
    variants={fadeInUp}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <motion.div
      className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center shadow-lg`}
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
    >
      <Icon className="w-6 h-6 text-white" />
    </motion.div>
    <div>
      <div
        className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </div>
      <div
        className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}
      >
        {description}
      </div>
    </div>
  </motion.div>
);

export default EnhancedHero;