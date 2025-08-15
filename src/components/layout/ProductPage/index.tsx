import { ProductPageBackground } from './ProductPageBackground';
import { ProductPageContainer } from './ProductPageContainer';
import { ProductPageLayout } from './ProductPageLayout';
import { ProductPageSidebar } from './ProductPageSidebar';
import { ProductPageMain } from './ProductPageMain';
import { ProductPageBreadcrumbs } from './ProductPageBreadcrumbs';
import { ProductPageHeader } from './ProductPageHeader';
import { ProductPageToolbar } from './ProductPageToolbar';
import { ProductPageSearch } from './ProductPageSearch';
import { ProductPageSort } from './ProductPageSort';
import { ProductPageResultCount } from './ProductPageResultCount';
import { ProductPageMobileFilterButton } from './ProductPageMobileFilterButton';
import { ProductPageFilters } from './ProductPageFilters';
import { ProductPageContent } from './ProductPageContent';
import { ProductPageLoadMore } from './ProductPageLoadMore';
import { ProductPageContentSections } from './ProductPageContentSections';
import { ProductPageNewsletter } from './ProductPageNewsletter';

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

// Export provider and hook
export { ProductPageProvider } from './ProductPageProvider';
export { useProductPage } from './ProductPageContext';
export type { ProductPageContextValue, PageData } from './ProductPageContext';