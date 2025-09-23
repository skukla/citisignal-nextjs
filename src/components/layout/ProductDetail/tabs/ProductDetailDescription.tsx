import { useProductDetail } from '../providers/ProductDetailContext';
import { useEffect, useState } from 'react';
import type { ProductDetailDescriptionProps } from '../types';

/**
 * ProductDetailDescription component
 * Displays product description with proper HTML sanitization and formatting
 * Preserves paragraph structure, lists, and other formatting elements
 */
export function ProductDetailDescription({ className }: ProductDetailDescriptionProps) {
  const { product } = useProductDetail();
  const [sanitizedDescription, setSanitizedDescription] = useState<string>('');

  useEffect(() => {
    if (!product?.description) {
      setSanitizedDescription('');
      return;
    }

    // Dynamically import DOMPurify for client-side sanitization
    const sanitizeDescription = async () => {
      const DOMPurify = (await import('dompurify')).default;

      // First, clean and filter out unwanted content patterns
      let cleanedContent = product.description || '';

      // Remove shipping date patterns like "Expected to ship between..."
      cleanedContent = cleanedContent.replace(
        /<p[^>]*>\s*Expected to ship between[^<]*<\/p>/gi,
        ''
      );

      // Remove other common unwanted patterns
      cleanedContent = cleanedContent.replace(
        /<p[^>]*>\s*(?:Ships in|Delivery|Estimated delivery)[^<]*<\/p>/gi,
        ''
      );

      // Clean up any double line breaks or empty paragraphs
      cleanedContent = cleanedContent.replace(/<p[^>]*>\s*<\/p>/gi, '');
      cleanedContent = cleanedContent.replace(/(<br\s*\/?>){2,}/gi, '<br />');

      // Then sanitize with DOMPurify
      const sanitized = DOMPurify.sanitize(cleanedContent, {
        ALLOWED_TAGS: [
          'p',
          'br',
          'ul',
          'ol',
          'li',
          'strong',
          'b',
          'em',
          'i',
          'h3',
          'h4',
          'h5',
          'h6',
        ],
        ALLOWED_ATTR: [],
      });

      setSanitizedDescription(sanitized);
    };

    sanitizeDescription();
  }, [product?.description]);

  if (!product?.description) {
    return null;
  }

  // Show loading state while sanitizing
  if (!sanitizedDescription) {
    return (
      <div className={className}>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
        Description
      </h2>
      <div
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </div>
  );
}
