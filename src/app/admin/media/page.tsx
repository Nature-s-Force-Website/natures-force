import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MediaLibrary from "@/components/admin/MediaLibrary";
import AdminNavigation from "@/components/admin/AdminNavigation";

export default async function AdminMediaPage() {
  const isAdmin = await checkAdminAuth();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminNavigation />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <MediaLibrary mode="browse" />
      </div>
    </>
  );
}
