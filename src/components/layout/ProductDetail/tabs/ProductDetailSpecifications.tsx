import { useProductDetail } from '../providers/ProductDetailContext';
import { useEffect, useState } from 'react';
import type { ProductDetailSpecificationsProps } from '../types';

/**
 * ProductDetailSpecifications component
 * Displays product attributes and specifications
 * Placeholder for Phase 4 implementation
 */
export function ProductDetailSpecifications({ className }: ProductDetailSpecificationsProps) {
  const { product } = useProductDetail();
  const [sanitizedAttributes, setSanitizedAttributes] = useState<
    Array<{ key: string; label: string; value: string }>
  >([]);

  // Sanitize attribute values that might contain HTML
  useEffect(() => {
    if (!product?.attributes?.length) {
      setSanitizedAttributes([]);
      return;
    }

    const sanitizeAttributes = async () => {
      const DOMPurify = (await import('dompurify')).default;

      const sanitized = (product.attributes || []).map((attribute) => ({
        key: attribute.key,
        label: attribute.label,
        value: DOMPurify.sanitize(String(attribute.value), {
          ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'ul', 'ol', 'li'],
          ALLOWED_ATTR: [],
        }),
      }));

      setSanitizedAttributes(sanitized);
    };

    sanitizeAttributes();
  }, [product?.attributes]);

  if (!product?.attributes?.length) {
    return null;
  }

  // Show loading state while sanitizing
  if (!sanitizedAttributes.length) {
    return (
      <div className={className}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Specifications
        </h2>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
        Specifications
      </h2>
      <div className="grid gap-4">
        {sanitizedAttributes.map((attribute) => (
          <div
            key={attribute.key}
            className="flex justify-between items-start border-b border-gray-100 pb-3"
          >
            <span className="text-base font-semibold text-gray-700 flex-shrink-0 mr-4">
              {attribute.label}
            </span>
            <div
              className="text-base text-gray-900 text-right"
              dangerouslySetInnerHTML={{ __html: attribute.value }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
