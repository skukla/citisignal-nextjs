# Component Analysis

## Basic Information

- Component Name: PlanCard
- Current Location: src/components/ui/PlanCard.tsx
- Lines of Code: 199
- Number of Props: 16 (name, type, price, originalPrice, rating, reviews, data, talk, text, features, hotspot, streaming, isPopular, isNew, isSale, contractRequired, networkPriority)
- Current Dependencies:
  - React useState hook
  - Heroicons (StarIcon, CheckIcon, HeartIcon)
  - Button (our refactored component)

## Usage Analysis

- Where is it used?
  - Plans page (src/app/plans/page.tsx) - Main listing page for mobile plans
  - Used in a responsive grid layout (1/2/3 columns based on screen size)

- Primary responsibilities?
  - Display mobile plan information (name, type, pricing, ratings)
  - Show plan features (data, talk, text allowances)
  - Display additional details (hotspot, network priority, contract status)
  - List included features with checkmark icons
  - Show streaming services included with plan
  - Provide action buttons (Select Plan, Learn More)
  - Handle wishlist functionality (save/unsave plans)
  - Display promotional badges (Popular, New, Sale discount)

- Business logic present?
  - Sale percentage calculation (lines 77-78) - business logic in component
  - Rating conversion (lines 105, 110) - rating/20 conversion logic
  - Data transformation in plans page (lines 143-149) - features array construction
  - Local state management for wishlist (isSaved) - appropriate for UI state

- Presentation aspects?
  - Complex card layout with multiple sections
  - Conditional styling for popular plans
  - Fixed height sections for consistent grid alignment
  - Responsive design elements

- Reuse potential?
  - Specific to mobile plans - low reuse potential
  - Could be generalized for subscription/service cards

## Component Decomposition

### Size and Complexity

- Over 300 lines? No (199 lines) but still very large
- Multiple responsibilities? **YES** - pricing, features, actions, badges, rating, wishlist
- Mixed concerns? **YES** - presentation + business logic + state management
- Reusable parts identified? **Multiple extraction opportunities**

### Extraction Candidates

- **PlanCardHeader** (lines 63-113): Name, type, badges, pricing, rating
- **PlanCardFeatures** (lines 116-176): Core features, additional details, feature list, streaming
- **PlanCardActions** (lines 178-195): Action buttons
- **PlanBadge** component: Popular/New/Sale badges (lines 54-80)
- **StarRating** component: Rating display (lines 100-112)
- **FeatureList** component: Checkmark feature list (lines 149-160)

## Props Analysis

### Current Props

- Total count: **16 props** (excessive)
- Individual props list: name, type, price, originalPrice, rating, reviews, data, talk, text, hotspot, networkPriority (11 individual props)
- Object props list: features (string[]), streaming (string[])
- Boolean props: isPopular, isNew, isSale, contractRequired
- Callback props: None (wishlist handled internally)

### Props Optimization

- **Props > 7? YES** (16 props is way too many)
- **Object vs Individual recommendation**: Should use Plan object instead of 16 individual props
- **Prop drilling present?** No direct drilling, but data transformation in parent
- **Performance implications**: Re-renders on any prop change (16 potential triggers)

## Composition Patterns

### Current Pattern

- Uses children props? No
- Uses render props? No
- Uses compound components? No
- Uses HOCs? No

### Recommended Patterns

- **Compound component opportunities**: PlanCard.Header, PlanCard.Features, PlanCard.Actions
- **Children prop opportunities**: Custom action buttons, additional badges
- **Render prop opportunities**: Custom rating display, custom feature rendering
- **HOC opportunities**: withWishlist for save functionality

## State Management

### Current State

- **Local state usage**: isSaved (wishlist state) - appropriate for UI-only state
- Context usage: None
- Props for state: None
- Custom hooks: None

### State Optimization

- **State colocation needs**: Wishlist state could be lifted to context/global state
- **Context candidates**: WishlistContext for cross-component wishlist management
- **Hook extraction opportunities**: useWishlist, usePlanDisplay, useRatingDisplay
- **State lifting needs**: Wishlist state should be global for persistence

## Performance Considerations

### Current Performance

- **Re-render triggers**: 16 props means frequent re-renders
- **Memoization usage**: None
- **Heavy calculations**: Sale percentage calculation on every render
- **Prop types impact**: High - 16 props to compare

### Performance Optimizations

- **memo needs**: Yes - with proper prop object structure
- **useMemo candidates**: Sale percentage calculation, rating conversion, feature transformation
- **useCallback needs**: Wishlist toggle handler
- **Prop type recommendations**: Single plan object prop instead of 16 individual props

## Architecture Review

### Anti-Patterns Check

- [ ] **God component** (199 lines, multiple responsibilities)
- [ ] **Too many props** (16 props vs 7 max guideline)
- [ ] **Business logic in component** (percentage calculation, rating conversion)
- [ ] **Inline calculations** (sale percentage, rating display)
- [ ] **Mixed concerns** (presentation + business logic + state)
- [x] ~~Prop drilling~~ (No prop drilling)
- [x] ~~Nested component definitions~~ (No nested components)

### Best Practices Check

- [ ] **Single Responsibility** (Multiple responsibilities mixed)
- [ ] **High cohesion** (Mixed presentation and business concerns)
- [x] Low coupling (Only depends on Button and icons)
- [ ] **Clear interfaces** (16 props is confusing)
- [x] Proper validation (TypeScript interfaces)
- [x] Component reuse (Uses refactored Button)

## Location Decision

### Options Considered

1. **Current Location** (src/components/ui/):
   - Pros: Accessible as UI component
   - Cons: Business-specific, not truly generic UI

2. **Feature-based location** (src/features/plans/components/):
   - Pros: Business-specific, better organization
   - Cons: Requires creating plans feature directory

3. **Compound component approach** (src/components/ui/PlanCard/):
   - Pros: Allows decomposition while maintaining discoverability
   - Cons: More complex file structure

### Final Location Decision

- **Chosen location**: Decompose into compound components in src/components/ui/PlanCard/
- **Rationale**: Large enough to warrant decomposition, business-critical component
- **Migration steps**: Extract subcomponents, create index file, update imports

## Implementation Plan

1. **Preparation**:
   - [ ] Extract business logic to utilities (sale calculation, rating conversion)
   - [ ] Create Plan interface consolidation
   - [ ] Plan compound component structure

2. **Implementation**:
   - [ ] Create PlanCard directory with index.tsx
   - [ ] Extract PlanCardHeader component
   - [ ] Extract PlanCardFeatures component  
   - [ ] Extract PlanCardActions component
   - [ ] Extract StarRating component
   - [ ] Extract PlanBadge component
   - [ ] Update plans page to use plan object prop
   - [ ] Implement useWishlist hook

3. **Validation**:
   - [ ] Verify plans page appearance unchanged
   - [ ] Test wishlist functionality
   - [ ] Test responsive layout
   - [ ] Performance test with memo

## Notes and Considerations

- **Special cases**: Popular plan styling, sale badge calculations
- **Edge conditions**: Missing originalPrice, zero ratings, empty features
- **Team feedback**: Business-critical component, needs careful testing
- **Future considerations**: Could be template for other subscription card components

## Recommendations

### High Priority

1. **Decompose into compound components** - 199 lines is too large
2. **Extract business logic** - sale calculation, rating conversion to utilities
3. **Consolidate props** - use single plan object instead of 16 individual props
4. **Extract reusable components** - StarRating, PlanBadge for use elsewhere

### Medium Priority

5. **Implement useWishlist hook** - better state management
6. **Add memoization** - React.memo with proper prop comparison
7. **Create Plans feature directory** - better organization for business logic

### Low Priority

8. **Render prop patterns** - for customizable feature rendering
9. **Context for wishlist** - cross-component wishlist state

### Expected Outcome

- **Reduce from 199 → ~120 lines** (40% reduction) through decomposition
- **Reduce from 16 → 2 props** (87% reduction) - plan object + className
- **Extract 4-5 reusable components** (StarRating, PlanBadge, FeatureList, etc.)
- **Improve performance** with memoization and prop consolidation
- **Better maintainability** through single responsibility components
- **Reusable components** for other parts of the application