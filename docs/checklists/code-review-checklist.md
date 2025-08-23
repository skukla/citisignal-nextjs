# Code Review Checklist

## 🔴 MANDATORY: After Every Implementation

Run through this checklist IMMEDIATELY after making any code changes.

## 1. Over-Engineering Check

### Signs of Over-Engineering

- [ ] **Unnecessary Abstractions** - Can this be simpler?
- [ ] **Premature Optimization** - Are we solving problems we don't have?
- [ ] **Too Many Layers** - Can we reduce indirection?
- [ ] **Unused Parameters** - Remove delay, options we don't use
- [ ] **Dead Code** - Remove commented code, unused imports
- [ ] **Complex When Simple Works** - Is there a straightforward solution?

### Simplification Questions

```typescript
// ❌ Over-engineered
const createHandler = (options = {}) => {
  const { delay = 0, retries = 0, ...rest } = options;
  return async (data) => {
    // Complex logic for features we don't use
  };
};

// ✅ Simple
const handleData = (data) => {
  // Direct implementation
};
```

## 2. Project Organization Check

### File Placement Verification

- [ ] **Component Location** - Is it in the right folder?
  - `/components/ui/` - Reusable, generic UI components
  - `/components/layout/` - Page-level compound components
  - `/components/sections/` - Page-specific sections
- [ ] **Hook Location** - Custom hooks in `/hooks/`?
- [ ] **Type Definitions** - In `/types/` or colocated?
- [ ] **Utilities** - Helper functions in `/utils/`?
- [ ] **Data/Config** - Static data in `/data/`?

### Naming Conventions

- [ ] **File Names** - Match existing patterns?
  - Components: `PascalCase.tsx`
  - Hooks: `camelCase.ts` starting with `use`
  - Utils: `camelCase.ts`
  - Types: `PascalCase.types.ts` or `/types/name.ts`
- [ ] **Export Patterns** - Default vs named exports consistent?
- [ ] **Folder Structure** - Follows established nesting?

### Import Organization

- [ ] **Import Order** - Following project convention?

  ```typescript
  // 1. React/Next imports
  import { useState } from 'react';
  import Image from 'next/image';

  // 2. External libraries
  import { useQuery } from 'swr';

  // 3. Internal absolute imports
  import { Button } from '@/components/ui/Button';

  // 4. Relative imports
  import { LocalComponent } from './LocalComponent';

  // 5. Types
  import type { Product } from '@/types/product';
  ```

- [ ] **Path Aliases** - Using `@/*` not relative paths?
- [ ] **Circular Dependencies** - None introduced?

### Component Organization

- [ ] **Compound Components** - Properly structured?
  ```
  ProductPage/
  ├── index.tsx                    # Main export
  ├── providers/                   # Context providers
  │   ├── ProductDataContext.tsx
  │   └── ProductFilterContext.tsx
  ├── structure/                   # Layout components
  │   ├── ProductPageLayout.tsx
  │   └── ProductPageHeader.tsx
  ├── products/                    # Product-specific
  │   └── ProductPageContent.tsx
  └── states/                      # State components
      ├── ProductPageSkeleton.tsx
      └── ProductPageError.tsx
  ```

### Code Colocation

- [ ] **Related Files Together** - Styles, tests, types near component?
- [ ] **Single Responsibility** - Each file has one clear purpose?
- [ ] **No Duplication** - Reusing existing components/utils?

## 3. Pattern Consistency Check

### Verify Against Existing Patterns

- [ ] **Component Structure** - Match existing compound component patterns?
- [ ] **Hook Patterns** - Follow single-responsibility like `usePageLoading`?
- [ ] **Data Flow** - Use Context consistently like other components?
- [ ] **Naming Conventions** - Match existing naming patterns?

### Pattern Checklist

```bash
# Check similar components for patterns
grep -r "similar-component" src/components/
# Compare your implementation with existing ones
```

## 4. Business Logic & Type Safety

### Business Logic Handling

- [ ] **Extracted Functions** - Complex logic in named functions?
- [ ] **No Inline Business Rules** - Conditions extracted and named?
- [ ] **Single Source of Truth** - Constants defined once?
- [ ] **Clear Intent** - Function names describe business purpose?

### Type Safety Verification

- [ ] **All Types Defined** - No `any` types unless absolutely necessary?
- [ ] **Consistent Interfaces** - Types match across components?
- [ ] **Proper Imports** - Using type imports where appropriate?
- [ ] **No Type Assertions** - Avoid `as` unless necessary?

```typescript
// ❌ Bad: Inline business logic, poor types
const isEligible =
  user.age > 18 && user.status === 'active' && (user.credits > 100 || user.premium);

// ✅ Good: Extracted, typed, clear intent
interface User {
  age: number;
  status: UserStatus;
  credits: number;
  premium: boolean;
}

const isUserEligibleForFeature = (user: User): boolean => {
  const isAdult = user.age > MINIMUM_AGE;
  const isActive = user.status === 'active';
  const hasCreditsOrPremium = user.credits > CREDIT_THRESHOLD || user.premium;

  return isAdult && isActive && hasCreditsOrPremium;
};
```

## 5. Consistency Checklist

### Style Consistency

- [ ] **Tailwind Classes** - Not inline styles?
- [ ] **Import Order** - Following project convention?
- [ ] **Component Composition** - Using compound pattern where appropriate?
- [ ] **Error Handling** - Consistent with project approach?

### API Consistency

- [ ] **Custom Resolvers** - Using `Citisignal_*` queries?
- [ ] **Data Normalization** - Handled in resolver, not frontend?
- [ ] **Loading States** - Using coordinated loading pattern?
- [ ] **Cache Strategy** - Following SWR patterns?

## 6. Performance & Maintainability

### Performance Review

- [ ] **No Unnecessary Re-renders** - Proper memo/callback usage?
- [ ] **Bundle Size** - Not importing entire libraries?
- [ ] **Lazy Loading** - Applied where appropriate?
- [ ] **Image Optimization** - Using proper Next.js Image component?

### Maintainability Check

- [ ] **Self-Documenting Code** - Clear without extensive comments?
- [ ] **Testable Functions** - Pure functions where possible?
- [ ] **Error Messages** - Helpful for debugging?
- [ ] **No Magic Numbers** - All values are named constants?

## 7. Red Flags to Fix Immediately

🚨 **Must Fix Before Considering Complete:**

- Files in wrong directories
- Mixed patterns (some Context, some prop drilling)
- Inconsistent import order
- Wrong naming conventions
- Inconsistent error handling
- Business logic in JSX
- Untyped function parameters
- Complex nested ternaries
- Inline event handlers with logic
- Direct DOM manipulation
- Console.log statements
- Commented out code
- TODO comments without tickets
- Relative imports instead of @/\* aliases

## 8. Final Verification Steps

Run these commands before marking complete:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Check for console.logs
grep -r "console.log" src/

# Check for TODOs
grep -r "TODO" src/

# Check for any types
grep -r ": any" src/
```

## 9. Questions to Ask Yourself

Before marking any task complete:

1. Would a new developer understand this code?
2. Is this the simplest solution that works?
3. Does this match our existing patterns?
4. Are all business rules clearly expressed?
5. Is every type properly defined?
6. Have I removed all debugging artifacts?
7. Is this consistent with the rest of the codebase?

## Example Review Process

```typescript
// After implementing LayeredTransition changes:

// 1. Check for over-engineering
// ✅ Removed absolute positioning complexity
// ✅ Simplified to conditional rendering

// 2. Verify pattern consistency
// ✅ Matches other transition components
// ✅ Uses same FadeTransition pattern

// 3. Check business logic
// ✅ Clear conditional: if showing content, render content
// ✅ Types properly defined

// 4. Update documentation
// ✅ Updated loading-strategy.md
// ✅ Updated code examples

// 5. Remove debug code
// ✅ No console.logs
// ✅ No commented code
```

## Integration with Development Flow

1. **Write Code** - Implement feature/fix
2. **Run This Checklist** - Check all items
3. **Refactor if Needed** - Simplify and align
4. **Update Documentation** - Follow documentation checklist
5. **Final Verification** - Run commands
6. **Mark Complete** - Only when all checks pass

**Remember: Simple, consistent code is maintainable code!**
