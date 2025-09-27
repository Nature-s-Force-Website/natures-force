"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

interface FooterData {
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  siteName?: string;
  description?: string;
  sections: FooterSection[];
  socialLinks?: SocialLink[];
  bottomText?: string;
  copyright?: string;
}

interface GlobalFooterProps {
  data?: FooterData;
}

export default function GlobalFooter({ data }: GlobalFooterProps) {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    if (data) {
      setFooterData(data);
    } else {
      // Fetch footer data from API
      fetchFooterData();
    }
  }, [data]);

  const fetchFooterData = async () => {
    try {
      // First fetch site settings to get logo and site name
      const siteSettingsResponse = await fetch("/api/site-settings/metadata");
      let logoData = null;
      let siteName = "Nature's Force";

      if (siteSettingsResponse.ok) {
        const siteSettingsResult = await siteSettingsResponse.json();
        if (siteSettingsResult.success && siteSettingsResult.data) {
          const settings = siteSettingsResult.data;
          if (settings.logo_url) {
            logoData = {
              src: settings.logo_url,
              alt: settings.site_name || "Logo",
              width: 120,
              height: 40,
            };
          }
          if (settings.site_name) {
            siteName = settings.site_name;
          }
        }
      }

      // Then fetch footer-specific data
      const response = await fetch("/api/site-settings/footer");
      let footerData;
      if (response.ok) {
        const result = await response.json();
        footerData = result.data || getDefaultFooterData();
      } else {
        footerData = getDefaultFooterData();
      }

      // Override with site settings logo if available
      if (logoData) {
        footerData.logo = logoData;
      }

      // Update site name in footer data
      footerData.siteName = siteName;

      setFooterData(footerData);
    } catch (error) {
      console.error("Failed to fetch footer data:", error);
      setFooterData(getDefaultFooterData());
    }
  };

  const getDefaultFooterData = (): FooterData => ({
    logo: {
      src: "/next.svg",
      alt: "Logo",
      width: 120,
      height: 30,
    },
    description:
      "Building amazing digital experiences with modern web technologies.",
    sections: [
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Our Team", href: "/team" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Web Development", href: "/services/web-development" },
          { label: "Mobile Apps", href: "/services/mobile-apps" },
          { label: "Consulting", href: "/services/consulting" },
          { label: "Support", href: "/support" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Documentation", href: "/docs" },
          { label: "Help Center", href: "/help" },
          { label: "Privacy Policy", href: "/privacy" },
        ],
      },
    ],
    socialLinks: [
      { platform: "Twitter", href: "https://twitter.com", icon: "twitter" },
      { platform: "Facebook", href: "https://facebook.com", icon: "facebook" },
      { platform: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
      {
        platform: "Instagram",
        href: "https://instagram.com",
        icon: "instagram",
      },
    ],
    bottomText: "Trusted by thousands of businesses worldwide.",
    copyright: "© 2024 Your Company Name. All rights reserved.",
  });

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
    }
  };

  if (!footerData) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info - Enhanced */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="mb-4">
                {footerData.logo &&
                typeof footerData.logo.src === "string" &&
                footerData.logo.src.trim() !== "" &&
                !footerData.logo.src.includes("next.svg") ? (
                  <Image
                    src={footerData.logo.src}
                    alt={footerData.logo.alt || "Logo"}
                    width={footerData.logo.width || 160}
                    height={footerData.logo.height || 50}
                    className="h-16 w-auto filter brightness-0 invert"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {footerData.siteName
                        ? footerData.siteName.charAt(0).toUpperCase()
                        : "N"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {footerData.description && (
              <p className="text-gray-300 mb-6 max-w-xs leading-relaxed text-sm">
                {footerData.description}
              </p>
            )}
          </div>

          {/* Enhanced Footer Sections */}
          {footerData.sections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full"></div>
                <h3 className="text-white font-bold text-lg">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-teal-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-teal-400 transition-colors duration-300"></div>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Follow Us Section - Moved to End */}
        {footerData.socialLinks && footerData.socialLinks.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-md font-medium mb-6">Follow Us</p>
            <div className="flex justify-center space-x-4">
              {footerData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-600 hover:to-emerald-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                  aria-label={social.platform}
                >
                  <div className="group-hover:animate-pulse">
                    {getSocialIcon(social.platform)}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              {footerData.copyright && (
                <p className="text-gray-300 text-md font-medium">
                  Copyright © {footerData.copyright}
                </p>
              )}
              <div className="hidden md:block w-px h-4 bg-slate-600"></div>
              {footerData.bottomText && (
                <p className="text-gray-300 text-md font-medium">
                  {footerData.bottomText}
                </p>
              )}
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-md">
                Developed by{" "}
                <a
                  href="https://harishhona.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors duration-300 font-semibold hover:underline"
                >
                  Harish Hona
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-6 right-6 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-6 left-6 w-24 h-24 bg-gradient-to-tr from-teal-400/10 to-emerald-400/10 rounded-full blur-2xl"></div>
      </div>
    </footer>
  );
}
