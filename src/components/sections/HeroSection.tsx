import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <section className="text-white bg-gradient-to-br from-primary-500 via-primary-700 to-primary-900">
      <div className="section-container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-primary-800/80 rounded-full text-sm font-medium mb-6">
              <span className="bg-yellow-400 w-2 h-2 rounded-full mr-2"></span>
              Our lowest-priced plans ever
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-yellow-300">Starting at only</span>
              <br />
              <span className="text-5xl md:text-6xl lg:text-7xl">$10/month</span>
            </h1>

            <p className="text-xl text-primary-100 mb-8 max-w-md">
              Unlimited talk and text, plus 2.5GB of high-speed data. 
              And we&apos;ll increase your data by 500MB each year through 2025.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/plans"
                className="btn-primary bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4"
              >
                Shop Plans
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/phones"
                className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4"
              >
                Shop Phones
              </Link>
            </div>

            {/* Features */}
            <div className="text-sm text-primary-100 mb-4">
              Plus taxes & fees. Domestic use only.
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-white font-medium">Max coverage, Super speed.</span>
              </div>
              <div className="text-primary-100 text-sm ml-5">
                Our prepaid plans use the same great CitiSignal 5G network that covers more than 200 million Americans nationwide.
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              <div className="card p-8">
                <div className="space-y-6">
                  {/* Phone mockup */}
                  <div className="bg-gray-900 rounded-2xl p-4 mx-auto w-48">
                    <div className="rounded-xl h-80 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700">
                      <div className="text-center text-white">
                        <div className="text-3xl font-bold mb-2">5G</div>
                        <div className="text-sm opacity-75">CitiSignal CONNECT</div>
                        <div className="grid grid-cols-4 gap-1 mt-4">
                          {[...Array(16)].map((_, i) => (
                            <div key={i} className="bg-white bg-opacity-20 h-3 rounded"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plan info */}
                  <div className="text-center text-gray-800">
                    <div className="text-2xl font-bold text-primary-600">$10/month</div>
                    <div className="text-sm text-gray-600">Unlimited Talk & Text</div>
                    <div className="text-xs text-gray-500 mt-1">+ 2.5GB High-Speed Data</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-900 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 