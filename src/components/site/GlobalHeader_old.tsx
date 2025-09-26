"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface HeaderData {
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  navigation: NavItem[];
  cta?: {
    label: string;
    href: string;
    style: "primary" | "secondary";
  };
}

interface GlobalHeaderProps {
  data?: HeaderData;
}

export default function GlobalHeader({ data }: GlobalHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  useEffect(() => {
    if (data) {
      setHeaderData(data);
    } else {
      // Fetch header data from API
      fetchHeaderData();
    }
  }, [data]);

  const fetchHeaderData = async () => {
    try {
      const response = await fetch("/api/site-settings/header");
      if (response.ok) {
        const result = await response.json();
        setHeaderData(result.data || getDefaultHeaderData());
      } else {
        setHeaderData(getDefaultHeaderData());
      }
    } catch (error) {
      console.error("Failed to fetch header data:", error);
      setHeaderData(getDefaultHeaderData());
    }
  };

  const getDefaultHeaderData = (): HeaderData => ({
    logo: {
      src: "/next.svg",
      alt: "Logo",
      width: 120,
      height: 30,
    },
    navigation: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      {
        label: "Services",
        href: "/services",
        children: [
          { label: "Web Development", href: "/services/web-development" },
          { label: "Mobile Apps", href: "/services/mobile-apps" },
          { label: "Consulting", href: "/services/consulting" },
        ],
      },
      { label: "Contact", href: "/contact" },
    ],
    cta: {
      label: "Get Started",
      href: "/contact",
      style: "primary",
    },
  });

  if (!headerData) {
    return null;
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {headerData.logo &&
                headerData.logo.src &&
                headerData.logo.src.trim() !== "" && (
                  <Image
                    src={headerData.logo.src}
                    alt={headerData.logo.alt || "Logo"}
                    width={headerData.logo.width || 120}
                    height={headerData.logo.height || 30}
                    className="h-8 w-auto"
                  />
                )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {headerData.navigation.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && item.children.length > 0 && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1" role="menu">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                            role="menuitem"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            {headerData.cta && (
              <Link
                href={headerData.cta.href}
                className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  headerData.cta.style === "primary"
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {headerData.cta.label}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {headerData.navigation.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-teal-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className="text-gray-600 hover:text-teal-600 block px-3 py-2 rounded-md text-sm font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {headerData.cta && (
                <Link
                  href={headerData.cta.href}
                  className={`block mt-4 mx-3 px-4 py-2 rounded-md text-base font-medium text-center transition-colors ${
                    headerData.cta.style === "primary"
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {headerData.cta.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
