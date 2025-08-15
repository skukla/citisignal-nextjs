'use client';

import TipGrid from '@/components/ui/grids/TipGrid';
import Link from '@/components/ui/foundations/Link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { phonesPageData } from '@/data/route-groups/products/phones';

export default function PhonesTips() {
  const { tips } = phonesPageData;
  
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tips & Tricks</h2>
        <Link 
          href="/tips" 
          variant="text"
          className="text-sm font-medium text-purple-600 hover:text-purple-700 inline-flex items-center gap-1"
        >
          View All Tips
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
      <TipGrid tips={tips} />
    </section>
  );
}