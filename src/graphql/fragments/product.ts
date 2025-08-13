import { gql } from '@apollo/client';

/**
 * The key to making fragments work with Apollo Client is to:
 * 1. Define them as standalone gql template literals
 * 2. Use them directly in queries without string interpolation
 * 3. Register them with Apollo's fragment matcher if needed
 */

// Base product fields - defined as a string to be embedded
const PRODUCT_BASE_FIELDS = `
  id
  name
  sku
  urlKey
  description
  images {
    url
    label
    roles
  }
`;

// Complex product fields - defined as a string to be embedded
const COMPLEX_PRODUCT_FIELDS = `
  manufacturer
  memory_options
  available_colors {
    name
    hex
  }
  is_on_sale
  priceRange {
    minimum {
      regular {
        amount {
          value
          currency
        }
      }
      final {
        amount {
          value
          currency
        }
      }
    }
  }
  options {
    id
    title
    required
    values {
      ... on Catalog_ProductViewOptionValueSwatch {
        id
        title
        value
      }
    }
  }
  attributes {
    name
    label
    value
  }
  categories
`;

// Simple product fields - defined as a string to be embedded
const SIMPLE_PRODUCT_FIELDS = `
  manufacturer
  is_on_sale
  price {
    regular {
      amount {
        value
        currency
      }
    }
    final {
      amount {
        value
        currency
      }
    }
  }
  attributes {
    name
    label
    value
  }
`;

/**
 * Product fragment that can be embedded directly in queries
 * This is a string template that will be inserted into queries
 */
export const PRODUCT_FRAGMENT_FIELDS = `
  __typename
  ${PRODUCT_BASE_FIELDS}
  ... on Catalog_ComplexProductView {
    ${COMPLEX_PRODUCT_FIELDS}
  }
  ... on Catalog_SimpleProductView {
    ${SIMPLE_PRODUCT_FIELDS}
  }
`;

/**
 * Note: We're using string template fragments (above) rather than 
 * GraphQL fragment definitions because they work more reliably with
 * Apollo Client without requiring additional configuration.
 * 
 * If you want to use proper GraphQL fragments in the future, you would:
 * 1. Define them with the fragment keyword
 * 2. Register them with Apollo's InMemoryCache possibleTypes
 * 3. Include them in queries using ...FragmentName syntax
 */