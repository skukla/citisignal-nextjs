// Navigation Compound Component
export { NavigationRoot } from './NavigationRoot';
export { NavigationDesktop } from './NavigationDesktop';
export { NavigationMobile } from './NavigationMobile';
export { NavigationLink } from './NavigationLink';

// Compound component namespace
import { NavigationRoot } from './NavigationRoot';
import { NavigationDesktop } from './NavigationDesktop';
import { NavigationMobile } from './NavigationMobile';
import { NavigationLink } from './NavigationLink';
import type { NavigationComponent } from './Navigation.types';

/**
 * Navigation compound component for building responsive navigation menus.
 * Provides separate desktop and mobile navigation components for better separation of concerns.
 *
 * @example
 * <Navigation.Root>
 *   <Navigation.Desktop items={navItems} />
 *   <Navigation.Mobile items={navItems} />
 * </Navigation.Root>
 */
const Navigation: NavigationComponent = {
  Root: NavigationRoot,
  Desktop: NavigationDesktop,
  Mobile: NavigationMobile,
  Link: NavigationLink
};

export default Navigation;

// Context
export { useNavigationContext } from './NavigationRoot';

// Hooks
export { useNavigation } from './useNavigation';

// Types
export type * from './Navigation.types';