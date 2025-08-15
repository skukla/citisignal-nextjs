'use client';

import BuyingGuideGrid from '@/components/ui/grids/BuyingGuideGrid';
import { phonesPageData } from '@/data/route-groups/products/phones';

export default function PhonesBuyingGuides() {
  const { buyingGuides } = phonesPageData;
  
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Buying Guides</h2>
      <BuyingGuideGrid guides={buyingGuides} />
    </section>
  );
}