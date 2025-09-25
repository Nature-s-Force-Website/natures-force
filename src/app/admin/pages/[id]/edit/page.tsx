import ModernPageEditor from "@/components/admin/ModernPageEditor";
import { createServerComponentClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNavigation from "@/components/admin/AdminNavigation";

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
    <>
      <AdminNavigation />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernPageEditor pageId={id} initialData={page} />
        </div>
      </main>
    </>
  );
}
