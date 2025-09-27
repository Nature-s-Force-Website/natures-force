"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      {/* Responsive margin - adjusts based on sidebar */}
      <div className="lg:ml-64 transition-all duration-300">
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
