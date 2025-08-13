import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { removeDirectivesFromDocument } from '@apollo/client/utilities';

// Use our API route which handles authentication server-side
const httpLink = createHttpLink({
  uri: '/api/graphql',
});

// Middleware to clean up federation artifacts
const cleanupLink = new ApolloLink((operation, forward) => {
  // Remove __typename from variables to avoid issues
  const cleanedVariables = JSON.parse(JSON.stringify(operation.variables || {}));
  operation.variables = cleanedVariables;
  
  return forward(operation);
});

const client = new ApolloClient({
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
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;