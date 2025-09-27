"use client";

import { usePathname } from "next/navigation";
import GlobalHeader from "@/components/site/GlobalHeader";
import GlobalFooter from "@/components/site/GlobalFooter";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    // Admin pages - no header/footer
    return <>{children}</>;
  }

  // Regular pages - with header/footer
  return (
    <>
      <GlobalHeader />
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </>
  );
}
