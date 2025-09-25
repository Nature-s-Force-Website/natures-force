"use client";

import { useState } from "react";
import {
  COMPONENT_TYPES,
  ComponentDefinition,
  getAllCategories,
} from "@/lib/component-types";

interface ComponentSelectorProps {
  onSelectComponent: (componentType: string) => void;
  onClose: () => void;
}

export default function ComponentSelector({
  onSelectComponent,
  onClose,
}: ComponentSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = getAllCategories();

  const filteredComponents =
    selectedCategory === "all"
      ? COMPONENT_TYPES
      : COMPONENT_TYPES.filter(
          (component) => component.category === selectedCategory
        );

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      hero: "Hero Sections",
      content: "Content Blocks",
      media: "Media & Gallery",
      social: "Social Proof",
      business: "Business Info",
      interactive: "Interactive",
    };
    return labels[category] || category;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Add Component</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Components
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>

          {/* Component Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.map((component) => (
              <div
                key={component.type}
                onClick={() => {
                  onSelectComponent(component.type);
                  onClose();
                }}
                className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all group"
              >
                {/* Component Icon & Name */}
                <div className="flex items-start space-x-3 mb-3">
                  <div className="text-2xl">{component.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                      {component.name}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize">
                      {getCategoryLabel(component.category)}
                    </p>
                  </div>
                </div>

                {/* Component Description */}
                <p className="text-sm text-gray-600 mb-3">
                  {component.description}
                </p>

                {/* Component Preview Placeholder */}
                <div className="w-full h-24 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg mb-1">{component.icon}</div>
                    <div className="text-xs text-gray-500">Preview</div>
                  </div>
                </div>

                {/* Add Button */}
                <div className="mt-3 flex justify-end">
                  <button className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors">
                    Add Component
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500">
                No components found in this category.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
