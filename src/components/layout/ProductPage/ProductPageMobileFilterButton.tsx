'use client';

import { FunnelIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/foundations/Button';
import { useProductPage } from './ProductPageContext';

export function ProductPageMobileFilterButton() {
  const { setShowMobileFilters } = useProductPage();
  
  return (
    <Button
      variant="secondary"
      onClick={() => setShowMobileFilters(true)}
      className="lg:hidden"
    >
      <FunnelIcon className="w-5 h-5 mr-2" />
      Filters
    </Button>
  );
}