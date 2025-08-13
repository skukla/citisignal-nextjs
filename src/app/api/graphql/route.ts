import { NextRequest, NextResponse } from 'next/server';

// GraphQL proxy endpoint that forwards requests to Adobe Mesh
export async function POST(request: NextRequest) {
  const meshEndpoint = process.env.MESH_ENDPOINT;
  
  if (!meshEndpoint) {
    return NextResponse.json(
      { error: 'MESH_ENDPOINT not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    
    // Build headers object - Note: Headers are case-sensitive!
    const headers = {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.ADOBE_CATALOG_API_KEY || process.env.ADOBE_API_KEY || '',
      'Magento-Environment-Id': process.env.ADOBE_COMMERCE_ENVIRONMENT_ID || '',
      'Magento-Website-Code': process.env.ADOBE_COMMERCE_WEBSITE_CODE || '',
      'Magento-Store-Code': process.env.ADOBE_COMMERCE_STORE_CODE || '',
      'Magento-Store-View-Code': process.env.ADOBE_COMMERCE_STORE_VIEW_CODE || '',
      'Magento-Customer-Group': process.env.ADOBE_COMMERCE_CUSTOMER_GROUP || '',
    };
    
    // Forward the request to the mesh endpoint with required headers
    const response = await fetch(meshEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('GraphQL proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy GraphQL request' },
      { status: 500 }
    );
  }
}

// Support OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}