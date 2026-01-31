import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { portfolioProjects } from '@/data/portfolioProjects';
import { ArrowUpRight, Brain, Cpu, Zap, Bot, Sparkles, Network, Database, LineChart } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const aiProjects = portfolioProjects.filter(p => p.platform === 'ai-work');

const aiCapabilities = [
  { icon: Brain, title: 'Machine Learning', description: 'Custom ML models for predictions and automation' },
  { icon: Bot, title: 'Chatbots & NLP', description: 'Conversational AI with natural language processing' },
  { icon: Network, title: 'Neural Networks', description: 'Deep learning solutions for complex patterns' },
  { icon: Database, title: 'Data Analytics', description: 'Transform raw data into actionable insights' },
  { icon: LineChart, title: 'Predictive Models', description: 'Forecast trends and behaviors accurately' },
  { icon: Sparkles, title: 'Generative AI', description: 'Content creation and creative automation' },
];

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating neural network nodes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Neural connections */}
      <svg className="absolute inset-0 w-full h-full">
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${10 + i * 12}%`}
            y1="20%"
            x2={`${15 + i * 12}%`}
            y2="80%"
            stroke="hsl(var(--primary) / 0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}
      </svg>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-drift delay-1000" />
    </div>
  );
}

function AIWorkContent() {
  const heroRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const projectsRef = useRef(null);
  const processRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, margin: '-100px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <AnimatedBackground />
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <Brain className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                ✦ AI Solutions
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Intelligent</span>
                <br />
                <span className="text-foreground">Automation</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Harness the power of artificial intelligence to transform your business.
              From predictive analytics to conversational AI.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GalaxyButton onClick={openModal}>
                Start AI Project <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section ref={capabilitiesRef} className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Capabilities</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                What We Build
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCapabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4"
                  >
                    <capability.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {capability.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{capability.description}</p>
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
                How We Work
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Discovery', desc: 'Understand your data and business goals' },
                { step: '02', title: 'Design', desc: 'Architect the AI solution strategy' },
                { step: '03', title: 'Develop', desc: 'Build and train custom models' },
                { step: '04', title: 'Deploy', desc: 'Launch and monitor performance' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={processInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="glass-card p-6 rounded-2xl h-full">
                    <span className="text-4xl font-bold text-primary/20">{item.step}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                  
                  {index < 3 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={processInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                      className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-primary/30 origin-left"
                    />
                  )}
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
                  AI Projects
                </h2>
              </div>
              <Link to="/work" className="flex items-center gap-2 text-primary hover:underline">
                View All Work <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiProjects.map((project, index) => (
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
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs text-primary font-medium">
                        ✦ AI Powered
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
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
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-xs px-2 py-1 rounded-full glass text-muted-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {project.results && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex gap-4 flex-wrap">
                            {project.results.slice(0, 2).map((result, i) => (
                              <span key={i} className="text-xs text-primary font-medium">
                                ✓ {result}
                              </span>
                            ))}
                          </div>
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
              Ready to Embrace AI?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss how artificial intelligence can transform your business operations.
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

export default function AIWork() {
  return (
    <SystemIntelligenceProvider>
      <AIWorkContent />
    </SystemIntelligenceProvider>
  );
}
