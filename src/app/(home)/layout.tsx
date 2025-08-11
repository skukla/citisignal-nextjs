import { ReactNode } from 'react';
import { Metadata } from 'next';

interface HomeLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'CitiSignal - America\'s Most Reliable Wireless Network',
  description: 'Get unlimited plans starting at $20/month. 5G coverage across 200+ million Americans. Shop the latest phones and plans.',
  keywords: ['unlimited plans', '5G network', 'wireless coverage', 'mobile phones', 'prepaid plans'],
  openGraph: {
    title: 'CitiSignal - America\'s Most Reliable Wireless Network',
    description: 'Get unlimited plans starting at $20/month. 5G coverage across 200+ million Americans.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CitiSignal - America\'s Most Reliable Wireless Network',
    description: 'Get unlimited plans starting at $20/month. 5G coverage across 200+ million Americans.',
  },
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="home-layout">
      {children}
    </div>
  );
}