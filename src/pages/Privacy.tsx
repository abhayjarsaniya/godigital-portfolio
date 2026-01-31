import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';

function PrivacyContent() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const contentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us via email or phone. This may include:
      
• Name and contact information (email, phone number)
• Company or organization details
• Project requirements and preferences
• Any other information you choose to provide

We also automatically collect certain information when you visit our website, including your IP address, browser type, and pages visited.`
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

• Respond to your inquiries and provide customer support
• Process and fulfill your service requests
• Send you updates about your projects
• Improve our website and services
• Communicate with you about promotions, updates, and news (with your consent)
• Comply with legal obligations

We never sell your personal information to third parties.`
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Encryption of data in transit and at rest
• Regular security assessments and updates
• Access controls and authentication
• Secure hosting infrastructure
• Employee training on data protection

While we strive to protect your information, no method of transmission over the internet is 100% secure.`
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: `You have certain rights regarding your personal information:

• Access: Request a copy of the personal data we hold about you
• Correction: Request correction of inaccurate data
• Deletion: Request deletion of your personal data
• Objection: Object to processing of your personal data
• Portability: Request transfer of your data to another service
• Withdrawal: Withdraw consent where processing is based on consent

To exercise these rights, please contact us using the information provided below.`
    },
    {
      icon: Shield,
      title: 'Cookies & Tracking',
      content: `Our website uses cookies and similar technologies to enhance your experience. These include:

• Essential cookies: Required for basic site functionality
• Analytics cookies: Help us understand how visitors use our site
• Preference cookies: Remember your settings and preferences

You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.`
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy or our data practices, please contact us at:

Email: privacy@godigital.io
Phone: +91 76003 23130
Address: Mumbai, Maharashtra, India

We will respond to your inquiry within 30 days.

This policy was last updated on January 2024.`
    },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[40vh] flex items-center justify-center pt-20">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                ◈ Legal
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Privacy</span>
                <span className="text-foreground"> Policy</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, 
                use, and protect your personal information.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section ref={contentRef} className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-6 md:p-8 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        {section.title}
                      </h2>
                      <div className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function Privacy() {
  return (
    <SystemIntelligenceProvider>
      <PrivacyContent />
    </SystemIntelligenceProvider>
  );
}
