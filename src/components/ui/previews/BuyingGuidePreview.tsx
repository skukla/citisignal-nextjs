'use client';

import { twMerge } from 'tailwind-merge';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '../foundations/Button';
import IconContainer from '../foundations/IconContainer';
import type { HeroIcon } from '@/types/hero-icons';

interface BuyingGuidePreviewProps {
  icon: HeroIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
}

export default function BuyingGuidePreview({
  icon: Icon,
  title,
  description,
  href,
  className
}: BuyingGuidePreviewProps) {
  return (
    <div className={twMerge(
      'flex gap-6 items-start group',
      className
    )}>
      <IconContainer
        size="lg"
        bgColor="bg-purple-50"
        bgOpacity="bg-opacity-100"
        className="group-hover:bg-purple-100 transition-colors"
      >
        <Icon className="w-10 h-10 text-purple-600" />
      </IconContainer>

      <div className="flex-1">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        </div>
        <Button
          href={href}
          variant="link"
          size="sm"
          rightIcon={ArrowRightIcon}
        >
          Read More
        </Button>
      </div>
    </div>
  );
}