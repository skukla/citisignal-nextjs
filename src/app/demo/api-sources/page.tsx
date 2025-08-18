'use client';

import { useState, useEffect, useRef } from 'react';
import { ProductPage } from '@/components/layout/ProductPage';
import { ProductPageProvider } from '@/components/layout/ProductPage/providers/ProductPageProvider';
import { phonesPageData } from '@/data/route-groups/products/phones';

type DataSource = 'commerce' | 'catalog' | 'search';

interface SourceInfo {
  id: DataSource;
  name: string;
  color: string;
  icon: string;
  description: string;
  sections: string[];
}

const SOURCES: SourceInfo[] = [
  {
    id: 'commerce',
    name: 'Commerce Core',
    color: '#9333ea', // purple-600
    icon: '🏪',
    description: 'Navigation, categories & store data',
    sections: ['navigation', 'breadcrumbs', 'footer']
  },
  {
    id: 'catalog',
    name: 'Catalog Service',
    color: '#2563eb', // blue-600
    icon: '📦',
    description: 'Product listings & inventory',
    sections: ['products', 'product-cards']
  },
  {
    id: 'search',
    name: 'Live Search',
    color: '#16a34a', // green-600
    icon: '🔍',
    description: 'Search, facets & filtering',
    sections: ['filters', 'search-bar', 'facets']
  }
];

export default function APISourcesDemo() {
  const [activeSources, setActiveSources] = useState<Set<DataSource>>(new Set());
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [detectedSections, setDetectedSections] = useState<Record<string, number>>({
    commerce: 0,
    catalog: 0,
    search: 0
  });

  // Add data attributes to track sections
  useEffect(() => {
    const markSections = () => {
      // Navigation
      const nav = document.querySelector('nav');
      if (nav) nav.setAttribute('data-source', 'commerce');
      
      // Breadcrumbs
      const breadcrumbs = document.querySelector('[aria-label="Breadcrumb"]');
      if (breadcrumbs) {
        breadcrumbs.setAttribute('data-source', 'commerce');
        breadcrumbs.setAttribute('data-section', 'breadcrumbs');
      }
      
      // Filters sidebar - look for the aside element containing filters
      const filterSidebar = document.querySelector('aside');
      if (filterSidebar) {
        filterSidebar.setAttribute('data-source', 'search');
        filterSidebar.setAttribute('data-section', 'filters');
      }
      
      // Search bar - look for search input
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]');
      if (searchInput) {
        const searchContainer = searchInput.closest('div');
        if (searchContainer) {
          searchContainer.setAttribute('data-source', 'search');
          searchContainer.setAttribute('data-section', 'search-bar');
        }
      }
      
      // Sort dropdown
      const sortButton = document.querySelector('button[aria-label*="Sort"], button:has(svg[class*="ChevronDown"])');
      if (sortButton) {
        sortButton.setAttribute('data-source', 'search');
        sortButton.setAttribute('data-section', 'sort');
      }
      
      // Products grid - look for the main grid container
      const mainContent = document.querySelector('main');
      if (mainContent) {
        // Find the grid that contains product cards
        const productGrids = mainContent.querySelectorAll('[class*="grid"]');
        productGrids.forEach(grid => {
          // Check if this grid contains product cards
          if (grid.querySelector('img[alt*="phone"], img[alt*="Phone"], [class*="ProductCard"], a[href*="/phones/"]')) {
            grid.setAttribute('data-source', 'catalog');
            grid.setAttribute('data-section', 'products');
          }
        });
      }
      
      // Individual product cards
      const productCards = document.querySelectorAll('[class*="ProductCard"], article, [class*="group"]:has(img)');
      productCards.forEach(card => {
        if (card.querySelector('button[aria-label*="Add to cart"], button:has(svg[class*="ShoppingCart"])')) {
          card.setAttribute('data-source', 'catalog');
          card.setAttribute('data-section', 'product-card');
        }
      });
      
      // Footer
      const footer = document.querySelector('footer');
      if (footer) footer.setAttribute('data-source', 'commerce');
      
      // Count detected sections
      const counts = {
        commerce: document.querySelectorAll('[data-source="commerce"]').length,
        catalog: document.querySelectorAll('[data-source="catalog"]').length,
        search: document.querySelectorAll('[data-source="search"]').length
      };
      setDetectedSections(counts);
    };

    // Run multiple times to catch dynamically loaded content
    markSections();
    const timer1 = setTimeout(markSections, 500);
    const timer2 = setTimeout(markSections, 1500);
    const timer3 = setTimeout(markSections, 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Apply visual effects based on active sources
  useEffect(() => {
    // Remove old overlays
    document.querySelectorAll('.source-highlight-overlay').forEach(el => el.remove());
    
    if (activeSources.size === 0) return;
    
    // Create highlighting overlays
    const elements = document.querySelectorAll('[data-source]');
    elements.forEach((el) => {
      const element = el as HTMLElement;
      const source = element.getAttribute('data-source') as DataSource;
      
      if (activeSources.has(source)) {
        const sourceInfo = SOURCES.find(s => s.id === source);
        if (sourceInfo) {
          const rect = element.getBoundingClientRect();
          const overlay = document.createElement('div');
          overlay.className = 'source-highlight-overlay';
          overlay.style.position = 'fixed';
          overlay.style.top = `${rect.top}px`;
          overlay.style.left = `${rect.left}px`;
          overlay.style.width = `${rect.width}px`;
          overlay.style.height = `${rect.height}px`;
          overlay.style.border = `3px solid ${sourceInfo.color}`;
          overlay.style.backgroundColor = `${sourceInfo.color}20`;
          overlay.style.pointerEvents = 'none';
          overlay.style.zIndex = '30';
          overlay.style.borderRadius = '8px';
          overlay.style.transition = 'all 0.3s ease';
          document.body.appendChild(overlay);
        }
      }
    });
    
    // Update overlays on scroll/resize
    const updateOverlays = () => {
      document.querySelectorAll('.source-highlight-overlay').forEach(overlay => {
        const el = overlay as HTMLElement;
        el.remove();
      });
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const source = element.getAttribute('data-source') as DataSource;
        
        if (activeSources.has(source)) {
          const sourceInfo = SOURCES.find(s => s.id === source);
          if (sourceInfo) {
            const rect = element.getBoundingClientRect();
            const overlay = document.createElement('div');
            overlay.className = 'source-highlight-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = `${rect.top}px`;
            overlay.style.left = `${rect.left}px`;
            overlay.style.width = `${rect.width}px`;
            overlay.style.height = `${rect.height}px`;
            overlay.style.border = `3px solid ${sourceInfo.color}`;
            overlay.style.backgroundColor = `${sourceInfo.color}20`;
            overlay.style.pointerEvents = 'none';
            overlay.style.zIndex = '30';
            overlay.style.borderRadius = '8px';
            document.body.appendChild(overlay);
          }
        }
      });
    };
    
    window.addEventListener('scroll', updateOverlays);
    window.addEventListener('resize', updateOverlays);
    
    // Return cleanup function
    return () => {
      document.querySelectorAll('.source-highlight-overlay').forEach(el => el.remove());
      window.removeEventListener('scroll', updateOverlays);
      window.removeEventListener('resize', updateOverlays);
    };
  }, [activeSources]);

  const pageData = {
    breadcrumbs: phonesPageData.breadcrumbs,
    pageHeader: phonesPageData.pageHeader,
    search: phonesPageData.search,
    filters: phonesPageData.filters,
    emptyState: phonesPageData.emptyState,
    loadingSkeletonCount: 12
  };

  return (
    <>
      {/* Floating Control Panel */}
      <div className="fixed top-20 right-4 z-50 space-y-4">
        {/* Main Controls */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-4 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <span className="mr-2">🎨</span>
              API Source Inspector
            </h3>
            <button
              onClick={() => setInspectorOpen(!inspectorOpen)}
              className="text-gray-400 hover:text-gray-600"
            >
              {inspectorOpen ? '−' : '+'}
            </button>
          </div>
          
          {inspectorOpen && (
            <>
              {/* Source Buttons */}
              <div className="space-y-2">
                {SOURCES.map((source) => {
                  const isActive = activeSources.has(source.id);
                  return (
                    <button
                      key={source.id}
                      onClick={() => {
                        const newSources = new Set(activeSources);
                        if (isActive) {
                          newSources.delete(source.id);
                        } else {
                          newSources.add(source.id);
                        }
                        setActiveSources(newSources);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all transform hover:scale-[1.02] ${
                        isActive
                          ? 'shadow-lg'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      style={{
                        background: isActive 
                          ? `linear-gradient(135deg, ${source.color}, ${source.color}cc)`
                          : undefined,
                        backgroundColor: !isActive ? undefined : source.color
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{source.icon}</span>
                          <div>
                            <div className={`font-medium ${
                              isActive ? 'text-white' : 'text-gray-900'
                            }`}>
                              {source.name}
                            </div>
                            <div className={`text-xs ${
                              isActive ? 'text-white opacity-90' : 'text-gray-500'
                            }`}>
                              {source.description}
                            </div>
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Detection Status */}
              <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                <div className="font-medium text-gray-700 mb-1">Detected Elements:</div>
                {SOURCES.map(source => (
                  <div key={source.id} className="flex justify-between py-0.5">
                    <span className="text-gray-600">{source.name}:</span>
                    <span className={`font-mono ${detectedSections[source.id] > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {detectedSections[source.id]} elements
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Info Card */}
              {activeSources.size > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Highlighting sections from:</div>
                  <div className="space-y-1">
                    {Array.from(activeSources).map(sourceId => {
                      const source = SOURCES.find(s => s.id === sourceId);
                      return source ? (
                        <div key={sourceId} className="font-medium text-gray-900">
                          {source.icon} {source.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    These services provide data through Adobe's API Mesh orchestration layer.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Reset Button */}
        {activeSources.size > 0 && (
          <button
            onClick={() => setActiveSources(new Set())}
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Reset View
          </button>
        )}
      </div>
      
      {/* Actual Phones Page */}
      <div className="relative">
        <ProductPageProvider category="phones" pageData={pageData}>
          <ProductPage.Background color="gray">
            <ProductPage.Container>
              <ProductPage.Breadcrumbs />
              <ProductPage.Header />
              
              <ProductPage.Toolbar>
                <ProductPage.Search />
                <ProductPage.Sort />
                <ProductPage.MobileFilterButton />
              </ProductPage.Toolbar>
              
              <ProductPage.ResultCount />
              
              <ProductPage.Layout>
                <ProductPage.Sidebar>
                  <ProductPage.Filters />
                </ProductPage.Sidebar>
                
                <ProductPage.Main>
                  <ProductPage.Content />
                  <ProductPage.LoadMore />
                </ProductPage.Main>
              </ProductPage.Layout>
            </ProductPage.Container>
          </ProductPage.Background>
        </ProductPageProvider>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        [data-source] {
          position: relative;
        }
        
        [data-source]::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        [data-source][data-active="true"]::before {
          opacity: 1;
        }
      `}</style>
    </>
  );
}