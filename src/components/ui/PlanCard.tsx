'use client';

import { twMerge } from 'tailwind-merge';
import ProductBadge from './ProductBadge';
import PlanCardHeader from './PlanCardHeader';
import PlanCardPricing from './PlanCardPricing';
import RatingStars from './RatingStars';
import CoreFeatures from './CoreFeatures';
import PlanDetails from './PlanDetails';
import CheckmarkFeatureList from './CheckmarkFeatureList';
import StreamingServices from './StreamingServices';
import PlanCardActions from './PlanCardActions';
import useWishlist from '@/hooks/useWishlist';

interface PlanCardProps {
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  data: string;
  talk: string;
  text: string;
  features: string[];
  hotspot: string;
  streaming: string[];
  isPopular: boolean;
  isNew: boolean;
  isSale: boolean;
  contractRequired: boolean;
  networkPriority: string;
  onWishlistChange?: (planId: string, isWishlisted: boolean) => void;
  onSelect?: () => void;
  onLearnMore?: () => void;
  className?: string;
}

export default function PlanCard({
  name,
  type,
  price,
  originalPrice,
  rating,
  reviews,
  data,
  talk,
  text,
  features,
  hotspot,
  streaming,
  isPopular,
  isNew,
  isSale,
  contractRequired,
  networkPriority,
  onWishlistChange,
  onSelect,
  onLearnMore,
  className
}: PlanCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist({
    productId: name,
    onWishlistChange: onWishlistChange && ((id, isWishlisted) => onWishlistChange(id.toString(), isWishlisted))
  });

  const coreFeatures = [
    { value: data, label: 'Data' },
    { value: talk, label: 'Talk' },
    { value: text, label: 'Text' }
  ];

  const planDetails = [
    { label: 'Mobile Hotspot', value: hotspot },
    { label: 'Network Priority', value: networkPriority },
    { label: 'Contract Required', value: contractRequired ? 'Yes' : 'No' }
  ];

  return (
    <div className={twMerge(
      'bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 relative h-full flex flex-col',
      isPopular ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20' : 'border-gray-200',
      className
    )}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <ProductBadge variant="popular" />
        </div>
      )}

      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <PlanCardHeader
          name={name}
          type={type}
          isNew={isNew}
          isSale={isSale}
          originalPrice={originalPrice}
          price={price}
          isWishlisted={isWishlisted}
          onWishlistToggle={toggleWishlist}
          className="mb-6"
        />

        <PlanCardPricing
          price={price}
          className="mb-6"
        />

        <RatingStars
          rating={rating}
          reviews={reviews}
        />
      </div>

      {/* Plan Details Section */}
      <div className="p-6 flex-grow flex flex-col">
        <CoreFeatures
          features={coreFeatures}
          className="mb-4"
        />

        <PlanDetails
          details={planDetails}
          className="mb-4"
        />

        <CheckmarkFeatureList
          features={features.map(feature => ({
            title: feature,
            description: ''
          }))}
          size="sm"
          titleColor="text-gray-600"
          className="mb-4"
        />

        <div className="mt-auto">
          <StreamingServices
            services={streaming}
            className="mb-8"
          />

          <PlanCardActions
            onPrimaryClick={onSelect}
            onSecondaryClick={onLearnMore}
          />
        </div>
      </div>
    </div>
  );
} 