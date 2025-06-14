// src/app/admin/components/ui/FormTextarea.js
"use client";

export default function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  className = "",
  ...props
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
        {...props}
      />
    </div>
  );
}