'use client';

import ProductGrid from '@/components/ui/grids/ProductGrid';
import { useProductData } from '../providers/ProductDataContext';
import { useActiveProductService } from '@/hooks/products/useActiveProductService';

export default function ProductPageProducts() {
  const { filteredProducts } = useProductData();

  // Hook determines which service is currently active
  const dataSource = useActiveProductService();

  return (
    <ProductGrid
      products={filteredProducts}
      columns={{ sm: 1, md: 2, lg: 3 }}
      gap="md"
      dataSource={dataSource}
    />
  );
}
