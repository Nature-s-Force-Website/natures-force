import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/site/GlobalHeader";
import GlobalFooter from "@/components/site/GlobalFooter";
import { createServerComponentClient } from "@/lib/supabase-server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createServerComponentClient();
    const { data: metadataSettings } = await supabase
      .from("site_settings")
      .select("data")
      .eq("setting_type", "metadata")
      .eq("is_active", true)
      .single();

    const metadata = metadataSettings?.data || {};

    return {
      title: metadata.site_title || "Nature's Force Packaging",
      description:
        metadata.site_description ||
        "Premium eco-friendly packaging solutions for your business needs",
      keywords:
        metadata.site_keywords ||
        "packaging, eco-friendly, sustainable, business",
      authors: metadata.site_author
        ? [{ name: metadata.site_author }]
        : [{ name: "Nature's Force" }],
      robots: "index, follow",
      openGraph: {
        title:
          metadata.og_title ||
          metadata.site_title ||
          "Nature's Force Packaging",
        description:
          metadata.og_description ||
          metadata.site_description ||
          "Premium eco-friendly packaging solutions",
        type: "website",
        locale: "en_US",
        siteName: metadata.site_title || "Nature's Force Packaging",
      },
      twitter: {
        card: "summary_large_image",
        title:
          metadata.twitter_title ||
          metadata.site_title ||
          "Nature's Force Packaging",
        description:
          metadata.twitter_description ||
          metadata.site_description ||
          "Premium eco-friendly packaging solutions",
      },
    };
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {
      title: "Nature's Force Packaging",
      description:
        "Premium eco-friendly packaging solutions for your business needs",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alan+Sans:wght@300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: '"Alan Sans", sans-serif' }}
      >
        <GlobalHeader />
        <main className="flex-1">{children}</main>
        <GlobalFooter />
      </body>
    </html>
  );
}
