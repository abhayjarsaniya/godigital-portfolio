import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { ArrowUpRight, Zap, Workflow, Mail, Database, Bot, Settings, Clock, Repeat, Link2 } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

const automationServices = [
  { icon: Mail, title: 'Email Automation', description: 'Triggered sequences & drip campaigns' },
  { icon: Bot, title: 'CRM Automation', description: 'Lead scoring & pipeline management' },
  { icon: Workflow, title: 'Workflow Builder', description: 'Custom business process automation' },
  { icon: Link2, title: 'Integrations', description: 'Connect your favorite tools' },
  { icon: Database, title: 'Data Sync', description: 'Real-time data synchronization' },
  { icon: Settings, title: 'Custom Scripts', description: 'Tailored automation solutions' },
];

const integrations = [
  'Zapier', 'Make', 'HubSpot', 'Salesforce', 'Mailchimp', 'Slack', 
  'Google Sheets', 'Notion', 'Airtable', 'Stripe', 'WhatsApp', 'Telegram'
];

const timeSaved = [
  { task: 'Lead Follow-ups', hours: '20 hrs/week', icon: Mail },
  { task: 'Data Entry', hours: '15 hrs/week', icon: Database },
  { task: 'Report Generation', hours: '10 hrs/week', icon: Workflow },
  { task: 'Customer Onboarding', hours: '8 hrs/week', icon: Bot },
];

function FloatingGears() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated workflow nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute glass rounded-lg"
          style={{
            width: '40px',
            height: '40px',
            left: `${10 + i * 12}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Settings className="w-5 h-5 text-primary/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      ))}
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${15 + i * 15}%`}
            y1="50%"
            x2={`${30 + i * 15}%`}
            y2="50%"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-700" />
    </div>
  );
}

function AutomationContent() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const savingsRef = useRef(null);
  const integrationsRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const savingsInView = useInView(savingsRef, { once: true, margin: '-100px' });
  const integrationsInView = useInView(integrationsRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <FloatingGears />
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                >
                  <Zap className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                Business Automation
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Workflow</span>
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
              Streamline your workflows, eliminate repetitive tasks, 
              and scale your operations with intelligent automation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GalaxyButton onClick={openModal}>
                Automate Now <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* Time Saved Section */}
        <section ref={savingsRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={savingsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Impact</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Time You'll Save
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeSaved.map((item, index) => (
                <motion.div
                  key={item.task}
                  initial={{ opacity: 0, y: 30 }}
                  animate={savingsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <motion.span 
                    className="text-2xl font-bold text-primary block"
                    initial={{ scale: 0 }}
                    animate={savingsInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
                  >
                    {item.hours}
                  </motion.span>
                  <p className="text-foreground font-medium mt-2">{item.task}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={savingsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-8"
            >
              <div className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground font-semibold">53+ hours saved per week</span>
              </div>
            </motion.div>
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
                What We Automate
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {automationServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl group"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: index * 0.5 }}
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

        {/* Integrations Section */}
        <section ref={integrationsRef} className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={integrationsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Integrations</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Connect Everything
              </h2>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={integrationsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="glass-card px-4 py-2 rounded-full cursor-pointer"
                >
                  <span className="text-sm font-medium text-foreground">{integration}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={integrationsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center text-muted-foreground mt-8"
            >
              + 500 more apps via Zapier & Make
            </motion.p>
          </div>
        </section>

        {/* How It Works */}
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
                How We Automate
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Audit', desc: 'We analyze your current processes and identify automation opportunities', icon: Repeat },
                { step: '02', title: 'Build', desc: 'Design and implement custom automation workflows', icon: Workflow },
                { step: '03', title: 'Optimize', desc: 'Monitor, refine, and scale your automated systems', icon: Zap },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass-card p-8 rounded-2xl text-center relative"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 mx-auto rounded-xl glass flex items-center justify-center mb-4"
                  >
                    <item.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <span className="text-4xl font-bold text-primary/20">{item.step}</span>
                  <h3 className="text-xl font-semibold text-foreground mt-2 mb-3">{item.title}</h3>
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
              Ready to Automate?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's streamline your operations and give you time back.
            </p>
            <GalaxyButton onClick={openModal}>
              Get Automation Audit <ArrowUpRight className="w-4 h-4 ml-2" />
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function Automation() {
  return (
    <SystemIntelligenceProvider>
      <AutomationContent />
    </SystemIntelligenceProvider>
  );
}
