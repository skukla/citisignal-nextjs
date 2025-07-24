import { ShieldCheckIcon, SignalIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function WhyCitiSignalSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CitiSignal</h2>
          <p className="text-lg text-gray-600">Experience the difference with our industry-leading service</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <SignalIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Superior Coverage</h3>
            <p className="text-gray-600">Nationwide 5G network with 99% population coverage and growing</p>
          </div>

          <div className="card p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliable Security</h3>
            <p className="text-gray-600">Advanced network security and data protection for peace of mind</p>
          </div>

          <div className="card p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <CurrencyDollarIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
            <p className="text-gray-600">Flexible plans and transparent pricing to fit your budget</p>
          </div>

          <div className="card p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <UserGroupIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Expert customer service available around the clock</p>
          </div>
        </div>
      </div>
    </section>
  );
} 