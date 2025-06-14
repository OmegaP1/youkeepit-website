// src/app/admin/components/benefits/hooks/useBenefits.js
"use client";

import { useState } from "react";
import { DatabaseService } from "@/services/database";

export function useBenefits() {
  const [benefitsContent, setBenefitsContent] = useState({});
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBenefitsData = async () => {
    setLoading(true);
    try {
      // Fetch benefits content
      const contentData = await DatabaseService.getSiteContent('benefits');
      const content = {};
      contentData.forEach(item => {
        content[item.content_key] = item.content_value;
      });
      setBenefitsContent(content);

      // Fetch benefits
      const benefitsData = await DatabaseService.getBenefits();
      setBenefits(benefitsData);
    } catch (error) {
      console.error('Error fetching benefits data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBenefitsContent = async (contentData) => {
    try {
      // Update multiple content items for benefits section
      for (const [key, value] of Object.entries(contentData)) {
        await DatabaseService.updateSiteContent('benefits', key, value, 'text');
      }
      setBenefitsContent(contentData);
      return true;
    } catch (error) {
      console.error('Error updating benefits content:', error);
      return false;
    }
  };

  const createBenefit = async (benefitData) => {
    try {
      const newBenefit = await DatabaseService.createBenefit(benefitData);
      setBenefits(prev => [...prev, newBenefit]);
      return true;
    } catch (error) {
      console.error('Error creating benefit:', error);
      return false;
    }
  };

  const updateBenefit = async (id, benefitData) => {
    try {
      const updatedBenefit = await DatabaseService.updateBenefit(id, benefitData);
      setBenefits(prev => 
        prev.map(benefit => benefit.id === id ? updatedBenefit : benefit)
      );
      return true;
    } catch (error) {
      console.error('Error updating benefit:', error);
      return false;
    }
  };

  const deleteBenefit = async (id) => {
    try {
      await DatabaseService.deleteBenefit(id);
      setBenefits(prev => prev.filter(benefit => benefit.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting benefit:', error);
      return false;
    }
  };

  return {
    benefitsContent,
    benefits,
    loading,
    fetchBenefitsData,
    updateBenefitsContent,
    createBenefit,
    updateBenefit,
    deleteBenefit,
  };
}