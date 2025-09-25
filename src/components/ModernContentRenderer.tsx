import { getComponentDefinition } from "@/lib/component-types";
import Image from "next/image";

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
      {data.backgroundImage && (
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
      className="min-h-screen flex items-center py-12"
      style={{ backgroundColor: data.backgroundColor || "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            imageOnRight ? "" : "lg:grid-flow-col-dense"
          }`}
        >
          {/* Content */}
          <div className={imageOnRight ? "" : "lg:col-start-2"}>
            {data.title && (
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {data.title}
              </h1>
            )}

            {data.description && (
              <p className="text-xl text-gray-600 mb-8">{data.description}</p>
            )}

            {data.ctaText && data.ctaLink && (
              <a
                href={data.ctaLink}
                className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {data.ctaText}
              </a>
            )}
          </div>

          {/* Image */}
          {data.image && (
            <div
              className={`relative h-96 lg:h-full ${
                imageOnRight ? "" : "lg:col-start-1"
              }`}
            >
              <Image
                src={data.image}
                alt={data.title || "Hero image"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureGrid({ data }: { data: any }) {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {data.subtitle && (
            <p className="text-indigo-600 font-semibold text-lg mb-2">
              {data.subtitle}
            </p>
          )}
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {data.title}
            </h2>
          )}
        </div>

        {data.features && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.features.map((feature: any, index: number) => (
              <div key={index} className="text-center">
                {feature.icon && (
                  <div className="text-4xl mb-4">{feature.icon}</div>
                )}
                {feature.title && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                )}
                {feature.description && (
                  <p className="text-gray-600">{feature.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Testimonials({ data }: { data: any }) {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {data.title}
          </h2>
        )}

        {data.testimonials && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {/* Star rating */}
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {testimonial.text && (
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                )}

                <div className="flex items-center">
                  {testimonial.image && (
                    <div className="relative h-12 w-12 mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    {testimonial.name && (
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                    )}
                    {testimonial.company && (
                      <div className="text-gray-500 text-sm">
                        {testimonial.company}
                      </div>
                    )}
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
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
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
            {data.images.map((image: any, index: number) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image.url || image}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
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
                {member.image && (
                  <div className="relative h-48 w-48 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
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
                  <p className="text-indigo-600 font-medium mb-3">
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
                      className="text-blue-600 hover:text-blue-800"
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
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p className="text-xl text-gray-600">{data.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {data.phone && (
              <div className="flex items-center space-x-3">
                <div className="text-indigo-600 text-xl">📞</div>
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-gray-600">{data.phone}</div>
                </div>
              </div>
            )}

            {data.email && (
              <div className="flex items-center space-x-3">
                <div className="text-indigo-600 text-xl">📧</div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-600">{data.email}</div>
                </div>
              </div>
            )}

            {data.address && (
              <div className="flex items-center space-x-3">
                <div className="text-indigo-600 text-xl">📍</div>
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-gray-600 whitespace-pre-line">
                    {data.address}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          {data.showContactForm && (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
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
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {data.faqs && (
          <div className="space-y-4">
            {data.faqs.map((faq: any, index: number) => (
              <details key={index} className="bg-gray-50 rounded-lg">
                <summary className="cursor-pointer p-6 font-medium text-gray-900 hover:bg-gray-100">
                  {faq.question}
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
