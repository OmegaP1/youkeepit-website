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

  const tabs = [
    { id: "content", label: "Site Content", icon: FileText },
    { id: "features", label: "Features", icon: LayoutDashboard },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "pricing", label: "Pricing Plans", icon: DollarSign },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "navigation", label: "Navigation", icon: Navigation },
    { id: "stats", label: "Company Stats", icon: BarChart3 },
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Message Toast */}
      {message.text && (
        <div
          className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg border-r">
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors ${
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
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={formData.content_value || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content_value: e.target.value,
                            })
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={handleSave}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <p className="text-gray-800 font-medium">
                          {item.content_value}
                        </p>
                        <button
                          onClick={() => handleEdit(item)}
                          className="ml-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
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
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    order_index: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from("features")
          .update(formData)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("features").insert([formData]);
        if (error) throw error;
      }

      showMessage(
        "success",
        `Feature ${editingId ? "updated" : "created"} successfully!`
      );
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: "", description: "", icon: "", order_index: 0 });
      onUpdate();
    } catch (error) {
      showMessage(
        "error",
        `Failed to ${editingId ? "update" : "create"} feature`
      );
    }
  };

  const handleEdit = (feature) => {
    setFormData(feature);
    setEditingId(feature.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;

    try {
      const { error } = await supabase
        .from("features")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;

      showMessage("success", "Feature deleted successfully!");
      onUpdate();
    } catch (error) {
      showMessage("error", "Failed to delete feature");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Features</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? "Edit Feature" : "Add New Feature"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (emoji)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 🚀"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order_index: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: "",
                    description: "",
                    icon: "",
                    order_index: 0,
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {editingId ? "Update" : "Create"} Feature
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {features
                .filter((f) => f.is_active)
                .map((feature) => (
                  <tr key={feature.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {feature.order_index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-2xl">
                      {feature.icon}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {feature.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {feature.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(feature)}
                        className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(feature.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
