"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getComponentDefinition } from "@/lib/component-types";
import Image from "next/image";
import Link from "next/link";
import WhatWeOfferCard from "./site/WhatWeOfferCard";
import ProcessSteps, { ProcessStepsData } from "./ProcessSteps";

// Import types from the WhatWeOfferCard component
interface WhatWeOfferItem {
  text: string;
  icon?: string;
}

// Define proper types for component data
interface ComponentData {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Helper function to safely extract typed values
const safeString = (value: unknown): string => String(value || "");
const safeNumber = (value: unknown): number => Number(value) || 0;
const safeBoolean = (value: unknown): boolean => Boolean(value);

interface ContentBlock {
  id: string;
  type: string;
  data: ComponentData;
}

interface ContentRendererProps {
  content: ContentBlock[];
}

export default function ModernContentRenderer({
  content,
}: ContentRendererProps) {
  if (!content || !Array.isArray(content)) {
    return <div>No content available</div>;
  }

  const renderComponent = (block: ContentBlock) => {
    const componentDef = getComponentDefinition(block.type);
    if (!componentDef) {
      return <div key={block.id}>Unknown component: {block.type}</div>;
    }

    switch (block.type) {
      case "hero_banner":
        return <HeroBanner key={block.id} data={block.data} />;

      case "hero_split":
        return <HeroSplit key={block.id} data={block.data} />;

      case "feature_grid":
        return <FeatureGrid key={block.id} data={block.data} />;

      case "testimonials":
        return <Testimonials key={block.id} data={block.data} />;

      case "cta_section":
        return <CTASection key={block.id} data={block.data} />;

      case "stats_section":
        return <StatsSection key={block.id} data={block.data} />;

      case "image_gallery":
        return <ImageGallery key={block.id} data={block.data} />;

      case "team_profiles":
        return <TeamProfiles key={block.id} data={block.data} />;

      case "contact_section":
        return <ContactSection key={block.id} data={block.data} />;

      case "faq_section":
        return <FAQSection key={block.id} data={block.data} />;

      case "process_steps":
        // Ensure data has the required structure for ProcessSteps
        const processStepsData: ProcessStepsData = {
          ...block.data,
          steps: Array.isArray(block.data.steps) ? block.data.steps : [],
        };
        return <ProcessSteps key={block.id} data={processStepsData} />;

      case "what_we_offer_card":
        return (
          <div key={block.id} className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <WhatWeOfferCard
                title={block.data.title as string}
                subtitle={block.data.subtitle as string}
                items={(block.data.items as WhatWeOfferItem[]) || []}
                cardStyle={
                  block.data.cardStyle as "default" | "gradient" | "bordered"
                }
                layout={block.data.layout as "split" | "stacked"}
                image={block.data.image as string}
                showCTA={block.data.showCTA as boolean}
                ctaText={block.data.ctaText as string}
                ctaLink={block.data.ctaLink as string}
                className={block.data.className as string}
              />
            </div>
          </div>
        );
      default:
        return (
          <div key={block.id}>Component not implemented: {block.type}</div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {content.map((block) => renderComponent(block))}
    </div>
  );
}

// Component Implementations

function HeroBanner({ data }: { data: ComponentData }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {typeof data.backgroundImage === "string" &&
        data.backgroundImage.trim() !== "" && (
          <div className="absolute inset-0">
            <Image
              src={data.backgroundImage as string}
              alt="Hero background"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-teal-800/60 to-green-900/80"
              style={{ opacity: (data.overlayOpacity as number) || 0.85 }}
            />
          </div>
        )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-emerald-200 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-teal-300 rounded-full blur-xl"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto text-${
          data.textAlign || "center"
        }`}
      >
        {/* Small Badge/Label */}
        {data.badge && (
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-emerald-100 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            {data.badge}
          </div>
        )}

        {data.title && (
          <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h1>
        )}

        {data.subtitle && (
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-emerald-50 mb-4 leading-relaxed">
            {data.subtitle}
          </h2>
        )}

        {data.description && (
          <p className="text-base sm:text-lg md:text-xl text-emerald-100/90 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            {data.description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {data.ctaText && data.ctaLink && (
            <a
              href={data.ctaLink}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold rounded-full hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {data.ctaText}
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
          )}

          {data.secondaryCtaText && data.secondaryCtaLink && (
            <a
              href={data.secondaryCtaLink}
              className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-medium rounded-full hover:bg-white/20 transition-all duration-300"
            >
              {data.secondaryCtaText}
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          )}
        </div>

        {/* Trust Indicators */}
        {data.trustText && (
          <div className="mt-16 text-emerald-200/80 text-sm font-medium">
            {data.trustText}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-3 bg-white/60 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

function HeroSplit({ data }: { data: ComponentData }) {
  const imageOnRight = data.imagePosition === "right";

  return (
    <div
      className="min-h-screen flex items-center py-20 relative overflow-hidden"
      style={{ backgroundColor: data.backgroundColor || "#ffffff" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            imageOnRight ? "" : "lg:grid-flow-col-dense"
          }`}
        >
          {/* Content */}
          <div
            className={`animate-fade-in ${
              imageOnRight ? "" : "lg:col-start-2"
            }`}
          >
            {data.badge && (
              <div className="inline-flex items-center px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                {data.badge}
              </div>
            )}

            {data.title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-teal-800 to-gray-900 bg-clip-text text-transparent">
                  {data.title}
                </span>
              </h1>
            )}

            {data.description && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                {data.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {data.ctaText && data.ctaLink && (
                <a
                  href={data.ctaLink}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-lg font-semibold rounded-2xl hover:from-teal-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  {data.ctaText}
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
              )}

              {data.secondaryCtaText && data.secondaryCtaLink && (
                <a
                  href={data.secondaryCtaLink}
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {data.secondaryCtaText}
                </a>
              )}
            </div>

            {/* Trust indicators */}
            {data.features && data.features.length > 0 && (
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                {data.features
                  .slice(0, 3)
                  .map((feature: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {feature.title || feature}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Image */}
          {typeof data.image === "string" && data.image.trim() !== "" && (
            <div
              className={`relative h-[500px] lg:h-[600px] animate-slide-up ${
                imageOnRight ? "" : "lg:col-start-1"
              }`}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative h-full">
                <Image
                  src={data.image}
                  alt={data.title || "Hero image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-2xl shadow-2xl"
                />
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal-400 rounded-full animate-float"></div>
                <div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-emerald-500 rounded-full animate-float"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureGrid({ data }: { data: ComponentData }) {
  return (
    <div
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: data.backgroundColor || "#f8fafc" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-3/4 w-2 h-2 bg-green-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-fade-in">
          {data.subtitle && (
            <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              {data.subtitle}
            </div>
          )}
          {data.title && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
              <span className="bg-gradient-to-r from-gray-900 via-teal-800 to-gray-900 bg-clip-text text-transparent">
                {data.title}
              </span>
            </h2>
          )}
          {data.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {data.features && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.features.map((feature: any, index: number) => (
              <div
                key={index}
                className="group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-105 border border-gray-50 overflow-hidden">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon Container */}
                  <div className="relative mb-8">
                    {typeof feature.image === "string" &&
                    feature.image.trim() !== "" ? (
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center overflow-hidden group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                        <Image
                          src={feature.image}
                          alt={feature.title || "Feature"}
                          width={44}
                          height={44}
                          className="object-contain filter group-hover:brightness-110"
                        />
                      </div>
                    ) : (
                      feature.icon && (
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-3xl text-teal-600 group-hover:bg-gradient-to-br group-hover:from-teal-200 group-hover:to-emerald-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                          {feature.icon}
                        </div>
                      )
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative text-center">
                    {feature.title && (
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    )}

                    {feature.description && (
                      <p className="text-gray-600 leading-relaxed mb-6 text-balance">
                        {feature.description}
                      </p>
                    )}

                    {/* Optional feature link */}
                    {feature.link && (
                      <div className="pt-2">
                        <a
                          href={feature.link}
                          className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-200 group/link"
                        >
                          Learn More
                          <svg
                            className="ml-2 w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-200"
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
              </div>
            ))}
          </div>
        )}

        {/* Optional CTA section */}
        {data.ctaText && data.ctaLink && (
          <div className="text-center mt-16 animate-fade-in">
            <a
              href={data.ctaLink}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-lg font-semibold rounded-2xl hover:from-teal-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              {data.ctaText}
              <svg
                className="ml-2 w-5 h-5"
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

function Testimonials({ data }: { data: ComponentData }) {
  return (
    <div
      className="py-20"
      style={{ backgroundColor: data.backgroundColor || "#f8fafc" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {data.subtitle && (
            <p className="text-teal-600 font-medium text-sm uppercase tracking-wide mb-3">
              {data.subtitle}
            </p>
          )}
          {data.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {data.testimonials && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.testimonials.map((testimonial: any, index: number) => (
              <div
                key={index}
                className={`group cursor-default ${
                  testimonial.featured ? "order-first lg:order-none" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 border ${
                    testimonial.featured
                      ? "border-teal-200 ring-1 ring-teal-100 shadow-lg"
                      : "border-gray-100"
                  } h-full flex flex-col`}
                >
                  {/* Featured badge */}
                  {testimonial.featured && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        ⭐ Featured
                      </span>
                    </div>
                  )}

                  {/* Star rating */}
                  <div className="flex text-yellow-400 mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial text */}
                  {testimonial.text && (
                    <blockquote className="text-gray-700 text-sm leading-relaxed mb-8 flex-1">
                      &quot;{testimonial.text}&quot;
                    </blockquote>
                  )}

                  {/* Client info */}
                  <div className="flex items-center pt-6 border-t border-gray-100">
                    {typeof testimonial.image === "string" &&
                    testimonial.image.trim() !== "" ? (
                      <div className="relative h-12 w-12 mr-4 group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name || "Client photo"}
                          fill
                          sizes="48px"
                          className="object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 mr-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl font-semibold">
                        {testimonial.name ? testimonial.name.charAt(0) : "?"}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      {testimonial.name && (
                        <div className="font-semibold text-gray-900 text-sm truncate">
                          {testimonial.name}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        {testimonial.position && testimonial.company ? (
                          <span>
                            {testimonial.position} at {testimonial.company}
                          </span>
                        ) : testimonial.position ? (
                          <span>{testimonial.position}</span>
                        ) : testimonial.company ? (
                          <span>{testimonial.company}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CTASection({ data }: { data: ComponentData }) {
  return (
    <div
      className="py-16"
      style={{
        backgroundColor: data.backgroundColor || "#1f2937",
        color: data.textColor || "#ffffff",
      }}
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        )}

        {data.description && (
          <p className="text-xl mb-8 opacity-90">{data.description}</p>
        )}

        {data.ctaText && data.ctaLink && (
          <a
            href={data.ctaLink}
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {data.ctaText}
          </a>
        )}
      </div>
    </div>
  );
}

function StatsSection({ data }: { data: ComponentData }) {
  return (
    <div
      className="py-16"
      style={{ backgroundColor: data.backgroundColor || "#f9fafb" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {data.title}
          </h2>
        )}

        {data.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageGallery({ data }: { data: ComponentData }) {
  const columns = parseInt(data.columns) || 3;
  const gridCols =
    {
      2: "grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    }[columns] || "grid-cols-1 md:grid-cols-3";

  // Debug logging
  console.log("ImageGallery data:", data);
  console.log("Images array:", data.images);

  return (
    <div
      className="py-16"
      style={{ backgroundColor: data.backgroundColor || "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-xl text-gray-600">{data.subtitle}</p>
          )}
          {data.description && (
            <p className="text-lg text-gray-500 mt-4">{data.description}</p>
          )}
        </div>

        {data.images && data.images.length > 0 ? (
          <div className={`grid ${gridCols} gap-4`}>
            {data.images.map((image: any, index: number) => {
              // Handle different possible image URL structures
              const imgSrc = image?.src || image?.url || image;
              const isValidImageSrc =
                typeof imgSrc === "string" && imgSrc.trim() !== "";

              console.log(`Image ${index}:`, {
                image,
                imgSrc,
                isValidImageSrc,
              });

              if (!isValidImageSrc) return null;

              return (
                <div
                  key={index}
                  className="relative aspect-square group bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={imgSrc}
                    alt={image?.alt || `Gallery image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform cursor-pointer"
                    unoptimized
                  />
                  {/* Optional overlay with title */}
                  {image?.title && (
                    <div className="absolute inset-0  group-hover:bg-opacity-50 transition-opacity flex items-end">
                      <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="font-semibold">{image.title}</h3>
                        {image.description && (
                          <p className="text-sm">{image.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🖼️</div>
            <p className="text-gray-500">No images added to gallery yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TeamProfiles({ data }: { data: ComponentData }) {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-xl text-gray-600">{data.subtitle}</p>
          )}
        </div>

        {data.members && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.members.map((member: any, index: number) => (
              <div key={index} className="text-center">
                {typeof member.image === "string" &&
                  member.image.trim() !== "" && (
                    <div className="relative h-48 w-48 mx-auto mb-4">
                      <Image
                        src={member.image}
                        alt={member.name || "Team member"}
                        fill
                        sizes="192px"
                        className="object-cover rounded-full"
                      />
                    </div>
                  )}

                {member.name && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                )}

                {member.position && (
                  <p className="text-teal-600 font-medium mb-3">
                    {member.position}
                  </p>
                )}

                {member.bio && (
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                )}

                <div className="flex justify-center space-x-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="text-teal-600 hover:text-teal-800"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Email
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContactSection({ data }: { data: ComponentData }) {
  const getSocialIcon = (iconType: string) => {
    const icons = {
      linkedin: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
        </svg>
      ),
      facebook: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669z" />
        </svg>
      ),
      twitter: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184" />
        </svg>
      ),
      instagram: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849z" />
        </svg>
      ),
      youtube: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505" />
        </svg>
      ),
    };
    return (
      icons[iconType as keyof typeof icons] || (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    );
  };

  return (
    <section
      className="py-12 lg:py-16"
      style={{ backgroundColor: data.backgroundColor || "#f8f9fa" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {data.title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{data.title}</h2>
          </div>
        )}

        {/* Contact Information - Horizontal Flex Layout */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 justify-center text-center">
            {/* Phone */}
            {data.contactInfo?.phone && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-900 font-medium">
                    {data.contactInfo.phone}
                  </p>
                  <p className="text-gray-600 text-sm">+62 345 789 000</p>
                </div>
              </div>
            )}

            {/* Email */}
            {data.contactInfo?.email && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <a
                    href={`mailto:${data.contactInfo.email}`}
                    className="text-gray-900 font-medium hover:text-teal-600 transition-colors"
                  >
                    inquiry@nataraxis.ai
                  </a>
                  <p className="text-gray-600 text-sm">help@nataraxis.ai</p>
                </div>
              </div>
            )}

            {/* Address */}
            {data.contactInfo?.address && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-900 font-medium">
                    221b Elementary Street
                  </p>
                  <p className="text-gray-600 text-sm">New York, NY</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        {data.showContactForm && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Or Leave Us a Message
              </h3>

              <form className="space-y-6">
                {/* 2x2 Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Row 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors placeholder-gray-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors placeholder-gray-500 text-gray-900"
                    />
                  </div>

                  {/* Row 3 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your organization..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors placeholder-gray-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors placeholder-gray-500 text-gray-900"
                    />
                  </div>
                </div>

                {/* Message Field - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Enter your message here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none placeholder-gray-500 text-gray-900"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 min-w-[200px]"
                  >
                    Submit Form →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Social Links */}
        {data.socialLinks && data.socialLinks.length > 0 && (
          <div className="mt-12 text-center">
            <div className="flex justify-center gap-4">
              {data.socialLinks.map(
                (social: any, index: number) =>
                  social.url && (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 hover:bg-teal-100 rounded-full flex items-center justify-center text-gray-600 hover:text-teal-600 transition-colors duration-200"
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FAQSection({ data }: { data: ComponentData }) {
  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23047857' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {data.title && (
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white mb-4 shadow-lg">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-teal-800 to-emerald-800 bg-clip-text text-transparent mb-4">
                {data.title}
              </h2>
            </div>
          )}
          {data.subtitle && (
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        {data.faqs && (
          <div className="space-y-6">
            {data.faqs.map((faq: any, index: number) => (
              <details
                key={index}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-teal-200"
              >
                <summary className="cursor-pointer p-8 font-semibold text-lg text-slate-800 hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 transition-all duration-300 flex items-center justify-between list-none">
                  <span className="flex-1 pr-4">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 flex items-center justify-center text-white transition-transform duration-300 group-open:rotate-180">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </summary>

                <div className="px-8 pb-8 bg-gradient-to-r from-slate-50 to-teal-50 border-t border-slate-100 relative">
                  {/* Arrow highlight */}
                  <div className="absolute -top-3 left-12">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-600 to-emerald-600 transform rotate-45 rounded-sm shadow-lg"></div>
                  </div>

                  <div className="pt-6">
                    <div className="prose prose-slate prose-lg max-w-none">
                      <p className="text-slate-700 leading-relaxed mb-0 text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 flex items-center justify-center text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-slate-800 mb-1">
                Still have questions?
              </h3>
              <p className="text-slate-600">
                Get in touch with our expert team for personalized assistance.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Contact Us
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
