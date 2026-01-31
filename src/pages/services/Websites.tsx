import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { portfolioProjects } from '@/data/portfolioProjects';
import { ArrowUpRight, Globe, Monitor, Smartphone, Zap, Search, Shield, Code2, Palette } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const websiteProjects = portfolioProjects.filter(p => p.platform === 'websites');

const features = [
  { icon: Monitor, title: 'Responsive Design', description: 'Perfect on every screen size' },
  { icon: Zap, title: 'Lightning Fast', description: 'Optimized for peak performance' },
  { icon: Search, title: 'SEO Ready', description: 'Built for search visibility' },
  { icon: Shield, title: 'Secure', description: 'Enterprise-grade security' },
  { icon: Code2, title: 'Clean Code', description: 'Maintainable and scalable' },
  { icon: Palette, title: 'Custom Design', description: 'Unique visual identity' },
];

function FloatingBrowsers() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating browser mockups */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute glass-card rounded-lg"
          style={{
            width: `${80 + Math.random() * 60}px`,
            height: `${60 + Math.random() * 40}px`,
            left: `${10 + i * 18}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <div className="h-3 bg-secondary/50 rounded-t-lg flex items-center px-2 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-warning/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-success/50" />
          </div>
        </motion.div>
      ))}
      
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-700" />
    </div>
  );
}

function WebsitesContent() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const projectsRef = useRef(null);
  const statsRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <FloatingBrowsers />
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <Globe className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                ◈ Web Development
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Beautiful</span>
                <br />
                <span className="text-foreground">Websites</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Custom-built digital experiences that captivate visitors 
              and convert them into customers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GalaxyButton onClick={openModal}>
                Start Your Website <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '50+', label: 'Websites Built' },
                { value: '99%', label: 'Client Satisfaction' },
                { value: '3x', label: 'Avg. Conversion Lift' },
                { value: '<2s', label: 'Load Time' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.span 
                    className="text-4xl md:text-5xl font-bold text-primary"
                    initial={{ scale: 0.5 }}
                    animate={statsInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.span>
                  <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Features</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                What's Included
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30, rotate: -2 }}
                  animate={featuresInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4"
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
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
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16"
            >
              <div>
                <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Portfolio</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                  Recent Websites
                </h2>
              </div>
              <Link to="/work" className="flex items-center gap-2 text-primary hover:underline">
                View All Work <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {websiteProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Link to={`/work?project=${project.id}`}>
                    <div 
                      className="aspect-video relative"
                      style={{ background: project.thumbnail }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs text-foreground">
                        ◈ {project.category}
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
                  </Link>
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
              Ready for a New Website?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's create something that represents your brand perfectly.
            </p>
            <GalaxyButton onClick={openModal}>
              Get a Quote <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function Websites() {
  return (
    <SystemIntelligenceProvider>
      <WebsitesContent />
    </SystemIntelligenceProvider>
  );
}
