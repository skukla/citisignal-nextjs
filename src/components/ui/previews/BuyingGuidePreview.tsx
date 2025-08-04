'use client';

import { twMerge } from 'tailwind-merge';
import PreviewContent from './PreviewContent';
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
      <div className="relative">
        <IconContainer
          size="lg"
          bgColor="bg-purple-50"
          bgOpacity="bg-opacity-100"
          className="group-hover:bg-purple-100 transition-colors"
        >
          <Icon className="w-10 h-10 text-purple-600 group-hover:scale-110 transition-transform" />
        </IconContainer>
        <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-5 rounded-lg transition-colors" />
      </div>

      <div className="flex-1">
        <PreviewContent
          title={title}
          description={description}
          titleSize="md"
          className="mb-3"
        >
          <Button
            href={href}
            variant="link"
            size="sm"
            rightIcon={ArrowRightIcon}
          >
            Read More
          </Button>
        </PreviewContent>
      </div>
    </div>
  );
}