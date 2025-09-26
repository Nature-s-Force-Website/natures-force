"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeletePageButtonProps {
  pageId: string;
  pageTitle: string;
  isHomepage?: boolean;
}

export default function DeletePageButton({
  pageId,
  pageTitle,
  isHomepage,
}: DeletePageButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (isHomepage) {
      alert(
        "Cannot delete the homepage. Please set another page as homepage first."
      );
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
        setShowConfirm(false);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete page");
      }
    } catch (error) {
      console.error("Error deleting page:", error);
      alert("Failed to delete page");
    } finally {
      setIsDeleting(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h3 className="text-lg font-medium text-slate-900 mb-4">
            Delete Page
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Are you sure you want to delete &quot;<strong>{pageTitle}</strong>
            &quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowConfirm(false)}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300 disabled:opacity-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors duration-200"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      disabled={isHomepage}
      className={`text-sm font-medium transition-colors duration-200 ${
        isHomepage
          ? "text-slate-400 cursor-not-allowed"
          : "text-red-600 hover:text-red-700"
      }`}
      title={isHomepage ? "Cannot delete homepage" : "Delete page"}
    >
      Delete
    </button>
  );
}
