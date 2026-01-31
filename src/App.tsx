import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Work from "./pages/Work";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ScrollToTop from "./components/ScrollToTop";
import GalaxyContactModal from "./components/GalaxyContactModal";
import { ContactModalProvider, useContactModal } from "./contexts/ContactModalContext";

// Platform Service Pages
import AIWork from "./pages/services/AIWork";
import Websites from "./pages/services/Websites";
import Mobile from "./pages/services/Mobile";
import TabletPage from "./pages/services/Tablet";
import Dashboards from "./pages/services/Dashboards";
import GraphicDesign from "./pages/services/GraphicDesign";

// Experiment Service Pages
import WebsiteService from "./pages/experiments/WebsiteService";
import Branding from "./pages/experiments/Branding";
import AdsMarketing from "./pages/experiments/AdsMarketing";
import Automation from "./pages/experiments/Automation";
import Development from "./pages/experiments/Development";

// Admin Pages
import AdminWrapper from "./pages/admin/AdminWrapper";
import Dashboard from "./pages/admin/Dashboard";
import Inquiries from "./pages/admin/Inquiries";
import Projects from "./pages/admin/Projects";
import Pricing from "./pages/admin/Pricing";
import SiteSettings from "./pages/admin/SiteSettings";

const queryClient = new QueryClient();

function AppContent() {
  const { isOpen, closeModal } = useContactModal();
  
  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Platform Service Pages */}
          <Route path="/services/ai-work" element={<AIWork />} />
          <Route path="/services/websites" element={<Websites />} />
          <Route path="/services/mobile" element={<Mobile />} />
          <Route path="/services/tablet" element={<TabletPage />} />
          <Route path="/services/dashboards" element={<Dashboards />} />
          <Route path="/services/graphic-design" element={<GraphicDesign />} />
          
          {/* Experiment Service Pages */}
          <Route path="/experiments/website" element={<WebsiteService />} />
          <Route path="/experiments/branding" element={<Branding />} />
          <Route path="/experiments/ads-marketing" element={<AdsMarketing />} />
          <Route path="/experiments/automation" element={<Automation />} />
          <Route path="/experiments/development" element={<Development />} />
          
          {/* Admin Pages - Each as separate route */}
          <Route path="/admin" element={<AdminWrapper><Dashboard /></AdminWrapper>} />
          <Route path="/admin/inquiries" element={<AdminWrapper><Inquiries /></AdminWrapper>} />
          <Route path="/admin/projects" element={<AdminWrapper><Projects /></AdminWrapper>} />
          <Route path="/admin/pricing" element={<AdminWrapper><Pricing /></AdminWrapper>} />
          <Route path="/admin/site-settings" element={<AdminWrapper><SiteSettings /></AdminWrapper>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <GalaxyContactModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContactModalProvider>
        <AppContent />
      </ContactModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
