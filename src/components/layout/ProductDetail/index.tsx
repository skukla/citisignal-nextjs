// Structure
import {
  ProductDetailBackground,
  ProductDetailContainer,
  ProductDetailLayout,
} from './structure/ProductDetailStructure';
import { ProductDetailBreadcrumbs } from './structure/ProductDetailBreadcrumbs';

// Gallery
import { ProductDetailGallery } from './gallery/ProductDetailGallery';

// Info
import { ProductDetailInfo } from './info/ProductDetailInfo';
import { ProductDetailHeader } from './info/ProductDetailHeader';
import { ProductDetailPrice } from './info/ProductDetailPrice';
import { ProductDetailVariants } from './info/ProductDetailVariants';
import { ProductDetailActions } from './info/ProductDetailActions';

// Tabs
import { ProductDetailTabs } from './tabs/ProductDetailTabs';
import { ProductDetailDescription } from './tabs/ProductDetailDescription';
import { ProductDetailSpecifications } from './tabs/ProductDetailSpecifications';
import { ProductDetailReviews } from './tabs/ProductDetailReviews';

// Related
import { ProductDetailRelatedProducts } from './related/ProductDetailRelatedProducts';

/**
 * ProductDetail compound component for displaying individual product pages.
 * Follows the same pattern as ProductPage compound component.
 *
 * @example
 * <ProductDetailProvider productSlug="iphone-15-pro">
 *   <ProductDetail.Background>
 *     <ProductDetail.Container>
 *       <ProductDetail.Breadcrumbs />
 *       <ProductDetail.Layout>
 *         <ProductDetail.Gallery />
 *         <ProductDetail.Info>
 *           <ProductDetail.Header />
 *           <ProductDetail.Price />
 *           <ProductDetail.Actions />
 *         </ProductDetail.Info>
 *       </ProductDetail.Layout>
 *     </ProductDetail.Container>
 *   </ProductDetail.Background>
 * </ProductDetailProvider>
 */
export const ProductDetail = {
  // Structure
  Background: ProductDetailBackground,
  Container: ProductDetailContainer,
  Layout: ProductDetailLayout,
  Breadcrumbs: ProductDetailBreadcrumbs,

  // Gallery
  Gallery: ProductDetailGallery,

  // Info
  Info: ProductDetailInfo,
  Header: ProductDetailHeader,
  Price: ProductDetailPrice,
  Variants: ProductDetailVariants,
  Actions: ProductDetailActions,

  // Tabs
  Tabs: ProductDetailTabs,
  Description: ProductDetailDescription,
  Specifications: ProductDetailSpecifications,
  Reviews: ProductDetailReviews,

  // Related
  RelatedProducts: ProductDetailRelatedProducts,
};

// Export provider and context
export { ProductDetailProvider } from './providers/ProductDetailProvider';
export { useProductDetail } from './providers/ProductDetailContext';

// Export content component (smart component with loading/error states)
export { ProductDetailContent } from './ProductDetailContent';

// Export state components for external use
export { ProductDetailSkeleton } from './states/ProductDetailSkeleton';
export { ProductDetailError } from './states/ProductDetailError';
export { ProductDetailNotFound } from './states/ProductDetailNotFound';

// Export types
export type * from './types';
