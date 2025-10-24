import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ModelsSection } from '@/components/sections/ModelsSection';
import { PricingSection } from '@/components/sections/PricingSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ModelsSection />
      <PricingSection />
    </>
  );
}
