import { MapPinIcon, SignalIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';

export default function CoverageSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Network Coverage</h2>
          <p className="text-lg text-gray-600">Experience our nationwide 5G network coverage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coverage Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <SignalIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">5G Coverage</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Population Coverage</span>
                  <span className="text-purple-600 font-semibold">99%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Geographic Coverage</span>
                  <span className="text-purple-600 font-semibold">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Network Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <GlobeAmericasIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Network Stats</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <MapPinIcon className="w-5 h-5 mr-2 text-purple-600" />
                <span>450,000+ Cell Towers</span>
              </li>
              <li className="flex items-center text-gray-600">
                <MapPinIcon className="w-5 h-5 mr-2 text-purple-600" />
                <span>98% 4G LTE Coverage</span>
              </li>
              <li className="flex items-center text-gray-600">
                <MapPinIcon className="w-5 h-5 mr-2 text-purple-600" />
                <span>Expanding 5G Ultra Capacity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 