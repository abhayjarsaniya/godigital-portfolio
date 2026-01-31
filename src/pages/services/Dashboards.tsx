import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { portfolioProjects } from '@/data/portfolioProjects';
import { ArrowUpRight, BarChart3, PieChart, TrendingUp, Activity, Database, Users, LineChart, Target } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const dashboardProjects = portfolioProjects.filter(p => p.platform === 'dashboards');

const features = [
  { icon: LineChart, title: 'Real-time Analytics', description: 'Live data visualization' },
  { icon: PieChart, title: 'Custom Charts', description: 'Beautiful data graphics' },
  { icon: Database, title: 'Data Integration', description: 'Connect any data source' },
  { icon: Users, title: 'Team Collaboration', description: 'Multi-user access' },
  { icon: Target, title: 'KPI Tracking', description: 'Goal monitoring' },
  { icon: Activity, title: 'Alerts & Reports', description: 'Automated insights' },
];

function AnimatedCharts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated chart elements */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Bar chart animation */}
        {[...Array(6)].map((_, i) => (
          <motion.rect
            key={`bar-${i}`}
            x={`${15 + i * 12}%`}
            y="60%"
            width="30"
            height="0"
            fill="hsl(var(--primary) / 0.2)"
            rx="4"
            animate={{
              height: [0, 40 + Math.random() * 80, 0],
              y: [`60%`, `${60 - (40 + Math.random() * 80) / 4}%`, `60%`],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
        
        {/* Line chart animation */}
        <motion.path
          d="M 10% 40% Q 25% 30%, 40% 45% T 70% 35% T 90% 40%"
          fill="none"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
      </svg>
      
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-500" />
    </div>
  );
}

function DashboardsContent() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const projectsRef = useRef(null);
  const typesRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const typesInView = useInView(typesRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <AnimatedCharts />
          
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
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <BarChart3 className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                ◎ Dashboards
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Data</span>
                <br />
                <span className="text-foreground">Visualization</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Transform complex data into clear, actionable insights 
              with custom dashboard solutions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GalaxyButton onClick={openModal}>
                Build Dashboard <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Types */}
        <section ref={typesRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={typesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Solutions</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Dashboard Types
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Analytics', desc: 'Business intelligence', icon: BarChart3 },
                { title: 'CRM', desc: 'Customer relationships', icon: Users },
                { title: 'HRM', desc: 'HR management', icon: Target },
                { title: 'ERP', desc: 'Enterprise planning', icon: Database },
              ].map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={typesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl text-center group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-12 h-12 mx-auto rounded-xl glass flex items-center justify-center mb-4"
                  >
                    <type.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{type.desc}</p>
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
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card p-6 rounded-2xl group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
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
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Dashboard Projects
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {dashboardProjects.map((project, index) => (
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
                      ◎ {project.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.overview}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-full glass text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {project.results && (
                      <div className="pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-3">
                          {project.results.map((result, i) => (
                            <span key={i} className="text-xs text-success font-medium">
                              ✓ {result}
                            </span>
                          ))}
                        </div>
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
              Ready to Visualize?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's turn your data into powerful insights.
            </p>
            <GalaxyButton onClick={openModal}>
              Start Project <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function Dashboards() {
  return (
    <SystemIntelligenceProvider>
      <DashboardsContent />
    </SystemIntelligenceProvider>
  );
}
