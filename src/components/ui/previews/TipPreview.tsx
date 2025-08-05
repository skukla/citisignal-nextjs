'use client';

import { twMerge } from 'tailwind-merge';
import PreviewContent from './PreviewContent';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '../foundations/Button';

interface TipPreviewProps {
  category: string;
  title: string;
  description: string;
  href: string;
  categoryColor?: string;
  className?: string;
}

export default function TipPreview({
  category,
  title,
  description,
  href,
  categoryColor = 'purple',
  className
}: TipPreviewProps) {
  return (
    <div className={twMerge(
      'group cursor-pointer',
      className
    )}>
      <div className={twMerge(
        'text-sm font-medium mb-2',
        `text-${categoryColor}-600`
      )}>
        {category}
      </div>
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
  );
}