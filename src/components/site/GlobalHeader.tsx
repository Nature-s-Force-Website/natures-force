"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  // Function to check if a navigation item is active
  const isActiveLink = (href: string, hasChildren: boolean = false) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    if (hasChildren && headerData) {
      // Check if any child is active
      const navItem = headerData.navigation.find((item) => item.href === href);
      if (navItem?.children) {
        return navItem.children.some((child) =>
          pathname.startsWith(child.href)
        );
      }
    }
    return false;
  };

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
    <header className="bg-gradient-to-r from-slate-50 via-white to-teal-50 shadow-xl sticky top-0 z-50 border-b border-teal-100/50 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {headerData.logo &&
              headerData.logo.src &&
              headerData.logo.src.trim() !== "" ? (
                <Image
                  src={headerData.logo.src}
                  alt={headerData.logo.alt || "Logo"}
                  width={headerData.logo.width || 140}
                  height={headerData.logo.height || 35}
                  className="h-10 w-auto"
                />
              ) : (
                <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  Nature&apos;s Force
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {headerData.navigation.map((item, index) => {
                const isActive = isActiveLink(item.href, !!item.children);
                return (
                  <div key={index} className="relative group">
                    <Link
                      href={item.href}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 relative ${
                        isActive
                          ? "text-teal-700 bg-teal-50 shadow-sm"
                          : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-1.5 h-1.5 bg-teal-600 rounded-full"></div>
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {item.children && item.children.length > 0 && (
                      <div className="absolute left-0 mt-2 w-52 rounded-xl shadow-xl bg-white ring-1 ring-teal-100 ring-opacity-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-teal-50">
                        <div className="py-2" role="menu">
                          {item.children.map((child, childIndex) => {
                            const isChildActive = pathname.startsWith(
                              child.href
                            );
                            return (
                              <Link
                                key={childIndex}
                                href={child.href}
                                className={`block px-5 py-3 text-sm transition-colors duration-200 ${
                                  isChildActive
                                    ? "text-teal-700 bg-teal-50 font-medium"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                                }`}
                                role="menuitem"
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          {headerData.cta && (
            <Link
              href={headerData.cta.href}
              className={`ml-6 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                headerData.cta.style === "primary"
                  ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 shadow-md"
                  : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              {headerData.cta.label}
            </Link>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-7 w-7"
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
                  className="block h-7 w-7"
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

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6 bg-gradient-to-br from-slate-50 to-teal-50 border-t border-teal-100">
            {headerData.navigation.map((item, index) => {
              const isActive = isActiveLink(item.href, !!item.children);
              return (
                <div key={index}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "text-teal-700 bg-teal-50 font-semibold shadow-sm"
                        : "text-gray-700 hover:text-teal-600 hover:bg-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="ml-6 space-y-1 mt-2">
                      {item.children.map((child, childIndex) => {
                        const isChildActive = pathname.startsWith(child.href);
                        return (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className={`block px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                              isChildActive
                                ? "text-teal-700 bg-teal-50 font-medium"
                                : "text-gray-600 hover:text-teal-600 hover:bg-white"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {headerData.cta && (
              <Link
                href={headerData.cta.href}
                className={`block mt-6 mx-4 px-6 py-4 rounded-xl text-lg font-semibold text-center transition-all duration-300 transform hover:scale-105 ${
                  headerData.cta.style === "primary"
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 shadow-lg"
                    : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {headerData.cta.label}
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
