import { useState } from 'react';
import { useProductDetail } from '../providers/ProductDetailContext';
import type { ProductDetailVariantsProps } from '../types';

/**
 * ProductDetailVariants component
 * Displays configurable options (colors, sizes, etc.) with required selection
 * Manages selection state and validates that all required attributes are chosen
 */
export function ProductDetailVariants({
  className,
  onSelectionChange,
}: ProductDetailVariantsProps) {
  const { product, loading } = useProductDetail();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleOptionSelect = (attributeCode: string, value: string) => {
    const newOptions = {
      ...selectedOptions,
      [attributeCode]: value,
    };
    setSelectedOptions(newOptions);

    // Check if all required options are selected
    const allSelected =
      product?.configurable_options?.every((option) => newOptions[option.attribute_code]) || false;

    // Call the parent callback
    if (onSelectionChange) {
      onSelectionChange(newOptions, allSelected);
    }
  };

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-6">
          <div>
            <div className="h-5 w-16 animate-pulse rounded bg-gray-200 mb-3" />
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 w-20 animate-pulse rounded-lg bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product?.configurable_options?.length) {
    return null;
  }

  return (
    <div className={className}>
      <div className="space-y-6">
        {product.configurable_options.map((option) => {
          const selectedValue = selectedOptions[option.attribute_code];

          return (
            <div key={option.attribute_code}>
              <h3 className="text-base font-semibold text-gray-900 mb-3">{option.label}</h3>

              <div className="flex flex-wrap gap-3">
                {option.values.map((value) => {
                  const isActiveOption = selectedValue === value.value;
                  const isColorOption =
                    option.attribute_code === 'cs_color' ||
                    option.label.toLowerCase().includes('color');
                  const swatchColor = value.swatch_data?.value || value.value;

                  if (isColorOption) {
                    // Render color swatch for color options
                    return (
                      <button
                        key={value.value}
                        onClick={() => handleOptionSelect(option.attribute_code, value.value)}
                        className={`w-12 h-12 rounded-full border-4 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                          isActiveOption
                            ? 'border-purple-500 ring-2 ring-purple-200 scale-110'
                            : 'border-gray-200 hover:border-purple-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: swatchColor }}
                        title={value.label}
                      />
                    );
                  }

                  // Render text button for non-color options (memory, etc.)
                  return (
                    <button
                      key={value.value}
                      onClick={() => handleOptionSelect(option.attribute_code, value.value)}
                      className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                        isActiveOption
                          ? 'border-purple-500 bg-purple-500 text-white'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      {value.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
