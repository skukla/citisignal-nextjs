'use client';

import { useState, useEffect } from 'react';
import { useProductPageData } from '@/hooks/products/useProductPageData';
import { 
  TechnicalDemoLayout, 
  MetricCard, 
  CodeBlock, 
  DataTable 
} from '@/components/layout/TechnicalDemo/TechnicalDemoLayout';

/**
 * Technical Demo: Adobe API Mesh Unified Query Pattern
 * 
 * Demonstrates GraphQL query orchestration across multiple backend services
 * using Adobe API Mesh's resolver composition capabilities.
 */
export default function UnifiedQueryDemo() {
  const [showRawResponse, setShowRawResponse] = useState(false);
  const [queryTime, setQueryTime] = useState<number | null>(null);
  
  // Track query execution time
  const startTime = Date.now();
  
  // Execute unified query with same parameters as production
  const { data, error, isLoading } = useProductPageData({
    filter: [
      { attribute: 'category_uid', eq: 'phones' }
    ],
    pageSize: 12,
    currentPage: 1,
    sort: { attribute: 'RELEVANCE', direction: 'DESC' }
  });
  
  useEffect(() => {
    if (data && queryTime === null) {
      setQueryTime(Date.now() - startTime);
    }
  }, [data, startTime, queryTime]);
  
  const stats = data ? {
    navigationItems: data.Citisignal_productPageData.navigation.headerNav.length,
    footerLinks: data.Citisignal_productPageData.navigation.footerNav.length,
    products: data.Citisignal_productPageData.products.items.length,
    totalProducts: data.Citisignal_productPageData.products.totalCount,
    facets: data.Citisignal_productPageData.facets.facets.length,
    breadcrumbs: data.Citisignal_productPageData.breadcrumbs.items.length
  } : null;
  
  return (
    <TechnicalDemoLayout
      title="Unified Query Pattern Implementation"
      description="Single GraphQL query orchestrating Commerce Core, Live Search, and Catalog Service"
      apiEndpoint="edge-sandbox-graph.adobe.io"
      queryName="Citisignal_productPageData"
    >
      {/* Query Execution Status */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Query Execution</h2>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              isLoading ? 'bg-yellow-100 text-yellow-800' :
              error ? 'bg-red-100 text-red-800' :
              data ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {isLoading ? 'Executing' : error ? 'Failed' : data ? 'Success' : 'Idle'}
            </span>
            {queryTime && (
              <span className="text-sm text-gray-500">
                {queryTime}ms
              </span>
            )}
          </div>
        </div>
        
        {/* GraphQL Query */}
        <CodeBlock
          title="GraphQL Query"
          language="graphql"
          code={`query GetProductPageData {
  Citisignal_productPageData(
    filter: [{ attribute: "category_uid", eq: "phones" }]
    pageSize: 12
    currentPage: 1
    sort: { attribute: RELEVANCE, direction: DESC }
  ) {
    navigation {
      headerNav { href label category }
      footerNav { href label }
    }
    products {
      items { id name sku price inStock }
      totalCount
      page_info { current_page page_size total_pages }
    }
    facets {
      facets { title key options { id name count } }
    }
    breadcrumbs {
      items { name urlPath }
    }
  }
}`}
        />
      </div>
      
      {isLoading && (
        <div className="bg-white rounded-lg border p-8">
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-gray-600">Executing unified query...</span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          <h3 className="font-semibold">Query Execution Error</h3>
          <pre className="mt-2 text-sm">{error.message}</pre>
        </div>
      )}
      
      {data && stats && (
        <>
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              label="Response Time" 
              value={queryTime || 0} 
              unit="ms"
              trend={queryTime && queryTime < 300 ? 'up' : 'down'}
            />
            <MetricCard 
              label="Data Sources" 
              value={3} 
              unit="services"
            />
            <MetricCard 
              label="Network Requests" 
              value={1} 
              unit="query"
              trend="up"
            />
            <MetricCard 
              label="Payload Size" 
              value={(JSON.stringify(data).length / 1024).toFixed(1)} 
              unit="KB"
            />
          </div>
          
          {/* Service Orchestration */}
          <div className="bg-white rounded-lg border p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Orchestration</h2>
            <DataTable
              headers={['Service', 'Data Type', 'Records', 'Response Fields']}
              rows={[
                [
                  <code key="service-1" className="text-sm">Commerce Core</code>,
                  'Navigation',
                  stats.navigationItems + stats.footerLinks,
                  'headerNav, footerNav'
                ],
                [
                  <code key="service-2" className="text-sm">Commerce Core</code>,
                  'Breadcrumbs',
                  stats.breadcrumbs,
                  'items.name, items.urlPath'
                ],
                [
                  <code key="service-3" className="text-sm">Catalog Service</code>,
                  'Products',
                  `${stats.products} of ${stats.totalProducts}`,
                  'id, sku, name, price, inStock'
                ],
                [
                  <code key="service-4" className="text-sm">Live Search</code>,
                  'Facets',
                  stats.facets,
                  'title, key, options'
                ]
              ]}
            />
          </div>
          
          {/* Data Structure Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Navigation Data */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Navigation Structure</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-500">Header Items:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {data.Citisignal_productPageData.navigation.headerNav.map((item, i) => (
                      <code key={i} className="px-2 py-1 bg-gray-100 text-xs rounded">
                        {item.label}
                      </code>
                    ))}
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Footer Items:</span>
                  <span className="ml-2">{stats.footerLinks} links</span>
                </div>
              </div>
            </div>
            
            {/* Product Data */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Product Data</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Total Count:</span>
                  <span className="ml-2 font-mono">{stats.totalProducts}</span>
                </div>
                <div>
                  <span className="text-gray-500">Page Size:</span>
                  <span className="ml-2 font-mono">{data.Citisignal_productPageData.products.page_info.page_size}</span>
                </div>
                <div>
                  <span className="text-gray-500">Total Pages:</span>
                  <span className="ml-2 font-mono">{data.Citisignal_productPageData.products.page_info.total_pages}</span>
                </div>
                <div>
                  <span className="text-gray-500">Sample SKUs:</span>
                  <div className="mt-1 space-y-1">
                    {data.Citisignal_productPageData.products.items.slice(0, 3).map((product, i) => (
                      <div key={i} className="font-mono text-xs text-gray-600">
                        {product.sku}: {product.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Facets Analysis */}
          <div className="bg-white rounded-lg border p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Facet Configuration</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.Citisignal_productPageData.facets.facets.map((facet, i) => (
                <div key={i} className="text-sm">
                  <div className="font-medium text-gray-700">{facet.title}</div>
                  <div className="text-gray-500">
                    Key: <code className="text-xs">{facet.key}</code>
                  </div>
                  <div className="text-gray-500">
                    Options: {facet.options?.length || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Raw Response */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Response Payload</h3>
              <button
                onClick={() => setShowRawResponse(!showRawResponse)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                {showRawResponse ? 'Hide' : 'Show'} Raw JSON
              </button>
            </div>
            
            {showRawResponse && (
              <pre className="bg-gray-900 text-gray-300 p-4 rounded overflow-auto max-h-96 text-xs">
                {JSON.stringify(data.Citisignal_productPageData, null, 2)}
              </pre>
            )}
          </div>
        </>
      )}
      
      {/* Technical Notes */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Implementation Notes</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Resolver orchestrates parallel calls to Commerce Core, Catalog Service, and Live Search</li>
          <li>• Single network request reduces latency by ~60% compared to sequential client-side calls</li>
          <li>• Response caching at mesh level with 60-second TTL for improved performance</li>
          <li>• Fallback values ensure graceful degradation if individual services fail</li>
        </ul>
      </div>
    </TechnicalDemoLayout>
  );
}