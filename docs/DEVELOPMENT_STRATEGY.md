# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## API Integration Architecture

### Adobe Commerce API Mesh Configuration
The project uses Adobe Commerce API Mesh (deployed in `/commerce-mesh` directory) with the following endpoint:
`https://edge-sandbox-graph.adobe.io/api/d5818ebf-e560-45b3-9830-79183dbfaf27/graphql`

#### Available Services
1. **Catalog Service** (`Catalog_*` queries)
   - `Catalog_productSearch` - Product search with custom resolver fields
   - `Catalog_products(skus: [...])` - Fetch specific products by SKU
   - `Catalog_categories` - Category hierarchy and structure

2. **Live Search** (`Search_*` queries)
   - `Search_productSearch` - AI-powered search with facets and suggestions
   - Better for category pages with filtering needs
   - Provides dynamic facets based on search results

3. **Commerce GraphQL** (`Commerce_*` queries)
   - Core Adobe Commerce operations (cart, checkout, customer)

#### Custom Resolver Fields
The mesh includes custom resolvers that extend product types with clean, business-friendly fields:
- `manufacturer` - Extracts and cleans manufacturer from `cs_manufacturer` attribute
- `memory_options` - Array of memory options from product options (e.g., ["128GB", "256GB"])
- `available_colors` - Array of color objects with name and hex values
- `is_on_sale` - Boolean calculated by comparing regular and final prices

#### Service Usage Guidelines

**For Category Pages:**
- Use hybrid approach for best UX:
  - `Catalog_productSearch` for initial product grid with custom fields
  - `Search_productSearch` for faceted filtering and search within category
- Both services work and complement each other

**For Product Detail Pages:**
- Use `Catalog_products(skus: [sku])` to fetch specific product with all custom fields
- Access manufacturer, memory options, colors, and sale status directly

**For Search Functionality:**
- Use `Search_productSearch(phrase: "...")` for search bar
- Provides suggestions array and relevant facets
- Returns products with AI-powered relevance ranking

## Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Development server runs on http://localhost:3000
```

## Architecture Overview

CitiSignal is a Next.js 15.4.2 telecommunications website built with TypeScript and Tailwind CSS 4. The codebase follows modern React patterns with a comprehensive component system and App Router architecture.

### Key Technologies
- **Next.js 15** with App Router (using Turbopack for development)
- **React 19** with TypeScript 5
- **Tailwind CSS 4** with custom theming
- **HeadlessUI** for accessible components
- **Context-based state management** (Auth, Cart, Checkout, Account)

### Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── account/      # Account management with nested routes (auth/, dashboard/, orders/, etc.)
│   ├── phones/       # Product pages
│   └── checkout/     # Multi-step checkout flow
├── components/
│   ├── layout/       # Root, Content, Page, Header, Footer components
│   ├── sections/     # Page-specific sections (HeroSection, CoverageSection, etc.)
│   └── ui/           # Reusable UI components with compound patterns
├── hooks/            # Custom hooks for forms, UI state, business logic
├── types/            # TypeScript interfaces for commerce, UI, forms
├── data/             # Static configuration data for pages and sections
└── utils/            # Utility functions
```

### Component Architecture Patterns

#### 1. Compound Component Pattern
Used extensively for complex UI components:
```tsx
<ProductCard.Root product={productData}>
  <ProductCard.Image />
  <ProductCard.Badges />
  <ProductCard.Info />
  <ProductCard.Price />
  <ProductCard.Actions />
</ProductCard.Root>
```

#### 2. Context Providers
Multiple context providers wrap the app in `layout.tsx`:
- AuthProvider for authentication state
- AccountProvider for user account data
- CartProvider for shopping cart state
- CheckoutProvider for checkout flow

#### 3. Custom Hooks Pattern
Centralized business logic in `/src/hooks/`:
- Form management: `useForm`, `useFieldValidation`, `useFormSubmission`
- UI state: `usePanel`, `useExpandableSections`
- Domain logic: `useProductList`, `useSearchBar`

### Styling System

- **Tailwind CSS 4** with custom CitiSignal branding colors
- **Primary color**: `#8821f4` (citisignal.primary)
- Component variants using `class-variance-authority`
- Responsive mobile-first design
- Dark mode support via `prefers-color-scheme`

### TypeScript Configuration

- Path aliases: `@/*` maps to `./src/*`
- Strict mode enabled
- Comprehensive type coverage for commerce entities and UI components

### Business Domain

The application simulates a complete telecommunications e-commerce experience:
- Product catalog with phones, watches, accessories
- Service plans and coverage information  
- Shopping cart and multi-step checkout
- Account management with authentication
- Order history and profile management

### Development Notes

- Uses compound component patterns for maintainable UI
- Data is separated from UI in `/src/data/` configuration files
- Form validation handled through custom hooks
- Global state managed via React Context (no external state library)
- Components are fully typed with domain-specific interfaces
- Layout components handle conditional rendering (excludes headers on checkout pages)

### Git Commit Guidelines

- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Keep commits atomic and focused
- Write clear, descriptive commit messages
- Do not include AI assistant attribution in commit messages