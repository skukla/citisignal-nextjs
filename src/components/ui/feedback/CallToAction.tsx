'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Section from '@/components/ui/layout/Section';
import Link from '@/components/ui/foundations/Link';
import IconFeatureList from '@/components/ui/content/IconFeatureList';
import type { CallToActionProps } from '@/types/section';

/**
 * CallToAction section component for conversion points and feature promotions.
 * 
 * @example
 * ```tsx
 * <CallToAction
 *   title="Ready to get started?"
 *   description="Join thousands of satisfied customers."
 *   features={[
 *     { text: "No credit card required", icon: CreditCardIcon },
 *     { text: "14-day free trial", icon: CalendarIcon },
 *     { text: "Cancel anytime", icon: XCircleIcon }
 *   ]}
 *   buttonText="Start Free Trial"
 *   buttonHref="/signup"
 *   supportText="Need help? Call us at"
 *   supportPhone="1-800-123-4567"
 *   gradient="from-purple-50 to-purple-100"
 * />
 * ```
 */
function CallToAction({
  title,
  description,
  features,
  buttonText,
  buttonHref,
  supportText,
  supportPhone,
  gradient = 'from-purple-50 to-purple-100',
  className
}: CallToActionProps) {
  return (
    <Section
      className={twMerge(
        'bg-gradient-to-r rounded-2xl py-12 px-8 md:px-12',
        gradient,
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-lg text-gray-600">
              {description}
            </p>
          </div>
          {features && (
            <IconFeatureList 
              features={features}
              className="space-y-4"
            />
          )}
        </div>
        
        <div className="flex flex-col items-center lg:items-start space-y-6">
          <Link
            href={buttonHref}
            variant="button"
            buttonStyle="primary"
            className="w-full lg:w-auto px-8 py-4 text-lg font-medium text-white rounded-lg shadow-lg hover:opacity-90 hover:shadow-xl cursor-pointer transition-all duration-200"
          >
            {buttonText}
          </Link>
          
          {(supportText || supportPhone) && (
            <p className="text-sm text-gray-600">
              {supportText}
              {supportPhone && (
                <span className="font-medium text-gray-900 ml-1">
                  {supportPhone}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

export default memo(CallToAction);