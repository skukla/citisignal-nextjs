/**
 * ProductDetailSkeleton component
 * Loading state for the entire Product Detail Page
 * Follows the same structure as the actual page
 */
export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs skeleton */}
        <div className="py-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 py-8">
          {/* Gallery skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main image */}
            <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />

            {/* Thumbnail gallery */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Info skeleton */}
          <div className="lg:col-span-1 space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="flex gap-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Variants */}
            <div className="space-y-3">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="space-y-4">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Related products skeleton */}
        <div className="mt-8">
          <div className="h-6 w-40 animate-pulse rounded bg-gray-200 mb-6" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square animate-pulse rounded bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
