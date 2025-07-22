import Link from 'next/link';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function PopularPhonesSection() {
  const phones = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      price: 999,
      originalPrice: 1099,
      rating: 4.8,
      reviews: 1250,
      image: '/api/placeholder/300/400',
      features: ['5G Ready', 'Pro Camera', 'All Day Battery'],
      colors: ['Titanium', 'Blue', 'White', 'Black'],
      storage: '128GB'
    },
    {
      id: 2,
      name: 'Galaxy S24 Ultra',
      brand: 'Samsung',
      price: 899,
      originalPrice: 1199,
      rating: 4.7,
      reviews: 980,
      image: '/api/placeholder/300/400',
      features: ['S Pen Included', '200MP Camera', '5000mAh Battery'],
      colors: ['Phantom Black', 'Cream', 'Violet', 'Green'],
      storage: '256GB'
    },
    {
      id: 3,
      name: 'Pixel 8 Pro',
      brand: 'Google',
      price: 699,
      originalPrice: 899,
      rating: 4.6,
      reviews: 750,
      image: '/api/placeholder/300/400',
      features: ['AI Photography', 'Pure Android', 'Magic Eraser'],
      colors: ['Obsidian', 'Porcelain', 'Bay'],
      storage: '128GB'
    },
    {
      id: 4,
      name: 'iPhone 15',
      brand: 'Apple',
      price: 699,
      originalPrice: 799,
      rating: 4.7,
      reviews: 2100,
      image: '/api/placeholder/300/400',
      features: ['USB-C', 'Dynamic Island', 'A16 Bionic'],
      colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
      storage: '128GB'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phones.map((phone) => (
            <div key={phone.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Phone Image */}
              <div className="relative p-6">
                <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <DevicePhoneMobileIcon className="w-24 h-24 text-gray-400" />
                </div>
                
                {/* Discount Badge */}
                {phone.originalPrice > phone.price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Save ${phone.originalPrice - phone.price}
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <HeartIcon className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Phone Info */}
              <div className="px-6 pb-6">
                <div className="text-sm text-gray-500 mb-1">{phone.brand}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{phone.name}</h3>
                <div className="text-sm text-gray-600 mb-3">{phone.storage}</div>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(phone.rating) 
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {phone.rating} ({phone.reviews})
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-1 mb-4">
                  {phone.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Colors */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Available Colors:</div>
                  <div className="flex space-x-2">
                    {phone.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gradient-to-br from-gray-200 to-gray-400"
                        title={color}
                      ></div>
                    ))}
                    {phone.colors.length > 4 && (
                      <div className="text-xs text-gray-500 flex items-center">
                        +{phone.colors.length - 4}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${phone.price}
                    </span>
                    {phone.originalPrice > phone.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ${phone.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    or ${Math.round(phone.price / 24)}/mo for 24 months
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    href={`/phones/${phone.id}`}
                    className="block w-full text-white text-center py-3 rounded-lg hover:opacity-90 transition-colors font-medium"
                    style={{ backgroundColor: '#8821f4' }}
                  >
                    Buy Now
                  </Link>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
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
      </div>
    </section>
  );
} 