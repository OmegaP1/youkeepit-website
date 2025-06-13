// src/utils/api-client.js
// Client-side API utility functions for better error handling and caching

class ApiClient {
  constructor(baseUrl = '/api/admin') {
    this.baseUrl = baseUrl
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body !== 'string') {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Features
  async getFeatures() {
    return this.request('/features')
  }

  async createFeature(feature) {
    return this.request('/features', {
      method: 'POST',
      body: feature,
    })
  }

  async updateFeature(id, updates) {
    return this.request(`/features/${id}`, {
      method: 'PUT',
      body: updates,
    })
  }

  async deleteFeature(id) {
    return this.request(`/features/${id}`, {
      method: 'DELETE',
    })
  }

  // Testimonials
  async getTestimonials() {
    return this.request('/testimonials')
  }

  async createTestimonial(testimonial) {
    return this.request('/testimonials', {
      method: 'POST',
      body: testimonial,
    })
  }

  async updateTestimonial(id, updates) {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: updates,
    })
  }

  async deleteTestimonial(id) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    })
  }

  // Pricing Plans
  async getPricingPlans() {
    return this.request('/pricing')
  }

  async createPricingPlan(plan) {
    return this.request('/pricing', {
      method: 'POST',
      body: plan,
    })
  }

  async updatePricingPlan(id, updates) {
    return this.request(`/pricing/${id}`, {
      method: 'PUT',
      body: updates,
    })
  }

  async deletePricingPlan(id) {
    return this.request(`/pricing/${id}`, {
      method: 'DELETE',
    })
  }

  // FAQ Items
  async getFAQItems() {
    return this.request('/faq')
  }

  async createFAQItem(faq) {
    return this.request('/faq', {
      method: 'POST',
      body: faq,
    })
  }

  async updateFAQItem(id, updates) {
    return this.request(`/faq/${id}`, {
      method: 'PUT',
      body: updates,
    })
  }

  async deleteFAQItem(id) {
    return this.request(`/faq/${id}`, {
      method: 'DELETE',
    })
  }

  // Site Content
  async getSiteContent() {
    return this.request('/content')
  }

  async updateSiteContent(sectionName, contentKey, contentValue, contentType = 'text') {
    return this.request('/content', {
      method: 'PUT',
      body: { section_name: sectionName, content_key: contentKey, content_value: contentValue, content_type: contentType },
    })
  }

  // Migration
  async migrateData() {
    return this.request('/migrate', {
      method: 'POST',
    })
  }
}

export const apiClient = new ApiClient()