'use client';

import Spinner from '@/components/ui/foundations/Spinner';
import DelayedLoader from '@/components/ui/foundations/DelayedLoader';

export default function ProductsLoading() {
  return (
    <DelayedLoader delay={500}>
    <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="text-center">
        {/* Product grid skeleton preview */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-purple-200 animate-ping opacity-20" />
            <div className="relative w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8821f4] to-[#6a1b9a] flex items-center justify-center">
              <Spinner size="md" className="border-white border-t-transparent" />
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading Products
        </h2>
        
        <p className="text-sm text-gray-600 mb-4">
          Fetching the latest devices and deals...
        </p>
        
        {/* Product skeleton cards */}
        <div className="flex justify-center gap-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-20 h-24 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
    </DelayedLoader>
  );
}