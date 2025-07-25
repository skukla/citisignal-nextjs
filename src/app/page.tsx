import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import PopularPhonesSection from '@/components/sections/PopularPhonesSection';
import ActivationSection from '@/components/sections/ActivationSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import WhyCitiSignalSection from '@/components/sections/WhyCitiSignalSection';
import TechNewsSection from '@/components/sections/TechNewsSection';
import InteractiveToolsSection from '@/components/sections/InteractiveToolsSection';
import CoverageSection from '@/components/sections/CoverageSection';
import LifestyleSolutionsSection from '@/components/sections/LifestyleSolutionsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <WhyCitiSignalSection />
        <LifestyleSolutionsSection />
        <InteractiveToolsSection />
        <PopularPhonesSection />
        <CoverageSection />
        <TechNewsSection />
        <ActivationSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
