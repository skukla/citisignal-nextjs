// Account Compound Component
export { AccountRoot } from './AccountRoot';
export { AccountIcon } from './AccountIcon';
export { AccountPanel } from './AccountPanel';

// Compound component namespace
import { AccountRoot } from './AccountRoot';
import { AccountIcon } from './AccountIcon';
import { AccountPanel } from './AccountPanel';
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
  Panel: AccountPanel
};

export default Account;

// Context
export { useAccountContext } from './AccountRoot';

// Hooks
export { useAccount } from './useAccount';

// Types
export type * from './Account.types';