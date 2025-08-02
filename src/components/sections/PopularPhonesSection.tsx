import Link from 'next/link';
import { phones } from '@/data/phones';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { 
  ProductCard, 
  ProductCardImage, 
  ProductCardBadges, 
  ProductCardInfo, 
  ProductCardPrice, 
  ProductCardActions 
} from '@/features/product/components/ProductCard';

export default function PopularPhonesSection() {
  // Get 4 popular phones (those with highest review count)
  const popularPhones = phones
    .sort((a, b) => b.review_count - a.review_count)
    .slice(0, 4);

  return (
    <Section background="bg-white">
      <SectionHeader
        title="Popular Phones"
        description="Discover the latest smartphones with exclusive CitiSignal deals. Get the phone you want with flexible payment options."
        centered
        className="mb-16"
      />

        {/* Phones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularPhones.map((phone) => (
            <ProductCard key={phone.sku} product={phone}>
              <ProductCardImage />
              <ProductCardBadges />
              <ProductCardInfo />
              <ProductCardPrice />
              <ProductCardActions />
            </ProductCard>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/phones"
            className="inline-flex items-center px-8 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            View All Phones
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
    </Section>
  );
} 