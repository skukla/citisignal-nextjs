'use client';

import { twMerge } from 'tailwind-merge';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import IconContainer from './IconContainer';
import CardContent from './CardContent';
import type { HeroIcon } from '@/types/hero-icons';

interface BuyingGuideCardProps {
  icon: HeroIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
}

export default function BuyingGuideCard({
  icon: Icon,
  title,
  description,
  href,
  className
}: BuyingGuideCardProps) {
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
        <CardContent
          title={title}
          description={description}
          titleSize="lg"
          titleColor="text-gray-900"
          descriptionColor="text-gray-600"
          className="mb-3"
        />
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