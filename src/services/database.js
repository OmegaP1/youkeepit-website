// src/services/database.js
import { supabase } from '@/lib/supabase'

// Generic CRUD operations
export class DatabaseService {
  // Site Content Management
  static async getSiteContent(sectionName = null) {
    try {
      let query = supabase
        .from('site_content')
        .select('*')
        .eq('is_active', true)

      if (sectionName) {
        query = query.eq('section_name', sectionName)
      }

      const { data, error } = await query.order('section_name', { ascending: true })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching site content:', error)
      return []
    }
  }

  static async updateSiteContent(sectionName, contentKey, contentValue, contentType = 'text') {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .upsert({
          section_name: sectionName,
          content_key: contentKey,
          content_value: contentValue,
          content_type: contentType,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'section_name,content_key'
        })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating site content:', error)
      throw error
    }
  }

  // Features Management
  static async getFeatures() {
    try {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching features:', error)
      return []
    }
  }

  static async createFeature(feature) {
    try {
      const { data, error } = await supabase
        .from('features')
        .insert([feature])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error creating feature:', error)
      throw error
    }
  }

  static async updateFeature(id, updates) {
    try {
      const { data, error } = await supabase
        .from('features')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error updating feature:', error)
      throw error
    }
  }

  static async deleteFeature(id) {
    try {
      const { data, error } = await supabase
        .from('features')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error deleting feature:', error)
      throw error
    }
  }

  // Testimonials Management
  static async getTestimonials() {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }
  }

  static async createTestimonial(testimonial) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonial])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error creating testimonial:', error)
      throw error
    }
  }

  static async updateTestimonial(id, updates) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error updating testimonial:', error)
      throw error
    }
  }

  static async deleteTestimonial(id) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      throw error
    }
  }

  // Pricing Plans Management
  static async getPricingPlans() {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching pricing plans:', error)
      return []
    }
  }

  static async createPricingPlan(plan) {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .insert([plan])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error creating pricing plan:', error)
      throw error
    }
  }

  static async updatePricingPlan(id, updates) {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error updating pricing plan:', error)
      throw error
    }
  }

  static async deletePricingPlan(id) {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error deleting pricing plan:', error)
      throw error
    }
  }

  // FAQ Management
  static async getFAQItems() {
    try {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching FAQ items:', error)
      return []
    }
  }

  static async createFAQItem(faq) {
    try {
      const { data, error } = await supabase
        .from('faq_items')
        .insert([faq])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error creating FAQ item:', error)
      throw error
    }
  }

  static async updateFAQItem(id, updates) {
    try {
      const { data, error } = await supabase
        .from('faq_items')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error updating FAQ item:', error)
      throw error
    }
  }

  static async deleteFAQItem(id) {
    try {
      const { data, error } = await supabase
        .from('faq_items')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error deleting FAQ item:', error)
      throw error
    }
  }

  // Navigation Management
  static async getNavigationItems() {
    try {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching navigation items:', error)
      return []
    }
  }

  static async updateNavigationItems(items) {
    try {
      // Delete all existing items and insert new ones
      await supabase.from('navigation_items').update({ is_active: false }).eq('is_active', true)

      const { data, error } = await supabase
        .from('navigation_items')
        .insert(items.map((item, index) => ({
          ...item,
          order_index: index,
          is_active: true
        })))
        .select()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating navigation items:', error)
      throw error
    }
  }

  // Company Stats Management
  static async getCompanyStats() {
    try {
      const { data, error } = await supabase
        .from('company_stats')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching company stats:', error)
      return []
    }
  }

  static async updateCompanyStats(stats) {
    try {
      // Delete all existing stats and insert new ones
      await supabase.from('company_stats').update({ is_active: false }).eq('is_active', true)

      const { data, error } = await supabase
        .from('company_stats')
        .insert(stats.map((stat, index) => ({
          ...stat,
          order_index: index,
          is_active: true
        })))
        .select()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating company stats:', error)
      throw error
    }
  }

  // Batch operations for data migration
  static async migrateExistingData() {
    try {
      // Import existing constants
      const { 
        FEATURES_LIST, 
        TESTIMONIALS, 
        PRICING_PLANS, 
        FAQ_ITEMS, 
        NAVIGATION_ITEMS, 
        COMPANY_STATS 
      } = await import('@/utils/constants')

      // Migrate features
      for (const [index, feature] of FEATURES_LIST.entries()) {
        await this.createFeature({
          title: feature.title,
          description: feature.description,
          icon: feature.icon,
          order_index: index
        })
      }

      // Migrate testimonials
      for (const [index, testimonial] of TESTIMONIALS.entries()) {
        await this.createTestimonial({
          name: testimonial.name,
          role: testimonial.role,
          content: testimonial.content,
          rating: testimonial.rating,
          order_index: index
        })
      }

      // Migrate pricing plans
      for (const [index, plan] of PRICING_PLANS.entries()) {
        await this.createPricingPlan({
          name: plan.name,
          price: plan.price,
          period: plan.period,
          description: plan.description,
          features: plan.features,
          is_popular: plan.popular,
          order_index: index
        })
      }

      // Migrate FAQ items
      for (const [index, faq] of FAQ_ITEMS.entries()) {
        await this.createFAQItem({
          question: faq.question,
          answer: faq.answer,
          order_index: index
        })
      }

      console.log('Data migration completed successfully')
    } catch (error) {
      console.error('Error migrating data:', error)
      throw error
    }
  }
}