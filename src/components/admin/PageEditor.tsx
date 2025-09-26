"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import MediaSelector from "./MediaSelector";

interface ContentBlock {
  type: "hero" | "text" | "image";
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    text?: string;
    image?: string;
    alt?: string;
    button_text?: string;
    button_link?: string;
  };
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
  const [currentImageBlockIndex, setCurrentImageBlockIndex] =
    useState<number>(-1);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(
    initialData?.content || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PageFormData>({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      meta_title: initialData?.meta_title || "",
      meta_description: initialData?.meta_description || "",
      status: initialData?.status || "draft",
      is_homepage: initialData?.is_homepage || false,
    },
  });

  const watchTitle = watch("title");

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!pageId) {
      // Only auto-generate slug for new pages
      setValue("slug", generateSlug(title));
    }
  };

  const addContentBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      type,
      content:
        type === "hero"
          ? {
              title: "",
              subtitle: "",
              description: "",
              button_text: "",
              button_link: "",
            }
          : type === "image"
          ? { image: "", alt: "" }
          : { title: "", text: "" },
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateContentBlock = (
    index: number,
    content: ContentBlock["content"]
  ) => {
    const updated = [...contentBlocks];
    updated[index].content = content;
    setContentBlocks(updated);
  };

  const handleSelectImage = (imageUrl: string) => {
    if (currentImageBlockIndex >= 0) {
      updateContentBlock(currentImageBlockIndex, {
        ...contentBlocks[currentImageBlockIndex].content,
        image: imageUrl,
      });
    }
    setShowMediaSelector(false);
    setCurrentImageBlockIndex(-1);
  };

  const openMediaSelector = (blockIndex: number) => {
    setCurrentImageBlockIndex(blockIndex);
    setShowMediaSelector(true);
  };

  const removeContentBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PageFormData) => {
    setLoading(true);
    setError("");

    try {
      const pageData = {
        ...data,
        content: contentBlocks,
        published_at:
          data.status === "published" ? new Date().toISOString() : null,
      };

      if (pageId) {
        // Update existing page
        const { error: updateError } = await supabase
          .from("pages")
          .update(pageData)
          .eq("id", pageId);

        if (updateError) throw updateError;
      } else {
        // Create new page
        const { error: insertError } = await supabase
          .from("pages")
          .insert([pageData]);

        if (insertError) throw insertError;
      }

      router.push("/admin/pages");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {pageId ? "Edit Page" : "New Page"}
        </h1>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Page Info */}
        <div className="bg-white shadow rounded-lg px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Page Information
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                onChange={handleTitleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                type="text"
                {...register("slug", { required: "Slug is required" })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.slug && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.slug.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meta Title
              </label>
              <input
                type="text"
                {...register("meta_title")}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("status")}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Meta Description
            </label>
            <textarea
              {...register("meta_description")}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("is_homepage")}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">
                Set as homepage
              </span>
            </label>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="bg-white shadow rounded-lg px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Content Blocks
            </h3>
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => addContentBlock("text")}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                + Text
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("hero")}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                + Hero
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("image")}
                className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
              >
                + Image
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {contentBlocks.map((block, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-md font-medium text-gray-800 capitalize">
                    {block.type} Block
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeContentBlock(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>

                {block.type === "text" && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={block.content.title || ""}
                      onChange={(e) =>
                        updateContentBlock(index, {
                          ...block.content,
                          title: e.target.value,
                        })
                      }
                      className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <textarea
                      placeholder="Content"
                      value={block.content.text || ""}
                      onChange={(e) =>
                        updateContentBlock(index, {
                          ...block.content,
                          text: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}

                {block.type === "hero" && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={block.content.title || ""}
                      onChange={(e) =>
                        updateContentBlock(index, {
                          ...block.content,
                          title: e.target.value,
                        })
                      }
                      className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={block.content.subtitle || ""}
                      onChange={(e) =>
                        updateContentBlock(index, {
                          ...block.content,
                          subtitle: e.target.value,
                        })
                      }
                      className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <textarea
                      placeholder="Description"
                      value={block.content.description || ""}
                      onChange={(e) =>
                        updateContentBlock(index, {
                          ...block.content,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Button Text"
                        value={block.content.button_text || ""}
                        onChange={(e) =>
                          updateContentBlock(index, {
                            ...block.content,
                            button_text: e.target.value,
                          })
                        }
                        className="border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        placeholder="Button Link"
                        value={block.content.button_link || ""}
                        onChange={(e) =>
                          updateContentBlock(index, {
                            ...block.content,
                            button_link: e.target.value,
                          })
                        }
                        className="border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {block.type === "image" && (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="url"
                        placeholder="Image URL"
                        value={block.content.image || ""}
                        onChange={(e) =>
                          updateContentBlock(index, {
                            ...block.content,
                            image: e.target.value,
                          })
                        }
                        className="flex-1 border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => openMediaSelector(index)}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100"
                      >
                        Select Image
                      </button>
                    </div>
                    {block.content.image && (
                      <div className="relative w-full h-32 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={block.content.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="Alt text"
                      value={block.content.alt || ""}
                      onChange={(e) =>
                        updateContentBlock(index, {
                          ...block.content,
                          alt: e.target.value,
                        })
                      }
                      className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

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

      {/* Media Selector Modal */}
      {showMediaSelector && (
        <MediaSelector
          onSelect={handleSelectImage}
          onClose={() => {
            setShowMediaSelector(false);
            setCurrentImageBlockIndex(-1);
          }}
        />
      )}
    </div>
  );
}
