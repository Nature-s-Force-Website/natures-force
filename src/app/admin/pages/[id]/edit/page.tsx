import { redirect } from "next/navigation";
import { checkAdminAuth } from "@/lib/auth";
import { createServerComponentClient } from "@/lib/supabase-server";
import ModernPageEditor from "@/components/admin/ModernPageEditor";
import { notFound } from "next/navigation";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isAdmin } = await checkAdminAuth();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const supabase = await createServerComponentClient();

  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !page) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Page</h1>
        <p className="text-gray-600">Modify your page content and settings</p>
      </div>
      <ModernPageEditor pageId={id} initialData={page} />
    </div>
  );
}
