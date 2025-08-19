import { ReactNode } from 'react';
import { fetchBreadcrumbsSSR } from '@/lib/ssr-fetchers';
import ProductsLayoutClient from './ProductsLayoutClient';

interface ProductsLayoutProps {
  children: ReactNode;
  params: {
    category?: string;
  };
}

// Map route segments to category URL keys
const routeToCategoryMap: Record<string, string> = {
  'phones': 'phones',
  'watches': 'watches',
  'accessories': 'accessories',
  'plans': 'plans',
  'streaming': 'streaming',
  'gift-cards': 'gift-cards'
};

export default async function ProductsLayout({ 
  children,
  params 
}: ProductsLayoutProps) {
  // Get the current path to determine category
  // This is a workaround since params doesn't automatically include the segment
  let breadcrumbs = null;
  
  // We'll need to handle this differently since we can't get the exact route here
  // For now, breadcrumbs will be fetched client-side until we refactor individual pages
  
  return (
    <ProductsLayoutClient initialBreadcrumbs={breadcrumbs}>
      {children}
    </ProductsLayoutClient>
  );
}