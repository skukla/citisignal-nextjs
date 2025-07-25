'use client';

import { PhoneIcon, WifiIcon, CheckCircleIcon, CogIcon } from '@heroicons/react/24/outline';
import SectionHeader from '@/components/ui/SectionHeader';
import ProcessSteps from '@/components/ui/ProcessSteps';
import CallToAction from '@/components/ui/CallToAction';

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

  const features = [
    { text: 'Free activation and setup', icon: CheckCircleIcon },
    { text: 'Keep your current phone number', icon: CheckCircleIcon },
    { text: '30-day satisfaction guarantee', icon: CheckCircleIcon }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get Started in 4 Easy Steps"
          description="Switching to CitiSignal is simple. Follow these easy steps to get your new device activated and start enjoying our reliable network."
          centered
          titleSize="md"
          descriptionSize="lg"
        />

        <ProcessSteps steps={steps} />

        <CallToAction
          title="Ready to make the switch?"
          description="Join millions of satisfied customers who trust CitiSignal for their wireless needs. Start your journey today with our easy activation process."
          features={features}
          buttonText="Start Your Activation"
          supportText="Questions? Call us at"
          supportPhone="1-800-CITI-SIG"
        />
      </div>
    </section>
  );
} 