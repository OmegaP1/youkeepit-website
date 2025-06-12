// src/context/ContentContext.js
import React, { createContext, useContext } from 'react'
import { useContentData } from '@/hooks/useContentData'

const ContentContext = createContext()

export const ContentProvider = ({ children }) => {
  const contentData = useContentData()

  return (
    <ContentContext.Provider value={contentData}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

// Helper functions for content management
export const useSiteContent = (sectionName, contentKey, defaultValue = '') => {
  const { siteContent } = useContent()
  
  const value = siteContent[sectionName]?.[contentKey]?.value || defaultValue
  const type = siteContent[sectionName]?.[contentKey]?.type || 'text'
  
  return { value, type }
}