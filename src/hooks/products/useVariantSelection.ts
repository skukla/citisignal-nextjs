import { useState, useCallback } from 'react';
import type { ProductDetail } from '@/types/commerce';

type ProductVariant = {
  id: string;
  sku: string;
  attributes: Record<string, string>;
  price: string;
  originalPrice?: string;
  inStock: boolean;
  stockLevel?: number;
  image?: {
    url: string;
    altText?: string;
  };
};

interface UseVariantSelectionProps {
  product: ProductDetail | null;
  onVariantChange?: (variant: ProductVariant | null) => void;
}

interface UseVariantSelectionReturn {
  selectedOptions: Record<string, string>;
  allAttributesSelected: boolean;
  currentVariant: ProductVariant | null;
  handleSelectionChange: (options: Record<string, string>, allSelected: boolean) => void;
  resetSelections: () => void;
}

/**
 * Hook for managing variant selection state and logic
 * Simple local matching based on Adobe Commerce variant attributes
 */
export function useVariantSelection({
  product,
  onVariantChange,
}: UseVariantSelectionProps): UseVariantSelectionReturn {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [allAttributesSelected, setAllAttributesSelected] = useState(false);

  const findMatchingVariant = useCallback(
    (options: Record<string, string>, requireCompleteSelection = false) => {
      if (!product?.variants || Object.keys(options).length === 0) {
        return null;
      }

      // If we require complete selection, check that all configurable options are selected
      if (requireCompleteSelection && product.configurable_options) {
        const allRequiredSelected = product.configurable_options.every(
          (option) => options[option.attribute_code]
        );
        if (!allRequiredSelected) {
          return null;
        }
      }

      // Find exact match - all selected options must match variant attributes
      const exactMatch = product.variants.find((variant) => {
        return Object.entries(options).every(([attributeCode, selectedValue]) => {
          return variant.attributes[attributeCode] === selectedValue;
        });
      });

      return exactMatch || null;
    },
    [product?.variants, product?.configurable_options]
  );

  const handleSelectionChange = useCallback(
    (options: Record<string, string>, allSelected: boolean) => {
      console.log('🔄 Variant selection change:', { options, allSelected });
      setSelectedOptions(options);
      setAllAttributesSelected(allSelected);

      // Only find variant and switch image when we have a complete selection
      const matchingVariant = findMatchingVariant(options, true) || null;
      console.log('🎯 Matching variant:', matchingVariant);
      if (onVariantChange) {
        onVariantChange(matchingVariant);
      }
    },
    [findMatchingVariant, onVariantChange]
  );

  const resetSelections = useCallback(() => {
    setSelectedOptions({});
    setAllAttributesSelected(false);
    if (onVariantChange) {
      onVariantChange(null);
    }
  }, [onVariantChange]);

  // Current variant for display - only when complete selection
  const currentVariant = findMatchingVariant(selectedOptions, true) || null;

  return {
    selectedOptions,
    allAttributesSelected,
    currentVariant,
    handleSelectionChange,
    resetSelections,
  };
}
