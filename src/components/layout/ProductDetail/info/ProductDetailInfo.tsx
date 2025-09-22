import { ProductDetailHeader } from './ProductDetailHeader';
import { ProductDetailPrice } from './ProductDetailPrice';
import { ProductDetailVariants } from './ProductDetailVariants';
import { ProductDetailActions } from './ProductDetailActions';
import { useProductDetail } from '../providers/ProductDetailContext';
import { useVariantSelection } from '@/hooks/products/useVariantSelection';
import type { ProductDetailInfoProps } from '../types';

/**
 * ProductDetailInfo component
 * Container for product information section with state management for attribute selection
 * Coordinates between variants and actions to ensure proper validation
 */
export function ProductDetailInfo({ className, onVariantChange }: ProductDetailInfoProps) {
  const { product } = useProductDetail();
  const { selectedOptions, allAttributesSelected, currentVariant, handleSelectionChange } =
    useVariantSelection({ product, onVariantChange });

  const combinedClasses = `lg:col-span-1 space-y-8 ${className || ''}`.trim();

  return (
    <div className={combinedClasses}>
      <ProductDetailHeader
        selectedVariant={currentVariant}
        allAttributesSelected={allAttributesSelected}
      />
      <ProductDetailPrice selectedVariant={currentVariant} />
      <ProductDetailVariants onSelectionChange={handleSelectionChange} />
      <ProductDetailActions
        selectedOptions={selectedOptions}
        allAttributesSelected={allAttributesSelected}
      />
    </div>
  );
}
