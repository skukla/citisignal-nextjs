import { PhoneIcon, WifiIcon, CheckCircleIcon, CogIcon } from '@heroicons/react/24/outline';

export default function ActivationSection() {
  const steps = [
    {
      icon: PhoneIcon,
      title: 'Choose Your Device',
      description: 'Select from our wide range of smartphones, tablets, and watches.',
      details: ['Latest iPhone and Android models', 'Certified refurbished options', 'Trade-in credit available']
    },
    {
      icon: WifiIcon,
      title: 'Select Your Plan',
      description: 'Pick the perfect plan for your lifestyle and budget.',
      details: ['Unlimited data options', 'Family plan discounts', 'No hidden fees or contracts']
    },
    {
      icon: CogIcon,
      title: 'Easy Setup',
      description: 'Get your device activated and ready to use in minutes.',
      details: ['Online activation', 'In-store assistance', 'Phone number transfer']
    },
    {
      icon: CheckCircleIcon,
      title: 'Start Using',
      description: 'Enjoy your new device with CitiSignal&apos;s reliable network.',
      details: ['24/7 customer support', 'Network optimization', 'Mobile app included']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Started in 4 Easy Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Switching to CitiSignal is simple. Follow these easy steps to get your new device 
            activated and start enjoying our reliable network.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line - Hidden on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-200 transform translate-x-4 -translate-y-1/2"></div>
              )}
              
              {/* Step Card */}
              <div className="text-center">
                {/* Icon Circle */}
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#8821f4' }}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Step Number */}
                <div className="text-sm font-bold text-purple-600 mb-2">STEP {index + 1}</div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-4">{step.description}</p>
                
                {/* Details */}
                <ul className="text-sm text-gray-500 space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center justify-center">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to make the switch?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Join millions of satisfied customers who trust CitiSignal for their wireless needs. 
                Start your journey today with our easy activation process.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  Free activation and setup
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  Keep your current phone number
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  30-day satisfaction guarantee
                </li>
              </ul>
            </div>
            
            <div className="text-center lg:text-left">
              <div className="space-y-4">
                <button className="w-full lg:w-auto px-8 py-4 text-white font-bold rounded-lg hover:opacity-90 transition-colors text-lg" style={{ backgroundColor: '#8821f4' }}>
                  Start Your Activation
                </button>
                <div className="text-center lg:text-left">
                  <p className="text-sm text-gray-500">
                    Questions? Call us at <span className="font-medium text-gray-900">1-800-CITI-SIG</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 