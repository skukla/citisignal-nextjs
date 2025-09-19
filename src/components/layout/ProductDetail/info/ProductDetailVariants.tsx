import { useProductDetail } from '../providers/ProductDetailContext';
import type { ProductDetailVariantsProps } from '../types';

/**
 * ProductDetailVariants component
 * Displays configurable options (colors, sizes, etc.)
 * Placeholder for Phase 3 implementation
 */
export function ProductDetailVariants({ className }: ProductDetailVariantsProps) {
  const { product, loading } = useProductDetail();

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-3">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            ))}
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
      <div className="space-y-4">
        {product.configurable_options.map((option) => (
          <div key={option.attribute_code}>
            <h3 className="text-sm font-medium text-gray-900">{option.label}</h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {option.values.map((value) => (
                <button
                  key={value.value}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
