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
    { selector: '[data-inspector-component="ProductDetailGallery"]', source: 'catalog' },
    { selector: '[data-inspector-component="ProductDetailHeader"]', source: 'catalog' },
    { selector: '[data-inspector-component="ProductDetailPrice"]', source: 'catalog' },
    { selector: '[data-inspector-component="ProductDetailDescription"]', source: 'catalog' },
    { selector: '[data-inspector-component="ProductDetailSpecifications"]', source: 'catalog' },
    { selector: '[data-inspector-component="ProductDetailVariants"]', source: 'catalog' },
    { selector: '[data-inspector-component="ProductDetailActions"] button', source: 'commerce' },

    // Product Listing / Search
    { selector: '[data-inspector-component="FilterSidebar"]', source: 'search' },
    { selector: '[data-inspector-component="ProductGrid"]', source: 'catalog' },
    { selector: '[data-inspector-component="ProductCard"]', source: 'catalog' },
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
      .then(function (json) {
        var innerData = json && json.data ? json.data : json;
        var source = detectSource(queryName, innerData);
        trackQuery({ name: queryName, source: source, responseTime: responseTime });
        trackData({ queryName: queryName, source: source, data: innerData });
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
