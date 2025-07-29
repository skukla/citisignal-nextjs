Industry Best Practices for Refactoring

1. Component Decomposition Strategy

The primary industry solution is component decomposition - breaking large components into smaller, more focused ones. Here are the key strategies:

When to Break Down Components:

When a component has more than 300 lines of code
When the component handles multiple responsibilities
When you need to reuse parts of the component elsewhere
When the component deals with different concerns (data fetching vs. rendering)
When file size becomes too large to manage effectively

Decomposition Techniques:

Extract by functionality: Separate components based on what they do
Extract by reusability: Create components that can be used in multiple contexts
Extract by concern: Separate data logic from presentation logic

**Use Higher-Order Components (HOCs)Implement custom hooks to extract stateful logic

2. Composition Over Props Drilling
Industry best practice strongly favors composition patterns over passing many individual props. Key approaches include:

Component Composition Patterns:

Children prop pattern: Pass components as children rather than multiple props
Render props pattern: Pass functions that return JSX
Compound components: Create components that work together as a system
Higher-order components: Wrap components to add functionality

Example of Composition Approach:

jsx
// Instead of passing many props
<ComplexComponent
  title={title}
  subtitle={subtitle}
  content={content}
  footer={footer}
  onSubmit={onSubmit}
  // ... 10+ more props
/>

// Use composition
<ComplexComponent>
  <Header title={title} subtitle={subtitle} />
  <Content>{content}</Content>
  <Footer onSubmit={onSubmit}>{footer}</Footer>
</ComplexComponent>

3. Props Interface Design Best Practices
Object vs Individual Props Decision Matrix:

Pass Individual Props When:

You only need 2-5 specific properties
You want explicit component interfaces
The component doesn't need the entire object
You're optimizing for performance (fewer re-renders)

Pass Object Props When:

You're using 10+ related properties from the same object
All properties are tightly related (high cohesion)
You want to reduce prop drilling
The object represents a single domain concept

4. Architectural Principles: Cohesion and Coupling

Industry standards emphasize high cohesion and low coupling principles:

High Cohesion: Elements within a component should be closely related and focused on a single responsibility.

Low Coupling: Components should have minimal dependencies on each other.

Best Practices:

Group related functionality together
Make components self-reliant where possible
Use clear interfaces between components
Avoid tight dependencies between unrelated components

5. State Management Patterns

For components with complex state and many props, industry practice recommends:

Use Context API:

For sharing state across multiple components
To avoid prop drilling through intermediate components
When state is truly global or shared by many components

Custom Hooks:

Extract stateful logic into reusable hooks
Separate business logic from presentation logic
Enable logic reuse across components

State Colocation:

Keep state as close to where it's used as possible
Don't lift state higher than necessary

6. Performance Considerations

Avoid Object Props for Performance:

Objects passed as props cause unnecessary re-renders
React uses shallow comparison (Object.is()) for prop changes
Pass primitive values when possible

Use React.memo and useMemo strategically for complex objects

7. Component Architecture Guidelines

Industry-Standard Structure:
Keep components small and focused (under 300 lines)
Use functional components with hooks
Implement proper prop validation with TypeScript or PropTypes
Organize components hierarchically by feature or domain
Separate container (smart) components from presentational (dumb) components

Anti-Patterns to Avoid

Common Anti-Patterns:

Prop drilling: Passing props through multiple levels unnecessarily
God components: Components that try to do everything
Nested component definitions: Defining components inside other components
Too many props: More than 7 props is generally considered problematic
Mixed concerns: Combining data fetching, business logic, and presentation in one component

Practical Implementation Steps

Audit existing components: Identify components with more than 5-7 props
Analyze responsibilities: Determine if the component violates SRP
Extract logical units: Break down by functionality or domain
Apply composition: Use children props and component composition
Optimize interfaces: Choose between object props vs individual props based on context
Implement state management: Use Context API or custom hooks for shared state
Test and refactor: Ensure components remain testable and maintainable

8. Guidelines for Component and Type Migration

When refactoring, we use temporary locations (`src/temp/`, `src/types/temp/`) to avoid premature organization. Use these guidelines to determine when and where to move components and types:

Move to `base/` or `shared/` when:

- The type/component is used in 3+ different feature areas
- The pattern is fundamental to the design system (e.g., Button, Card)
- The type represents core business concepts (e.g., Product, Price)
- The component implements a layout pattern used across features
- The utility/hook provides functionality needed across the application

Move to a feature directory when:

- The type/component is specific to one feature area
- The component has feature-specific business logic
- The type represents feature-specific concepts
- The component is unlikely to be reused elsewhere
- The component requires feature-specific state management

Move to `layout/` when:

- The component defines a major structural area of the page
- The component is responsible for page-level composition
- The component manages layout-specific state (e.g., sidebar collapse)
- The component is part of the application shell

Keep in `temp/` when:

- The usage pattern is not yet clear
- Similar components exist that haven't been refactored
- The component might be split or combined with others
- The type structure might change based on other refactoring
- We're unsure about the reusability potential

Example Decision Process:

1. Start with component in `temp/`
2. During refactoring, ask:
   - Where is this used?
   - What is its primary responsibility?
   - Does it contain business logic?
   - Is it purely presentational?
   - Could other features use this?
3. Based on answers, move to appropriate location
4. Document the decision in comments for future reference

Remember:

- It's okay to duplicate temporarily while patterns emerge
- Move things when we have confidence, not speculation
- Document decisions to help maintain consistency
- Review periodically to identify emerging patterns

9. Shared Patterns from Header Refactoring

The Header refactoring established several reusable patterns that should be followed for consistency:

Panel Components:

- Use compound component pattern (Root, Trigger, Panel)
- Implement shared `usePanel` hook for consistent behavior:

  ```typescript
  const { isOpen, toggle, close, panelRef } = usePanel();
  ```

- Handle click-outside and escape key uniformly
- Use consistent ARIA attributes:

  ```typescript
  <Trigger 
    aria-label="Action description"
    aria-expanded={isOpen}
    aria-controls="panel-id"
  />
  <Panel id="panel-id">
  ```

Feature Organization:

- Group by feature in `src/features/`:

  ```
  feature/
    ├── components/     # UI components
    ├── hooks/         # Business & UI logic
    ├── types/        # TypeScript definitions
    └── data/         # Static data & constants
  ```

- Separate UI state from business logic:

  ```typescript
  // UI state hook
  const { isOpen, toggle } = usePanelState();
  // Business logic hook
  const { data, actions } = useFeatureLogic();
  // Composition hook
  const featureState = useFeature();
  ```

Type Patterns:

- Base props interface for compound components:

  ```typescript
  interface BaseFeatureProps {
    className?: string;
    children?: ReactNode;
    id?: string;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
    'aria-label'?: string;
  }
  ```

- Context value types for state sharing
- Compound component type definitions

Responsive Design:

- Use custom breakpoints for specific needs:

  ```typescript
  className="hidden min-[1148px]:flex"
  ```

- Progressive enhancement:
  1. Mobile-first base styles
  2. Tablet adaptations (sm/md)
  3. Desktop optimizations (lg/xl)
- Handle edge cases with graceful degradation

Accessibility:

- Consistent ARIA patterns for interactive elements
- Proper roles and labels for navigation
- Keyboard navigation support
- Screen reader considerations

State Management:

- Context for feature-level state
- Shared hooks for common behaviors
- Colocated state when possible
- Clear state ownership

These patterns should be followed when:

- Creating new feature components
- Implementing interactive panels
- Managing responsive layouts
- Handling accessibility concerns
- Organizing new features

Remember:

- Reuse existing hooks and patterns
- Maintain consistent file structure
- Follow established naming conventions
- Document deviations when necessary

10. Shared Type Patterns

The following type patterns should be used consistently across features:

Base Component Types:

```typescript
// Base props for all components
interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Extended props for panel-related components
interface BasePanelProps extends BaseComponentProps {
  id?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-label'?: string;
}
```

Context Value Types:

```typescript
// Base panel context shared by features
interface BasePanelContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  panelRef: RefObject<HTMLDivElement>;
}

// Feature-specific context extends base
interface FeatureContextValue extends BasePanelContextValue {
  // Additional feature-specific state and actions
  featureState: FeatureState;
  featureActions: FeatureActions;
}
```

Compound Component Types:

The `CompoundComponent` type creates a strongly-typed component structure with required Root, Trigger, and Panel components, plus any additional components specified in `ExtraComponents`. When used, it enforces that all sub-components receive their correct props and enables proper TypeScript inference throughout the component tree.

```typescript
type CompoundComponent<
  RootProps,
  TriggerProps,
  PanelProps,
  ExtraComponents = {}
> = {
  Root: React.FC<RootProps>;
  Trigger: React.FC<TriggerProps>;
  Panel: React.FC<PanelProps>;
} & ExtraComponents;

// Example: Search component with Input and Results
type SearchComponent = CompoundComponent<
  SearchRootProps,
  SearchTriggerProps,
  SearchPanelProps,
  {
    Input: React.FC<SearchInputProps>;
    Results: React.FC<SearchResultsProps>;
  }
>;

// Usage
<Search.Root>
  <Search.Trigger />
  <Search.Panel>
    <Search.Input />
    <Search.Results />
  </Search.Panel>
</Search.Root>
```

Usage Guidelines:

1. Base Props:
   - Use `BaseComponentProps` for simple UI components
   - Use `BasePanelProps` for interactive panels/dropdowns
   - Extend base types with feature-specific props

2. Context Values:
   - Extend `BasePanelContextValue` for panel features
   - Keep feature-specific state/actions in context
   - Use consistent naming for state/actions

3. Compound Components:
   - Use `CompoundComponent` type for consistent structure
   - Define feature-specific prop interfaces
   - Add extra components through type parameter

When to Use:

1. Creating new feature components
2. Implementing panel-based UIs
3. Managing component state with context
4. Building compound components

Remember:
- Keep feature-specific types separate
- Don't over-abstract base types
- Document type extensions
- Consider accessibility props