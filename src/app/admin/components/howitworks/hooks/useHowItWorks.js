// src/app/admin/components/howitworks/hooks/useHowItWorks.js
"use client";

import { useState } from "react";
import { DatabaseService } from "@/services/database";

export function useHowItWorks() {
  const [howItWorksContent, setHowItWorksContent] = useState({});
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHowItWorksData = async () => {
    setLoading(true);
    try {
      // Fetch how it works content
      const contentData = await DatabaseService.getSiteContent('how_it_works');
      const content = {};
      contentData.forEach(item => {
        content[item.content_key] = item.content_value;
      });
      setHowItWorksContent(content);

      // Fetch how it works steps
      const stepsData = await DatabaseService.getHowItWorksSteps();
      setSteps(stepsData);
    } catch (error) {
      console.error('Error fetching how it works data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateHowItWorksContent = async (contentData) => {
    try {
      // Update multiple content items for how_it_works section
      for (const [key, value] of Object.entries(contentData)) {
        await DatabaseService.updateSiteContent('how_it_works', key, value, 'text');
      }
      setHowItWorksContent(contentData);
      return true;
    } catch (error) {
      console.error('Error updating how it works content:', error);
      return false;
    }
  };

  const createStep = async (stepData) => {
    try {
      const newStep = await DatabaseService.createHowItWorksStep(stepData);
      setSteps(prev => [...prev, newStep]);
      return true;
    } catch (error) {
      console.error('Error creating step:', error);
      return false;
    }
  };

  const updateStep = async (id, stepData) => {
    try {
      const updatedStep = await DatabaseService.updateHowItWorksStep(id, stepData);
      setSteps(prev => 
        prev.map(step => step.id === id ? updatedStep : step)
      );
      return true;
    } catch (error) {
      console.error('Error updating step:', error);
      return false;
    }
  };

  const deleteStep = async (id) => {
    try {
      await DatabaseService.deleteHowItWorksStep(id);
      setSteps(prev => prev.filter(step => step.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting step:', error);
      return false;
    }
  };

  return {
    howItWorksContent,
    steps,
    loading,
    fetchHowItWorksData,
    updateHowItWorksContent,
    createStep,
    updateStep,
    deleteStep,
  };
}