"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { imagekitConfig } from "@/lib/imagekit";

interface MediaUploadProps {
  onUploadSuccess?: (media: any) => void;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  folder?: string;
}

export default function MediaUpload({
  onUploadSuccess,
  maxFileSize = 10,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  folder = "media-uploads",
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!acceptedTypes.includes(file.type)) {
      setError(`Please select a valid file type: ${acceptedTypes.join(", ")}`);
      return;
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`File size must be less than ${maxFileSize}MB`);
      return;
    }

    setError("");
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      // Get authentication parameters from our API
      const authResponse = await fetch("/api/imagekit/auth");
      if (!authResponse.ok) {
        throw new Error("Failed to get auth parameters");
      }

      const authData = await authResponse.json();

      // Create FormData for ImageKit upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("publicKey", imagekitConfig.publicKey);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);
      formData.append("fileName", file.name);
      formData.append("folder", folder);

      // Upload to ImageKit
      const uploadResponse = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      const uploadResult = await uploadResponse.json();

      // Save to our database
      const saveResponse = await fetch("/api/media/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: uploadResult.name,
          file_path: uploadResult.url,
          file_size: uploadResult.size,
          mime_type: uploadResult.mimeType,
          width: uploadResult.width,
          height: uploadResult.height,
          imagekit_file_id: uploadResult.fileId,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save media to database");
      }

      const saveResult = await saveResponse.json();

      // Reset form
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Call success callback
      onUploadSuccess?.(saveResult.media);
    } catch (err: any) {
      setError(err.message || "Upload failed");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onClick={!uploading ? triggerFileInput : undefined}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            uploading
              ? "border-gray-300 bg-gray-50 cursor-not-allowed"
              : "border-gray-400 hover:border-gray-600 hover:bg-gray-50"
          }
        `}
      >
        {uploading ? (
          <div className="space-y-4">
            <div className="animate-spin h-8 w-8 border-b-2 border-teal-600 rounded-full mx-auto"></div>
            <div>
              <p className="text-sm text-slate-600">Uploading...</p>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div
                  className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">{uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-sm text-slate-600">
                <span className="font-medium text-teal-600">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-slate-500">
                {acceptedTypes.join(", ")} up to {maxFileSize}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
