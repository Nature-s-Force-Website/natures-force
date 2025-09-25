import Link from "next/link";
import { createServerComponentClient } from "@/lib/supabase-server";
import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNavigation from "@/components/admin/AdminNavigation";
import DeletePageButton from "@/components/admin/DeletePageButton";

export default async function PagesPage() {
  const { isAdmin } = await checkAdminAuth();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const supabase = await createServerComponentClient();

  const { data: pages, error } = await supabase
    .from("pages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading pages: {error.message}</div>;
  }

  return (
    <>
      <AdminNavigation />
      <main className="py-6 text-gray-900">
        <div>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
              <p className="mt-2 text-sm text-gray-900">
                Manage your website pages and content
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                href="/admin/pages/new"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                New Page
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">
                          Slug
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">
                          Updated
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pages?.map((page) => (
                        <tr key={page.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {page.title}
                            {page.is_homepage && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Homepage
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            /{page.slug}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                page.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {page.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(page.updated_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/admin/pages/${page.id}/edit`}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/${page.slug}`}
                              target="_blank"
                              className="text-gray-600 hover:text-gray-900 mr-4"
                            >
                              View
                            </Link>
                            <DeletePageButton
                              pageId={page.id}
                              pageTitle={page.title}
                              isHomepage={page.is_homepage}
                            />
                          </td>
                        </tr>
                      ))}
                      {pages?.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-4 text-center text-sm text-gray-500"
                          >
                            No pages found.{" "}
                            <Link
                              href="/admin/pages/new"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Create your first page
                            </Link>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
