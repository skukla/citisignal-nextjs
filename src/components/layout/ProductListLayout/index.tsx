// Standard ProductListLayout (default export for simple usage)
export { StandardProductListLayout as default } from './StandardProductListLayout';

// ProductListLayout Compound Components (for custom usage)
export { ProductListLayoutRoot } from './ProductListLayoutRoot';
export { ProductListLayoutHeader } from './ProductListLayoutHeader';
export { ProductListLayoutContent } from './ProductListLayoutContent';
export { ProductListLayoutSidebar } from './ProductListLayoutSidebar';
export { ProductListLayoutGrid } from './ProductListLayoutGrid';
export { ProductListLayoutFooter } from './ProductListLayoutFooter';

// Compound component namespace for custom usage
import { ProductListLayoutRoot } from './ProductListLayoutRoot';
import { ProductListLayoutHeader } from './ProductListLayoutHeader';
import { ProductListLayoutContent } from './ProductListLayoutContent';
import { ProductListLayoutSidebar } from './ProductListLayoutSidebar';
import { ProductListLayoutGrid } from './ProductListLayoutGrid';
import { ProductListLayoutFooter } from './ProductListLayoutFooter';

/**
 * ProductListLayout compound component for building custom product list layouts.
 * For standard layout, use the default export.
 *
 * @example
 * // Simple usage (recommended):
 * import ProductListLayout from '@/components/layout/ProductListLayout';
 * <ProductListLayout 
 *   title="Products" 
 *   filters={filters}
 *   hasResults={true}
 * >
 *   <ProductGrid />
 * </ProductListLayout>
 * 
 * // Custom usage:
 * import { ProductListLayout } from '@/components/layout/ProductListLayout';
 * <ProductListLayout.Root>
 *   <ProductListLayout.Header title="Custom Products" />
 *   <ProductListLayout.Content>
 *     <ProductListLayout.Sidebar filters={filters} />
 *     <ProductListLayout.Grid hasResults={true}>
 *       <CustomGrid />
 *     </ProductListLayout.Grid>
 *   </ProductListLayout.Content>
 *   <ProductListLayout.Footer />
 * </ProductListLayout.Root>
 */
export interface ProductListLayoutComponent {
  Root: React.FC<React.ComponentProps<typeof ProductListLayoutRoot>>;
  Header: React.FC<React.ComponentProps<typeof ProductListLayoutHeader>>;
  Content: React.FC<React.ComponentProps<typeof ProductListLayoutContent>>;
  Sidebar: React.FC<React.ComponentProps<typeof ProductListLayoutSidebar>>;
  Grid: React.FC<React.ComponentProps<typeof ProductListLayoutGrid>>;
  Footer: React.FC<React.ComponentProps<typeof ProductListLayoutFooter>>;
}

export const ProductListLayout: ProductListLayoutComponent = {
  Root: ProductListLayoutRoot,
  Header: ProductListLayoutHeader,
  Content: ProductListLayoutContent,
  Sidebar: ProductListLayoutSidebar,
  Grid: ProductListLayoutGrid,
  Footer: ProductListLayoutFooter,
};