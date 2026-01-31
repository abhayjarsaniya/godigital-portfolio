import { Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WorkShowcase from '@/components/WorkShowcase';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { useScrollIntelligence } from '@/hooks/useScrollIntelligence';

// Lazy load WebGL for performance
const WebGLBackground = lazy(() => import('@/components/WebGLBackground'));

// Inner component that uses scroll intelligence
function IndexContent() {
  useSmoothScroll();
  useScrollIntelligence();
  
  return (
    <div className="relative min-h-screen bg-background">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* WebGL Background */}
      <Suspense fallback={<div className="fixed inset-0 bg-background" />}>
        <WebGLBackground />
      </Suspense>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <WorkShowcase />
        <PricingSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Index() {
  return (
    <SystemIntelligenceProvider>
      <IndexContent />
    </SystemIntelligenceProvider>
  );
}
