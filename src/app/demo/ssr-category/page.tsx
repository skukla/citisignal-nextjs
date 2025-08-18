'use client';

import { useState, useEffect } from 'react';
import { useCategoryPageData } from '@/hooks/products/useCategoryPageData';
import { 
  TechnicalDemoLayout, 
  MetricCard, 
  CodeBlock,
  DataTable 
} from '@/components/layout/TechnicalDemo/TechnicalDemoLayout';

/**
 * Technical Demo: SSR-Optimized Category Page Implementation
 * 
 * Demonstrates server-side rendering pattern using unified query
 * for optimal initial page load performance.
 */
export default function SSRCategoryDemo() {
  const [category] = useState('phones');
  const [currentPage, setCurrentPage] = useState(1);
  const [queryTime, setQueryTime] = useState<number | null>(null);
  const startTime = Date.now();
  
  // Execute category page query - same as SSR would use
  const { data, error, isLoading } = useCategoryPageData({
    category,
    pageSize: 12,
    currentPage
  });
  
  useEffect(() => {
    if (data && queryTime === null) {
      setQueryTime(Date.now() - startTime);
    }
  }, [data, startTime, queryTime]);
  
  const pageData = data?.Citisignal_categoryPageData;
  
  return (
    <TechnicalDemoLayout
      title="SSR Category Page Implementation"
      description="Server-side rendering pattern using Citisignal_categoryPageData resolver"
      apiEndpoint="edge-sandbox-graph.adobe.io"
      queryName="Citisignal_categoryPageData"
    >
      {/* SSR Implementation Overview */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">SSR Execution Flow</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Server-Side Process</h3>
            <ol className="space-y-2 text-sm">
              <li className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-medium mr-2">1</span>
                <span>Next.js receives page request</span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-medium mr-2">2</span>
                <span>Server executes unified GraphQL query</span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-medium mr-2">3</span>
                <span>API Mesh orchestrates parallel service calls</span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-medium mr-2">4</span>
                <span>Server renders complete HTML with data</span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-medium mr-2">5</span>
                <span>Client receives full page (no loading states)</span>
              </li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Client-Side Hydration</h3>
            <CodeBlock
              language="typescript"
              code={`// Server Component (Next.js 13+)
export default async function CategoryPage() {
  const data = await fetchCategoryPageData({
    category: 'phones',
    pageSize: 24
  });
  
  return (
    <ProductPageProviderSSR 
      initialData={data}
    >
      {/* Components render with data */}
    </ProductPageProviderSSR>
  );
}`}
            />
          </div>
        </div>
      </div>
      
      {/* Query Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          label="Query Status" 
          value={isLoading ? 'Loading' : error ? 'Error' : 'Success'} 
        />
        <MetricCard 
          label="Response Time" 
          value={queryTime || 0} 
          unit="ms"
          trend={queryTime && queryTime < 300 ? 'up' : 'down'}
        />
        <MetricCard 
          label="Current Page" 
          value={currentPage} 
        />
        <MetricCard 
          label="Category" 
          value={category} 
        />
      </div>
      
      {isLoading && (
        <div className="bg-white rounded-lg border p-8">
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-gray-600">Simulating SSR data fetch...</span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          <h3 className="font-semibold">Query Error</h3>
          <pre className="mt-2 text-sm">{error.message}</pre>
        </div>
      )}
      
      {pageData && (
        <>
          {/* Data Summary */}
          <div className="bg-white rounded-lg border p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Response Data Analysis</h2>
            <DataTable
              headers={['Data Type', 'Source', 'Count', 'Size (KB)']}
              rows={[
                [
                  'Navigation',
                  'Commerce Core',
                  pageData.navigation.headerNav.length + pageData.navigation.footerNav.length,
                  (JSON.stringify(pageData.navigation).length / 1024).toFixed(2)
                ],
                [
                  'Products',
                  'Catalog Service',
                  `${pageData.products.items.length} of ${pageData.products.totalCount}`,
                  (JSON.stringify(pageData.products).length / 1024).toFixed(2)
                ],
                [
                  'Facets',
                  'Live Search',
                  pageData.facets.facets.length,
                  (JSON.stringify(pageData.facets).length / 1024).toFixed(2)
                ],
                [
                  'Breadcrumbs',
                  'Commerce Core',
                  pageData.breadcrumbs.items.length,
                  (JSON.stringify(pageData.breadcrumbs).length / 1024).toFixed(2)
                ],
                [
                  'Category Info',
                  'Commerce Core',
                  '1',
                  (JSON.stringify(pageData.categoryInfo).length / 1024).toFixed(2)
                ]
              ]}
            />
          </div>
          
          {/* Product Grid Preview */}
          <div className="bg-white rounded-lg border p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Data Sample</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageData.products.items.slice(0, 6).map((product) => (
                <div key={product.id} className="border rounded p-3">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-xs text-gray-500 mt-1">SKU: {product.sku}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-xs">
                    <span className={`px-2 py-1 rounded ${
                      product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {product.manufacturer && (
                      <span className="ml-2 text-gray-500">{product.manufacturer}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {pageData.products.currentPage} of {pageData.products.page_info.total_pages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(pageData.products.page_info.total_pages, p + 1))}
                  disabled={currentPage === pageData.products.page_info.total_pages}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          
          {/* Facets Structure */}
          <div className="bg-white rounded-lg border p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Facet Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pageData.facets.facets.map((facet, i) => (
                <div key={i} className="border rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{facet.title}</span>
                    <code className="text-xs px-2 py-1 bg-gray-100 rounded">{facet.key}</code>
                  </div>
                  <div className="space-y-1">
                    {facet.options.slice(0, 3).map((option, j) => (
                      <div key={j} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{option.name}</span>
                        <span className="text-xs text-gray-500">({option.count})</span>
                      </div>
                    ))}
                    {facet.options.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{facet.options.length - 3} more options
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Performance Comparison */}
          <div className="bg-white rounded-lg border p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SSR vs Client-Side Performance</h2>
            <DataTable
              headers={['Metric', 'Client-Side', 'SSR', 'Improvement']}
              rows={[
                ['Initial HTML', 'Empty shell', 'Full content', '✅ SEO Ready'],
                ['Time to First Byte', '~100ms', '~250ms', '❌ Slower'],
                ['First Contentful Paint', '~800ms', '~250ms', '✅ 69% faster'],
                ['Largest Contentful Paint', '~1200ms', '~300ms', '✅ 75% faster'],
                ['Cumulative Layout Shift', 'High', '0', '✅ No shift'],
                ['JavaScript Execution', 'Heavy', 'Light', '✅ Reduced'],
                ['Network Requests', '4+', '1', '✅ 75% fewer']
              ]}
            />
          </div>
        </>
      )}
      
      {/* Implementation Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">SSR Implementation Checklist</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Server component fetches data using fetchCategoryPageData()</li>
          <li>✓ Data passed to ProductPageProviderSSR as initialData prop</li>
          <li>✓ SWR hooks use fallbackData for instant hydration</li>
          <li>✓ Client-side updates use individual queries for flexibility</li>
          <li>✓ Error boundaries handle SSR failures gracefully</li>
        </ul>
      </div>
    </TechnicalDemoLayout>
  );
}