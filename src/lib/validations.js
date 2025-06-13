// src/lib/validations.js
// Validation schemas for form data

export const validateFeature = (feature) => {
  const errors = {}
  
  if (!feature.title || feature.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long'
  }
  
  if (!feature.description || feature.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long'
  }
  
  if (feature.title && feature.title.length > 200) {
    errors.title = 'Title must be less than 200 characters'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateTestimonial = (testimonial) => {
  const errors = {}
  
  if (!testimonial.name || testimonial.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long'
  }
  
  if (!testimonial.content || testimonial.content.trim().length < 10) {
    errors.content = 'Content must be at least 10 characters long'
  }
  
  if (testimonial.rating && (testimonial.rating < 1 || testimonial.rating > 5)) {
    errors.rating = 'Rating must be between 1 and 5'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validatePricingPlan = (plan) => {
  const errors = {}
  
  if (!plan.name || plan.name.trim().length < 2) {
    errors.name = 'Plan name must be at least 2 characters long'
  }
  
  if (!plan.price || plan.price.trim().length < 1) {
    errors.price = 'Price is required'
  }
  
  if (!Array.isArray(plan.features) || plan.features.length === 0) {
    errors.features = 'At least one feature is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateFAQItem = (faq) => {
  const errors = {}
  
  if (!faq.question || faq.question.trim().length < 5) {
    errors.question = 'Question must be at least 5 characters long'
  }
  
  if (!faq.answer || faq.answer.trim().length < 10) {
    errors.answer = 'Answer must be at least 10 characters long'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}