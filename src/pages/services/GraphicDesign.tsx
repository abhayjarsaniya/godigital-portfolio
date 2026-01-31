import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { portfolioProjects } from '@/data/portfolioProjects';
import { ArrowUpRight, Palette, Layers, PenTool, Image, Type, Sparkles, Brush, Wand2 } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const graphicProjects = portfolioProjects.filter(p => p.platform === 'graphic-design');

const services = [
  { icon: Brush, title: 'Brand Identity', description: 'Logos & visual systems' },
  { icon: Image, title: 'Social Media', description: 'Scroll-stopping content' },
  { icon: Layers, title: 'Packaging', description: 'Product presentation' },
  { icon: Type, title: 'Typography', description: 'Custom lettering' },
  { icon: PenTool, title: 'Illustration', description: 'Custom artwork' },
  { icon: Wand2, title: 'Motion Graphics', description: 'Animated content' },
];

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating design elements */}
      {[...Array(12)].map((_, i) => {
        const shapes = ['circle', 'square', 'triangle'];
        const shape = shapes[i % 3];
        
        return (
          <motion.div
            key={i}
            className={`absolute ${shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-lg' : ''}`}
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 360} 70% 60% / 0.2)`,
              clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        );
      })}
      
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-700" />
    </div>
  );
}

function GraphicDesignContent() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const processRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <FloatingShapes />
          
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
                ◐ Graphic Design
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Visual</span>
                <br />
                <span className="text-foreground">Excellence</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Stunning visual designs that capture attention 
              and communicate your brand's essence.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GalaxyButton onClick={openModal}>
                Start Design Project <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Services</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                What We Design
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30, rotate: -3 }}
                  animate={servicesInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02, rotate: 1 }}
                  className="glass-card p-6 rounded-2xl group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
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

        {/* Process Section */}
        <section ref={processRef} className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Process</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Our Creative Flow
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Brief', desc: 'Understanding your vision' },
                { step: '02', title: 'Explore', desc: 'Research & concepts' },
                { step: '03', title: 'Create', desc: 'Design & iterate' },
                { step: '04', title: 'Deliver', desc: 'Final assets' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={processInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <motion.span 
                    className="text-4xl font-bold text-primary/30 block"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: index * 0.5, repeat: Infinity }}
                  >
                    {item.step}
                  </motion.span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Gallery */}
        <section ref={projectsRef} className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Design Work
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {graphicProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                  animate={projectsInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, rotate: 1 }}
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div 
                    className="aspect-square relative"
                    style={{ background: project.thumbnail }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs text-foreground">
                      ◐ {project.category}
                    </div>
                    
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-12 h-12 rounded-full glass-button flex items-center justify-center">
                        <ArrowUpRight className="w-6 h-6 text-primary" />
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.tagline}</p>
                    
                    {project.results && (
                      <div className="flex flex-wrap gap-2">
                        {project.results.slice(0, 2).map((result, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full glass text-success">
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
              Ready to Stand Out?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's create visuals that make an impact.
            </p>
            <GalaxyButton onClick={openModal}>
              Start Designing <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function GraphicDesign() {
  return (
    <SystemIntelligenceProvider>
      <GraphicDesignContent />
    </SystemIntelligenceProvider>
  );
}
