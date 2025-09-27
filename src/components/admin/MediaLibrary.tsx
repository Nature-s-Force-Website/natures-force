"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Image from "next/image";
import MediaUpload from "./MediaUpload";

interface MediaAsset {
  id: string;
  filename: string;
  file_path: string;
  file_size: number;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  imagekit_file_id: string;
  created_at: string;
}

interface MediaLibraryProps {
  onSelectMedia?: (media: MediaAsset) => void;
  mode?: "browse" | "select";
  selectedMedia?: MediaAsset[];
}

export default function MediaLibrary({
  onSelectMedia,
  mode = "browse",
  selectedMedia = [],
}: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  // Helper function to detect image files by extension
  const isImageFile = (filename: string) => {
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".svg",
    ];
    return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch("/api/media/list");
      if (!response.ok) {
        throw new Error("Failed to fetch media");
      }

      const result = await response.json();
      const mediaList = result.media || [];
      console.log("Fetched media:", mediaList); // Debug log
      setMedia(mediaList);
    } catch (err: any) {
      console.error("Error fetching media:", err);
      setError(err.message || "Failed to load media");
      console.error("Media fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (newMedia: MediaAsset) => {
    setMedia([newMedia, ...media]);
    setShowUpload(false);
  };

  const handleSelectMedia = (mediaAsset: MediaAsset) => {
    if (mode === "select" && onSelectMedia) {
      onSelectMedia(mediaAsset);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) {
      return;
    }

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete media");
      }

      setMedia(media.filter((m) => m.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete media");
      console.error("Delete error:", err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isSelected = (mediaAsset: MediaAsset) => {
    return selectedMedia.some((selected) => selected.id === mediaAsset.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-b-2 border-teal-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="admin-form space-y-6">
      <style jsx global>{`
        .admin-form {
          color: #111827 !important;
        }
        .admin-form h2,
        .admin-form h3,
        .admin-form p,
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
      `}</style>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Media Library</h2>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          {showUpload ? "Cancel" : "Upload Media"}
        </button>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Upload New Media</h3>
          <MediaUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Media Grid */}
      {media.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No media files
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by uploading your first image.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {media.map((mediaAsset) => (
            <div
              key={mediaAsset.id}
              className={`
                group relative border rounded-lg overflow-hidden cursor-pointer transition-all
                ${
                  mode === "select"
                    ? "hover:ring-2 hover:ring-indigo-500"
                    : "hover:shadow-lg"
                }
                ${
                  isSelected(mediaAsset)
                    ? "ring-2 ring-indigo-500"
                    : "border-gray-200"
                }
              `}
              onClick={() => handleSelectMedia(mediaAsset)}
            >
              {/* Image */}
              <div className="aspect-square relative bg-gray-100">
                {/* Debug info - remove after testing */}
                {/* <div className="absolute top-0 left-0 bg-black bg-opacity-75 text-white text-xs p-1 z-10">
                  {mediaAsset.mime_type || 'no-mime'}
                </div> */}

                {(mediaAsset.mime_type &&
                  mediaAsset.mime_type.startsWith("image/")) ||
                (!mediaAsset.mime_type && isImageFile(mediaAsset.filename)) ? (
                  <Image
                    src={mediaAsset.file_path}
                    alt={mediaAsset.filename}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                    unoptimized
                    onError={(e) => {
                      console.error(
                        "Failed to load image:",
                        mediaAsset.file_path,
                        "MIME:",
                        mediaAsset.mime_type
                      );
                      // Hide the image and show fallback
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = parent.querySelector(
                          ".image-fallback"
                        ) as HTMLElement;
                        if (fallback) {
                          fallback.style.display = "flex";
                        }
                      }
                    }}
                    onLoad={() => {
                      console.log(
                        "Successfully loaded image:",
                        mediaAsset.filename
                      );
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}

                {/* Fallback for failed image loads */}
                <div className="image-fallback hidden items-center justify-center h-full absolute inset-0 bg-gray-100">
                  <div className="text-center">
                    <svg
                      className="h-8 w-8 text-gray-400 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-xs text-gray-500">Image</p>
                  </div>
                </div>

                {/* Selected indicator */}
                {isSelected(mediaAsset) && mode === "select" && (
                  <div className="absolute top-2 right-2 bg-teal-600 text-white rounded-full p-1">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                {/* Actions overlay */}
                {mode === "browse" && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(mediaAsset.file_path, "_blank");
                        }}
                        className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="View full size"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMedia(mediaAsset.id);
                        }}
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                        title="Delete"
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
                )}
              </div>

              {/* File info */}
              <div className="p-2">
                <p
                  className="text-xs font-medium text-gray-900 truncate"
                  title={mediaAsset.filename}
                >
                  {mediaAsset.filename}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(mediaAsset.file_size)}
                  {mediaAsset.width && mediaAsset.height && (
                    <span className="ml-1">
                      • {mediaAsset.width}×{mediaAsset.height}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
