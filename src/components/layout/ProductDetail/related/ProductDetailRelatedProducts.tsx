import { useProductDetail } from '../providers/ProductDetailContext';
// import ProductCard from '@/components/ui/cards/ProductCard';
import type { ProductDetailRelatedProductsProps } from '../types';

/**
 * ProductDetailRelatedProducts component
 * Displays related/cross-sell products using existing ProductCard component
 * Placeholder for Phase 4 implementation
 */
export function ProductDetailRelatedProducts({ className }: ProductDetailRelatedProductsProps) {
  const { product } = useProductDetail();

  const relatedProducts = product?.related_products || [];
  const crossSellProducts = product?.cross_sell_products || [];
  const allProducts = [...relatedProducts, ...crossSellProducts];

  if (!allProducts.length) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Related Products</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {allProducts.slice(0, 4).map((relatedProduct) => (
          <div key={relatedProduct.id} className="border rounded-lg p-4 bg-white">
            <div className="text-sm font-medium">{relatedProduct.name}</div>
            <div className="text-sm text-gray-500">{relatedProduct.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
