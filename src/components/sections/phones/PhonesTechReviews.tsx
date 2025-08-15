'use client';

import TechReviewGrid from '@/components/ui/grids/TechReviewGrid';
import { phonesPageData } from '@/data/route-groups/products/phones';

export default function PhonesTechReviews() {
  const { techReviews } = phonesPageData;
  
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Reviews</h2>
      <TechReviewGrid reviews={techReviews} />
    </section>
  );
}