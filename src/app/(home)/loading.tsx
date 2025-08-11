'use client';

import Spinner from '@/components/ui/foundations/Spinner';
import DelayedLoader from '@/components/ui/foundations/DelayedLoader';

export default function HomeLoading() {
  return (
    <DelayedLoader delay={500}>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="text-center">
        {/* Animated logo placeholder */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Pulsing background circle */}
            <div className="absolute inset-0 rounded-full bg-purple-200 animate-ping opacity-20" />
            <div className="relative w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8821f4] to-[#6a1b9a] flex items-center justify-center">
              <Spinner size="lg" className="border-white border-t-transparent" />
            </div>
          </div>
        </div>
        
        {/* Loading text with gradient */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#8821f4] to-[#6a1b9a] bg-clip-text text-transparent mb-2">
          Connecting Your Signal
        </h2>
        
        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
    </DelayedLoader>
  );
}