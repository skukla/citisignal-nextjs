# Contributing to CitiSignal Next.js

Thank you for your interest in contributing to CitiSignal! This guide will help you get started with development and ensure a smooth contribution process.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Common Tasks](#common-tasks)

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git**
- **Code Editor** (VS Code recommended)
- **Adobe Commerce Mesh** access (for backend testing)

### First-Time Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/skukla/citisignal-nextjs.git
   cd citisignal-nextjs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

---

## Development Setup

### Environment Variables

Create `.env.local` with:

```bash
# Adobe Commerce Mesh API endpoint
NEXT_PUBLIC_MESH_ENDPOINT=https://your-mesh-endpoint.adobe.io/graphql

# Other configuration...
```

### Recommended VS Code Extensions

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **GraphQL** - GraphQL syntax highlighting

### Linting & Formatting

The project uses ESLint and Prettier with lint-staged for automatic formatting:

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code (done automatically on commit)
npm run format
```

---

## Project Structure

```
citisignal-nextjs/
├── src/
│   ├── app/                      # Next.js App Router pages
│   ├── components/               # React components
│   │   ├── layout/               # Layout components (Header, Footer, etc.)
│   │   ├── sections/             # Page sections
│   │   └── ui/                   # Reusable UI components
│   ├── contexts/                 # React contexts
│   ├── hooks/                    # Custom React hooks
│   │   └── products/             # Product-related hooks (active patterns)
│   ├── lib/                      # Utilities and helpers
│   ├── graphql/                  # GraphQL queries and fragments
│   ├── types/                    # TypeScript type definitions
│   └── reference/                # 📚 Read-only reference implementations
│       └── unified-query/        # Unified query pattern (educational only)
├── docs/                         # Documentation
├── public/                       # Static assets
└── tests/                        # Test files

Legend:
📚 = Reference only (not actively maintained)
```

### Key Directories

- **`src/app/`** - Next.js pages using App Router
- **`src/components/`** - All React components
- **`src/hooks/`** - Custom hooks (use these for active patterns)
- **`src/reference/`** - Educational examples only, not for active use

---

## Development Workflow

### Creating a New Feature

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

3. **Test locally:**

   ```bash
   npm run build
   npm run dev
   ```

4. **Commit with conventional commits:**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `chore/` - Maintenance tasks

Examples:

```
feature/add-wishlist-component
fix/product-card-price-display
refactor/unified-query-reference
docs/update-api-reference
chore/update-dependencies
```

---

## Code Style

### TypeScript

- ✅ Use TypeScript for all new files
- ✅ Define explicit types for props and return values
- ✅ Avoid `any` - use `unknown` if type is truly unknown
- ✅ Use interfaces for object shapes, types for unions/primitives

```typescript
// ✅ Good
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

// ❌ Avoid
function MyComponent(props: any) { ... }
```

### React Components

- ✅ Use functional components with hooks
- ✅ Use TypeScript for props
- ✅ Extract complex logic to custom hooks
- ✅ Keep components focused and single-purpose

```typescript
// ✅ Good
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { formatPrice } = usePrice();
  return <div>{formatPrice(product.price)}</div>;
}
```

### Naming Conventions

| Type             | Convention          | Example                   |
| ---------------- | ------------------- | ------------------------- |
| Components       | PascalCase          | `ProductCard.tsx`         |
| Hooks            | camelCase with 'use | `useProductCards.ts`      |
| Utilities        | camelCase           | `formatPrice.ts`          |
| Constants        | UPPER_SNAKE_CASE    | `MAX_ITEMS_PER_PAGE`      |
| Types/Interfaces | PascalCase          | `Product`, `CartItem`     |
| GraphQL queries  | PascalCase          | `GetProductCards.graphql` |

### Import Order

1. External libraries (React, Next.js, etc.)
2. Internal components
3. Hooks
4. Utilities
5. Types
6. Styles

```typescript
// ✅ Good
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ProductCard } from '@/components/ui/ProductCard';
import { useProductCards } from '@/hooks/products/useProductCards';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types/product';
```

### Tailwind CSS

- ✅ Use Tailwind utility classes
- ✅ Keep class names readable (break long lists into multiple lines)
- ✅ Use `clsx` or `cn()` for conditional classes
- ❌ Avoid inline styles unless absolutely necessary

```typescript
// ✅ Good
<div
  className={cn(
    'rounded-lg bg-white p-4 shadow-sm',
    'hover:shadow-md transition-shadow',
    isActive && 'ring-2 ring-blue-500'
  )}
>
```

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation only
- **refactor:** Code change that neither fixes a bug nor adds a feature
- **style:** Formatting, missing semicolons, etc. (not CSS)
- **test:** Adding or updating tests
- **chore:** Maintenance tasks, dependencies, etc.
- **perf:** Performance improvement

### Examples

```bash
feat: add product wishlist functionality

fix: correct price display on product cards

refactor: move unified query to reference directory

chore: update dependencies
```

### Commit Message Guidelines

- ✅ Use present tense ("add feature" not "added feature")
- ✅ Use imperative mood ("move cursor to..." not "moves cursor to...")
- ✅ First line should be 72 characters or less
- ✅ Reference issues/PRs when applicable

---

## Pull Request Process

### Before Submitting

1. **Ensure your branch is up to date:**

   ```bash
   git checkout main
   git pull origin main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run linting and build:**

   ```bash
   npm run lint
   npm run build
   ```

3. **Test your changes:**
   ```bash
   npm run dev
   # Manually test your feature
   ```

### PR Title

Use the same format as commit messages:

```
feat: add product comparison feature
fix: resolve product card layout issue
docs: add contributing guidelines
```

### PR Description Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tested locally
- [ ] Build passes
- [ ] No console errors

## Screenshots (if applicable)

[Add screenshots here]

## Related Issues

Closes #123
```

### Review Process

1. **Automated checks** must pass (linting, build)
2. **At least one approval** from a maintainer
3. **No merge conflicts** with main branch
4. **All comments addressed**

---

## Testing

### Manual Testing

```bash
# Development
npm run dev

# Production build
npm run build
npm run start
```

### Testing Checklist

When making changes, verify:

- [ ] Page loads without errors
- [ ] GraphQL queries execute successfully
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] No TypeScript errors (`npm run build`)
- [ ] No console errors or warnings
- [ ] Browser compatibility (Chrome, Safari, Firefox)

### Testing with Commerce Mesh

Ensure your changes work with the backend:

```bash
# Verify mesh endpoint is configured
echo $NEXT_PUBLIC_MESH_ENDPOINT

# Test GraphQL queries in browser
# Navigate to: http://localhost:3000 and verify GraphQL queries
```

---

## Common Tasks

### Adding a New Component

1. **Create component file:**

   ```typescript
   // src/components/ui/MyComponent.tsx
   import type { ReactNode } from 'react';

   interface MyComponentProps {
     children: ReactNode;
   }

   export function MyComponent({ children }: MyComponentProps) {
     return <div>{children}</div>;
   }
   ```

2. **Export from index (if applicable):**

   ```typescript
   // src/components/ui/index.ts
   export { MyComponent } from './MyComponent';
   ```

3. **Use in page/component:**
   ```typescript
   import { MyComponent } from '@/components/ui/MyComponent';
   ```

### Adding a New GraphQL Query

1. **Create query file:**

   ```graphql
   # src/graphql/queries/GetMyData.graphql
   query GetMyData($id: ID!) {
     myData(id: $id) {
       id
       name
     }
   }
   ```

2. **Create hook:**

   ```typescript
   // src/hooks/useMyData.ts
   import { useQuery } from 'swr';
   import { graphqlFetcher } from '@/lib/graphql-fetcher';
   import GET_MY_DATA from '@/graphql/queries/GetMyData.graphql';

   export function useMyData(id: string) {
     return useQuery(['myData', id], () => graphqlFetcher(GET_MY_DATA, { id }));
   }
   ```

### Adding a New Page

```typescript
// src/app/my-page/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page - CitiSignal',
  description: 'Page description',
};

export default function MyPage() {
  return <div>My Page Content</div>;
}
```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages (be careful!)
npm update

# Commit
git add package.json package-lock.json
git commit -m "chore: update dependencies"
```

---

## Reference Implementations

⚠️ **Important:** `src/reference/` contains **read-only** educational examples.

- **DO NOT** modify these files for active development
- **DO NOT** import from `src/reference/` in production code
- **DO** use `src/hooks/` and `src/components/` for active patterns

See [commerce-mesh documentation](../commerce-mesh/docs/) for backend reference patterns.

---

## Getting Help

### Resources

- **Documentation:** See `docs/` directory
- **Commerce Mesh:** [../commerce-mesh/README.md](../commerce-mesh/README.md)

### Questions?

- Open a [GitHub Discussion](https://github.com/skukla/citisignal-nextjs/discussions)
- Create an [Issue](https://github.com/skukla/citisignal-nextjs/issues)
- Contact maintainers

---

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow project conventions

---

Thank you for contributing to CitiSignal! 🎉
