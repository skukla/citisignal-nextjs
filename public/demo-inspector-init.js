/**
 * Demo Inspector — Runtime Tagging (Next.js)
 *
 * Applies data-inspector-source attributes so the Demo Inspector Chrome
 * extension can visualize API Mesh data sources (catalog / search / commerce).
 *
 * Uses CSS selectors and MutationObserver to tag elements after React renders.
 * Intercepts fetch() for GraphQL query tracking.
 *
 * This script is inert unless the Chrome extension is installed — the
 * data attributes have no effect on rendering or functionality.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Tagging Rules (CSS selector → data source)
  // -------------------------------------------------------------------------

  var RULES = [
    // Navigation
    { selector: 'nav[aria-label="Desktop navigation"]', source: 'commerce' },
    { selector: 'nav[aria-label="Breadcrumb"]', source: 'commerce' },

    // Product Detail
    { selector: '[class*="ProductDetailGallery"]', source: 'catalog' },
    { selector: '[class*="ProductDetailHeader"]', source: 'catalog' },
    { selector: '[class*="ProductDetailPrice"]', source: 'catalog' },
    { selector: '[class*="ProductDetailDescription"]', source: 'catalog' },
    { selector: '[class*="ProductDetailSpecifications"]', source: 'catalog' },
    { selector: '[class*="ProductDetailVariants"]', source: 'catalog' },
    { selector: '[class*="ProductDetailActions"] button', source: 'commerce' },

    // Product Listing / Search
    { selector: '[class*="FilterSidebar"]', source: 'search' },
    { selector: '[class*="ProductGrid"]', source: 'catalog' },
    { selector: '[class*="ProductCard"]', source: 'catalog' },
  ];

  // -------------------------------------------------------------------------
  // GraphQL source detection
  // -------------------------------------------------------------------------

  var QUERY_SOURCE_MAP = {
    GetProducts: 'catalog',
    GetProductBySku: 'catalog',
    GetProductByUrlKey: 'catalog',
    ProductSearch: 'search',
    GetSearchSuggestions: 'search',
    GetCategories: 'commerce',
    GetCategoryNavigation: 'commerce',
    GetCart: 'commerce',
    AddToCart: 'commerce',
    GetCustomer: 'commerce',
  };

  function detectQuerySource(queryName) {
    if (QUERY_SOURCE_MAP[queryName]) return QUERY_SOURCE_MAP[queryName];
    if (/search/i.test(queryName)) return 'search';
    if (/cart|order|checkout|customer/i.test(queryName)) return 'commerce';
    return 'catalog';
  }

  // -------------------------------------------------------------------------
  // DOM Tagging
  // -------------------------------------------------------------------------

  function tagElements() {
    for (var i = 0; i < RULES.length; i++) {
      var rule = RULES[i];
      var elements = document.querySelectorAll(rule.selector);
      for (var j = 0; j < elements.length; j++) {
        if (!elements[j].hasAttribute('data-inspector-source')) {
          elements[j].setAttribute('data-inspector-source', rule.source);
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // Fetch Interception (GraphQL tracking)
  // -------------------------------------------------------------------------

  var originalFetch = window.fetch;

  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var isGraphQL = url.indexOf('/api/graphql') !== -1 || url.indexOf('/graphql') !== -1;

    if (!isGraphQL || !init || init.method !== 'POST') {
      return originalFetch.apply(this, arguments);
    }

    var body;
    try {
      body = JSON.parse(init.body);
    } catch (e) {
      return originalFetch.apply(this, arguments);
    }

    var queryString = body.query || '';
    var nameMatch = queryString.match(/(?:query|mutation)\s+(\w+)/);
    var queryName = nameMatch ? nameMatch[1] : 'Anonymous';
    var source = detectQuerySource(queryName);
    var startTime = performance.now();

    return originalFetch.apply(this, arguments).then(function (response) {
      var responseTime = Math.round(performance.now() - startTime);
      var timestamp = Date.now();

      if (typeof window.__demoInspectorTrackQuery === 'function') {
        window.__demoInspectorTrackQuery({
          id: queryName + '-' + timestamp,
          name: queryName,
          source: source,
          responseTime: responseTime,
          timestamp: timestamp,
        });
      }

      if (typeof window.__demoInspectorStoreData === 'function') {
        var clonedResponse = response.clone();
        clonedResponse
          .json()
          .then(function (data) {
            window.__demoInspectorStoreData({
              queryName: queryName,
              source: source,
              data: data,
              timestamp: timestamp,
            });
          })
          .catch(function () {});
      }

      return response;
    });
  };

  // -------------------------------------------------------------------------
  // MutationObserver — re-tag after React renders
  // -------------------------------------------------------------------------

  var debounceTimer;

  function scheduleTag() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(tagElements, 100);
  }

  var observer = new MutationObserver(scheduleTag);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // Initial pass
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tagElements);
  } else {
    tagElements();
  }
})();
