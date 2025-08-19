/**
 * Lightweight SSR fetcher functions for static content
 * 
 * These functions are designed for server-side rendering of content that:
 * - Rarely changes (navigation, breadcrumbs)
 * - Should never show loading states
 * - Benefits from being instantly available
 * 
 * Products and facets remain client-side for better interactivity.
 */

interface NavigationItem {
  href: string;
  label: string;
  category?: string;
}

interface BreadcrumbItem {
  name: string;
  urlPath: string;
}

export interface SSRNavigationData {
  navigation: {
    headerNav: NavigationItem[];
    footerNav: Array<{ href: string; label: string }>;
  };
  breadcrumbs: {
    items: BreadcrumbItem[];
  };
}

/**
 * Fetch navigation data server-side
 * Used for instant navigation rendering without skeleton loaders
 */
export async function fetchNavigationSSR(): Promise<SSRNavigationData['navigation'] | null> {
  console.log('fetchNavigationSSR called');
  try {
    const meshEndpoint = process.env.MESH_ENDPOINT;
    if (!meshEndpoint) {
      console.error('MESH_ENDPOINT not configured');
      return null;
    }
    console.log('Fetching navigation from:', meshEndpoint);

    const query = `
      query GetNavigation {
        Citisignal_categoryNavigation {
          headerNav {
            href
            label
            category
          }
          footerNav {
            href
            label
          }
        }
      }
    `;

    const response = await fetch(meshEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.ADOBE_CATALOG_API_KEY || '',
        'Magento-Environment-Id': process.env.ADOBE_COMMERCE_ENVIRONMENT_ID || '',
        'Magento-Website-Code': process.env.ADOBE_COMMERCE_WEBSITE_CODE || '',
        'Magento-Store-Code': process.env.ADOBE_COMMERCE_STORE_CODE || '',
        'Magento-Store-View-Code': process.env.ADOBE_COMMERCE_STORE_VIEW_CODE || '',
        'Magento-Customer-Group': process.env.ADOBE_COMMERCE_CUSTOMER_GROUP || '',
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
    
    if (json.errors) {
      console.error('SSR Navigation fetch errors:', json.errors);
      return null;
    }

    const result = json.data?.Citisignal_categoryNavigation || null;
    console.log('Navigation SSR result:', result ? 'Success' : 'Failed');
    return result;
  } catch (error) {
    console.error('Failed to fetch navigation SSR:', error);
    return null;
  }
}

/**
 * Fetch breadcrumbs data server-side
 * Used for instant breadcrumb rendering without skeleton loaders
 */
export async function fetchBreadcrumbsSSR(categoryUrlKey: string): Promise<SSRNavigationData['breadcrumbs'] | null> {
  console.log('fetchBreadcrumbsSSR called for category:', categoryUrlKey);
  try {
    const meshEndpoint = process.env.MESH_ENDPOINT;
    if (!meshEndpoint) {
      console.error('MESH_ENDPOINT not configured');
      return null;
    }

    const query = `
      query GetBreadcrumbs($categoryUrlKey: String!) {
        Citisignal_categoryBreadcrumbs(categoryUrlKey: $categoryUrlKey) {
          items {
            name
            urlPath
          }
        }
      }
    `;

    const response = await fetch(meshEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.ADOBE_CATALOG_API_KEY || '',
        'Magento-Environment-Id': process.env.ADOBE_COMMERCE_ENVIRONMENT_ID || '',
        'Magento-Website-Code': process.env.ADOBE_COMMERCE_WEBSITE_CODE || '',
        'Magento-Store-Code': process.env.ADOBE_COMMERCE_STORE_CODE || '',
        'Magento-Store-View-Code': process.env.ADOBE_COMMERCE_STORE_VIEW_CODE || '',
        'Magento-Customer-Group': process.env.ADOBE_COMMERCE_CUSTOMER_GROUP || '',
      },
      body: JSON.stringify({ 
        query,
        variables: { categoryUrlKey }
      }),
    });

    const json = await response.json();
    
    if (json.errors) {
      console.error('SSR Breadcrumbs fetch errors:', json.errors);
      return null;
    }

    const result = json.data?.Citisignal_categoryBreadcrumbs || null;
    console.log('Breadcrumbs SSR result:', result ? `Found ${result.items?.length || 0} items` : 'No data');
    return result;
  } catch (error) {
    console.error('Failed to fetch breadcrumbs SSR:', error);
    return null;
  }
}

/**
 * Fetch all SSR data for a category page
 * Combines navigation and breadcrumbs into a single object
 */
export async function fetchSSRData(categoryUrlKey: string): Promise<SSRNavigationData | null> {
  const [navigation, breadcrumbs] = await Promise.all([
    fetchNavigationSSR(),
    fetchBreadcrumbsSSR(categoryUrlKey)
  ]);

  if (!navigation || !breadcrumbs) {
    return null;
  }

  return {
    navigation,
    breadcrumbs
  };
}