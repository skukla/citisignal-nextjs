'use client';

import Link from 'next/link';
import { ArrowRightIcon, HomeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/foundations/Button';
import ContentSection from '@/components/ui/layout/ContentSection';

export default function NotFound() {
  return (
    <ContentSection 
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #8821f4 0%, #6a1b9a 50%, #4a148c 100%)' 
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-4">
        {/* 404 Number with gradient effect */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white opacity-90">
            4
            <span className="inline-block animate-pulse text-yellow-300">0</span>
            4
          </h1>
        </div>

        {/* Error message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Oops! Signal Lost
        </h2>
        
        <p className="text-xl text-purple-100 mb-12 max-w-md mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or the signal just isn&apos;t reaching here.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={HomeIcon}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold px-8 py-4 w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </Link>
          <Link href="/phones">
            <Button 
              variant="outline" 
              size="lg"
              leftIcon={PhoneIcon}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 w-full sm:w-auto"
            >
              Browse Phones
            </Button>
          </Link>
        </div>

        {/* Helpful links section */}
        <div className="mt-16 pt-8 border-t border-purple-300/30">
          <p className="text-purple-200 mb-6">Here are some helpful links:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              href="/plans" 
              className="text-purple-100 hover:text-white flex items-center gap-1 transition-colors"
            >
              View Plans
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
            <Link 
              href="/account/dashboard" 
              className="text-purple-100 hover:text-white flex items-center gap-1 transition-colors"
            >
              My Account
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
            <Link 
              href="/accessories" 
              className="text-purple-100 hover:text-white flex items-center gap-1 transition-colors"
            >
              Shop Accessories
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </ContentSection>
  );
}