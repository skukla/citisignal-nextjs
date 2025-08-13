import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

// Create a function to generate the Apollo Client
// This ensures we get a fresh instance on the server for each request
function createApolloClient() {
  // Use absolute URL for SSR, relative for client
  const uri = typeof window === 'undefined' 
    ? `${process.env.PUBLIC_APP_URL || 'http://localhost:3000'}/api/graphql`
    : '/api/graphql';

  const httpLink = createHttpLink({
    uri,
    // Ensure cookies are included for authentication
    credentials: 'same-origin',
  });

  // Middleware to clean up federation artifacts
  const cleanupLink = new ApolloLink((operation, forward) => {
    // Remove __typename from variables to avoid issues
    const cleanedVariables = JSON.parse(JSON.stringify(operation.variables || {}));
    operation.variables = cleanedVariables;
    
    return forward(operation);
  });

  return new ApolloClient({
    link: ApolloLink.from([cleanupLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            Catalog_productSearch: {
              keyArgs: ['phrase', 'filter', 'page_size', 'current_page', 'sort'],
              merge(existing, incoming, { args }) {
                // Handle pagination merging
                if (args?.current_page === 1) {
                  return incoming;
                }
                return {
                  ...incoming,
                  items: [...(existing?.items || []), ...incoming.items],
                };
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: typeof window === 'undefined' ? 'network-only' : 'cache-and-network',
      },
      query: {
        fetchPolicy: typeof window === 'undefined' ? 'network-only' : 'cache-first',
      },
    },
    // Disable SSR for queries that should only run on the client
    ssrMode: typeof window === 'undefined',
  });
}

// For SSR: Always create a new instance
// For Client: Reuse the same instance
let apolloClient: ApolloClient<any> | null = null;

export function getApolloClient() {
  // On the server, always create a new client
  if (typeof window === 'undefined') {
    return createApolloClient();
  }
  
  // On the client, reuse the client
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  
  return apolloClient;
}

// Export a default client for backward compatibility
const client = getApolloClient();
export default client;