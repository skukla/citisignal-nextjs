// Structure
import { ProductPageBackground } from './structure/ProductPageBackground';
import { ProductPageContainer } from './structure/ProductPageContainer';
import { ProductPageLayout } from './structure/ProductPageLayout';
import { ProductPageSidebar } from './structure/ProductPageSidebar';
import { ProductPageMain } from './structure/ProductPageMain';
import { ProductPageBreadcrumbs } from './structure/ProductPageBreadcrumbs';
import { ProductPageHeader } from './structure/ProductPageHeader';

// Toolbar
import { ProductPageToolbar } from './toolbar/ProductPageToolbar';
import { ProductPageSearch } from './toolbar/ProductPageSearch';
import { ProductPageSort } from './toolbar/ProductPageSort';
import { ProductPageResultCount } from './toolbar/ProductPageResultCount';
import { ProductPageMobileFilterButton } from './toolbar/ProductPageMobileFilterButton';
import { ProductPageFilters } from './toolbar/ProductPageFilters';

// Products
import { ProductPageContent } from './products/ProductPageContent';
import { ProductPageLoadMore } from './products/ProductPageLoadMore';
import { ProductPageContentSections } from './products/ProductPageContentSections';

// States
import { ProductPageNewsletter } from './states/ProductPageNewsletter';

// Create compound component
export const ProductPage = {
  // Layout
  Background: ProductPageBackground,
  Container: ProductPageContainer,
  Layout: ProductPageLayout,
  Sidebar: ProductPageSidebar,
  Main: ProductPageMain,
  
  // Header
  Breadcrumbs: ProductPageBreadcrumbs,
  Header: ProductPageHeader,
  
  // Toolbar
  Toolbar: ProductPageToolbar,
  Search: ProductPageSearch,
  Sort: ProductPageSort,
  ResultCount: ProductPageResultCount,
  MobileFilterButton: ProductPageMobileFilterButton,
  
  // Filters
  Filters: ProductPageFilters,
  
  // Content (Option 3 - Smart Component)
  Content: ProductPageContent,
  
  // Actions
  LoadMore: ProductPageLoadMore,
  
  // Sections
  ContentSections: ProductPageContentSections,
  Newsletter: ProductPageNewsletter
};

// Export provider and hooks
export { ProductPageProvider } from './providers/ProductPageProvider';
export { useProductData } from './providers/ProductDataContext';
export { useProductFilters } from './providers/ProductFilterContext';
export { useProductUI } from './providers/ProductUIContext';
export { useProductPage } from './hooks/useProductPage';
export type { PageData } from './types';