/**
 * Demo Inspector — Runtime Tagging (Next.js)
 *
 * Applies data-inspector-source attributes using the vendored Demo Inspector
 * SDK so the Chrome extension can visualize API Mesh data sources.
 *
 * Uses CSS selectors and MutationObserver to tag elements after React renders.
 * GraphQL tracking uses the SDK's detectSource/trackQuery/trackData functions.
 *
 * This script is inert unless the Chrome extension is installed — the
 * data attributes have no effect on rendering or functionality.
 */

(async function () {
  'use strict';

  // Dynamic import — the Script tag loads this as a regular script, not a module
  const { tagMeshSources } = await import('./demo-inspector-sdk/mesh.js');
  const { detectSource, trackQuery, trackData } = await import('./demo-inspector-sdk/tracking.js');

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
  // DOM Tagging — delegates to SDK's tagMeshSources()
  // -------------------------------------------------------------------------

  function tagElements() {
    for (var i = 0; i < RULES.length; i++) {
      var rule = RULES[i];
      tagMeshSources(rule.selector, rule.source);
    }
  }

  // -------------------------------------------------------------------------
  // Fetch Interception — uses SDK's detectSource/trackQuery/trackData
  // -------------------------------------------------------------------------

  var originalFetch = window.fetch;

  window.fetch = async function (input, init) {
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
    var startTime = performance.now();

    var response = await originalFetch.apply(this, arguments);
    var responseTime = Math.round(performance.now() - startTime);

    var clonedResponse = response.clone();
    clonedResponse
      .json()
      .then(function (data) {
        var source = detectSource(queryName, data);
        trackQuery({ name: queryName, source: source, responseTime: responseTime });
        trackData({ queryName: queryName, source: source, data: data });
      })
      .catch(function () {});

    return response;
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
