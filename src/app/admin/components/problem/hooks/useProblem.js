// src/app/admin/components/problem/hooks/useProblem.js
"use client";

import { useState } from "react";
import { DatabaseService } from "@/services/database";

export function useProblem() {
  const [problemContent, setProblemContent] = useState({});
  const [problemStats, setProblemStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProblemData = async () => {
    setLoading(true);
    try {
      // Fetch problem content
      const contentData = await DatabaseService.getSiteContent('problem');
      const content = {};
      contentData.forEach(item => {
        content[item.content_key] = item.content_value;
      });
      setProblemContent(content);

      // Fetch problem statistics
      const statsData = await DatabaseService.getProblemStats();
      setProblemStats(statsData);
    } catch (error) {
      console.error('Error fetching problem data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProblemContent = async (contentData) => {
    try {
      // Update multiple content items for problem section
      for (const [key, value] of Object.entries(contentData)) {
        await DatabaseService.updateSiteContent('problem', key, value, 'text');
      }
      setProblemContent(contentData);
      return true;
    } catch (error) {
      console.error('Error updating problem content:', error);
      return false;
    }
  };

  const createProblemStat = async (statData) => {
    try {
      const newStat = await DatabaseService.createProblemStat(statData);
      setProblemStats(prev => [...prev, newStat]);
      return true;
    } catch (error) {
      console.error('Error creating problem stat:', error);
      return false;
    }
  };

  const updateProblemStat = async (id, statData) => {
    try {
      const updatedStat = await DatabaseService.updateProblemStat(id, statData);
      setProblemStats(prev => 
        prev.map(stat => stat.id === id ? updatedStat : stat)
      );
      return true;
    } catch (error) {
      console.error('Error updating problem stat:', error);
      return false;
    }
  };

  const deleteProblemStat = async (id) => {
    try {
      await DatabaseService.deleteProblemStat(id);
      setProblemStats(prev => prev.filter(stat => stat.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting problem stat:', error);
      return false;
    }
  };

  return {
    problemContent,
    problemStats,
    loading,
    fetchProblemData,
    updateProblemContent,
    createProblemStat,
    updateProblemStat,
    deleteProblemStat,
  };
}