import Link from 'next/link';
import { phones } from '@/data/phones';
import ProductCard from '@/components/ui/ProductCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function PopularPhonesSection() {
  // Get 4 popular phones (those with highest review count)
  const popularPhones = phones
    .sort((a, b) => b.review_count - a.review_count)
    .slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Phones
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the latest smartphones with exclusive CitiSignal deals. 
            Get the phone you want with flexible payment options.
          </p>
        </div>

        {/* Phones Grid */}
        <div className="product-grid">
          {popularPhones.map((phone) => (
            <ProductCard
              key={phone.sku}
              id={phone.id}
              name={phone.name}
              brand={phone.manufacturer}
              price={phone.price}
              originalPrice={phone.original_price}
              image={phone.media_gallery?.[0]?.url || ''}
              category={phone.category}
              features={phone.memory}
              colors={phone.available_colors}
              inStock={phone.stock_status === 'IN_STOCK'}
              isNew={phone.isNew}
              isSale={phone.original_price ? phone.original_price > phone.price : false}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/phones"
            className={clsx(
              'btn btn-secondary',
              'inline-flex items-center px-8 py-3'
            )}
          >
            View All Phones
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
} 