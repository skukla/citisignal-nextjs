'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import DelayedLoader from '@/components/ui/foundations/DelayedLoader';

export default function AccountLoading() {
  return (
    <DelayedLoader delay={500}>
    <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="text-center">
        {/* Account icon with spinner overlay */}
        <div className="relative inline-block mb-6">
          <UserCircleIcon className="w-20 h-20 text-gray-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-purple-200 border-t-[#8821f4] animate-spin" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading Your Account
        </h2>
        
        <p className="text-sm text-gray-600">
          Retrieving your information...
        </p>
        
        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#8821f4] to-[#6a1b9a] rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
    </DelayedLoader>
  );
}