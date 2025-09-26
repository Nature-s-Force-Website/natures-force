import { getComponentDefinition } from "@/lib/component-types";
import Image from "next/image";
import Link from "next/link";
import WhatWeOfferCard from "./site/WhatWeOfferCard";

interface ContentBlock {
  id: string;
  type: string;
  data: Record<string, any>;
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

      case "what_we_offer_card":
        return (
          <div key={block.id} className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <WhatWeOfferCard
                title={block.data.title}
                subtitle={block.data.subtitle}
                items={block.data.items || []}
                cardStyle={block.data.cardStyle}
                layout={block.data.layout}
                image={block.data.image}
                showCTA={block.data.showCTA}
                ctaText={block.data.ctaText}
                ctaLink={block.data.ctaLink}
                className={block.data.className}
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

function HeroBanner({ data }: { data: any }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {data.backgroundImage && data.backgroundImage.trim() !== "" && (
        <div className="absolute inset-0">
          <Image
            src={data.backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-teal-800/60 to-green-900/80"
            style={{ opacity: data.overlayOpacity || 0.85 }}
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

function HeroSplit({ data }: { data: any }) {
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
          {data.image && data.image.trim() !== "" && (
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

function FeatureGrid({ data }: { data: any }) {
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
                    {feature.image && feature.image.trim() !== "" ? (
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

function Testimonials({ data }: { data: any }) {
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
                    {testimonial.image && testimonial.image.trim() !== "" ? (
                      <div className="relative h-12 w-12 mr-4 group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name || "Client photo"}
                          fill
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

function CTASection({ data }: { data: any }) {
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

function StatsSection({ data }: { data: any }) {
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

function ImageGallery({ data }: { data: any }) {
  const columns = parseInt(data.columns) || 3;
  const gridCols =
    {
      2: "grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    }[columns] || "grid-cols-1 md:grid-cols-3";

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

        {data.images && data.images.length > 0 && (
          <div className={`grid ${gridCols} gap-4`}>
            {data.images.map((image: any, index: number) => {
              const imgSrc = image.url || image;
              return imgSrc && imgSrc.trim() !== "" ? (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={imgSrc}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TeamProfiles({ data }: { data: any }) {
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
                {member.image && member.image.trim() !== "" && (
                  <div className="relative h-48 w-48 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name || "Team member"}
                      fill
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

function ContactSection({ data }: { data: any }) {
  const getSocialIcon = (iconType: string) => {
    const icons = {
      linkedin: "💼",
      facebook: "👥",
      twitter: "🐦",
      instagram: "📸",
      youtube: "📺",
    };
    return icons[iconType as keyof typeof icons] || "🔗";
  };

  const layoutClass =
    data.layout === "stacked"
      ? "space-y-12"
      : data.layout === "form-only"
      ? "flex justify-center"
      : "grid grid-cols-1 lg:grid-cols-2 gap-12";

  return (
    <div
      className="py-16"
      style={{ backgroundColor: data.backgroundColor || "#f9fafb" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-xl text-teal-600 mb-4 font-semibold">
              {data.subtitle}
            </p>
          )}
          {data.description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        <div className={layoutClass}>
          {/* Contact Info Section */}
          {data.layout !== "form-only" && (
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>

              {/* Contact Details */}
              <div className="space-y-4">
                {data.contactInfo?.phone && (
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="text-teal-600 text-xl mt-1">📞</div>
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <a
                        href={`tel:${data.contactInfo.phone}`}
                        className="text-gray-600 hover:text-teal-600 transition-colors"
                      >
                        {data.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {data.contactInfo?.email && (
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="text-teal-600 text-xl mt-1">📧</div>
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <a
                        href={`mailto:${data.contactInfo.email}`}
                        className="text-gray-600 hover:text-teal-600 transition-colors"
                      >
                        {data.contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {data.contactInfo?.address && (
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="text-teal-600 text-xl mt-1">📍</div>
                    <div>
                      <div className="font-semibold text-gray-900">Address</div>
                      <div className="text-gray-600 whitespace-pre-line">
                        {data.contactInfo.address}
                      </div>
                    </div>
                  </div>
                )}

                {data.contactInfo?.hours && (
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="text-teal-600 text-xl mt-1">🕒</div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Business Hours
                      </div>
                      <div className="text-gray-600">
                        {data.contactInfo.hours}
                      </div>
                    </div>
                  </div>
                )}

                {data.contactInfo?.website && (
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="text-teal-600 text-xl mt-1">🌐</div>
                    <div>
                      <div className="font-semibold text-gray-900">Website</div>
                      <a
                        href={
                          data.contactInfo.website.startsWith("http")
                            ? data.contactInfo.website
                            : `https://${data.contactInfo.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-teal-600 transition-colors"
                      >
                        {data.contactInfo.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {data.socialLinks && data.socialLinks.length > 0 && (
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Follow Us
                  </h4>
                  <div className="flex space-x-4">
                    {data.socialLinks.map(
                      (social: any, index: number) =>
                        social.url && (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors text-teal-700 hover:text-teal-800"
                          >
                            <span className="text-lg">
                              {getSocialIcon(social.icon)}
                            </span>
                            <span className="font-medium">
                              {social.platform}
                            </span>
                          </a>
                        )
                    )}
                  </div>
                </div>
              )}

              {/* Map Integration */}
              {data.showMap && data.mapAddress && (
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Location</h4>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🗺️</div>
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm">{data.mapAddress}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contact Form */}
          {data.showContactForm && (
            <div
              className={`bg-white rounded-xl shadow-lg p-8 ${
                data.layout === "form-only" ? "max-w-2xl" : ""
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>

              <form className="space-y-6">
                {data.formFields?.map((field: any, index: number) => (
                  <div key={index}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        rows={4}
                        required={field.required}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        required={field.required}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FAQSection({ data }: { data: any }) {
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
