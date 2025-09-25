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
      const response = await fetch("/api/site-settings/footer");
      if (response.ok) {
        const result = await response.json();
        setFooterData(result.data || getDefaultFooterData());
      } else {
        setFooterData(getDefaultFooterData());
      }
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
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54zm7.424 0c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54 4.54 2.032 4.54 4.54-2.032 4.54-4.54 4.54z" />
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {footerData.logo && (
              <div className="mb-4">
                <Image
                  src={footerData.logo.src}
                  alt={footerData.logo.alt}
                  width={footerData.logo.width || 120}
                  height={footerData.logo.height || 30}
                  className="h-8 w-auto filter invert"
                />
              </div>
            )}
            {footerData.description && (
              <p className="text-gray-400 mb-4 max-w-xs">
                {footerData.description}
              </p>
            )}

            {/* Social Links */}
            {footerData.socialLinks && footerData.socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {footerData.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {footerData.sections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              {footerData.copyright && (
                <p className="text-gray-400 text-sm">{footerData.copyright}</p>
              )}
            </div>
            <div>
              {footerData.bottomText && (
                <p className="text-gray-400 text-sm">{footerData.bottomText}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
