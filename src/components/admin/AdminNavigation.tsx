"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", current: pathname === "/admin" },
    {
      name: "Pages",
      href: "/admin/pages",
      current: pathname.startsWith("/admin/pages"),
    },
    {
      name: "Media",
      href: "/admin/media",
      current: pathname.startsWith("/admin/media"),
    },
    {
      name: "Site Settings",
      href: "/admin/site-settings",
      current: pathname.startsWith("/admin/site-settings"),
    },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-slate-900">
                NaturesForce CMS
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? "border-teal-500 text-slate-900"
                      : "border-transparent text-slate-500 hover:border-teal-300 hover:text-slate-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
