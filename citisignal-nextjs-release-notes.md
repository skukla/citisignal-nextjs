# citisignal-nextjs v1.0.0-beta.1

**⚠️ Beta Release - Work in Progress**

Initial beta release of CitiSignal - a modern Next.js 15 telecommunications storefront demonstrating Adobe Commerce integration. This is a functional e-commerce application with **cart operations, product browsing, and checkout flow**, though some features remain incomplete.

## ✅ What's Implemented

### E-Commerce Core (Fully Functional)

- **Product Catalog**: Browse phones, accessories, watches, gift cards, plans, and streaming devices
- **Product Details**: Full product pages with variant selection and pricing
- **Shopping Cart** ✅:
  - Add to cart with variant support
  - Update quantities with optimistic updates
  - Remove individual items
  - Clear entire cart
  - Real-time cart badge with loading indicators
  - Proper error handling and recovery
- **Search & Filtering**: Category pages with faceted search
- **Category Navigation**: Multi-level navigation with breadcrumbs

### Checkout Flow (Implemented)

- **Checkout Page**: Multi-step checkout process
- **Order Confirmation**: Post-purchase confirmation page
- **Route Structure**: Dedicated checkout layout with proper routing

### Account Management (UI Implemented)

- **Dashboard**: Account overview
- **Order History**: View past orders with detail pages
- **Profile Management**: Edit account information
- **Address Book**: Manage shipping/billing addresses
- **Payment Methods**: Manage saved payment options
- **Saved Items**: Wishlist functionality
- **Authentication**: Login and signup pages

## 🚧 Limitations & Known Issues

### Backend Integration Incomplete

- Account features have UI but may need backend connection
- Checkout flow exists but payment processing needs implementation
- Order history may need backend API integration
- Authentication system needs token management

### Missing Features

- User session persistence
- Order placement completion
- Payment gateway integration
- Email notifications
- Advanced search (filters work, but may need refinement)

### Best For

- ✅ Product demonstrations
- ✅ UI/UX showcases
- ✅ Adobe Commerce integration testing
- ✅ Cart and browsing functionality
- ❌ Production e-commerce (not yet)

## 📋 Requirements

- **Node.js**: 20.11.0 or higher
- **Adobe Commerce**: Backend instance with GraphQL API
- **API Mesh**: Deployed `commerce-mesh` v1.0.0-beta.1+

## 🛠️ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit with your mesh endpoint:
# NEXT_PUBLIC_MESH_ENDPOINT=https://your-mesh.adobeio-static.net/graphql
# NEXT_PUBLIC_STORE_CODE=default

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

## 🎨 Technology Stack

- **Framework**: Next.js 15.4.2 (App Router)
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **UI Components**: Headless UI, Heroicons, Lucide React
- **Data Fetching**: SWR for client-side, native fetch for SSR
- **GraphQL**: Direct fetch to Adobe API Mesh
- **TypeScript**: Full type safety

## 📁 Project Structure

- `src/app/(home)/` - Homepage
- `src/app/(products)/` - Product catalog pages
  - `[slug]/` - Dynamic product detail pages
  - `phones/`, `accessories/`, `watches/`, etc. - Category pages
- `src/app/(checkout)/` - Checkout flow
  - `checkout/` - Checkout page
  - `confirmation/` - Order confirmation
- `src/app/(account)/` - Account management
  - `dashboard/` - Account overview
  - `orders/` - Order history
  - `profile/` - Profile editing
  - `addresses/` - Address book
  - `payment/` - Payment methods
  - `saved/` - Wishlist
- `src/app/api/graphql/` - GraphQL proxy endpoint
- `src/components/` - Reusable React components
- `src/contexts/` - React Context providers
- `src/hooks/` - Custom React hooks
- `src/graphql/` - GraphQL queries/mutations
- `src/lib/` - Utility libraries
- `src/types/` - TypeScript type definitions
- `public/` - Static assets

## 🎯 Recent Updates

### Cart System (Latest)

- Complete cart functionality with Adobe Commerce integration
- Optimistic updates with loading states
- Variant-aware cart with proper pricing and images
- Clear cart with modern confirmation dialog
- Comprehensive error handling

### Product Features

- Configurable options for variant selection
- Semantic image fields (base, small, thumbnail)
- Dual pricing display (regular + special)
- Smart "Add to Cart" button text based on product type

### API & GraphQL

- Updated GraphQL proxy for cart header support
- Standardized environment variable names
- Improved query structure for efficiency

## 📝 Use Cases

**Perfect For**:

- Product catalog demonstrations
- Cart and browsing UX testing
- Adobe Commerce + Next.js integration examples
- Modern e-commerce UI patterns
- Learning Next.js 15 App Router

**Not Yet Ready For**:

- Production e-commerce
- Real payment processing
- Complete order management
- Live customer accounts

## 🐛 Reporting Issues

This is a beta release with known limitations. Please report:

- Cart functionality issues
- Product display problems
- Performance concerns
- Missing or incorrect data

**GitHub Issues**: https://github.com/skukla/citisignal-nextjs/issues

## 🔄 Roadmap

Future releases will complete:

- ✅ Complete backend integration for account features
- ✅ Payment gateway integration
- ✅ Order placement and confirmation
- ✅ User authentication with session management
- ✅ Email notifications
- ✅ Advanced search refinements
- ✅ Performance optimizations

## 📚 Related Projects

- **Commerce Mesh** (`commerce-mesh`): API layer providing GraphQL endpoint
- **Kukla Integration Service** (`kukla-integration-service`): Product data management

---

**Version**: v1.0.0-beta.1  
**Release Date**: January 2025  
**Node Version**: 20.11.0+  
**Status**: Beta (functional for demos, not production-ready)  
**License**: Private
