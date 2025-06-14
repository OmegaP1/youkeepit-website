// src/app/admin/components/ui/MessageAlert.js
"use client";

import { X } from "lucide-react";

export default function MessageAlert({ message, onClose }) {
  if (!message.text) return null;

  return (
    <div
      className={`mx-6 mt-4 p-4 rounded-lg flex items-center justify-between ${
        message.type === "success"
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      <span>{message.text}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}