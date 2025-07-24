import { BriefcaseIcon, HomeIcon, RocketLaunchIcon, HeartIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';

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
      <div className="section-container">
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
              <div className={clsx(
                'card p-6 h-full',
                'hover:shadow-md transition-all',
                'group cursor-pointer'
              )}>
                <div className={clsx(
                  'w-12 h-12 rounded-lg bg-primary-50',
                  'flex items-center justify-center mb-6'
                )}>
                  <solution.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className={clsx(
                  'text-xl font-bold text-gray-900 mb-2',
                  'group-hover:text-primary-600 transition-colors'
                )}>
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
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
            className={clsx(
              'btn btn-primary',
              'inline-flex items-center px-8 py-4'
            )}
          >
            Find Your Perfect Solution
          </Link>
        </div>
      </div>
    </section>
  );
} 