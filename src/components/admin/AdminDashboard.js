"use client";

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, LogOut } from 'lucide-react';

// src/components/admin/AdminDashboard.js
const AdminDashboard = ({ constants, onUpdateConstants, onLogout }) => {
  const [activeSection, setActiveSection] = useState('company');
  const [editingConstants, setEditingConstants] = useState(constants);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditingConstants(constants);
    setHasChanges(false);
  }, [constants]);

  const handleSave = () => {
    onUpdateConstants(editingConstants);
    setHasChanges(false);
    alert('Changes saved successfully!');
  };

  const handleInputChange = (path, value) => {
    const newConstants = { ...editingConstants };
    const keys = path.split('.');
    let current = newConstants;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setEditingConstants(newConstants);
    setHasChanges(true);
  };

  // Company Information Section
  const renderCompanySection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Company Information</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            value={editingConstants.COMPANY_INFO?.name || ''}
            onChange={(e) => handleInputChange('COMPANY_INFO.name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={editingConstants.COMPANY_INFO?.email || ''}
            onChange={(e) => handleInputChange('COMPANY_INFO.email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            value={editingConstants.COMPANY_INFO?.phone || ''}
            onChange={(e) => handleInputChange('COMPANY_INFO.phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={editingConstants.COMPANY_INFO?.address || ''}
            onChange={(e) => handleInputChange('COMPANY_INFO.address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  // Hero Content Section
  const renderHeroSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Hero Section</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Headline</label>
          <input
            type="text"
            value={editingConstants.HERO_CONTENT?.headline || ''}
            onChange={(e) => handleInputChange('HERO_CONTENT.headline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
          <textarea
            value={editingConstants.HERO_CONTENT?.subheadline || ''}
            onChange={(e) => handleInputChange('HERO_CONTENT.subheadline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
          <input
            type="text"
            value={editingConstants.HERO_CONTENT?.ctaText || ''}
            onChange={(e) => handleInputChange('HERO_CONTENT.ctaText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Text</label>
          <input
            type="text"
            value={editingConstants.HERO_CONTENT?.secondaryCtaText || ''}
            onChange={(e) => handleInputChange('HERO_CONTENT.secondaryCtaText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  // How It Works Section
  const renderHowItWorksSection = () => {
    const addStep = () => {
      const newStep = {
        step: (editingConstants.HOW_IT_WORKS?.length || 0) + 1,
        title: "New Step",
        description: "New step description",
        color: "bg-blue-600"
      };
      
      const newConstants = {
        ...editingConstants,
        HOW_IT_WORKS: [...(editingConstants.HOW_IT_WORKS || []), newStep]
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const removeStep = (index) => {
      const newConstants = {
        ...editingConstants,
        HOW_IT_WORKS: editingConstants.HOW_IT_WORKS.filter((_, i) => i !== index)
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const updateStep = (index, field, value) => {
      const newSteps = [...editingConstants.HOW_IT_WORKS];
      newSteps[index][field] = value;
      setEditingConstants({...editingConstants, HOW_IT_WORKS: newSteps});
      setHasChanges(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
          <button
            onClick={addStep}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Step
          </button>
        </div>
        
        <div className="space-y-4">
          {(editingConstants.HOW_IT_WORKS || []).map((step, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-lg">Step {step.step}</h4>
                <button
                  onClick={() => removeStep(index)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateStep(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Class</label>
                  <select
                    value={step.color}
                    onChange={(e) => updateStep(index, 'color', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bg-blue-600">Blue</option>
                    <option value="bg-green-600">Green</option>
                    <option value="bg-purple-600">Purple</option>
                    <option value="bg-red-600">Red</option>
                    <option value="bg-yellow-600">Yellow</option>
                    <option value="bg-indigo-600">Indigo</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={step.description}
                  onChange={(e) => updateStep(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Features Section
  const renderFeaturesSection = () => {
    const addFeature = () => {
      const newFeature = {
        title: "New Feature",
        description: "New feature description",
        icon: "🔒"
      };
      
      const newConstants = {
        ...editingConstants,
        FEATURES_LIST: [...(editingConstants.FEATURES_LIST || []), newFeature]
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const removeFeature = (index) => {
      const newConstants = {
        ...editingConstants,
        FEATURES_LIST: editingConstants.FEATURES_LIST.filter((_, i) => i !== index)
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const updateFeature = (index, field, value) => {
      const newFeatures = [...editingConstants.FEATURES_LIST];
      newFeatures[index][field] = value;
      setEditingConstants({...editingConstants, FEATURES_LIST: newFeatures});
      setHasChanges(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Features</h3>
          <button
            onClick={addFeature}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Feature
          </button>
        </div>
        
        <div className="space-y-4">
          {(editingConstants.FEATURES_LIST || []).map((feature, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-lg">Feature {index + 1}</h4>
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="🔒"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Testimonials Section
  const renderTestimonialsSection = () => {
    const addTestimonial = () => {
      const newTestimonial = {
        name: "New Customer",
        role: "Position, Company",
        content: "Customer testimonial content here...",
        rating: 5
      };
      
      const newConstants = {
        ...editingConstants,
        TESTIMONIALS: [...(editingConstants.TESTIMONIALS || []), newTestimonial]
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const removeTestimonial = (index) => {
      const newConstants = {
        ...editingConstants,
        TESTIMONIALS: editingConstants.TESTIMONIALS.filter((_, i) => i !== index)
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const updateTestimonial = (index, field, value) => {
      const newTestimonials = [...editingConstants.TESTIMONIALS];
      newTestimonials[index][field] = value;
      setEditingConstants({...editingConstants, TESTIMONIALS: newTestimonials});
      setHasChanges(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Testimonials</h3>
          <button
            onClick={addTestimonial}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Testimonial
          </button>
        </div>
        
        <div className="space-y-4">
          {(editingConstants.TESTIMONIALS || []).map((testimonial, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-lg">Testimonial {index + 1}</h4>
                <button
                  onClick={() => removeTestimonial(index)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role & Company</label>
                  <input
                    type="text"
                    value={testimonial.role}
                    onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Position, Company"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={testimonial.rating}
                  onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={testimonial.content}
                  onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Benefits Section
  const renderBenefitsSection = () => {
    const addBenefit = () => {
      const newConstants = {
        ...editingConstants,
        benefits: [...(editingConstants.benefits || []), "New benefit"]
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const removeBenefit = (index) => {
      const newConstants = {
        ...editingConstants,
        benefits: editingConstants.benefits.filter((_, i) => i !== index)
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const updateBenefit = (index, value) => {
      const newBenefits = [...editingConstants.benefits];
      newBenefits[index] = value;
      setEditingConstants({...editingConstants, benefits: newBenefits});
      setHasChanges(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Benefits</h3>
          <button
            onClick={addBenefit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Benefit
          </button>
        </div>
        
        <div className="space-y-3">
          {(editingConstants.benefits || []).map((benefit, index) => (
            <div key={index} className="flex gap-3 items-center">
              <input
                type="text"
                value={benefit}
                onChange={(e) => updateBenefit(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeBenefit(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Pricing Section
  const renderPricingSection = () => {
    const addPlan = () => {
      const newPlan = {
        name: "New Plan",
        price: "Custom",
        period: "",
        description: "New plan description",
        features: ["Feature 1", "Feature 2"],
        popular: false
      };
      
      const newConstants = {
        ...editingConstants,
        PRICING_PLANS: [...(editingConstants.PRICING_PLANS || []), newPlan]
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const removePlan = (index) => {
      const newConstants = {
        ...editingConstants,
        PRICING_PLANS: editingConstants.PRICING_PLANS.filter((_, i) => i !== index)
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const updatePlan = (index, field, value) => {
      const newPlans = [...editingConstants.PRICING_PLANS];
      newPlans[index][field] = value;
      setEditingConstants({...editingConstants, PRICING_PLANS: newPlans});
      setHasChanges(true);
    };

    const addPlanFeature = (planIndex) => {
      const newPlans = [...editingConstants.PRICING_PLANS];
      if (!newPlans[planIndex].features) {
        newPlans[planIndex].features = [];
      }
      newPlans[planIndex].features.push("New feature");
      setEditingConstants({...editingConstants, PRICING_PLANS: newPlans});
      setHasChanges(true);
    };

    const removePlanFeature = (planIndex, featureIndex) => {
      const newPlans = [...editingConstants.PRICING_PLANS];
      newPlans[planIndex].features = newPlans[planIndex].features.filter((_, i) => i !== featureIndex);
      setEditingConstants({...editingConstants, PRICING_PLANS: newPlans});
      setHasChanges(true);
    };

    const updatePlanFeature = (planIndex, featureIndex, value) => {
      const newPlans = [...editingConstants.PRICING_PLANS];
      newPlans[planIndex].features[featureIndex] = value;
      setEditingConstants({...editingConstants, PRICING_PLANS: newPlans});
      setHasChanges(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Pricing Plans</h3>
          <button
            onClick={addPlan}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Plan
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {(editingConstants.PRICING_PLANS || []).map((plan, index) => (
            <div key={index} className="border border-gray-200 p-6 rounded-lg bg-white">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg text-blue-600">{plan.name} Plan</h4>
                <button
                  onClick={() => removePlan(index)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={plan.name || ''}
                    onChange={(e) => updatePlan(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="text"
                      value={plan.price || ''}
                      onChange={(e) => updatePlan(index, 'price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="$99 or Free"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                    <input
                      type="text"
                      value={plan.period || ''}
                      onChange={(e) => updatePlan(index, 'period', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/month"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={plan.description || ''}
                    onChange={(e) => updatePlan(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <input
                      type="checkbox"
                      checked={plan.popular || false}
                      onChange={(e) => updatePlan(index, 'popular', e.target.checked)}
                      className="rounded focus:ring-2 focus:ring-blue-500"
                    />
                    Popular Plan
                  </label>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    <button
                      onClick={() => addPlanFeature(index)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {(plan.features || []).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updatePlanFeature(index, featureIndex, e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removePlanFeature(index, featureIndex)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // FAQ Section
  const renderFAQSection = () => {
    const addFAQ = () => {
      const newFAQ = {
        question: "New question?",
        answer: "New answer content here..."
      };
      
      const newConstants = {
        ...editingConstants,
        FAQ_ITEMS: [...(editingConstants.FAQ_ITEMS || []), newFAQ]
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const removeFAQ = (index) => {
      const newConstants = {
        ...editingConstants,
        FAQ_ITEMS: editingConstants.FAQ_ITEMS.filter((_, i) => i !== index)
      };
      setEditingConstants(newConstants);
      setHasChanges(true);
    };

    const updateFAQ = (index, field, value) => {
      const newFAQs = [...editingConstants.FAQ_ITEMS];
      newFAQs[index][field] = value;
      setEditingConstants({...editingConstants, FAQ_ITEMS: newFAQs});
      setHasChanges(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">FAQ Items</h3>
          <button
            onClick={addFAQ}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add FAQ
          </button>
        </div>
        
        <div className="space-y-4">
          {(editingConstants.FAQ_ITEMS || []).map((faq, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-lg">FAQ {index + 1}</h4>
                <button
                  onClick={() => removeFAQ(index)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const navigationItems = [
    { id: 'company', label: 'Company Info', icon: '🏢' },
    { id: 'hero', label: 'Hero Content', icon: '🎯' },
    { id: 'howitworks', label: 'How It Works', icon: '⚙️' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'faq', label: 'FAQ', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">YouKeepIt Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              {hasChanges && (
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              )}
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeSection === 'company' && renderCompanySection()}
              {activeSection === 'hero' && renderHeroSection()}
              {activeSection === 'howitworks' && renderHowItWorksSection()}
              {activeSection === 'features' && renderFeaturesSection()}
              {activeSection === 'testimonials' && renderTestimonialsSection()}
              {activeSection === 'pricing' && renderPricingSection()}
              {activeSection === 'faq' && renderFAQSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;