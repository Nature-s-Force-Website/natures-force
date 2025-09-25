import { createServerComponentClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import ModernContentRenderer from "@/components/ModernContentRenderer";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const pageSlug = slug?.join("/") || "";

  const supabase = await createServerComponentClient();

  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", pageSlug)
    .eq("status", "published")
    .single();

  if (error || !page) {
    notFound();
  }

  return (
    <div>
      <ModernContentRenderer content={page.content} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const pageSlug = slug?.join("/") || "";

  const supabase = await createServerComponentClient();

  const { data: page } = await supabase
    .from("pages")
    .select("title, meta_title, meta_description")
    .eq("slug", pageSlug)
    .eq("status", "published")
    .single();

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.meta_title || page.title,
    description: page.meta_description,
  };
}
