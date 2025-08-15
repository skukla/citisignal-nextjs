import { AccountPageRoot } from './AccountPageRoot';
import { AccountPageLayout } from './AccountPageLayout';
import { AccountPageNavigation } from './AccountPageNavigation';
import { AccountPageMain } from './AccountPageMain';
import { AccountPageHeader } from './AccountPageHeader';
import { AccountPageContent } from './AccountPageContent';
import { AccountPageSection } from './AccountPageSection';

// Create compound component
export const AccountPage = {
  Root: AccountPageRoot,
  Layout: AccountPageLayout,
  Navigation: AccountPageNavigation,
  Main: AccountPageMain,
  Header: AccountPageHeader,
  Content: AccountPageContent,
  Section: AccountPageSection,
};

// Export provider and hook
export { AccountPageProvider } from './AccountPageProvider';
export { useAccountPage } from './AccountPageContext';
export type { AccountPageContextValue, AccountPageData } from './AccountPageContext';