# Type Organization Standards

## Overview

This document establishes consistent type organization patterns across the entire codebase, addressing architectural inconsistencies that have emerged during refactoring.

## 🎯 Standardized Patterns

### 1. **Feature Types** ✅ 
```
src/features/{feature}/types/{feature}.types.ts
```

**Use for:**
- Business logic types
- Feature-specific interfaces
- Compound component types that manage business state
- Context value types
- Hook return types

**Examples:**
- `src/features/account/types/account.types.ts`
- `src/features/cart/types/cart.types.ts`
- `src/features/navigation/types/navigation.types.ts`

### 2. **Foundational UI Types** ✅
```
src/types/{domain}.ts
```

**Use for:**
- Base component interfaces (BaseComponentProps, BasePanelProps)
- Cross-cutting UI concerns (grid, form, layout)
- Domain entities (commerce, product)
- Shared utility types

**Examples:**
- `src/types/ui.ts` - Base component props
- `src/types/commerce.ts` - Product domain types
- `src/types/grid.ts` - Layout types
- `src/types/form.ts` - Form-related types

### 3. **Component-Specific Types** 📁
```
src/components/ui/{Component}/{Component}.types.ts
OR
Inline within component file for simple cases
```

**Use for:**
- Component prop interfaces
- Component-specific enums/unions
- Local state interfaces
- Compound component sub-interfaces

**Decision Criteria:**
- **Colocated file**: 5+ types OR compound component
- **Inline**: 1-4 simple prop interfaces

### 4. **Variant & Styling Types** 🎨
```
src/types/{component}.ts (for widely reused)
OR
Colocated with component (for specific use)
```

**Use for:**
- Variant enums (`ButtonVariant`, `CardVariant`)
- Size systems (`ButtonSize`, `GridGap`)
- Styling-related types

## 🔧 Migration Strategy

### Phase 1: Fix Current Inconsistencies

#### A. Move FilterSidebar Types Back to Component
```diff
- src/types/filters.ts
+ src/components/ui/FilterSidebar/FilterSidebar.types.ts
```

**Rationale:** FilterSidebar is a specific UI component, not a foundational domain

#### B. Standardize PlanCard Types
```diff
+ src/components/ui/PlanCard/PlanCard.types.ts
```

**Rationale:** Compound component with multiple interfaces deserves dedicated types file

#### C. Consolidate Simple Component Types
- **Inline simple prop interfaces** (1-2 types)
- **Centralize widely-used variant types** (Button, Badge variants)

### Phase 2: Establish Type Boundaries

#### Feature Types Stay in Features
- ✅ Account, Cart, Search, Navigation, Filter
- ❌ Don't move UI component types here

#### Shared Types for Cross-Cutting Concerns
- ✅ ui.ts, commerce.ts, grid.ts, form.ts
- ❌ Don't add component-specific types here

#### Component Types Stay with Components
- ✅ Complex UI components get their own types files
- ❌ Don't pollute shared types with component-specific interfaces

## 📋 Decision Framework

### When to Use Feature Types
- [ ] Manages business state/logic
- [ ] Part of a business feature
- [ ] Used across multiple feature components
- [ ] Includes context/hook types

### When to Use Shared Types
- [ ] Used by 3+ different domains
- [ ] Foundational interface (BaseComponentProps)
- [ ] Cross-cutting concern (layout, forms)
- [ ] Domain entity (Product, User)

### When to Use Component Types
- [ ] Specific to one component family
- [ ] Component prop interfaces
- [ ] Compound component sub-types
- [ ] 5+ related types

### When to Use Inline Types
- [ ] 1-4 simple interfaces
- [ ] Component-specific only
- [ ] No complex relationships
- [ ] Unlikely to be reused

## 🎯 Examples

### ✅ Good Organization

```typescript
// Feature types
src/features/account/types/account.types.ts
export interface AccountContextValue { ... }
export interface AccountUserData { ... }

// Shared domain types  
src/types/commerce.ts
export interface BaseProduct { ... }

// Component types
src/components/ui/FilterSidebar/FilterSidebar.types.ts
export interface FilterSidebarProps { ... }
export interface FilterSidebarHeaderProps { ... }

// Inline simple types
src/components/ui/PromoTag.tsx
interface PromoTagProps { variant: 'sale' | 'new'; }
```

### ❌ Bad Organization

```typescript
// Component types in shared location
src/types/filters.ts // Should be in FilterSidebar/

// Feature types in shared location
src/types/account.ts // Should be in features/account/types/

// Shared types in component folder
src/components/ui/Button/ui.types.ts // Should be in src/types/ui.ts
```

## 🚀 Implementation Plan

1. **Audit current inconsistencies** ✅
2. **Move FilterSidebar types back to component folder**
3. **Standardize PlanCard and other compound components**
4. **Create decision documentation**
5. **Update import statements across codebase**
6. **Validate with linting rules**

## 📏 Metrics for Success

- **Clear type ownership**: No ambiguity about where types belong
- **Consistent import patterns**: Predictable paths
- **Maintainable colocation**: Related types stay together
- **Reusable foundations**: Shared types truly shared