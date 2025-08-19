import { fetchBreadcrumbsSSR } from '@/lib/ssr-fetchers';
import PhonesPageClient from './PhonesPageClient';

export default async function PhonesPage() {
  // Fetch breadcrumbs server-side for instant rendering
  const breadcrumbs = await fetchBreadcrumbsSSR('phones');

  return <PhonesPageClient breadcrumbs={breadcrumbs} />;
}