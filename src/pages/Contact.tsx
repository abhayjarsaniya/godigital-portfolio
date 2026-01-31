import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { GalaxyButton } from '@/components/ui/galaxy-button';
import { useContactModal } from '@/contexts/ContactModalContext';

function ContactContent() {
  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const faqRef = useRef(null);
  const mapRef = useRef(null);
  const ctaRef = useRef(null);
  const { openModal } = useContactModal();
  
  const heroInView = useInView(heroRef, { once: true });
  const infoInView = useInView(infoRef, { once: true, margin: '-100px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });
  const mapInView = useInView(mapRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@godigital.io', href: 'mailto:hello@godigital.io' },
    { icon: Phone, label: 'Phone', value: '+91 76003 23130', href: 'tel:+917600323130' },
    { icon: MapPin, label: 'Location', value: 'Mumbai, India', href: '#' },
    { icon: Clock, label: 'Working Hours', value: 'Mon-Sat, 9AM-7PM IST', href: '#' },
  ];

  const faqs = [
    { q: 'How long does a typical project take?', a: 'Most projects are completed within 2-8 weeks depending on complexity. We provide detailed timelines during our initial consultation.' },
    { q: 'What is your pricing model?', a: 'We offer flexible pricing including fixed-price packages and custom quotes. Our packages start at ₹2,999 for starter websites.' },
    { q: 'Do you provide ongoing support?', a: 'Yes! We offer maintenance packages and are always available for updates, bug fixes, and improvements after launch.' },
    { q: 'Can you work with my existing brand guidelines?', a: 'Absolutely. We seamlessly integrate with existing brand identities or can help create new ones from scratch.' },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 border border-primary/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/3 right-1/4 w-64 h-64 border border-accent/10 rounded-full"
            />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                ◈ Get In Touch
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Let's Create</span>
                <br />
                <span className="text-foreground">Together</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                Ready to transform your ideas into digital reality? 
                We're here to help bring your vision to life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section ref={infoRef} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                    {item.value}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Button Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-12 rounded-3xl"
            >
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Start a Conversation
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Click below to open our contact form. Tell us about your project
                and we'll get back to you within 24 hours.
              </p>
              <GalaxyButton onClick={openModal} size="lg">
                <Send className="w-5 h-5 mr-2" />
                Open Contact Form
              </GalaxyButton>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Common Questions
              </h2>
            </motion.div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={faqInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section ref={mapRef} className="py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={mapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Location</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Find Us
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={mapInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-3xl overflow-hidden h-80"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-foreground font-medium">Mumbai, Maharashtra</p>
                  <p className="text-muted-foreground text-sm">India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={ctaRef} className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss your project and see how we can help.
            </p>
            <GalaxyButton onClick={openModal} size="lg">
              Start Your Project
            </GalaxyButton>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function Contact() {
  return (
    <SystemIntelligenceProvider>
      <ContactContent />
    </SystemIntelligenceProvider>
  );
}
