// src/app/admin/components/navigation/NavigationManager.js
"use client";

import { useState, useEffect } from "react";
import { Plus, Save } from "lucide-react";
import NavigationList from "./components/NavigationList";
import { useNavigation } from "./hooks/useNavigation";

export default function NavigationManager({ showMessage }) {
  const { items, loading, fetchItems, updateItems } = useNavigation();
  const [localItems, setLocalItems] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const addItem = () => {
    setLocalItems([...localItems, { label: "", href: "", order_index: localItems.length }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...localItems];
    updated[index] = { ...updated[index], [field]: value };
    setLocalItems(updated);
  };

  const removeItem = (index) => {
    setLocalItems(localItems.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await updateItems(localItems);
    if (success) {
      showMessage("success", "Navigation updated successfully!");
    } else {
      showMessage("error", "Failed to update navigation");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading navigation...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Navigation Management</h2>
        <div className="space-x-2">
          <button
            onClick={addItem}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            Add Item
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <NavigationList
        items={localItems}
        onUpdateItem={updateItem}
        onRemoveItem={removeItem}
      />
    </div>
  );
}