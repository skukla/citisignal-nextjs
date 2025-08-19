'use client';

interface ProductPageSkeletonProps {
  count?: number;
}

export default function ProductPageSkeleton({ count = 12 }: ProductPageSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
          style={{
            animationDelay: `${i * 50}ms`,
            animationFillMode: 'both'
          }}
        >
          {/* Image skeleton - matches aspect-square from ProductCardImage */}
          <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg mb-4 bg-[length:200%_100%] animate-shimmer"></div>
          
          {/* Content skeleton - matches ProductCardInfo layout */}
          <div className="space-y-3 px-2">
            {/* Title */}
            <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-5 rounded w-3/4 bg-[length:200%_100%] animate-shimmer"></div>
            
            {/* Description/subtitle */}
            <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-4 rounded w-full bg-[length:200%_100%] animate-shimmer"></div>
            
            {/* Price */}
            <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-6 rounded w-1/3 bg-[length:200%_100%] animate-shimmer"></div>
            
            {/* Button */}
            <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-10 rounded-md w-full mt-4 bg-[length:200%_100%] animate-shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
}