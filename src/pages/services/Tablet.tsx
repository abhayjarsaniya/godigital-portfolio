import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { portfolioProjects } from '@/data/portfolioProjects';
import { ArrowUpRight, Tablet, Layers, LayoutGrid, Maximize, Hand, PenTool } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const tabletProjects = portfolioProjects.filter(p => p.platform === 'tablet');

const features = [
  { icon: Maximize, title: 'Large Canvas', description: 'Optimized for bigger screens' },
  { icon: Hand, title: 'Touch First', description: 'Gesture-based interactions' },
  { icon: LayoutGrid, title: 'Split Views', description: 'Multitasking layouts' },
  { icon: PenTool, title: 'Stylus Support', description: 'Apple Pencil & S Pen ready' },
  { icon: Layers, title: 'Multi-Window', description: 'Drag and drop workflows' },
  { icon: Tablet, title: 'iPadOS & Android', description: 'Both platforms covered' },
];

function FloatingTablets() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute glass-card rounded-2xl border-2 border-secondary/20"
          style={{
            width: '140px',
            height: '100px',
            left: `${20 + i * 30}%`,
            top: `${30 + Math.random() * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, i % 2 === 0 ? 3 : -3, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 1,
          }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary/30" />
        </motion.div>
      ))}
      
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-700" />
    </div>
  );
}

function TabletContent() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const projectsRef = useRef(null);
  const useCasesRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const useCasesInView = useInView(useCasesRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 px-4">
          <FloatingTablets />
          
          <div className="relative z-10 text-center px-2 sm:px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <Tablet className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                ▢ Tablet Apps
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 sm:mb-6">
                <span className="text-gradient">Tablet</span>
                <br />
                <span className="text-foreground">Experiences</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
            >
              Optimized tablet experiences that leverage the larger screen 
              for powerful productivity and immersive content.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GalaxyButton onClick={openModal}>
                Build Tablet App <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section ref={useCasesRef} className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12"
            >
              <span className="text-primary text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Use Cases</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Perfect For
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {[
                { title: 'Point of Sale', desc: 'Retail checkout systems', icon: '🛒' },
                { title: 'Restaurant', desc: 'Digital menus & ordering', icon: '🍽️' },
                { title: 'Healthcare', desc: 'Patient management', icon: '🏥' },
                { title: 'Education', desc: 'Interactive learning', icon: '📚' },
              ].map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center"
                >
                  <span className="text-2xl sm:text-4xl mb-2 sm:mb-4 block">{useCase.icon}</span>
                  <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{useCase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 sm:py-32 px-4 sm:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 sm:mb-16"
            >
              <span className="text-primary text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Features</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Tablet-Optimized
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl glass flex items-center justify-center mb-3 sm:mb-4"
                  >
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Gallery */}
        <section ref={projectsRef} className="py-20 sm:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 sm:mb-16"
            >
              <span className="text-primary text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Portfolio</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Tablet Projects
              </h2>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {tabletProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-card rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div 
                    className="aspect-video relative"
                    style={{ background: project.thumbnail }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full glass text-xs text-foreground">
                      ▢ {project.category}
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{project.tagline}</p>
                    
                    {project.results && (
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.results.slice(0, 2).map((result, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 sm:py-1 rounded-full glass text-success">
                            ✓ {result}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Ready for Tablet?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 px-2">
              Leverage the power of larger screens for your business.
            </p>
            <GalaxyButton onClick={openModal}>
              Get Started <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function TabletPage() {
  return (
    <SystemIntelligenceProvider>
      <TabletContent />
    </SystemIntelligenceProvider>
  );
}
