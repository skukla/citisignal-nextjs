'use client';

interface ProductPageSkeletonProps {
  count?: number;
}

export default function ProductPageSkeleton({ count = 12 }: ProductPageSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
          <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
          <div className="bg-gray-200 h-4 rounded w-1/2 mb-2"></div>
          <div className="bg-gray-200 h-6 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );
}