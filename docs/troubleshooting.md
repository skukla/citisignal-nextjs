# Troubleshooting

## Common Issues

### GraphQL Queries
- Test queries in GraphQL playground first
- Mesh changes take 2-3 minutes to propagate
- Check if using correct service (Catalog vs Search)

### Multi-Store Configuration Issues

**Navigation/Categories Not Loading:**
- Adobe Commerce multi-store instances require the `Store` header
- Without it, queries may return the "default" store which often has no categories
- The GraphQL proxy in `/src/app/api/graphql/route.ts` must include:
  ```typescript
  'Store': process.env.ADOBE_COMMERCE_STORE_VIEW_CODE || ''
  ```
- This header tells Commerce which store view to use (e.g., `citisignal_us`)

**Different Header Conventions:**
- **Commerce Core GraphQL**: Uses `Store` header with store view code
- **Catalog Service/Live Search**: Uses `Magento-Store-View-Code`, `Magento-Store-Code`, etc.
- The mesh configuration passes both to support all services

### Images Not Loading
- Use `secure_image` field for HTTPS URLs
- Verify Next.js config supports both HTTP/HTTPS:
```javascript
remotePatterns: [
  { protocol: 'https', hostname: '...' },
  { protocol: 'http', hostname: '...' }
]
```

### Environment Variables
- Changes require server restart
- Must be in `.env` file
- Required Adobe Commerce variables:
  - `ADOBE_COMMERCE_URL`
  - `ADOBE_COMMERCE_ENVIRONMENT_ID`
  - `ADOBE_COMMERCE_WEBSITE_CODE`
  - `ADOBE_COMMERCE_STORE_CODE`
  - `ADOBE_COMMERCE_STORE_VIEW_CODE`

### TypeScript Errors
- Use type guards for optional properties:
```typescript
// Use optional chaining
product.colors?.[0]?.name

// Type guards
if (hasColors(product)) {
  // product.colors is defined
}
```

### Mobile Menu Not Showing
- Ensure Navigation.Mobile is outside Container/HeaderRoot for proper positioning
- Component must be within NavigationRoot to access context
- Check that NavigationRoot receives isOpen, onToggle, and onClose props

## Performance Tips

### Data Fetching
- Use `revalidateOnFocus: false` in SWR
- Implement pagination early
- Consider infinite scroll vs pagination

### Bundle Size
- SWR (~30KB) vs Apollo (~140KB)
- Use dynamic imports for heavy components
- Leverage Next.js code splitting

## Debugging Workflow

1. **Check Browser Console** - Network and JS errors
2. **Verify API Response** - GraphQL playground
3. **Check TypeScript** - `npm run typecheck`
4. **Review Environment** - `.env` variables
5. **Clear Cache** - `.next` folder and browser

## Git Workflow

### Commit Format
```bash
feat: add product filtering
fix: resolve cart update issue
refactor: simplify checkout flow
docs: update API documentation
```

### Branch Strategy
- Create feature branches from master
- Test thoroughly before merging
- Keep commits atomic and focused