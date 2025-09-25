"use client";

import { useState } from "react";
import MediaLibrary from "./MediaLibrary";

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

interface MediaSelectorProps {
  onSelect: (imageUrl: string) => void;
  onClose: () => void;
  currentUrl?: string;
}

export default function MediaSelector({
  onSelect,
  onClose,
  currentUrl,
}: MediaSelectorProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset[]>([]);

  const handleSelectMedia = (media: MediaAsset) => {
    onSelect(media.file_path);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Select Image</h2>
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
          <MediaLibrary
            mode="select"
            onSelectMedia={handleSelectMedia}
            selectedMedia={selectedMedia}
          />
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
