// src/hooks/useContentData.js
import { useState, useEffect } from 'react'
import { DatabaseService } from '@/services/database'

export const useContentData = () => {
  const [features, setFeatures] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [pricingPlans, setPricingPlans] = useState([])
  const [faqItems, setFaqItems] = useState([])
  const [navigationItems, setNavigationItems] = useState([])
  const [companyStats, setCompanyStats] = useState([])
  const [siteContent, setSiteContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAllData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [
        featuresData,
        testimonialsData,
        pricingData,
        faqData,
        navData,
        statsData,
        contentData
      ] = await Promise.all([
        DatabaseService.getFeatures(),
        DatabaseService.getTestimonials(),
        DatabaseService.getPricingPlans(),
        DatabaseService.getFAQItems(),
        DatabaseService.getNavigationItems(),
        DatabaseService.getCompanyStats(),
        DatabaseService.getSiteContent()
      ])

      setFeatures(featuresData)
      setTestimonials(testimonialsData)
      setPricingPlans(pricingData)
      setFaqItems(faqData)
      setNavigationItems(navData)
      setCompanyStats(statsData)

      // Convert site content array to object for easier access
      const contentObj = {}
      contentData.forEach(item => {
        if (!contentObj[item.section_name]) {
          contentObj[item.section_name] = {}
        }
        contentObj[item.section_name][item.content_key] = {
          value: item.content_value,
          type: item.content_type
        }
      })
      setSiteContent(contentObj)

    } catch (err) {
      setError(err.message)
      console.error('Error fetching content data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  const refreshData = () => {
    fetchAllData()
  }

  return {
    features,
    testimonials,
    pricingPlans,
    faqItems,
    navigationItems,
    companyStats,
    siteContent,
    loading,
    error,
    refreshData,
    setFeatures,
    setTestimonials,
    setPricingPlans,
    setFaqItems,
    setNavigationItems,
    setCompanyStats,
    setSiteContent
  }
}