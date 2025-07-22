import { MapIcon, CalculatorIcon, SignalIcon, DevicePhoneMobileIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function InteractiveToolsSection() {
  const tools = [
    {
      icon: MapIcon,
      title: "Coverage Checker",
      description: "Check 5G coverage and network strength at your location",
      link: "/tools/coverage"
    },
    {
      icon: CalculatorIcon,
      title: "Plan Calculator",
      description: "Find the perfect plan based on your usage patterns",
      link: "/tools/calculator"
    },
    {
      icon: SignalIcon,
      title: "Speed Test",
      description: "Test your current connection speed and performance",
      link: "/tools/speed-test"
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Phone Finder",
      description: "Discover the perfect phone for your needs and budget",
      link: "/tools/phone-finder"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Interactive Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make informed decisions with our suite of interactive tools designed to help you get the most from your mobile service.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.link}>
              <div className="bg-white rounded-xl border-2 border-gray-100 p-6 hover:border-purple-200 transition-colors group cursor-pointer">
                <div className="w-16 h-16 rounded-lg bg-purple-50 flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                  <tool.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-600">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Tool */}
        <div className="mt-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Try Our Plan Optimizer
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Answer a few questions about your usage and let our AI recommend the perfect plan for you. Save up to 30% on your monthly bill!
              </p>
              <Link
                href="/tools/plan-optimizer"
                className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors"
                style={{ backgroundColor: '#8821f4' }}
              >
                Start Optimization
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Personalized Analysis</div>
                    <div className="text-sm text-gray-600">Based on your actual usage</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Smart Recommendations</div>
                    <div className="text-sm text-gray-600">AI-powered plan suggestions</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Potential Savings</div>
                    <div className="text-sm text-gray-600">See how much you could save</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 