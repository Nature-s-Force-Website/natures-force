import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MediaLibrary from "@/components/admin/MediaLibrary";

export default async function AdminMediaPage() {
  const isAdmin = await checkAdminAuth();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <p className="text-gray-600">Manage your images and media files</p>
      </div>
      <MediaLibrary mode="browse" />
    </div>
  );
}
