import { redirect } from "next/navigation";
import ModernPageEditor from "@/components/admin/ModernPageEditor";
import { checkAdminAuth } from "@/lib/auth";

export default async function NewPageAdmin() {
  const { isAdmin } = await checkAdminAuth();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Page</h1>
        <p className="text-gray-600">Build your page using the modern editor</p>
      </div>
      <ModernPageEditor />
    </div>
  );
}
