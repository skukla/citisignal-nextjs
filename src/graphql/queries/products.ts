import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT_FIELDS } from '../fragments/product';

/**
 * Query to fetch all phones with pagination
 * Uses string interpolation for fragment fields (not GraphQL fragments)
 */
export const GET_ALL_PHONES = gql`
  query GetAllPhones($pageSize: Int = 20, $currentPage: Int = 1) {
    Catalog_productSearch(
      phrase: ""
      filter: [{ attribute: "categories", eq: "phones" }]
      page_size: $pageSize
      current_page: $currentPage
    ) {
      total_count
      items {
        productView {
          ${PRODUCT_FRAGMENT_FIELDS}
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;

/**
 * Query to fetch popular phones
 * Uses the same fragment fields for consistency
 */
export const GET_POPULAR_PHONES = gql`
  query GetPopularPhones($limit: Int = 4) {
    Catalog_productSearch(
      phrase: ""
      filter: [{ attribute: "categories", eq: "phones" }]
      page_size: $limit
      current_page: 1
    ) {
      total_count
      items {
        productView {
          ${PRODUCT_FRAGMENT_FIELDS}
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;

/**
 * Query to fetch all watches
 */
export const GET_ALL_WATCHES = gql`
  query GetAllWatches($pageSize: Int = 20, $currentPage: Int = 1) {
    Catalog_productSearch(
      phrase: ""
      filter: [{ attribute: "categories", eq: "watches" }]
      page_size: $pageSize
      current_page: $currentPage
    ) {
      total_count
      items {
        productView {
          ${PRODUCT_FRAGMENT_FIELDS}
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;

/**
 * Query to fetch all accessories
 */
export const GET_ALL_ACCESSORIES = gql`
  query GetAllAccessories($pageSize: Int = 20, $currentPage: Int = 1) {
    Catalog_productSearch(
      phrase: ""
      filter: [{ attribute: "categories", eq: "accessories" }]
      page_size: $pageSize
      current_page: $currentPage
    ) {
      total_count
      items {
        productView {
          ${PRODUCT_FRAGMENT_FIELDS}
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;

/**
 * Query to search products by keyword
 */
export const SEARCH_PRODUCTS = gql`
  query SearchProducts($phrase: String!, $pageSize: Int = 20, $currentPage: Int = 1) {
    Catalog_productSearch(
      phrase: $phrase
      page_size: $pageSize
      current_page: $currentPage
    ) {
      total_count
      items {
        productView {
          ${PRODUCT_FRAGMENT_FIELDS}
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;