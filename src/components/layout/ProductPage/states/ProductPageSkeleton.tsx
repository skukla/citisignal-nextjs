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
          className="animate-pulse"
          style={{
            animationDelay: `${i * 50}ms`,
            animationFillMode: 'both'
          }}
        >
          <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-64 rounded-lg mb-4 bg-[length:200%_100%] animate-shimmer"></div>
          <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-4 rounded w-3/4 mb-2 bg-[length:200%_100%] animate-shimmer"></div>
          <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-4 rounded w-1/2 mb-2 bg-[length:200%_100%] animate-shimmer"></div>
          <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-6 rounded w-1/3 bg-[length:200%_100%] animate-shimmer"></div>
        </div>
      ))}
    </div>
  );
}