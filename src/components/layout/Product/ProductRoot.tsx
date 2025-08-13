'use client';

import Page from '@/components/layout/Page';
import Content from '@/components/layout/Content';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import Breadcrumb from '@/components/ui/layout/Breadcrumb';
import PageHeader from '@/components/ui/layout/PageHeader';
import SearchAndSort from '@/components/ui/search/SearchAndSort';
import ResultsCount from '@/components/ui/search/ResultsCount';
import NewsletterSection from '@/components/sections/NewsletterSection';
import type { ProductRootProps } from '@/components/layout/Product/Product.types';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

/**
 * Root layout component for product listing pages.
 * Provides consistent structure for all product category pages.
 */
export function ProductRoot({ 
  children,
  breadcrumbs,
  title,
  description,
  searchProps,
  resultsCount,
  itemLabel = 'items'
}: ProductRootProps) {
  // Split children into sidebar and content
  const [sidebar, content] = Array.isArray(children) ? children : [null, children];

  return (
    <Page background="gray">
      <Content>
        <Breadcrumb items={breadcrumbs} />
        
        <PageHeader
          icon={ShoppingBagIcon}
          title={title}
          description={description}
        />

        {searchProps && <SearchAndSort {...searchProps} />}
        
        {searchProps && (
          <ResultsCount 
            showing={resultsCount} 
            total={resultsCount} 
            itemLabel={itemLabel}
          />
        )}

        <TwoColumnLayout>
          {sidebar}
          <div className="min-w-0 w-full">
            {content}
          </div>
        </TwoColumnLayout>
      </Content>
      <NewsletterSection />
    </Page>
  );
}