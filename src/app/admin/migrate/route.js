// src/app/api/admin/migrate/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST() {
  try {
    // Import existing constants for migration
    const { 
      FEATURES_LIST, 
      TESTIMONIALS, 
      PRICING_PLANS, 
      FAQ_ITEMS, 
      NAVIGATION_ITEMS, 
      COMPANY_STATS 
    } = await import('@/utils/constants')

    const results = {}

    // Migrate features
    try {
      const { data: featuresData, error: featuresError } = await supabase
        .from('features')
        .upsert(
          FEATURES_LIST.map((feature, index) => ({
            title: feature.title,
            description: feature.description,
            icon: feature.icon,
            order_index: index
          }))
        )
      
      if (featuresError) throw featuresError
      results.features = featuresData
    } catch (error) {
      results.features = { error: error.message }
    }

    // Migrate testimonials
    try {
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('testimonials')
        .upsert(
          TESTIMONIALS.map((testimonial, index) => ({
            name: testimonial.name,
            role: testimonial.role,
            content: testimonial.content,
            rating: testimonial.rating,
            order_index: index
          }))
        )
      
      if (testimonialsError) throw testimonialsError
      results.testimonials = testimonialsData
    } catch (error) {
      results.testimonials = { error: error.message }
    }

    // Migrate pricing plans
    try {
      const { data: pricingData, error: pricingError } = await supabase
        .from('pricing_plans')
        .upsert(
          PRICING_PLANS.map((plan, index) => ({
            name: plan.name,
            price: plan.price,
            period: plan.period,
            description: plan.description,
            features: plan.features,
            is_popular: plan.popular,
            order_index: index
          }))
        )
      
      if (pricingError) throw pricingError
      results.pricing = pricingData
    } catch (error) {
      results.pricing = { error: error.message }
    }

    // Migrate FAQ items
    try {
      const { data: faqData, error: faqError } = await supabase
        .from('faq_items')
        .upsert(
          FAQ_ITEMS.map((faq, index) => ({
            question: faq.question,
            answer: faq.answer,
            order_index: index
          }))
        )
      
      if (faqError) throw faqError
      results.faq = faqData
    } catch (error) {
      results.faq = { error: error.message }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Migration completed',
      results 
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    )
  }
}