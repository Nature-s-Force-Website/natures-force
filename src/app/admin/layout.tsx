export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple layout without auth check - individual pages will handle auth
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
