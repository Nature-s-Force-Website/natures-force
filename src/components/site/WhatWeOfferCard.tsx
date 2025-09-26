import React from "react";

interface WhatWeOfferItem {
  text: string;
  icon?: string; // Optional but will be ignored in favor of tick marks
}

interface WhatWeOfferCardProps {
  title?: string;
  subtitle?: string;
  items: WhatWeOfferItem[];
  cardStyle?: "default" | "gradient" | "bordered";
  layout?: "split" | "stacked"; // Changed to split (image + content) or stacked
  image?: string; // Add image prop
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export default function WhatWeOfferCard({
  title = "What We Offer",
  subtitle = "Our comprehensive services and capabilities",
  items,
  cardStyle = "default",
  layout = "split",
  image,
  showCTA = true,
  ctaText = "Learn More",
  ctaLink = "/contact",
  className = "",
}: WhatWeOfferCardProps) {
  const getCardStyles = () => {
    switch (cardStyle) {
      case "gradient":
        return "bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 shadow-xl";
      case "bordered":
        return "bg-white border-2 border-teal-200 shadow-lg";
      default:
        return "bg-white border border-slate-200 shadow-lg";
    }
  };

  if (layout === "stacked") {
    return (
      <div
        className={`rounded-2xl overflow-hidden ${getCardStyles()} ${className}`}
      >
        {/* Image Section */}
        {image && (
          <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-100">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
            {subtitle && (
              <p className="text-slate-600 leading-relaxed">{subtitle}</p>
            )}
          </div>

          {/* List Items with Tick Marks */}
          <div className="space-y-4 mb-8">
            {items.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                {/* Themed Tick Mark */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 bg-teal-600 rounded-sm flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-slate-700 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          {showCTA && (
            <div>
              <a
                href={ctaLink}
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-md hover:shadow-lg group"
              >
                <span>{ctaText}</span>
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Split Layout (matching reference image style)
  return (
    <div
      className={`rounded-2xl overflow-hidden ${getCardStyles()} ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Content Section - Left Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-slate-600 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* List Items with Tick Marks */}
          <div className="space-y-4 mb-8">
            {items.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                {/* Themed Tick Mark */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-teal-600 rounded-md flex items-center justify-center shadow-sm">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-slate-700 leading-relaxed text-base">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          {showCTA && (
            <div>
              <a
                href={ctaLink}
                className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <span>{ctaText}</span>
                <svg
                  className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Image Section - Right Side */}
        <div className="relative bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 order-1 lg:order-2">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Default placeholder matching reference style */
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center opacity-60">
                {/* Bottle/Product illustration placeholder */}
                <div className="w-32 h-48 mx-auto mb-4 bg-amber-800/20 rounded-2xl border-4 border-amber-800/30 relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-amber-800/30 rounded-t-lg"></div>
                  <div className="absolute bottom-6 left-4 right-4 h-16 bg-white/80 rounded-lg flex items-center justify-center">
                    <div className="w-full h-2 bg-amber-800/20 rounded"></div>
                  </div>
                </div>
                <p className="text-amber-800/60 text-sm font-medium">
                  Product Packaging
                </p>
              </div>
            </div>
          )}

          {/* Decorative elements */}
          <div className="absolute top-6 right-6 w-4 h-4 bg-teal-500 rounded-full opacity-80"></div>
          <div className="absolute bottom-8 left-8 w-3 h-3 bg-teal-600 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
}

// Export types for use in other components
export type { WhatWeOfferItem, WhatWeOfferCardProps };
