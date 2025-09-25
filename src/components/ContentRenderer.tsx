interface ContentBlock {
  type: "hero" | "text" | "image";
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    text?: string;
    image?: string;
    alt?: string;
    button_text?: string;
    button_link?: string;
  };
}

interface ContentRendererProps {
  content: ContentBlock[];
}

function HeroBlock({ content }: { content: ContentBlock["content"] }) {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="mt-4 text-xl text-gray-600">{content.subtitle}</p>
          )}
          {content.description && (
            <p className="mt-6 text-lg text-gray-500 max-w-3xl mx-auto">
              {content.description}
            </p>
          )}
          {content.button_text && content.button_link && (
            <div className="mt-8">
              <a
                href={content.button_link}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                {content.button_text}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TextBlock({ content }: { content: ContentBlock["content"] }) {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {content.title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {content.title}
          </h2>
        )}
        {content.text && (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content.text }}
          />
        )}
      </div>
    </div>
  );
}

function ImageBlock({ content }: { content: ContentBlock["content"] }) {
  if (!content.image) return null;

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <img
          src={content.image}
          alt={content.alt || ""}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div>
      {content.map((block, index) => {
        switch (block.type) {
          case "hero":
            return <HeroBlock key={index} content={block.content} />;
          case "text":
            return <TextBlock key={index} content={block.content} />;
          case "image":
            return <ImageBlock key={index} content={block.content} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
