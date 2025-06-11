'use client'

import { useState, useEffect } from 'react'

export const useScrollSpy = (sectionIds = [], options = {}) => {
  const [activeSection, setActiveSection] = useState('')
  
  const {
    offset = 100,
    threshold = 0.3
  } = options

  useEffect(() => {
    // Only run if sectionIds is a valid array
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
      return
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          const sectionTop = offsetTop
          const sectionBottom = offsetTop + offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - offset + 50
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return { activeSection, scrollToSection }
}