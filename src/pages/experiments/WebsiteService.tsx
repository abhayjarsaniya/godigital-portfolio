import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { ArrowUpRight, Globe, Code, Smartphone, Search, Zap, Shield, Layers, Palette } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const websiteTypes = [
  { title: 'Corporate', desc: 'Professional business presence', icon: '🏢' },
  { title: 'E-Commerce', desc: 'Online stores & shops', icon: '🛒' },
  { title: 'Portfolio', desc: 'Showcase your work', icon: '🎨' },
  { title: 'SaaS', desc: 'Software products', icon: '💻' },
  { title: 'Blog', desc: 'Content platforms', icon: '📝' },
  { title: 'Landing', desc: 'Conversion focused', icon: '🚀' },
];

const techStack = [
  { name: 'React', level: 95 },
  { name: 'Next.js', level: 90 },
  { name: 'TypeScript', level: 92 },
  { name: 'Tailwind CSS', level: 98 },
  { name: 'Node.js', level: 85 },
  { name: 'PostgreSQL', level: 80 },
];

function FloatingCode() {
  const codeSnippets = ['<div>', '</>', 'const', '=>', '{}', '[]', 'npm', 'git'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((code, i) => (
        <motion.span
          key={i}
          className="absolute text-primary/20 font-mono text-sm"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {code}
        </motion.span>
      ))}
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-700" />
    </div>
  );
}

function WebsiteServiceContent() {
  const heroRef = useRef(null);
  const typesRef = useRef(null);
  const techRef = useRef(null);
  const processRef = useRef(null);
  const pricingRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const typesInView = useInView(typesRef, { once: true, margin: '-100px' });
  const techInView = useInView(techRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const pricingInView = useInView(pricingRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <FloatingCode />
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <Globe className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                Website Development
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Custom</span>
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
              Custom-built digital experiences that captivate and convert.
              From stunning landing pages to complex web applications.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <GalaxyButton onClick={openModal}>
                Get a Quote <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Website Types */}
        <section ref={typesRef} className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={typesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Types</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                What We Build
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websiteTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={typesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl group cursor-pointer"
                >
                  <span className="text-4xl mb-4 block">{type.icon}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{type.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section ref={techRef} className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={techInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Technology</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Our Tech Stack
              </h2>
            </motion.div>
            
            <div className="space-y-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={techInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground font-medium">{tech.name}</span>
                    <span className="text-primary">{tech.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={techInView ? { width: `${tech.level}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Process</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                How We Work
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Discovery', desc: 'Understanding your goals and requirements', icon: Search },
                { step: '02', title: 'Design', desc: 'Creating beautiful, user-focused interfaces', icon: Palette },
                { step: '03', title: 'Develop', desc: 'Building with clean, efficient code', icon: Code },
                { step: '04', title: 'Launch', desc: 'Testing, optimization and deployment', icon: Zap },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-card p-6 rounded-2xl text-center relative"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 mx-auto rounded-xl glass flex items-center justify-center mb-4"
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <span className="text-3xl font-bold text-primary/20">{item.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Included</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Every Website Includes
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Smartphone, title: 'Responsive', desc: 'Works on all devices' },
                { icon: Zap, title: 'Fast Loading', desc: 'Optimized performance' },
                { icon: Search, title: 'SEO Ready', desc: 'Built for visibility' },
                { icon: Shield, title: 'Secure', desc: 'SSL & best practices' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section ref={pricingRef} className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Starting From
              </h2>
              <motion.span 
                className="text-6xl md:text-7xl font-bold text-primary"
                initial={{ scale: 0.5 }}
                animate={pricingInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
              >
                ₹2,999
              </motion.span>
              <p className="text-muted-foreground mt-4">For a 3-page responsive website</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link to="/#pricing">
                <GalaxyButton>
                  View All Packages <ArrowUpRight className="w-4 h-4 ml-2" />
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
              Ready to Go Online?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's build a website that represents your brand perfectly.
            </p>
            <GalaxyButton onClick={openModal}>
              Start Your Project <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function WebsiteService() {
  return (
    <SystemIntelligenceProvider>
      <WebsiteServiceContent />
    </SystemIntelligenceProvider>
  );
}
