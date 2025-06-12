// src/components/admin/AdminDashboard.js
"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Star,
  DollarSign,
  HelpCircle,
  Navigation,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("content");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Data states
  const [siteContent, setSiteContent] = useState([]);
  const [features, setFeatures] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [faqItems, setFaqItems] = useState([]);
  const [navigationItems, setNavigationItems] = useState([]);
  const [companyStats, setCompanyStats] = useState([]);

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchSiteContent(),
        fetchFeatures(),
        fetchTestimonials(),
        fetchPricingPlans(),
        fetchFAQItems(),
        fetchNavigationItems(),
        fetchCompanyStats(),
      ]);
    } catch (error) {
      showMessage("error", "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("section_name", { ascending: true });

    if (error) throw error;
    setSiteContent(data || []);
  };

  const fetchFeatures = async () => {
    const { data, error } = await supabase
      .from("features")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    setFeatures(data || []);
  };

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    setTestimonials(data || []);
  };

  const fetchPricingPlans = async () => {
    const { data, error } = await supabase
      .from("pricing_plans")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    setPricingPlans(data || []);
  };

  const fetchFAQItems = async () => {
    const { data, error } = await supabase
      .from("faq_items")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    setFaqItems(data || []);
  };

  const fetchNavigationItems = async () => {
    const { data, error } = await supabase
      .from("navigation_items")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    setNavigationItems(data || []);
  };

  const fetchCompanyStats = async () => {
    const { data, error } = await supabase
      .from("company_stats")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    setCompanyStats(data || []);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    onLogout();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const tabs = [
    { id: "content", label: "Site Content", icon: FileText },
    { id: "features", label: "Features", icon: Star },
    { id: "testimonials", label: "Testimonials", icon: Users },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "navigation", label: "Navigation", icon: Navigation },
    { id: "stats", label: "Stats", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Manage your website content and settings
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`mx-6 mt-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-6">
            <div className="px-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        activeTab === tab.id ? "text-blue-700" : "text-gray-400"
                      }`}
                    />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === "content" && (
              <SiteContentManager
                content={siteContent}
                onUpdate={fetchSiteContent}
                showMessage={showMessage}
              />
            )}
            {activeTab === "features" && (
              <FeaturesManager
                features={features}
                onUpdate={fetchFeatures}
                showMessage={showMessage}
              />
            )}
            {activeTab === "testimonials" && (
              <TestimonialsManager
                testimonials={testimonials}
                onUpdate={fetchTestimonials}
                showMessage={showMessage}
              />
            )}
            {activeTab === "pricing" && (
              <PricingManager
                plans={pricingPlans}
                onUpdate={fetchPricingPlans}
                showMessage={showMessage}
              />
            )}
            {activeTab === "faq" && (
              <FAQManager
                items={faqItems}
                onUpdate={fetchFAQItems}
                showMessage={showMessage}
              />
            )}
            {activeTab === "navigation" && (
              <NavigationManager
                items={navigationItems}
                onUpdate={fetchNavigationItems}
                showMessage={showMessage}
              />
            )}
            {activeTab === "stats" && (
              <StatsManager
                stats={companyStats}
                onUpdate={fetchCompanyStats}
                showMessage={showMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Loading Admin Panel
        </h2>
        <p className="text-gray-500">Please wait while we fetch your data...</p>
      </div>
    </div>
  );
}

// Site Content Manager Component
function SiteContentManager({ content, onUpdate, showMessage }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData(item);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("site_content")
        .update({
          content_value: formData.content_value,
          updated_at: new Date().toISOString(),
        })
        .eq("id", formData.id);

      if (error) throw error;

      showMessage("success", "Content updated successfully!");
      setEditingItem(null);
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to update content");
    }
  };

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section_name]) {
      acc[item.section_name] = [];
    }
    acc[item.section_name].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Site Content</h2>
        <p className="text-gray-600">Manage your website content</p>
      </div>

      {Object.entries(groupedContent).map(([section, items]) => (
        <div
          key={section}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800 capitalize">
              {section.replace("_", " ")} Section
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      {item.content_key.replace("_", " ").toUpperCase()}
                    </p>

                    {editingItem === item.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={formData.content_value || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content_value: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={item.content_type === "text" ? 2 : 4}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center gap-1"
                          >
                            <Check size={14} />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 flex items-center gap-1"
                          >
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-800 mb-2">
                        {item.content_value || "No content set"}
                      </p>
                    )}
                  </div>

                  {editingItem !== item.id && (
                    <button
                      onClick={() => handleEdit(item)}
                      className="ml-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Features Manager Component
function FeaturesManager({ features, onUpdate, showMessage }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData(item);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("features")
        .update({
          title: formData.title,
          description: formData.description,
          icon: formData.icon,
          updated_at: new Date().toISOString(),
        })
        .eq("id", formData.id);

      if (error) throw error;

      showMessage("success", "Feature updated successfully!");
      setEditingItem(null);
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to update feature");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;

    try {
      const { error } = await supabase.from("features").delete().eq("id", id);

      if (error) throw error;

      showMessage("success", "Feature deleted successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to delete feature");
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase.from("features").insert({
        title: "New Feature",
        description: "Feature description",
        icon: "🔒",
        order_index: features.length,
      });

      if (error) throw error;

      showMessage("success", "Feature added successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to add feature");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Features</h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Feature
        </button>
      </div>

      <div className="grid gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {editingItem === feature.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={formData.icon || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Check size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{feature.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(feature)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feature.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Testimonials Manager Component
function TestimonialsManager({ testimonials, onUpdate, showMessage }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData(item);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({
          name: formData.name,
          role: formData.role,
          content: formData.content,
          rating: formData.rating,
          updated_at: new Date().toISOString(),
        })
        .eq("id", formData.id);

      if (error) throw error;

      showMessage("success", "Testimonial updated successfully!");
      setEditingItem(null);
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to update testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;

      showMessage("success", "Testimonial deleted successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to delete testimonial");
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase.from("testimonials").insert({
        name: "New Customer",
        role: "Position, Company",
        content: "Customer testimonial content here...",
        rating: 5,
        order_index: testimonials.length,
      });

      if (error) throw error;

      showMessage("success", "Testimonial added successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to add testimonial");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {editingItem === testimonial.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={formData.role || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <select
                    value={formData.rating || 5}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={formData.content || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Check size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={
                            i < testimonial.rating ? "currentColor" : "none"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Pricing Manager Component
function PricingManager({ plans, onUpdate, showMessage }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData({
      ...item,
      features: Array.isArray(item.features) ? item.features : [],
    });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("pricing_plans")
        .update({
          name: formData.name,
          price: formData.price,
          period: formData.period,
          description: formData.description,
          features: formData.features,
          is_popular: formData.is_popular,
          updated_at: new Date().toISOString(),
        })
        .eq("id", formData.id);

      if (error) throw error;

      showMessage("success", "Pricing plan updated successfully!");
      setEditingItem(null);
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to update pricing plan");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;

    try {
      const { error } = await supabase
        .from("pricing_plans")
        .delete()
        .eq("id", id);

      if (error) throw error;

      showMessage("success", "Pricing plan deleted successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to delete pricing plan");
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase.from("pricing_plans").insert({
        name: "New Plan",
        price: "$0",
        period: "month",
        description: "Plan description",
        features: ["Feature 1", "Feature 2"],
        is_popular: false,
        order_index: plans.length,
      });

      if (error) throw error;

      showMessage("success", "Pricing plan added successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to add pricing plan");
    }
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), "New feature"],
    });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Pricing Plans</h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Plan
        </button>
      </div>

      <div className="grid gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
              plan.is_popular ? "border-blue-500" : "border-gray-200"
            }`}
          >
            {plan.is_popular && (
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                Most Popular
              </div>
            )}

            {editingItem === plan.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      value={formData.price || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period
                    </label>
                    <input
                      type="text"
                      value={formData.period || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, period: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Popular Plan
                    </label>
                    <select
                      value={formData.is_popular ? "true" : "false"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_popular: e.target.value === "true",
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Features
                    </label>
                    <button
                      onClick={addFeature}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(formData.features || []).map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeFeature(index)}
                          className="text-red-600 hover:text-red-800 px-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Check size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {plan.price}
                    <span className="text-lg text-gray-600">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <ul className="space-y-2">
                    {(plan.features || []).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <Check size={16} className="text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQ Manager Component
function FAQManager({ items, onUpdate, showMessage }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData(item);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("faq_items")
        .update({
          question: formData.question,
          answer: formData.answer,
          updated_at: new Date().toISOString(),
        })
        .eq("id", formData.id);

      if (error) throw error;

      showMessage("success", "FAQ updated successfully!");
      setEditingItem(null);
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to update FAQ");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ item?")) return;

    try {
      const { error } = await supabase.from("faq_items").delete().eq("id", id);

      if (error) throw error;

      showMessage("success", "FAQ deleted successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to delete FAQ");
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase.from("faq_items").insert({
        question: "New Question",
        answer: "New answer content here...",
        order_index: items.length,
      });

      if (error) throw error;

      showMessage("success", "FAQ added successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to add FAQ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">FAQ Items</h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Add FAQ
        </button>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {editingItem === item.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question
                  </label>
                  <input
                    type="text"
                    value={formData.question || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer
                  </label>
                  <textarea
                    value={formData.answer || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, answer: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Check size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Navigation Manager Component
function NavigationManager({ items, onUpdate, showMessage }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData(item);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("navigation_items")
        .update({
          label: formData.label,
          href: formData.href,
          updated_at: new Date().toISOString(),
        })
        .eq("id", formData.id);

      if (error) throw error;

      showMessage("success", "Navigation item updated successfully!");
      setEditingItem(null);
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to update navigation item");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this navigation item?"))
      return;

    try {
      const { error } = await supabase
        .from("navigation_items")
        .delete()
        .eq("id", id);

      if (error) throw error;

      showMessage("success", "Navigation item deleted successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to delete navigation item");
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase.from("navigation_items").insert({
        label: "New Link",
        href: "#new-section",
        order_index: items.length,
      });

      if (error) throw error;

      showMessage("success", "Navigation item added successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to add navigation item");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Navigation</h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Navigation Item
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            {editingItem === item.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Label
                    </label>
                    <input
                      type="text"
                      value={formData.label || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, label: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link (href)
                    </label>
                    <input
                      type="text"
                      value={formData.href || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, href: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Check size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.href}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Stats Manager Component
function StatsManager({ stats, onUpdate, showMessage }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData(item);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("company_stats")
        .update({
          value: formData.value,
          label: formData.label,
          description: formData.description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", formData.id);

      if (error) throw error;

      showMessage("success", "Stat updated successfully!");
      setEditingItem(null);
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to update stat");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this stat?")) return;

    try {
      const { error } = await supabase
        .from("company_stats")
        .delete()
        .eq("id", id);

      if (error) throw error;

      showMessage("success", "Stat deleted successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to delete stat");
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase.from("company_stats").insert({
        value: "100%",
        label: "New Stat",
        description: "Stat description",
        order_index: stats.length,
      });

      if (error) throw error;

      showMessage("success", "Stat added successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to add stat");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Company Stats</h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Stat
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {editingItem === stat.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value
                  </label>
                  <input
                    type="text"
                    value={formData.value || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, value: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={formData.label || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, label: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Check size={14} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {stat.label}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {stat.description}
                  </p>
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(stat)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stat.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
