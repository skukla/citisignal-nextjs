'use client';

import Spinner from '@/components/ui/foundations/Spinner';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import DelayedLoader from '@/components/ui/foundations/DelayedLoader';

export default function CheckoutLoading() {
  return (
    <DelayedLoader delay={500}>
    <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="text-center">
        {/* Cart icon with spinner */}
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center animate-pulse">
            <ShoppingCartIcon className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1">
            <Spinner size="sm" className="border-green-500 border-t-transparent" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Preparing Checkout
        </h2>
        
        <p className="text-sm text-gray-600 mb-6">
          Securing your transaction...
        </p>
        
        {/* Checkout steps skeleton */}
        <div className="flex justify-center gap-2">
          {['Shipping', 'Payment', 'Review'].map((step, i) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                i === 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {i + 1}
              </div>
              {i < 2 && <div className="w-12 h-0.5 bg-gray-200 ml-2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
    </DelayedLoader>
  );
}