// Standard Header (default export for simple usage)
export { StandardHeader as default } from './StandardHeader';

// Header Compound Components (for custom usage)
export { HeaderRoot } from './HeaderRoot';
export { HeaderTopBar } from './HeaderTopBar';

// Compound component namespace for custom usage
import { HeaderRoot } from './HeaderRoot';
import { HeaderTopBar } from './HeaderTopBar';

/**
 * Header compound component for building custom header layouts.
 * For standard header, use the default export.
 *
 * @example
 * // Simple usage (recommended):
 * import Header from '@/components/layout/Header';
 * <Header />
 * 
 * // Custom usage:
 * import { Header } from '@/components/layout/Header';
 * <Header.Root>
 *   <Header.TopBar />
 *   Custom content with Navigation, Search, Cart, Account, etc.
 * </Header.Root>
 */
export interface HeaderComponent {
  Root: React.FC<React.ComponentProps<typeof HeaderRoot>>;
  TopBar: React.FC<React.ComponentProps<typeof HeaderTopBar>>;
}

export const Header: HeaderComponent = {
  Root: HeaderRoot,
  TopBar: HeaderTopBar,
};