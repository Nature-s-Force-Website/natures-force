"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNavigation from "@/components/admin/AdminNavigation";

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

interface MetadataData {
  site_title?: string;
  site_description?: string;
  site_keywords?: string;
  site_author?: string;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  favicon_url?: string;
  site_logo_url?: string;
}

export default function SiteSettingsPage() {
  const [activeTab, setActiveTab] = useState("header");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Header state
  const [headerData, setHeaderData] = useState<HeaderData>({
    logo: { src: "", alt: "", width: 120, height: 30 },
    navigation: [{ label: "", href: "" }],
    cta: { label: "", href: "", style: "primary" },
  });

  // Footer state
  const [footerData, setFooterData] = useState<FooterData>({
    logo: { src: "", alt: "", width: 120, height: 30 },
    description: "",
    sections: [{ title: "", links: [{ label: "", href: "" }] }],
    socialLinks: [{ platform: "", href: "", icon: "" }],
    bottomText: "",
    copyright: "",
  });

  // Metadata state
  const [metadataData, setMetadataData] = useState<MetadataData>({
    site_title: "",
    site_description: "",
    site_keywords: "",
    site_author: "",
    og_title: "",
    og_description: "",
    twitter_title: "",
    twitter_description: "",
    favicon_url: "/favicon.ico",
    site_logo_url: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // Load header settings
      const headerResponse = await fetch("/api/site-settings/header");
      if (headerResponse.ok) {
        const headerResult = await headerResponse.json();
        if (headerResult.data) {
          setHeaderData(headerResult.data);
        }
      }

      // Load footer settings
      const footerResponse = await fetch("/api/site-settings/footer");
      if (footerResponse.ok) {
        const footerResult = await footerResponse.json();
        if (footerResult.data) {
          setFooterData(footerResult.data);
        }
      }

      // Load metadata settings
      const metadataResponse = await fetch("/api/site-settings/metadata");
      if (metadataResponse.ok) {
        const metadataResult = await metadataResponse.json();
        if (metadataResult) {
          setMetadataData(metadataResult);
        }
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
      setMessage("Failed to load settings");
    }
    setIsLoading(false);
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      let endpoint, data, method, requestBody;

      if (activeTab === "metadata") {
        endpoint = "/api/site-settings/metadata";
        data = metadataData;
        method = "PUT";
        requestBody = JSON.stringify(data);
      } else {
        endpoint =
          activeTab === "header"
            ? "/api/site-settings/header"
            : "/api/site-settings/footer";
        data = activeTab === "header" ? headerData : footerData;
        method = "POST";
        requestBody = JSON.stringify({ data });
      }

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      if (response.ok) {
        setMessage(
          `${
            activeTab === "header"
              ? "Header"
              : activeTab === "footer"
              ? "Footer"
              : "Metadata"
          } settings saved successfully!`
        );
      } else {
        throw new Error(`Failed to save ${activeTab} settings`);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      setMessage("Failed to save settings");
    }
    setIsSaving(false);
  };

  // Header helper functions
  const addNavItem = () => {
    setHeaderData({
      ...headerData,
      navigation: [...headerData.navigation, { label: "", href: "" }],
    });
  };

  const updateNavItem = (index: number, field: string, value: string) => {
    const newNav = [...headerData.navigation];
    newNav[index] = { ...newNav[index], [field]: value };
    setHeaderData({ ...headerData, navigation: newNav });
  };

  const removeNavItem = (index: number) => {
    const newNav = headerData.navigation.filter((_, i) => i !== index);
    setHeaderData({ ...headerData, navigation: newNav });
  };

  const reorderNavItems = (fromIndex: number, toIndex: number) => {
    const newNav = [...headerData.navigation];
    const [movedItem] = newNav.splice(fromIndex, 1);
    newNav.splice(toIndex, 0, movedItem);
    setHeaderData({ ...headerData, navigation: newNav });
  };

  // Drag handlers for navigation
  const handleNavDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleNavDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleNavDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (dragIndex !== dropIndex) {
      reorderNavItems(dragIndex, dropIndex);
    }
  };

  // Footer helper functions
  const addFooterSection = () => {
    setFooterData({
      ...footerData,
      sections: [
        ...footerData.sections,
        { title: "", links: [{ label: "", href: "" }] },
      ],
    });
  };

  const updateFooterSection = (
    sectionIndex: number,
    field: string,
    value: string
  ) => {
    const newSections = [...footerData.sections];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      [field]: value,
    };
    setFooterData({ ...footerData, sections: newSections });
  };

  const addFooterLink = (sectionIndex: number) => {
    const newSections = [...footerData.sections];
    newSections[sectionIndex].links.push({ label: "", href: "" });
    setFooterData({ ...footerData, sections: newSections });
  };

  const reorderFooterSections = (fromIndex: number, toIndex: number) => {
    const newSections = [...footerData.sections];
    const [movedItem] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedItem);
    setFooterData({ ...footerData, sections: newSections });
  };

  // Drag handlers for footer sections
  const handleFooterDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleFooterDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleFooterDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (dragIndex !== dropIndex) {
      reorderFooterSections(dragIndex, dropIndex);
    }
  };

  const updateFooterLink = (
    sectionIndex: number,
    linkIndex: number,
    field: string,
    value: string
  ) => {
    const newSections = [...footerData.sections];
    newSections[sectionIndex].links[linkIndex] = {
      ...newSections[sectionIndex].links[linkIndex],
      [field]: value,
    };
    setFooterData({ ...footerData, sections: newSections });
  };

  const removeFooterSection = (index: number) => {
    const newSections = footerData.sections.filter((_, i) => i !== index);
    setFooterData({ ...footerData, sections: newSections });
  };

  const addSocialLink = () => {
    setFooterData({
      ...footerData,
      socialLinks: [
        ...(footerData.socialLinks || []),
        { platform: "", href: "", icon: "" },
      ],
    });
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const newSocial = [...(footerData.socialLinks || [])];
    newSocial[index] = { ...newSocial[index], [field]: value };
    setFooterData({ ...footerData, socialLinks: newSocial });
  };

  const removeSocialLink = (index: number) => {
    const newSocial = (footerData.socialLinks || []).filter(
      (_, i) => i !== index
    );
    setFooterData({ ...footerData, socialLinks: newSocial });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <AdminNavigation />
      <style jsx global>{`
        .admin-form label {
          color: #111827 !important;
        }
        .admin-form input,
        .admin-form textarea,
        .admin-form select {
          color: #111827 !important;
          background-color: white !important;
        }
        .admin-form h2,
        .admin-form h3 {
          color: #111827 !important;
        }
        .admin-form .text-gray-700 {
          color: #111827 !important;
        }
      `}</style>
      <div className="admin-form max-w-6xl mx-auto p-6 text-gray-900 bg-gray-50 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Site Settings
          </h1>
          <p className="text-gray-600">
            Manage your site's header, navigation, and footer content.
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.includes("success")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("header")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "header"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Header & Navigation
            </button>
            <button
              onClick={() => setActiveTab("footer")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "footer"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Footer
            </button>
            <button
              onClick={() => setActiveTab("metadata")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "metadata"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Site Metadata
            </button>
          </nav>
        </div>

        {/* Header Settings */}
        {activeTab === "header" && (
          <div className="space-y-8">
            {/* Logo Section */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Logo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    value={headerData.logo?.src || ""}
                    onChange={(e) =>
                      setHeaderData({
                        ...headerData,
                        logo: {
                          ...headerData.logo,
                          src: e.target.value,
                          alt: headerData.logo?.alt || "",
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={headerData.logo?.alt || ""}
                    onChange={(e) =>
                      setHeaderData({
                        ...headerData,
                        logo: {
                          ...headerData.logo,
                          alt: e.target.value,
                          src: headerData.logo?.src || "",
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Logo"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Navigation Links</h2>
                <button
                  onClick={addNavItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Link
                </button>
              </div>
              <div className="space-y-4">
                {headerData.navigation.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-end p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    draggable
                    onDragStart={(e) => handleNavDragStart(e, index)}
                    onDragOver={handleNavDragOver}
                    onDrop={(e) => handleNavDrop(e, index)}
                  >
                    <div className="flex items-center cursor-move text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM6 4a1 1 0 011-1h6a1 1 0 011 1v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4zm2 2a1 1 0 000 2h4a1 1 0 100-2H8zm0 4a1 1 0 100 2h4a1 1 0 100-2H8z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) =>
                          updateNavItem(index, "label", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                        placeholder="Home"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL
                      </label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) =>
                          updateNavItem(index, "href", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                        placeholder="/"
                      />
                    </div>
                    <button
                      onClick={() => removeNavItem(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">
                Call-to-Action Button
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={headerData.cta?.label || ""}
                    onChange={(e) =>
                      setHeaderData({
                        ...headerData,
                        cta: {
                          ...headerData.cta,
                          label: e.target.value,
                          href: headerData.cta?.href || "",
                          style: headerData.cta?.style || "primary",
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Get Started"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button URL
                  </label>
                  <input
                    type="text"
                    value={headerData.cta?.href || ""}
                    onChange={(e) =>
                      setHeaderData({
                        ...headerData,
                        cta: {
                          ...headerData.cta,
                          href: e.target.value,
                          label: headerData.cta?.label || "",
                          style: headerData.cta?.style || "primary",
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/contact"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Style
                  </label>
                  <select
                    value={headerData.cta?.style || "primary"}
                    onChange={(e) =>
                      setHeaderData({
                        ...headerData,
                        cta: {
                          ...headerData.cta,
                          style: e.target.value as "primary" | "secondary",
                          label: headerData.cta?.label || "",
                          href: headerData.cta?.href || "",
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Settings */}
        {activeTab === "footer" && (
          <div className="space-y-8">
            {/* Logo & Description */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">
                Footer Logo & Description
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    value={footerData.logo?.src || ""}
                    onChange={(e) =>
                      setFooterData({
                        ...footerData,
                        logo: {
                          ...footerData.logo,
                          src: e.target.value,
                          alt: footerData.logo?.alt || "",
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={footerData.logo?.alt || ""}
                    onChange={(e) =>
                      setFooterData({
                        ...footerData,
                        logo: {
                          ...footerData.logo,
                          alt: e.target.value,
                          src: footerData.logo?.src || "",
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Logo"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={footerData.description || ""}
                  onChange={(e) =>
                    setFooterData({
                      ...footerData,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="A brief description of your company..."
                />
              </div>
            </div>

            {/* Footer Sections */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Footer Sections</h2>
                <button
                  onClick={addFooterSection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Section
                </button>
              </div>
              <div className="space-y-6">
                {footerData.sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    draggable
                    onDragStart={(e) => handleFooterDragStart(e, sectionIndex)}
                    onDrop={(e) => handleFooterDrop(e, sectionIndex)}
                    onDragOver={handleFooterDragOver}
                    className="border rounded-lg p-4 cursor-move hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        {/* Drag Handle */}
                        <div className="flex flex-col gap-1 text-gray-400 hover:text-gray-600">
                          <div className="w-2 h-0.5 bg-current"></div>
                          <div className="w-2 h-0.5 bg-current"></div>
                          <div className="w-2 h-0.5 bg-current"></div>
                        </div>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) =>
                            updateFooterSection(
                              sectionIndex,
                              "title",
                              e.target.value
                            )
                          }
                          className="text-lg font-medium px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Section Title"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addFooterLink(sectionIndex)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                        >
                          Add Link
                        </button>
                        <button
                          onClick={() => removeFooterSection(sectionIndex)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                        >
                          Remove Section
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <div key={linkIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) =>
                              updateFooterLink(
                                sectionIndex,
                                linkIndex,
                                "label",
                                e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Link Label"
                          />
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) =>
                              updateFooterLink(
                                sectionIndex,
                                linkIndex,
                                "href",
                                e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="URL"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Social Links</h2>
                <button
                  onClick={addSocialLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Social Link
                </button>
              </div>
              <div className="space-y-4">
                {(footerData.socialLinks || []).map((social, index) => (
                  <div key={index} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Platform
                      </label>
                      <input
                        type="text"
                        value={social.platform}
                        onChange={(e) =>
                          updateSocialLink(index, "platform", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Twitter"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL
                      </label>
                      <input
                        type="text"
                        value={social.href}
                        onChange={(e) =>
                          updateSocialLink(index, "href", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </div>
                    <button
                      onClick={() => removeSocialLink(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Text */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Footer Text</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bottom Text
                  </label>
                  <input
                    type="text"
                    value={footerData.bottomText || ""}
                    onChange={(e) =>
                      setFooterData({
                        ...footerData,
                        bottomText: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Trusted by thousands of businesses worldwide"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Copyright
                  </label>
                  <input
                    type="text"
                    value={footerData.copyright || ""}
                    onChange={(e) =>
                      setFooterData({
                        ...footerData,
                        copyright: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="© 2024 Your Company Name. All rights reserved."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Metadata Settings */}
        {activeTab === "metadata" && (
          <div className="space-y-8">
            {/* Basic Site Information */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">
                Basic Site Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    value={metadataData.site_title || ""}
                    onChange={(e) =>
                      setMetadataData({
                        ...metadataData,
                        site_title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Your Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Author
                  </label>
                  <input
                    type="text"
                    value={metadataData.site_author || ""}
                    onChange={(e) =>
                      setMetadataData({
                        ...metadataData,
                        site_author: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Company Name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Description
                </label>
                <textarea
                  rows={3}
                  value={metadataData.site_description || ""}
                  onChange={(e) =>
                    setMetadataData({
                      ...metadataData,
                      site_description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="A brief description of your website for search engines"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={metadataData.site_keywords || ""}
                  onChange={(e) =>
                    setMetadataData({
                      ...metadataData,
                      site_keywords: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>

            {/* Open Graph Settings */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">
                Open Graph (Social Media Sharing)
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Title
                  </label>
                  <input
                    type="text"
                    value={metadataData.og_title || ""}
                    onChange={(e) =>
                      setMetadataData({
                        ...metadataData,
                        og_title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Title that appears when sharing on social media"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Description
                  </label>
                  <textarea
                    rows={3}
                    value={metadataData.og_description || ""}
                    onChange={(e) =>
                      setMetadataData({
                        ...metadataData,
                        og_description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Description that appears when sharing on social media"
                  />
                </div>
              </div>
            </div>

            {/* Twitter Settings */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">
                Twitter Card Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter Title
                  </label>
                  <input
                    type="text"
                    value={metadataData.twitter_title || ""}
                    onChange={(e) =>
                      setMetadataData({
                        ...metadataData,
                        twitter_title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Title for Twitter cards"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter Description
                  </label>
                  <textarea
                    rows={3}
                    value={metadataData.twitter_description || ""}
                    onChange={(e) =>
                      setMetadataData({
                        ...metadataData,
                        twitter_description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Description for Twitter cards"
                  />
                </div>
              </div>
            </div>

            {/* Assets */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Site Assets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="url"
                    value={metadataData.favicon_url || ""}
                    onChange={(e) =>
                      setMetadataData({
                        ...metadataData,
                        favicon_url: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="/favicon.ico"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Logo URL
                  </label>
                  <input
                    type="url"
                    value={metadataData.site_logo_url || ""}
                    onChange={(e) =>
                      setMetadataData({
                        ...metadataData,
                        site_logo_url: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={saveSettings}
            disabled={isSaving}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving
              ? "Saving..."
              : `Save ${
                  activeTab === "header"
                    ? "Header"
                    : activeTab === "footer"
                    ? "Footer"
                    : "Metadata"
                } Settings`}
          </button>
        </div>
      </div>
    </>
  );
}
