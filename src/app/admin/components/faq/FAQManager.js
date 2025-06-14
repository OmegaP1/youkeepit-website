// src/app/admin/components/faq/FAQManager.js
"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import FAQList from "./components/FAQList";
import FAQForm from "./components/FAQForm";
import { useFAQ } from "./hooks/useFAQ";

export default function FAQManager({ showMessage }) {
  const { items, loading, fetchItems, createItem, updateItem, deleteItem } = useFAQ();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (itemData) => {
    const success = await createItem(itemData);
    if (success) {
      showMessage("success", "FAQ item created successfully!");
      setShowAddForm(false);
      return true;
    } else {
      showMessage("error", "Failed to create FAQ item");
      return false;
    }
  };

  const handleUpdate = async (id, itemData) => {
    const success = await updateItem(id, itemData);
    if (success) {
      showMessage("success", "FAQ item updated successfully!");
      setEditingItem(null);
      return true;
    } else {
      showMessage("error", "Failed to update FAQ item");
      return false;
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteItem(id);
    if (success) {
      showMessage("success", "FAQ item deleted successfully!");
    } else {
      showMessage("error", "Failed to delete FAQ item");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading FAQ items...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">FAQ Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add FAQ Item
        </button>
      </div>

      {showAddForm && (
        <FAQForm
          item={editingItem}
          onSubmit={editingItem ? 
            (data) => handleUpdate(editingItem.id, data) : 
            handleCreate
          }
          onCancel={handleCancelEdit}
        />
      )}

      <FAQList
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
