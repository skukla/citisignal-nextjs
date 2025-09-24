'use client';

import { useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { useProductCard } from './ProductCardContext';
import { isColorAttribute, getSwatchColor } from '@/utils/product-options';
import type { BaseComponentProps } from '@/types/ui';

interface ProductCardVariantsProps extends BaseComponentProps {
  onSelectionChange?: (selectedOptions: Record<string, string>, allSelected: boolean) => void;
  size?: 'sm' | 'md';
}

/**
 * ProductCardVariants component for compact variant selection on product cards
 * Shows color swatches and memory options in a condensed format
 * Only displays the most essential attributes (typically color and memory)
 */
export function ProductCardVariants({
  className,
  onSelectionChange,
  size = 'sm',
}: ProductCardVariantsProps) {
  const { product } = useProductCard();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleOptionSelect = useCallback(
    (attributeCode: string, value: string) => {
      const newOptions = {
        ...selectedOptions,
        [attributeCode]: value,
      };
      setSelectedOptions(newOptions);

      // Check if all required options are selected
      const allSelected =
        product.configurable_options?.every((option) => newOptions[option.attribute_code]) || false;

      // Notify parent component
      onSelectionChange?.(newOptions, allSelected);
    },
    [selectedOptions, product.configurable_options, onSelectionChange]
  );

  // Only show variants for configurable products
  if (!product.isConfigurable || !product.configurable_options?.length) {
    return null;
  }

  // Limit to most important options for cards (typically color and memory)
  const priorityAttributes = ['cs_color', 'cs_memory', 'color', 'memory'];
  const displayOptions = product.configurable_options
    ?.filter((option) => priorityAttributes.includes(option.attribute_code))
    ?.slice(0, 2); // Maximum 2 options on cards

  if (!displayOptions?.length) {
    return null;
  }

  const sizeClasses = {
    sm: {
      container: 'space-y-2',
      label: 'text-xs font-medium text-gray-700',
      colorSwatch: 'w-6 h-6 rounded-full border-2',
      textOption: 'px-2 py-1 text-xs rounded border',
      optionContainer: 'flex gap-1.5',
    },
    md: {
      container: 'space-y-3',
      label: 'text-sm font-medium text-gray-700',
      colorSwatch: 'w-8 h-8 rounded-full border-2',
      textOption: 'px-3 py-1.5 text-sm rounded border',
      optionContainer: 'flex gap-2',
    },
  };

  const styles = sizeClasses[size];

  return (
    <div className={twMerge('px-4', styles.container, className)}>
      {displayOptions.map((option) => {
        const selectedValue = selectedOptions[option.attribute_code];
        const isColor = isColorAttribute(option.attribute_code);

        return (
          <div key={option.attribute_code}>
            <label className={styles.label}>
              {option.label}
              {selectedValue && (
                <span className="text-gray-500 ml-1">
                  ({option.values.find((v) => v.value === selectedValue)?.label})
                </span>
              )}
            </label>

            <div className={styles.optionContainer}>
              {option.values.map((value) => {
                const isSelected = selectedValue === value.value;

                if (isColor) {
                  const swatchColor = getSwatchColor(value);

                  return (
                    <button
                      key={value.value}
                      type="button"
                      onClick={() => handleOptionSelect(option.attribute_code, value.value)}
                      className={twMerge(
                        styles.colorSwatch,
                        'transition-all duration-200 hover:scale-110',
                        isSelected
                          ? 'border-purple-500 ring-2 ring-purple-200'
                          : 'border-gray-300 hover:border-gray-400'
                      )}
                      style={{ backgroundColor: swatchColor }}
                      title={value.label}
                      aria-label={`Select ${value.label}`}
                    >
                      {/* Check mark for selected color */}
                      {isSelected && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full opacity-80" />
                        </div>
                      )}
                    </button>
                  );
                } else {
                  // Text-based options (memory, size, etc.)
                  return (
                    <button
                      key={value.value}
                      type="button"
                      onClick={() => handleOptionSelect(option.attribute_code, value.value)}
                      className={twMerge(
                        styles.textOption,
                        'transition-all duration-200 font-medium',
                        isSelected
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                      )}
                    >
                      {value.label}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
