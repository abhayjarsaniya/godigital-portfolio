import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { Users, Target, Zap, Award, Heart, Lightbulb, ArrowUpRight } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';
import { Link } from 'react-router-dom';

function AboutContent() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const missionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

  const values = [
    { icon: Target, title: 'Purpose-Driven', description: 'Every pixel has a purpose. We design with intention and build with precision.' },
    { icon: Zap, title: 'Innovation First', description: 'We embrace cutting-edge technology to deliver forward-thinking solutions.' },
    { icon: Heart, title: 'Client-Centric', description: 'Your success is our success. We partner with you every step of the way.' },
    { icon: Lightbulb, title: 'Creative Excellence', description: 'We push boundaries to create memorable, impactful digital experiences.' },
  ];

  const team = [
    { name: 'Alex Chen', role: 'Founder & Creative Director', image: 'linear-gradient(135deg, hsl(260 80% 40%) 0%, hsl(200 70% 50%) 100%)' },
    { name: 'Priya Sharma', role: 'Lead Developer', image: 'linear-gradient(135deg, hsl(180 60% 35%) 0%, hsl(260 70% 50%) 100%)' },
    { name: 'Marcus Johnson', role: 'UX Designer', image: 'linear-gradient(135deg, hsl(320 60% 40%) 0%, hsl(20 70% 50%) 100%)' },
    { name: 'Aisha Patel', role: 'Project Manager', image: 'linear-gradient(135deg, hsl(150 50% 35%) 0%, hsl(200 60% 45%) 100%)' },
  ];

  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '30+', label: 'Happy Clients' },
    { value: '5+', label: 'Years Experience' },
    { value: '99%', label: 'Client Satisfaction' },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
            />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                ◈ About Us
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
                <span className="text-foreground">We Are</span>
                <br />
                <span className="text-gradient">GODIGITAL</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                A creative digital agency crafting beautiful, functional experiences 
                that make a real difference in the digital landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={missionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Our Mission</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Transforming Ideas Into Digital Excellence
                </h2>
                <p className="text-muted-foreground mb-6">
                  At GODIGITAL, we believe every business deserves a powerful digital presence. 
                  Our mission is to bridge the gap between vision and reality, creating 
                  digital solutions that not only look stunning but drive real results.
                </p>
                <p className="text-muted-foreground">
                  We combine creativity with technical expertise to deliver websites, 
                  applications, and digital experiences that stand out in today's 
                  competitive landscape.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={missionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-card p-8 rounded-3xl"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-2 border-primary/30 rounded-full flex items-center justify-center"
                  >
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                      <Zap className="w-10 h-10 text-primary" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.span 
                    className="text-4xl md:text-5xl font-bold text-primary block"
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

        {/* Values Section */}
        <section ref={valuesRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Our Values</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                What Drives Us
              </h2>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <div className="w-14 h-14 rounded-xl glass flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Meet the Creators
              </h2>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-card rounded-2xl overflow-hidden group"
                >
                  <div 
                    className="aspect-square"
                    style={{ background: member.image }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-16 h-16 text-white/30" />
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">{member.role}</p>
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
              Let's Build Something Amazing
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Ready to start your digital journey? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GalaxyButton onClick={openModal} size="lg">
                Start a Project <ArrowUpRight className="w-4 h-4 ml-2" />
              </GalaxyButton>
              <Link to="/work">
                <button className="glass-button px-8 py-3 rounded-full font-medium hover:bg-primary/10 transition-colors">
                  View Our Work
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function About() {
  return (
    <SystemIntelligenceProvider>
      <AboutContent />
    </SystemIntelligenceProvider>
  );
}
