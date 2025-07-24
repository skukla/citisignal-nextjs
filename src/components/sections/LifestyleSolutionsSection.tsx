import { BriefcaseIcon, HomeIcon, RocketLaunchIcon, HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LifestyleSolutionsSection() {
  const solutions = [
    {
      icon: BriefcaseIcon,
      title: "Business Pro",
      description: "Stay connected with reliable service for remote work and business travel.",
      features: ["Unlimited 5G", "Mobile Hotspot", "International Roaming"],
      link: "/solutions/business"
    },
    {
      icon: HomeIcon,
      title: "Family Connect",
      description: "Keep the whole family connected with shared data and parental controls.",
      features: ["Family Location", "Content Filters", "Usage Alerts"],
      link: "/solutions/family"
    },
    {
      icon: RocketLaunchIcon,
      title: "Student Essential",
      description: "Perfect for students with streaming, studying, and staying in touch.",
      features: ["Student Discount", "Unlimited Data", "Free Streaming"],
      link: "/solutions/student"
    },
    {
      icon: HeartIcon,
      title: "Senior Friendly",
      description: "Simple plans with large text and easy-to-use features for seniors.",
      features: ["24/7 Support", "Simple Interface", "Health Features"],
      link: "/solutions/senior"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Solutions for Every Lifestyle
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover tailored mobile solutions designed to fit your unique lifestyle and needs.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <Link key={index} href={solution.link}>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer h-full">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-6">
                  <solution.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center px-8 py-4 text-white font-medium rounded-lg transition-colors"
            style={{ backgroundColor: '#8821f4' }}
          >
            Find Your Perfect Solution
          </Link>
        </div>
      </div>
    </section>
  );
} 