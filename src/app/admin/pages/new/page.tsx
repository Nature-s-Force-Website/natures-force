import ModernPageEditor from "@/components/admin/ModernPageEditor";
import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNavigation from "@/components/admin/AdminNavigation";

export default async function NewPagePage() {
  const { isAdmin } = await checkAdminAuth();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminNavigation />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernPageEditor />
        </div>
      </main>
    </>
  );
}
