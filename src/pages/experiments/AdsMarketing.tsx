import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { ArrowUpRight, BarChart3, Target, TrendingUp, Users, Megaphone, Eye, MousePointer, Mail } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const services = [
  { icon: Target, title: 'Social Media Ads', description: 'Facebook, Instagram, LinkedIn campaigns' },
  { icon: MousePointer, title: 'Google Ads', description: 'Search, display, and shopping ads' },
  { icon: BarChart3, title: 'Analytics', description: 'Data-driven insights and reporting' },
  { icon: TrendingUp, title: 'A/B Testing', description: 'Optimize for maximum conversions' },
  { icon: Mail, title: 'Email Marketing', description: 'Automated email sequences' },
  { icon: Megaphone, title: 'Content Marketing', description: 'Engaging content that converts' },
];

const results = [
  { metric: '10M+', label: 'Ad Impressions Served', icon: Eye },
  { metric: '500K+', label: 'Clicks Generated', icon: MousePointer },
  { metric: '15K+', label: 'Leads Generated', icon: Users },
  { metric: '3.5x', label: 'Average ROAS', icon: TrendingUp },
];

function FloatingDataPoints() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating data visualization elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 rounded-full bg-primary/30"
          style={{
            height: `${20 + Math.random() * 60}px`,
            left: `${Math.random() * 100}%`,
            bottom: '20%',
          }}
          animate={{
            height: [`${20 + Math.random() * 40}px`, `${40 + Math.random() * 60}px`, `${20 + Math.random() * 40}px`],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
      
      {/* Floating percentage indicators */}
      {['+25%', '+180%', '+42%', '3.5x'].map((text, i) => (
        <motion.span
          key={text}
          className="absolute text-primary/20 font-bold text-2xl"
          style={{
            left: `${15 + i * 22}%`,
            top: `${30 + Math.random() * 20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          {text}
        </motion.span>
      ))}
      
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-700" />
    </div>
  );
}

function AdsMarketingContent() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const resultsRef = useRef(null);
  const platformsRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const resultsInView = useInView(resultsRef, { once: true, margin: '-100px' });
  const platformsInView = useInView(platformsRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <FloatingDataPoints />
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <BarChart3 className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                Digital Marketing
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Ads &</span>
                <br />
                <span className="text-foreground">Marketing</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Data-driven campaigns that reach the right audience 
              and deliver measurable results.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GalaxyButton onClick={openModal}>
                Get Marketing Plan <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        <section ref={resultsRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={resultsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Results</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Numbers That Matter
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={resultsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <result.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <motion.span 
                    className="text-3xl md:text-4xl font-bold text-primary block"
                    initial={{ scale: 0 }}
                    animate={resultsInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
                  >
                    {result.metric}
                  </motion.span>
                  <p className="text-muted-foreground text-sm mt-2">{result.label}</p>
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
                What We Offer
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl group"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
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

        {/* Platforms Section */}
        <section ref={platformsRef} className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={platformsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Platforms</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Where We Advertise
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Google Ads', icon: '🔍' },
                { name: 'Facebook', icon: '📘' },
                { name: 'Instagram', icon: '📸' },
                { name: 'LinkedIn', icon: '💼' },
                { name: 'YouTube', icon: '📺' },
                { name: 'Twitter/X', icon: '🐦' },
                { name: 'TikTok', icon: '🎵' },
                { name: 'Email', icon: '📧' },
              ].map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={platformsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="glass-card p-4 rounded-xl text-center cursor-pointer"
                >
                  <span className="text-3xl block mb-2">{platform.icon}</span>
                  <span className="text-sm font-medium text-foreground">{platform.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Process</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                How We Drive Results
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Audit', desc: 'Analyze current performance' },
                { step: '02', title: 'Strategy', desc: 'Define goals & targeting' },
                { step: '03', title: 'Execute', desc: 'Launch & manage campaigns' },
                { step: '04', title: 'Optimize', desc: 'Continuous improvement' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <span className="text-3xl font-bold text-primary/30">{item.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
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
              Ready to Grow?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's create campaigns that deliver real results.
            </p>
            <GalaxyButton onClick={openModal}>
              Get Free Audit <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function AdsMarketing() {
  return (
    <SystemIntelligenceProvider>
      <AdsMarketingContent />
    </SystemIntelligenceProvider>
  );
}
