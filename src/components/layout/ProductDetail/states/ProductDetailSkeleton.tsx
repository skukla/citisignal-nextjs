/**
 * ProductDetailSkeleton component
 * Loading state for the entire Product Detail Page
 * Uses shimmer animation to match the category page skeleton approach
 */
export function ProductDetailSkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        {/* Breadcrumbs skeleton - matches ProductDetailBreadcrumbs spacing */}
        <div className="pt-6 sm:pt-8 lg:pt-10">
          <div className="flex mb-6">
            <div className="flex items-center space-x-2">
              {/* Home icon */}
              <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
              {/* First chevron */}
              <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
              {/* Category */}
              <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
              {/* Second chevron */}
              <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
              {/* Product name */}
              <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Main content skeleton - matches ProductDetailLayout (2-column) */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 py-8">
          {/* Gallery skeleton - simplified single image */}
          <div className="lg:col-span-1">
            {/* Main image only */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
          </div>

          {/* Info skeleton - matches ProductDetailInfo spacing */}
          <div className="lg:col-span-1 space-y-8">
            {/* Header skeleton - matches improved ProductDetailHeader */}
            <div className="space-y-3">
              {/* Manufacturer */}
              <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
              {/* Product name and SKU grouped */}
              <div className="space-y-2">
                <div className="space-y-2">
                  <div className="h-10 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
                  <div className="h-10 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
                </div>
                {/* SKU placeholder - positioned closer to product name */}
                <div className="h-4 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
              </div>
              {/* Stock badges - with more separation */}
              <div className="flex gap-3 pt-4">
                <div className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full bg-[length:200%_100%] animate-shimmer" />
              </div>
            </div>

            {/* Price skeleton - matches ProductDetailPrice */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                {/* Large price */}
                <div className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
                {/* Original price */}
                <div className="h-8 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
              </div>
              {/* Discount badge */}
              <div className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full bg-[length:200%_100%] animate-shimmer" />
            </div>

            {/* Variants skeleton - matches ProductDetailVariants */}
            <div className="space-y-6">
              <div>
                <div className="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer mb-3" />
                <div className="flex flex-wrap gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg bg-[length:200%_100%] animate-shimmer"
                      style={{
                        animationDelay: `${i * 100}ms`,
                        animationFillMode: 'both',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions skeleton */}
            <div className="space-y-3">
              <div className="h-12 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
              <div className="h-10 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Tabs skeleton - matches ProductDetailTabs spacing */}
        <div className="mt-16 border-t-2 border-gray-300 pt-12">
          <div className="space-y-12">
            {/* Description skeleton */}
            <div>
              <div className="h-8 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer mb-6 border-b border-gray-200 pb-3" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer ${
                      i === 0 ? 'w-full' : i === 1 ? 'w-4/5' : 'w-5/6'
                    }`}
                    style={{
                      animationDelay: `${i * 150}ms`,
                      animationFillMode: 'both',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Specifications skeleton */}
            <div>
              <div className="h-8 w-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer mb-6 border-b border-gray-200 pb-3" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start border-b border-gray-100 pb-3"
                  >
                    <div
                      className="h-5 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer"
                      style={{
                        animationDelay: `${i * 100}ms`,
                        animationFillMode: 'both',
                      }}
                    />
                    <div
                      className="h-5 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer"
                      style={{
                        animationDelay: `${i * 100 + 50}ms`,
                        animationFillMode: 'both',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
