import { createServerComponentClient } from "@/lib/supabase-server";
import ModernContentRenderer from "@/components/ModernContentRenderer";

export default async function Home() {
  const supabase = await createServerComponentClient();

  // Get homepage content
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("is_homepage", true)
    .eq("status", "published")
    .single();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to NaturesForce
          </h1>
          <p className="text-gray-600 mb-8">
            Your homepage is being set up. Please configure it in the admin
            panel.
          </p>
          <a
            href="/admin"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Go to Admin Panel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ModernContentRenderer content={page.content} />
    </div>
  );
}
