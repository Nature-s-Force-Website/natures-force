interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function Loading({
  size = "md",
  text,
  className = "",
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {/* Modern spinner */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-teal-100`}
        >
          <div className="absolute inset-0 rounded-full border-4 border-teal-600 border-t-transparent animate-spin"></div>
        </div>

        {/* Pulsing dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading text with shimmer effect */}
      {text && (
        <div className="text-gray-600 font-medium animate-pulse">{text}</div>
      )}

      {/* Modern loading bars */}
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-8 bg-gradient-to-t from-teal-600 to-emerald-500 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-teal-50/30 animate-pulse">
      {/* Header skeleton */}
      <div className="h-20 bg-white border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="h-8 w-32 bg-teal-100 rounded"></div>
          <div className="flex space-x-4">
            <div className="h-8 w-16 bg-teal-100 rounded"></div>
            <div className="h-8 w-16 bg-teal-100 rounded"></div>
            <div className="h-8 w-16 bg-teal-100 rounded"></div>
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="h-4 w-24 bg-teal-100 rounded mx-auto"></div>
            <div className="h-12 w-3/4 bg-teal-100 rounded mx-auto"></div>
            <div className="h-6 w-1/2 bg-teal-100 rounded mx-auto"></div>
            <div className="flex justify-center space-x-4">
              <div className="h-12 w-32 bg-gradient-to-r from-teal-200 to-emerald-200 rounded-lg"></div>
              <div className="h-12 w-32 bg-teal-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border border-teal-50"
              >
                <div className="h-16 w-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl mb-4"></div>
                <div className="h-6 w-3/4 bg-teal-100 rounded mb-2"></div>
                <div className="h-4 w-full bg-teal-50 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-teal-50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComponentSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div
      className={`${height} bg-teal-50/50 rounded-xl animate-pulse shimmer border border-teal-100`}
    >
      <div className="p-8 space-y-4">
        <div className="h-4 bg-teal-100 rounded w-1/4"></div>
        <div className="h-8 bg-gradient-to-r from-teal-100 to-emerald-100 rounded w-3/4"></div>
        <div className="h-4 bg-teal-100 rounded w-1/2"></div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="h-20 bg-teal-100 rounded"></div>
          <div className="h-20 bg-emerald-100 rounded"></div>
          <div className="h-20 bg-teal-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}
