import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { ArrowUpRight, Code, Terminal, GitBranch, Database, Cloud, Shield, Server, Cpu, Globe } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const devServices = [
  { icon: Globe, title: 'Web Applications', description: 'Full-stack React, Next.js, Node.js' },
  { icon: Server, title: 'API Development', description: 'RESTful & GraphQL APIs' },
  { icon: Database, title: 'Database Design', description: 'PostgreSQL, MongoDB, Redis' },
  { icon: Cloud, title: 'Cloud Deployment', description: 'AWS, Vercel, Supabase' },
  { icon: Shield, title: 'Security', description: 'Auth, encryption, best practices' },
  { icon: Cpu, title: 'Performance', description: 'Optimization & scaling' },
];

const techStack = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL'],
  tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Supabase'],
};

function FloatingCodeElements() {
  const codeLines = [
    'const app = createApp()',
    'export default function',
    'import { useState }',
    'async function fetch()',
    '<Component {...props} />',
    'return response.json()',
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute glass-card px-3 py-1 rounded-lg"
          style={{
            left: `${5 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 70}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          <code className="text-xs text-primary/50 font-mono">{line}</code>
        </motion.div>
      ))}
      
      {/* Terminal cursor blink */}
      <motion.div
        className="absolute glass-card px-4 py-2 rounded-lg"
        style={{ left: '60%', top: '45%' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="text-primary font-mono text-sm">$ npm run dev</span>
        <motion.span
          className="inline-block w-2 h-4 bg-primary ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.div>
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-700" />
    </div>
  );
}

function DevelopmentContent() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const techRef = useRef(null);
  const processRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const techInView = useInView(techRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <FloatingCodeElements />
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ 
                    rotateY: [0, 180, 360],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <Code className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                Custom Development
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Clean</span>
                <br />
                <span className="text-foreground">Code</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Robust, scalable, and maintainable code that powers 
              ambitious ideas and grows with your business.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GalaxyButton onClick={openModal}>
                Start Building <ArrowUpRight className="w-4 h-4 ml-2" />
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
                What We Build
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devServices.map((service, index) => (
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

        {/* Tech Stack Section */}
        <section ref={techRef} className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={techInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Technology</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Our Stack
              </h2>
            </motion.div>
            
            <div className="space-y-8">
              {Object.entries(techStack).map(([category, techs], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -30 : 30 }}
                  animate={techInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4 capitalize">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {techs.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={techInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.2 + index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground cursor-pointer"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Process */}
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
                How We Develop
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: '01', title: 'Plan', icon: Terminal },
                { step: '02', title: 'Design', icon: GitBranch },
                { step: '03', title: 'Code', icon: Code },
                { step: '04', title: 'Test', icon: Shield },
                { step: '05', title: 'Deploy', icon: Cloud },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-5 rounded-2xl text-center relative"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 mx-auto rounded-lg glass flex items-center justify-center mb-3"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="text-2xl font-bold text-primary/30">{item.step}</span>
                  <h3 className="text-base font-semibold text-foreground mt-1">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Quality Section */}
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
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Quality</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Our Standards
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Clean Code', desc: 'Readable, maintainable, documented' },
                { title: 'Type Safe', desc: 'TypeScript for reliability' },
                { title: 'Tested', desc: 'Unit & integration tests' },
                { title: 'Scalable', desc: 'Built to grow with you' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
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
              Ready to Build?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's turn your ideas into production-ready code.
            </p>
            <GalaxyButton onClick={openModal}>
              Start Development <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function Development() {
  return (
    <SystemIntelligenceProvider>
      <DevelopmentContent />
    </SystemIntelligenceProvider>
  );
}
