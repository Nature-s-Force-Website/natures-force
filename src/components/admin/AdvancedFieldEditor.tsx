"use client";

import { useState } from "react";
import { ComponentField } from "@/lib/component-types";

interface AdvancedFieldEditorProps {
  field: ComponentField;
  value: any;
  onChange: (value: any) => void;
  path?: string;
}

export default function AdvancedFieldEditor({
  field,
  value,
  onChange,
  path = "",
}: AdvancedFieldEditorProps) {
  const fieldId = `${path}_${field.key}`.replace(/[^a-zA-Z0-9]/g, "_");

  const handleBasicFieldChange = (newValue: any) => {
    onChange(newValue);
  };

  const handleArrayChange = (index: number, newValue: any) => {
    const newArray = [...(value || [])];
    newArray[index] = newValue;
    onChange(newArray);
  };

  const handleArrayAdd = () => {
    const newArray = [...(value || [])];
    if (field.arrayFields) {
      const newItem = field.arrayFields.reduce((acc, arrayField) => {
        acc[arrayField.key] =
          arrayField.type === "array"
            ? []
            : arrayField.type === "boolean"
            ? false
            : "";
        return acc;
      }, {} as any);
      newArray.push(newItem);
      onChange(newArray);
    }
  };

  const handleArrayRemove = (index: number) => {
    const newArray = [...(value || [])];
    newArray.splice(index, 1);
    onChange(newArray);
  };

  const handleObjectChange = (key: string, newValue: any) => {
    const newObject = { ...(value || {}) };
    newObject[key] = newValue;
    onChange(newObject);
  };

  const renderBasicField = () => {
    switch (field.type) {
      case "text":
        return (
          <input
            id={fieldId}
            type="text"
            value={value || ""}
            onChange={(e) => handleBasicFieldChange(e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 hover:border-gray-300"
            required={field.required}
          />
        );

      case "textarea":
        return (
          <textarea
            id={fieldId}
            value={value || ""}
            onChange={(e) => handleBasicFieldChange(e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 hover:border-gray-300 resize-none"
            required={field.required}
          />
        );

      case "number":
        return (
          <input
            id={fieldId}
            type="number"
            value={value || ""}
            onChange={(e) => handleBasicFieldChange(Number(e.target.value))}
            min={field.min}
            max={field.max}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 hover:border-gray-300"
            required={field.required}
          />
        );

      case "boolean":
        return (
          <div className="flex items-center">
            <input
              id={fieldId}
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleBasicFieldChange(e.target.checked)}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
            />
            <label htmlFor={fieldId} className="ml-2 text-sm text-gray-700">
              {field.label}
            </label>
          </div>
        );

      case "select":
        return (
          <select
            id={fieldId}
            value={value || ""}
            onChange={(e) => handleBasicFieldChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 hover:border-gray-300 appearance-none bg-arrow-down bg-no-repeat bg-right-4 bg-center"
            required={field.required}
          >
            <option value="">Select an option...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "color":
        return (
          <div className="flex gap-3">
            <input
              id={fieldId}
              type="color"
              value={value || "#000000"}
              onChange={(e) => handleBasicFieldChange(e.target.value)}
              className="h-12 w-16 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors duration-200"
            />
            <input
              type="text"
              value={value || "#000000"}
              onChange={(e) => handleBasicFieldChange(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 hover:border-gray-300 font-mono text-sm"
            />
          </div>
        );

      case "url":
        return (
          <input
            id={fieldId}
            type="url"
            value={value || ""}
            onChange={(e) => handleBasicFieldChange(e.target.value)}
            placeholder={field.placeholder || "https://example.com"}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 hover:border-gray-300"
            required={field.required}
          />
        );

      case "image":
        return (
          <div className="space-y-3">
            <input
              id={fieldId}
              type="url"
              value={value || ""}
              onChange={(e) => handleBasicFieldChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 hover:border-gray-300"
              required={field.required}
            />
            {value && value.trim() !== "" && (
              <div className="mt-3">
                <img
                  src={value}
                  alt="Preview"
                  className="max-w-xs max-h-32 object-cover rounded-xl border-2 border-gray-100 shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            id={fieldId}
            type="text"
            value={value || ""}
            onChange={(e) => handleBasicFieldChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 hover:border-gray-300"
          />
        );
    }
  };

  const renderArrayField = () => {
    const arrayValue = value || [];
    const canAdd = !field.max || arrayValue.length < field.max;
    const canRemove = !field.min || arrayValue.length > field.min;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-semibold text-gray-800">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {canAdd && (
            <button
              onClick={handleArrayAdd}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add {field.label.slice(0, -1)}
            </button>
          )}
        </div>

        {field.description && (
          <p className="text-sm text-slate-600 bg-teal-50 p-3 rounded-lg border border-teal-100">
            {field.description}
          </p>
        )}

        <div className="space-y-4">
          {arrayValue.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-semibold text-gray-800 flex items-center">
                  <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    {index + 1}
                  </div>
                  {field.label.slice(0, -1)} {index + 1}
                </h4>
                {canRemove && (
                  <button
                    onClick={() => handleArrayRemove(index)}
                    className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {field.arrayFields?.map((arrayField) => (
                  <AdvancedFieldEditor
                    key={arrayField.key}
                    field={arrayField}
                    value={item[arrayField.key]}
                    onChange={(newValue) => {
                      const newItem = { ...item };
                      newItem[arrayField.key] = newValue;
                      handleArrayChange(index, newItem);
                    }}
                    path={`${path}_${field.key}_${index}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {arrayValue.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No {field.label.toLowerCase()} added yet. Click the &quot;Add&quot;
            button above to create your first one.
          </div>
        )}
      </div>
    );
  };

  const renderObjectField = () => {
    return (
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}{" "}
          {field.required && <span className="text-red-500">*</span>}
        </label>

        {field.description && (
          <p className="text-sm text-gray-600">{field.description}</p>
        )}

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
          {field.objectFields?.map((objectField) => (
            <AdvancedFieldEditor
              key={objectField.key}
              field={objectField}
              value={(value || {})[objectField.key]}
              onChange={(newValue) =>
                handleObjectChange(objectField.key, newValue)
              }
              path={`${path}_${field.key}`}
            />
          ))}
        </div>
      </div>
    );
  };

  if (field.type === "array") {
    return renderArrayField();
  }

  if (field.type === "object") {
    return renderObjectField();
  }

  // For basic fields
  return (
    <div className="space-y-2">
      {field.type !== "boolean" && (
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-gray-700"
        >
          {field.label}{" "}
          {field.required && <span className="text-red-500">*</span>}
        </label>
      )}

      {field.description && field.type !== "boolean" && (
        <p className="text-sm text-gray-600">{field.description}</p>
      )}

      {renderBasicField()}
    </div>
  );
}
