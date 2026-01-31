import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { portfolioProjects } from '@/data/portfolioProjects';
import { ArrowUpRight, Smartphone, Apple, Play, Fingerprint, Bell, Battery, Wifi, Download } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const mobileProjects = portfolioProjects.filter(p => p.platform === 'mobile');

const features = [
  { icon: Apple, title: 'iOS Apps', description: 'Native Swift & SwiftUI development' },
  { icon: Play, title: 'Android Apps', description: 'Native Kotlin & Jetpack Compose' },
  { icon: Smartphone, title: 'Cross-Platform', description: 'React Native & Flutter solutions' },
  { icon: Fingerprint, title: 'Biometric Auth', description: 'Face ID & fingerprint security' },
  { icon: Bell, title: 'Push Notifications', description: 'Engage users in real-time' },
  { icon: Wifi, title: 'Offline Support', description: 'Works without internet' },
];

function FloatingPhones() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Phone mockups */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute glass-card rounded-3xl border-4 border-secondary/20"
          style={{
            width: '60px',
            height: '120px',
            left: `${15 + i * 22}%`,
            top: `${25 + Math.random() * 40}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [i % 2 === 0 ? -5 : 5, i % 2 === 0 ? 5 : -5, i % 2 === 0 ? -5 : 5],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-full bg-secondary/30" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary/20" />
        </motion.div>
      ))}
      
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-500" />
    </div>
  );
}

function MobileContent() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const projectsRef = useRef(null);
  const processRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <FloatingPhones />
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <Smartphone className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                ◇ Mobile Apps
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Mobile</span>
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
              Native and cross-platform mobile applications 
              that users love to use every day.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <GalaxyButton onClick={openModal}>
                Build Your App <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Platform Badges */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Apple, label: 'iOS', downloads: '50K+' },
                { icon: Play, label: 'Android', downloads: '100K+' },
                { icon: Download, label: 'Total Downloads', downloads: '150K+' },
              ].map((platform, index) => (
                <motion.div
                  key={platform.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4"
                >
                  <platform.icon className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-foreground font-semibold">{platform.label}</p>
                    <p className="text-muted-foreground text-sm">{platform.downloads}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Capabilities</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                What We Build
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card p-6 rounded-2xl group"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
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
                From Idea to App Store
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: '01', title: 'Concept', desc: 'Define features & UX' },
                { step: '02', title: 'Design', desc: 'UI/UX prototypes' },
                { step: '03', title: 'Develop', desc: 'Native code & APIs' },
                { step: '04', title: 'Test', desc: 'QA & beta testing' },
                { step: '05', title: 'Launch', desc: 'Store submission' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-5 rounded-2xl text-center"
                >
                  <span className="text-3xl font-bold text-primary/30">{item.step}</span>
                  <h3 className="text-base font-semibold text-foreground mt-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
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
                Mobile Apps
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mobileProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div 
                    className="aspect-video relative"
                    style={{ background: project.thumbnail }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs text-foreground">
                      ◇ {project.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.tagline}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-full glass text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
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
              Ready to Go Mobile?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's build an app your users will love.
            </p>
            <GalaxyButton onClick={openModal}>
              Start Your App <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function Mobile() {
  return (
    <SystemIntelligenceProvider>
      <MobileContent />
    </SystemIntelligenceProvider>
  );
}
