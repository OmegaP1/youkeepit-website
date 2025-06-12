// src/hooks/useAdminActions.js
import { useState } from 'react'
import { DatabaseService } from '@/services/database'
import { useContent } from '@/context/ContentContext'

export const useAdminActions = () => {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const { refreshData } = useContent()

  // Features actions
  const createFeature = async (featureData) => {
    try {
      setSaving(true)
      await DatabaseService.createFeature(featureData)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  const updateFeature = async (id, updates) => {
    try {
      setSaving(true)
      await DatabaseService.updateFeature(id, updates)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  const deleteFeature = async (id) => {
    try {
      setSaving(true)
      await DatabaseService.deleteFeature(id)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Testimonials actions
  const createTestimonial = async (testimonialData) => {
    try {
      setSaving(true)
      await DatabaseService.createTestimonial(testimonialData)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  const updateTestimonial = async (id, updates) => {
    try {
      setSaving(true)
      await DatabaseService.updateTestimonial(id, updates)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  const deleteTestimonial = async (id) => {
    try {
      setSaving(true)
      await DatabaseService.deleteTestimonial(id)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Pricing Plans actions
  const createPricingPlan = async (planData) => {
    try {
      setSaving(true)
      await DatabaseService.createPricingPlan(planData)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  const updatePricingPlan = async (id, updates) => {
    try {
      setSaving(true)
      await DatabaseService.updatePricingPlan(id, updates)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  const deletePricingPlan = async (id) => {
    try {
      setSaving(true)
      await DatabaseService.deletePricingPlan(id)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // FAQ actions
  const createFAQItem = async (faqData) => {
    try {
      setSaving(true)
      await DatabaseService.createFAQItem(faqData)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  const updateFAQItem = async (id, updates) => {
    try {
      setSaving(true)
      await DatabaseService.updateFAQItem(id, updates)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  const deleteFAQItem = async (id) => {
    try {
      setSaving(true)
      await DatabaseService.deleteFAQItem(id)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Site content actions
  const updateSiteContent = async (sectionName, contentKey, contentValue, contentType = 'text') => {
    try {
      setSaving(true)
      await DatabaseService.updateSiteContent(sectionName, contentKey, contentValue, contentType)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Bulk actions
  const updateNavigationItems = async (items) => {
    try {
      setSaving(true)
      await DatabaseService.updateNavigationItems(items)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  const updateCompanyStats = async (stats) => {
    try {
      setSaving(true)
      await DatabaseService.updateCompanyStats(stats)
      await refreshData()
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  return {
    saving,
    error,
    setError,
    // Features
    createFeature,
    updateFeature,
    deleteFeature,
    // Testimonials
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    // Pricing Plans
    createPricingPlan,
    updatePricingPlan,
    deletePricingPlan,
    // FAQ
    createFAQItem,
    updateFAQItem,
    deleteFAQItem,
    // Site Content
    updateSiteContent,
    // Bulk operations
    updateNavigationItems,
    updateCompanyStats
  }
}