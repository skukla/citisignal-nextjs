/**
 * Product Options Utilities
 *
 * Pure utility functions for handling product configurable options
 * and attribute detection logic.
 */

import type { ProductDetail } from '@/types/commerce';

export type ConfigurableOption = ProductDetail['configurable_options'][0];

/**
 * Determines if a configurable option represents a color attribute
 *
 * @param option - The configurable option to check
 * @returns true if the option is a color attribute
 */
export function isColorAttribute(option: ConfigurableOption): boolean {
  return option.attribute_code === 'cs_color' || option.label.toLowerCase().includes('color');
}

/**
 * Gets the swatch color value for a configurable option value
 *
 * @param value - The option value to get color from
 * @returns The color value (hex, rgb, etc.) or the raw value as fallback
 */
export function getSwatchColor(value: ConfigurableOption['values'][0]): string {
  return value.swatch_data?.value || value.value;
}

/**
 * Checks if all required configurable options have been selected
 *
 * @param selectedOptions - Currently selected option values
 * @param configurableOptions - All available configurable options
 * @returns true if all required options are selected
 */
export function areAllOptionsSelected(
  selectedOptions: Record<string, string>,
  configurableOptions: ConfigurableOption[]
): boolean {
  return configurableOptions.every((option) => selectedOptions[option.attribute_code]);
}
