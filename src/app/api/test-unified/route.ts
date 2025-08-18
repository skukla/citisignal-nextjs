import { NextResponse } from 'next/server';
import { graphqlFetcher } from '@/lib/graphql-fetcher';

const UNIFIED_QUERY = `
  query TestUnifiedQuery($category: String, $pageSize: Int) {
    Citisignal_productPageData(category: $category, pageSize: $pageSize, currentPage: 1) {
      navigation {
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
      products {
        items {
          id
          name
          sku
          price
        }
        totalCount
        page_info {
          current_page
          page_size
          total_pages
        }
      }
      facets {
        facets {
          title
          key
          type
          options {
            id
            name
            count
          }
        }
      }
      breadcrumbs {
        items {
          name
          urlPath
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const result = await graphqlFetcher(UNIFIED_QUERY, {
      category: 'phones',
      pageSize: 5
    });
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Unified query executed successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}