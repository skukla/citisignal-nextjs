'use client';

import { twMerge } from 'tailwind-merge';
import PreviewContent from './PreviewContent';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '../foundations/Button';
import IconContainer from '../foundations/IconContainer';
import type { BuyingGuidePreviewProps } from '@/types/preview.types';

export default function BuyingGuidePreview({
  icon: Icon,
  title,
  description,
  href,
  className
}: BuyingGuidePreviewProps) {
  return (
    <div className={twMerge(
      'flex gap-6 items-start group cursor-pointer',
      className
    )}>
      <IconContainer
        size="lg"
        bgColor="bg-purple-50"
        bgOpacity="bg-opacity-100"
      >
        <Icon className="w-10 h-10 text-purple-600" />
      </IconContainer>

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