# Demo Inspector

## Overview

The Demo Inspector is a development tool that provides real-time visualization of data sources in the application. It helps developers understand which parts of the UI are powered by which Adobe Commerce services (Commerce Core, Catalog Service, Live Search).

## Features

### Visual Highlighting

- **Color-coded borders** around components based on their data source
  - Purple: Commerce Core (GraphQL)
  - Blue: Catalog Service
  - Green: Live Search
- **Rounded corners** respect component styling
- **Smart nesting** prevents double borders on nested elements
- **Toggle all sources** with a single switch

### Query Tracking

- Real-time monitoring of GraphQL queries
- Response time tracking
- Query count per service
- Collapsible query details panel
- **Auto-clears on navigation** to show only current page queries
- **Clear button always visible** outside scrollable list

### Keyboard Shortcuts

- **Cmd+Shift+D** (Mac) / **Ctrl+Shift+D** (Windows) - Toggle inspector on/off
- **Cmd+Shift+E** (Mac) / **Ctrl+Shift+E** (Windows) - Collapse/expand inspector panel
- **Cmd+Shift+←** (Mac) / **Ctrl+Shift+←** (Windows) - Move inspector to left
- **Cmd+Shift+→** (Mac) / **Ctrl+Shift+→** (Windows) - Move inspector to right

## Architecture

### Component Structure

```
src/
├── components/demo-inspector/
│   ├── DemoInspector.tsx           # Main inspector orchestrator
│   ├── SourceOverlay.tsx           # Visual highlighting logic
│   ├── InspectorPanel.tsx          # Panel container component
│   ├── InspectorHeader.tsx         # Panel header with controls
│   ├── InspectorToggleButton.tsx   # Minimized state button
│   ├── DataSourceButton.tsx        # Individual source toggles
│   ├── QueryTracker.tsx            # Query list manager
│   ├── QueryItem.tsx               # Individual query display
│   └── SourceToggle.tsx            # Highlight all toggle switch
├── contexts/
│   └── DemoInspectorContext.tsx    # Global state management
├── lib/
│   └── graphql-fetcher-with-tracking.ts  # Query interception
└── hooks/
    ├── inspector/
    │   └── useInspectorTracking.ts  # Component tracking
    └── products/
        └── useActiveProductService.ts  # Service detection
```

### Data Flow

1. **Server-side tagging**: Components are tagged with `data-inspector-*` attributes during render
2. **Query tracking**: GraphQL queries are intercepted and logged
3. **Visual overlay**: MutationObserver watches for DOM changes and applies highlights
4. **State management**: React Context provides global inspector state

## Usage

### Enabling the Inspector

The inspector is automatically available in development mode. Toggle it with:

- Keyboard shortcut: **Cmd+Shift+D**

### Keyboard Shortcuts

- **Cmd+Shift+D** - Toggle inspector on/off (show/hide completely)
- **Cmd+Shift+E** - Collapse/expand inspector panel (when enabled)
- **Cmd+Shift+LeftArrow** - Move inspector to left side
- **Cmd+Shift+RightArrow** - Move inspector to right side
- Or programmatically: `useDemoInspector().setEnabled(true)`

### Tagging Components

Components are automatically tagged based on their data source:

```tsx
// Product cards dynamically switch between services
export function ProductCard({ product }) {
  const dataSource = useActiveProductService(); // 'catalog' or 'search'

  return <div data-inspector-source={dataSource}>{/* Card content */}</div>;
}
```

### Static Tagging

For components with fixed data sources:

```tsx
// Navigation always comes from Commerce Core
<nav data-inspector-source="commerce" data-inspector-type="navigation">
  {/* Nav items */}
</nav>
```

## Hybrid Architecture Support

The inspector is aware of our hybrid architecture:

### Dynamic Source Switching

- **Without search**: Products come from Catalog Service (blue)
- **With search**: Products come from Live Search (green)
- Sort dropdown and product cards automatically update their source

### Service Detection Logic

```typescript
// useActiveProductService hook
export function useActiveProductService(): 'search' | 'catalog' {
  const { searchQuery } = useProductFilters();
  return searchQuery ? 'search' : 'catalog';
}
```

## Performance Considerations

### Zero Impact When Disabled

- No DOM manipulation when inspector is off
- Query tracking only active when enabled
- LocalStorage persistence for settings

### Efficient Updates

- MutationObserver for reactive updates
- Debounced highlight recalculation
- Smart filtering to avoid duplicate borders

## UI Components

The inspector is built with modular, reusable components:

- **InspectorPanel**: Main container with glass morphism effect
- **InspectorHeader**: Draggable header with position/minimize/close controls
- **DataSourceButton**: Individual source toggles with gradient backgrounds when active
- **SourceToggle**: Master toggle switch for all sources
- **QueryTracker**: Collapsible query list with performance metrics
- **QueryItem**: Individual query display with source icon and response time

## Configuration

Settings are persisted in localStorage:

- `demoInspectorEnabled`: On/off state
- `demoInspectorPosition`: Panel position (left/right)

## Best Practices

### 1. Use Server-Side Tagging

Tag components during render, not with client-side DOM manipulation:

```tsx
// ✅ Good - Tagged at render time
<div data-inspector-source="catalog">

// ❌ Bad - DOM manipulation
useEffect(() => {
  element.setAttribute('data-inspector-source', 'catalog');
});
```

### 2. Avoid Nested Tagging

Don't tag both parent and child with the same source:

```tsx
// ❌ Bad - Creates double borders
<div data-inspector-source="search">
  <input data-inspector-source="search" />
</div>

// ✅ Good - Tag only the parent
<div data-inspector-source="search">
  <input />
</div>
```

### 3. Use Semantic Type Attributes

Include `data-inspector-type` for better debugging:

```tsx
<div
  data-inspector-source="commerce"
  data-inspector-type="breadcrumbs"
>
```

## Troubleshooting

### Inspector Not Appearing

1. Check if enabled: `localStorage.getItem('demoInspectorEnabled')`
2. Verify keyboard shortcut: Cmd+Shift+D
3. Ensure in development mode

### Missing Highlights

1. Check if component has `data-inspector-source` attribute
2. Verify source is active in inspector panel
3. Check for parent elements with same source (filtered out)

### Query Tracking Not Working

1. Ensure using `graphqlFetcherWithTracking` in hooks
2. Check if `__demoInspectorTrackQuery` is defined on window
3. Verify queries are client-side (SSR queries won't be tracked)

## Future Enhancements

- [ ] Export inspection data for analysis
- [ ] Performance metrics per component
- [ ] Network waterfall visualization
- [ ] Source code navigation on click
- [ ] Production mode with restricted access
- [ ] Custom color schemes
- [ ] Filter by component type
- [ ] Time travel debugging
