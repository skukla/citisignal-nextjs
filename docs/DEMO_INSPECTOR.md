# Demo Inspector Integration Guide

This guide explains how the Demo Inspector is integrated into the CitiSignal Next.js application and how to work with it as a Git submodule.

## Overview

The **Demo Inspector** is a development tool that provides real-time visualization of GraphQL queries and data sources. It's maintained as a separate Git repository and integrated into this project as a **Git submodule** at `src/demo-inspector/`.

### Benefits of Submodule Approach

✅ **Independent Development** - Demo Inspector can be updated separately  
✅ **Version Control** - Track which version is in use  
✅ **Reusability** - Can be used in other projects  
✅ **Optional Integration** - Can be excluded for production builds  
✅ **Clean Separation** - ~1,300 lines of code managed separately

---

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [How It Works](#how-it-works)
3. [Development Workflows](#development-workflows)
4. [Troubleshooting](#troubleshooting)
5. [API Reference](#api-reference)

---

## Installation & Setup

### First-Time Setup

When cloning this repository for the first time:

```bash
# Clone with submodules (recommended)
git clone --recurse-submodules https://github.com/skukla/citisignal-nextjs.git
cd citisignal-nextjs
npm install
```

### If Already Cloned Without Submodules

If you cloned the repository without the `--recurse-submodules` flag:

```bash
# Initialize and update submodules
git submodule update --init --recursive
```

### Verify Installation

Check that the Demo Inspector is properly installed:

```bash
# Should show the demo-inspector directory
ls -la src/demo-inspector/

# Should show the submodule status
git submodule status
```

Expected output:

```
 a5e9e4a1234... src/demo-inspector (heads/main)
```

---

## How It Works

### Architecture

```
citisignal-nextjs/
├── src/
│   ├── demo-inspector/          # Git submodule
│   │   ├── components/          # Inspector UI components
│   │   ├── contexts/            # React context providers
│   │   ├── hooks/               # React hooks
│   │   ├── lib/                 # Tracking utilities
│   │   └── index.ts             # Public API
│   ├── lib/
│   │   └── graphql-fetcher.ts   # Uses tracking from submodule
│   └── app/
│       └── layout.tsx           # Integrates DemoInspectorProvider
```

### Integration Points

#### 1. App Layout (`src/app/layout.tsx`)

The Demo Inspector is integrated at the root layout level:

```typescript
import { DemoInspectorProvider, DemoInspector } from '@/demo-inspector';
import { NavigationProvider } from '@/contexts/NavigationContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DemoInspectorProvider>
          <NavigationProvider>
            {children}
          </NavigationProvider>
          <DemoInspector />
        </DemoInspectorProvider>
      </body>
    </html>
  );
}
```

#### 2. GraphQL Fetcher (`src/lib/graphql-fetcher.ts`)

The GraphQL fetcher uses the tracking wrapper from the submodule:

```typescript
import { createGraphQLFetcherWithTracking } from '@/demo-inspector/lib/graphql-tracking';

// Base fetcher handles the actual HTTP request
async function baseFetcher(query, variables, options) {
  // ... fetch logic ...
}

// Wrap with tracking
const wrappedFetcher = createGraphQLFetcherWithTracking(baseFetcher);

// Export with proper TypeScript types
export async function graphqlFetcher<T>(query, variables, options): Promise<T> {
  return wrappedFetcher(query, variables, options);
}
```

#### 3. Component Tracking (Optional)

Individual components can register with the inspector:

```typescript
import { useDataSource } from '@/demo-inspector/hooks/useInspectorTracking';

export function ProductDetailHeader() {
  const elementRef = useRef<HTMLDivElement>(null);

  useDataSource({
    componentName: 'ProductDetailHeader',
    source: 'catalog',
    elementRef,
  });

  return <div ref={elementRef}>{/* content */}</div>;
}
```

### Data Sources

The Demo Inspector tracks three Adobe Commerce data sources:

| Source              | Color     | Description                                       |
| ------------------- | --------- | ------------------------------------------------- |
| **Commerce Core**   | 🟣 Purple | Categories, navigation, breadcrumbs, store config |
| **Catalog Service** | 🔵 Blue   | Product listings, inventory, product details      |
| **Live Search**     | 🟢 Green  | Search queries, facets, filters                   |

---

## Development Workflows

### Updating to Latest Demo Inspector

To pull the latest changes from the Demo Inspector repository:

```bash
# Update the submodule to latest
git submodule update --remote src/demo-inspector

# Commit the pointer update
git add src/demo-inspector
git commit -m "chore: update demo-inspector to latest version"
git push origin main
```

### Making Changes to Demo Inspector

When you need to modify the Demo Inspector itself:

```bash
# 1. Navigate into the submodule
cd src/demo-inspector

# 2. Check current branch
git branch

# 3. Create a feature branch (optional)
git checkout -b feature/my-inspector-feature

# 4. Make your changes
# Edit files in src/demo-inspector/...

# 5. Commit changes in the submodule
git add .
git commit -m "feat: add new inspector feature"

# 6. Push to Demo Inspector repository
git push origin feature/my-inspector-feature
# OR if on main:
# git push origin main

# 7. Navigate back to parent repo
cd ../..

# 8. Update parent repo to use new commit
git add src/demo-inspector
git commit -m "chore: update demo-inspector submodule to latest"
git push origin main
```

### Creating a Pull Request for Demo Inspector Changes

1. **In the submodule:**

   ```bash
   cd src/demo-inspector
   git checkout -b feature/my-feature
   # Make changes...
   git push origin feature/my-feature
   ```

2. **Create PR in demo-inspector repo** (on GitHub)

3. **After PR is merged:**
   ```bash
   cd src/demo-inspector
   git checkout main
   git pull origin main
   cd ../..
   git add src/demo-inspector
   git commit -m "chore: update demo-inspector to v1.0.0-beta.2"
   ```

### Working Across Multiple Branches

#### When switching branches in parent repo:

```bash
# Switch branch
git checkout feature/my-feature

# Update submodule to match the branch's pointer
git submodule update --init --recursive
```

#### When pulling changes from remote:

```bash
# Pull parent repo changes
git pull origin main

# Update submodules to match
git submodule update --init --recursive
```

### Checking Submodule Status

```bash
# See which commit the submodule is on
git submodule status

# See if there are uncommitted changes in the submodule
cd src/demo-inspector
git status
cd ../..
```

---

## Running Without Demo Inspector

For production builds or if you don't need the inspector:

### Option 1: Don't Initialize Submodule

```bash
# Clone without submodules
git clone https://github.com/skukla/citisignal-nextjs.git
# Skip: git submodule update --init
```

The app will fail to build because imports expect `@/demo-inspector` to exist.

### Option 2: Conditional Rendering (Recommended)

Update `src/app/layout.tsx`:

```typescript
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {isDemoMode ? (
          <DemoInspectorProvider>
            <NavigationProvider>{children}</NavigationProvider>
            <DemoInspector />
          </DemoInspectorProvider>
        ) : (
          <NavigationProvider>{children}</NavigationProvider>
        )}
      </body>
    </html>
  );
}
```

Then set environment variable:

```bash
# Enable demo mode
NEXT_PUBLIC_DEMO_MODE=true npm run dev

# Disable demo mode
NEXT_PUBLIC_DEMO_MODE=false npm run build
```

---

## Troubleshooting

### Submodule Not Initialized

**Problem:** `src/demo-inspector/` is empty or missing.

**Solution:**

```bash
git submodule update --init --recursive
```

### Submodule Shows Uncommitted Changes

**Problem:** `git status` shows `modified: src/demo-inspector (modified content)`.

**Solution:**

```bash
cd src/demo-inspector
git status  # See what changed
git add .
git commit -m "fix: your changes"
git push origin main
cd ../..
git add src/demo-inspector
git commit -m "chore: update demo-inspector submodule"
```

### Submodule on Detached HEAD

**Problem:** `cd src/demo-inspector && git branch` shows `(HEAD detached at a5e9e4a)`.

**Explanation:** This is normal for submodules. The parent repo tracks a specific commit, not a branch.

**Solution (if you need to make changes):**

```bash
cd src/demo-inspector
git checkout main  # Switch to branch
git pull origin main  # Get latest
# Make changes...
cd ../..
git add src/demo-inspector
git commit -m "chore: update demo-inspector to latest main"
```

### Build Fails with Import Errors

**Problem:** Build fails with `Cannot find module '@/demo-inspector'`.

**Solution:**

```bash
# Ensure submodule is initialized
git submodule update --init --recursive

# Rebuild
npm run build
```

### Submodule Out of Sync Across Team

**Problem:** Different team members have different versions of the submodule.

**Solution:**

```bash
# Everyone should run after pulling
git pull origin main
git submodule update --init --recursive
```

---

## API Reference

### Exported from `@/demo-inspector`

#### Components

```typescript
import { DemoInspector, DemoInspectorProvider } from '@/demo-inspector';
```

- **`DemoInspectorProvider`** - Context provider, wrap around app
- **`DemoInspector`** - Main UI component

#### Hooks

```typescript
import { useDemoInspector, useDataSource } from '@/demo-inspector';
```

- **`useDemoInspector()`** - Access inspector state and controls
- **`useDataSource(options)`** - Register component with inspector

#### Utilities

```typescript
import { createGraphQLFetcherWithTracking } from '@/demo-inspector';
```

- **`createGraphQLFetcherWithTracking(baseFetcher)`** - Wrap GraphQL fetcher

### Hook: `useDemoInspector()`

```typescript
const {
  enabled, // boolean - Inspector on/off
  panelCollapsed, // boolean - Panel collapsed state
  activeSources, // Set<DataSource> - Visible sources
  trackedQueries, // TrackedQuery[] - Query history
  inspectorPosition, // 'left' | 'right' - Panel position
  toggleInspector, // () => void
  toggleSource, // (source: DataSource) => void
  trackQuery, // (query: TrackedQuery) => void
  clearQueries, // () => void
} = useDemoInspector();
```

### Hook: `useDataSource(options)`

```typescript
useDataSource({
  componentName: string,           // Component identifier
  source: 'commerce' | 'catalog' | 'search',
  elementRef?: RefObject<HTMLElement>,
  dynamicSource?: () => DataSource,
  fieldMappings?: Record<string, DataSource>,
  dependencies?: unknown[],
});
```

### Utility: `createGraphQLFetcherWithTracking()`

```typescript
const trackedFetcher = createGraphQLFetcherWithTracking(async (query, variables, options) => {
  // Your fetch logic
  return data;
});

// Use it
const data = await trackedFetcher(QUERY, vars, {
  skipTracking: false, // Optional: skip this query
  source: 'catalog', // Optional: override source detection
});
```

---

## Best Practices

### ✅ DO

- Clone with `--recurse-submodules` for first-time setup
- Run `git submodule update --init --recursive` after pulling changes
- Commit submodule changes separately from parent repo changes
- Update submodule pointer after pulling latest from demo-inspector repo
- Use feature branches when modifying demo-inspector

### ❌ DON'T

- Commit changes directly in `src/demo-inspector/` without pushing to demo-inspector repo
- Forget to update submodule pointer after updating demo-inspector
- Mix demo-inspector changes with parent repo changes in the same commit
- Manually edit `.gitmodules` unless you know what you're doing

---

## Additional Resources

- **Demo Inspector Repository:** https://github.com/skukla/demo-inspector
- **Git Submodules Documentation:** https://git-scm.com/book/en/v2/Git-Tools-Submodules
- **Next.js Documentation:** https://nextjs.org/docs

---

## Version

- **Demo Inspector:** v1.0.0-beta.1
- **Integration Method:** Git Submodule
- **Last Updated:** January 2025
