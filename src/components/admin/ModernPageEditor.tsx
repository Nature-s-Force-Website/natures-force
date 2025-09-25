"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import MediaSelector from "./MediaSelector";
import ComponentSelector from "./ComponentSelector";
import {
  getComponentDefinition,
  ComponentDefinition,
} from "@/lib/component-types";

interface ContentBlock {
  id: string;
  type: string;
  data: Record<string, any>;
}

interface PageFormData {
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  status: "draft" | "published";
  is_homepage: boolean;
}

export default function PageEditor({
  pageId,
  initialData,
}: {
  pageId?: string;
  initialData?: any;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [showComponentSelector, setShowComponentSelector] = useState(false);
  const [currentImageField, setCurrentImageField] = useState<{
    blockIndex: number;
    fieldKey: string;
  } | null>(null);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(
    initialData?.content || []
  );

  const form = useForm<PageFormData>({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      meta_title: initialData?.meta_title || "",
      meta_description: initialData?.meta_description || "",
      status: initialData?.status || "draft",
      is_homepage: initialData?.is_homepage || false,
    },
  });

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addComponent = (componentType: string) => {
    const componentDef = getComponentDefinition(componentType);
    if (!componentDef) return;

    const newBlock: ContentBlock = {
      id: generateId(),
      type: componentType,
      data: { ...componentDef.defaultData },
    };

    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateBlockData = (blockId: string, fieldKey: string, value: any) => {
    setContentBlocks((blocks) =>
      blocks.map((block) =>
        block.id === blockId
          ? { ...block, data: { ...block.data, [fieldKey]: value } }
          : block
      )
    );
  };

  const removeBlock = (blockId: string) => {
    setContentBlocks((blocks) =>
      blocks.filter((block) => block.id !== blockId)
    );
  };

  const moveBlock = (blockId: string, direction: "up" | "down") => {
    const currentIndex = contentBlocks.findIndex(
      (block) => block.id === blockId
    );
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= contentBlocks.length) return;

    const newBlocks = [...contentBlocks];
    const [movedBlock] = newBlocks.splice(currentIndex, 1);
    newBlocks.splice(newIndex, 0, movedBlock);
    setContentBlocks(newBlocks);
  };

  const handleSelectImage = (imageUrl: string) => {
    if (currentImageField) {
      updateBlockData(
        contentBlocks[currentImageField.blockIndex].id,
        currentImageField.fieldKey,
        imageUrl
      );
    }
    setShowMediaSelector(false);
    setCurrentImageField(null);
  };

  const openMediaSelector = (blockIndex: number, fieldKey: string) => {
    setCurrentImageField({ blockIndex, fieldKey });
    setShowMediaSelector(true);
  };

  const onSubmit = async (data: PageFormData) => {
    setLoading(true);
    setError("");

    try {
      const pageData = {
        ...data,
        content: contentBlocks,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (pageId) {
        result = await supabase
          .from("pages")
          .update(pageData)
          .eq("id", pageId)
          .select()
          .single();
      } else {
        result = await supabase
          .from("pages")
          .insert([pageData])
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      router.push("/admin/pages");
    } catch (err: any) {
      setError(err.message || "Failed to save page");
    } finally {
      setLoading(false);
    }
  };

  const renderComponentEditor = (block: ContentBlock, index: number) => {
    const componentDef = getComponentDefinition(block.type);
    if (!componentDef) {
      return (
        <div className="text-red-500">Unknown component type: {block.type}</div>
      );
    }

    return (
      <div
        key={block.id}
        className="border border-gray-200 rounded-lg p-4 space-y-4"
      >
        {/* Component Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{componentDef.icon}</span>
            <div>
              <h3 className="font-medium text-gray-900">{componentDef.name}</h3>
              <p className="text-sm text-gray-500">
                {componentDef.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Move buttons */}
            <button
              type="button"
              onClick={() => moveBlock(block.id, "up")}
              disabled={index === 0}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => moveBlock(block.id, "down")}
              disabled={index === contentBlocks.length - 1}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Remove button */}
            <button
              type="button"
              onClick={() => removeBlock(block.id)}
              className="p-1 text-red-400 hover:text-red-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Component Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {componentDef.fields.map((field) => {
            const value = block.data[field.key] || "";

            return (
              <div
                key={field.key}
                className={field.type === "textarea" ? "md:col-span-2" : ""}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      updateBlockData(block.id, field.key, e.target.value)
                    }
                    placeholder={field.placeholder}
                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    value={value}
                    onChange={(e) =>
                      updateBlockData(block.id, field.key, e.target.value)
                    }
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}

                {field.type === "image" && (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="url"
                        value={value}
                        onChange={(e) =>
                          updateBlockData(block.id, field.key, e.target.value)
                        }
                        placeholder="Image URL or click to select"
                        className="flex-1 border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => openMediaSelector(index, field.key)}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100"
                      >
                        Select
                      </button>
                    </div>
                    {value && (
                      <div className="relative w-full h-32 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={value}
                          alt={field.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                {field.type === "select" && field.options && (
                  <select
                    value={value}
                    onChange={(e) =>
                      updateBlockData(block.id, field.key, e.target.value)
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "color" && (
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={value || "#000000"}
                      onChange={(e) =>
                        updateBlockData(block.id, field.key, e.target.value)
                      }
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        updateBlockData(block.id, field.key, e.target.value)
                      }
                      placeholder="#000000"
                      className="flex-1 border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}

                {field.type === "number" && (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      updateBlockData(
                        block.id,
                        field.key,
                        parseFloat(e.target.value)
                      )
                    }
                    step="0.1"
                    min="0"
                    max="1"
                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}

                {field.type === "boolean" && (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value === true}
                      onChange={(e) =>
                        updateBlockData(block.id, field.key, e.target.checked)
                      }
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Enable this option
                    </span>
                  </label>
                )}

                {field.type === "url" && (
                  <input
                    type="url"
                    value={value}
                    onChange={(e) =>
                      updateBlockData(block.id, field.key, e.target.value)
                    }
                    placeholder={field.placeholder || "https://example.com"}
                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}

                {field.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {field.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="admin-form max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <style jsx global>{`
        .admin-form {
          color: #111827 !important;
        }
        .admin-form h2,
        .admin-form h3,
        .admin-form p,
        .admin-form label,
        .admin-form span,
        .admin-form div {
          color: #111827 !important;
        }
        .admin-form input,
        .admin-form textarea,
        .admin-form select {
          color: #111827 !important;
          background-color: white !important;
        }
        .admin-form .text-gray-700,
        .admin-form .text-gray-600 {
          color: #111827 !important;
        }
      `}</style>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Page Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Page Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page Title *
              </label>
              <input
                {...form.register("title", { required: "Title is required" })}
                className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug *
              </label>
              <input
                {...form.register("slug", { required: "Slug is required" })}
                className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                {...form.register("status")}
                className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Title
              </label>
              <input
                {...form.register("meta_title")}
                className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...form.register("is_homepage")}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Set as homepage
                </span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Description
              </label>
              <textarea
                {...form.register("meta_description")}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Page Content</h2>
            <button
              type="button"
              onClick={() => setShowComponentSelector(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Component
            </button>
          </div>

          {contentBlocks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-gray-500 mb-4">No components added yet</div>
              <button
                type="button"
                onClick={() => setShowComponentSelector(true)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Add your first component
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {contentBlocks.map((block, index) =>
                renderComponentEditor(block, index)
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/admin/pages")}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : pageId ? "Update Page" : "Create Page"}
          </button>
        </div>
      </form>

      {/* Component Selector Modal */}
      {showComponentSelector && (
        <ComponentSelector
          onSelectComponent={addComponent}
          onClose={() => setShowComponentSelector(false)}
        />
      )}

      {/* Media Selector Modal */}
      {showMediaSelector && (
        <MediaSelector
          onSelect={handleSelectImage}
          onClose={() => {
            setShowMediaSelector(false);
            setCurrentImageField(null);
          }}
        />
      )}
    </div>
  );
}
