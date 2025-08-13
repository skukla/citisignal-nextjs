import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Require environment variables
    if (!process.env.MESH_ENDPOINT) {
      throw new Error('MESH_ENDPOINT environment variable is not configured');
    }
    if (!process.env.ADOBE_API_KEY) {
      throw new Error('ADOBE_API_KEY environment variable is not configured');
    }
    
    const body = await request.json();
    
    // The mesh endpoint URL should include the API key as a query parameter
    const meshUrl = `${process.env.MESH_ENDPOINT}?api_key=${process.env.ADOBE_API_KEY}`;
    
    const response = await fetch(meshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // These headers are required for the Catalog Service based on mesh.json configuration
        'magento-environment-id': process.env.ADOBE_COMMERCE_ENVIRONMENT_ID!,
        'magento-store-view-code': process.env.ADOBE_COMMERCE_STORE_VIEW_CODE!,
        'magento-website-code': process.env.ADOBE_COMMERCE_WEBSITE_CODE!,
        'magento-store-code': process.env.ADOBE_COMMERCE_STORE_CODE!,
        'magento-customer-group': process.env.ADOBE_COMMERCE_CUSTOMER_GROUP!,
        'x-api-key': 'storefront-widgets', // Required for Catalog Service
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    // Filter out federation-related validation errors that don't affect the actual data
    if (data.errors) {
      data.errors = data.errors.filter((error: any) => {
        if (error.message?.includes('Unknown type \'_Any\'') || 
            error.message?.includes('Field \'_entities\'')) {
          return false;
        }
        return true;
      });
      
      // If no real errors remain, remove the errors field
      if (data.errors.length === 0) {
        delete data.errors;
      }
    }
    
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('GraphQL proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Adobe Commerce' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GraphQL endpoint - use POST method' });
}