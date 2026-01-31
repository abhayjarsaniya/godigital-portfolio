import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { ArrowUpRight, Palette, Layers, Type, Image, Sparkles, Eye, Target, Heart } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const brandingServices = [
  { icon: Sparkles, title: 'Logo Design', description: 'Memorable visual marks' },
  { icon: Palette, title: 'Color System', description: 'Strategic color palettes' },
  { icon: Type, title: 'Typography', description: 'Font selection & hierarchy' },
  { icon: Image, title: 'Visual Assets', description: 'Icons, patterns, imagery' },
  { icon: Layers, title: 'Brand Guidelines', description: 'Comprehensive style guides' },
  { icon: Target, title: 'Brand Strategy', description: 'Positioning & messaging' },
];

const brandProcess = [
  { phase: 'Discover', desc: 'Deep dive into your vision, values, and audience', duration: 'Week 1' },
  { phase: 'Define', desc: 'Strategic positioning and brand personality', duration: 'Week 2' },
  { phase: 'Design', desc: 'Visual identity exploration and refinement', duration: 'Week 2-3' },
  { phase: 'Deliver', desc: 'Final assets and comprehensive guidelines', duration: 'Week 3' },
];

function FloatingBrandElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating shapes representing brand elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${30 + Math.random() * 50}px`,
            height: `${30 + Math.random() * 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(135deg, hsl(${i * 45} 70% 50% / 0.2), hsl(${i * 45 + 60} 70% 50% / 0.1))`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Typography elements */}
      {['Aa', 'Bb', 'Cc'].map((letter, i) => (
        <motion.span
          key={letter}
          className="absolute text-primary/10 font-bold text-6xl"
          style={{
            left: `${20 + i * 30}%`,
            top: `${40 + Math.random() * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1,
          }}
        >
          {letter}
        </motion.span>
      ))}
      
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-500" />
    </div>
  );
}

function BrandingContent() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const portfolioRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const portfolioInView = useInView(portfolioRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <FloatingBrandElements />
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <Palette className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                Brand Identity
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Visual</span>
                <br />
                <span className="text-foreground">Identity</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Create a powerful brand identity that tells your story, 
              connects with your audience, and stands apart from the competition.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GalaxyButton onClick={openModal}>
                Start Branding <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Why Branding Matters */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Eye, title: 'Recognition', stat: '80%', desc: 'of consumers remember brands by color' },
                { icon: Heart, title: 'Loyalty', stat: '59%', desc: 'prefer to buy from familiar brands' },
                { icon: Target, title: 'Trust', stat: '46%', desc: 'pay more for brands they trust' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-8 rounded-2xl text-center"
                >
                  <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <motion.span 
                    className="text-4xl font-bold text-primary block mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: 'spring' }}
                  >
                    {item.stat}
                  </motion.span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Services</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                What's Included
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandingServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30, rotate: -2 }}
                  animate={servicesInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl group"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4"
                  >
                    <service.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section ref={processRef} className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Process</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                3-Week Brand Sprint
              </h2>
            </motion.div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
              
              {brandProcess.map((step, index) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={processInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-card p-6 rounded-2xl">
                      <span className="text-primary text-sm font-medium">{step.duration}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-1 mb-2">{step.phase}</h3>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={processInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="hidden md:flex w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)] z-10"
                  />
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Preview */}
        <section ref={portfolioRef} className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Brand Transformations
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Nova Ventures', industry: 'Startup', color: 'from-amber-500/20 to-blue-500/20' },
                { name: 'Artisan Goods', industry: 'Retail', color: 'from-orange-500/20 to-brown-500/20' },
                { name: 'TrendyBrand', industry: 'Fashion', color: 'from-pink-500/20 to-purple-500/20' },
              ].map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className={`aspect-square bg-gradient-to-br ${brand.color} flex items-center justify-center`}>
                    <span className="text-4xl font-bold text-foreground/20">{brand.name.charAt(0)}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">{brand.industry}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={portfolioInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-12"
            >
              <Link to="/services/graphic-design">
                <GalaxyButton>
                  View All Design Work <ArrowUpRight className="w-4 h-4 ml-2" />
                </GalaxyButton>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's create a visual identity that sets you apart.
            </p>
            <GalaxyButton onClick={openModal}>
              Start Branding Project <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function Branding() {
  return (
    <SystemIntelligenceProvider>
      <BrandingContent />
    </SystemIntelligenceProvider>
  );
}
