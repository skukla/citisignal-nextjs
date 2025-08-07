// Compound component exports
export { AccountRoot } from './AccountRoot';
export { AccountIcon } from './AccountIcon';
export { AccountPanel } from './AccountPanel';
export { AccountMenu } from './AccountMenu';
export { AccountProfile } from './AccountProfile';

// Compound component namespace
import { AccountRoot } from './AccountRoot';
import { AccountIcon } from './AccountIcon';
import { AccountPanel } from './AccountPanel';
import { AccountMenu } from './AccountMenu';
import { AccountProfile } from './AccountProfile';
import type { AccountComponent } from './Account.types';

/**
 * Account compound component for building user account functionality.
 * Provides a complete account interface with authentication and profile management.
 *
 * @example
 * <Account.Root>
 *   <Account.Icon aria-label="User account" />
 *   <Account.Panel id="account-panel" />
 * </Account.Root>
 */
const Account: AccountComponent = {
  Root: AccountRoot,
  Icon: AccountIcon,
  Panel: AccountPanel,
  Menu: AccountMenu,
  Profile: AccountProfile
};

export default Account;

// Contexts and hooks
export { useAccountContext, AccountProvider } from './AccountContext';
export { useAuthContext, AuthProvider } from './AuthContext';
export { useAuth } from './useAuth';