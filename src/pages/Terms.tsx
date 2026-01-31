import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { FileText, Scale, AlertCircle, CreditCard, Clock, Ban, RefreshCw, Mail } from 'lucide-react';

function TermsContent() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const contentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const sections = [
    {
      icon: FileText,
      title: 'Agreement to Terms',
      content: `By accessing and using GODIGITAL's services and website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.

These terms apply to all visitors, users, and clients who access or use our services. We reserve the right to update these terms at any time, and continued use of our services constitutes acceptance of any changes.`
    },
    {
      icon: Scale,
      title: 'Services & Deliverables',
      content: `GODIGITAL provides digital design and development services including but not limited to:

• Website design and development
• Mobile application development
• Dashboard and software development
• Graphic design and branding
• AI integration and automation

All deliverables are subject to the specific terms outlined in individual project proposals and agreements. We retain the right to display completed work in our portfolio unless otherwise agreed in writing.`
    },
    {
      icon: CreditCard,
      title: 'Payment Terms',
      content: `Payment terms are as follows:

• 50% advance payment required before project commencement
• Remaining 50% due upon project completion and before final delivery
• For larger projects, milestone-based payment schedules may be arranged
• All prices are in Indian Rupees (INR) unless otherwise specified
• Prices are exclusive of applicable taxes

Late payments may incur additional charges and delay project timelines. We reserve the right to suspend work on accounts with outstanding balances.`
    },
    {
      icon: Clock,
      title: 'Project Timelines',
      content: `Project timelines are estimated based on the scope of work and are subject to:

• Timely provision of content and feedback from the client
• Scope remaining unchanged throughout the project
• Prompt approval of design concepts and deliverables

Delays caused by late feedback, scope changes, or incomplete content may extend project timelines. We will communicate any anticipated delays promptly.`
    },
    {
      icon: RefreshCw,
      title: 'Revisions & Changes',
      content: `Our standard service includes a reasonable number of revision rounds as specified in your project proposal. Additional revisions beyond the included scope will be billed separately.

Major scope changes after project commencement may require a change order with adjusted pricing and timeline. We recommend finalizing requirements before project kickoff to avoid additional costs.`
    },
    {
      icon: AlertCircle,
      title: 'Intellectual Property',
      content: `Upon full payment:

• Client receives full ownership of custom designs and code created specifically for their project
• GODIGITAL retains rights to general techniques, tools, and frameworks developed
• Third-party assets (fonts, images, plugins) are subject to their respective licenses

We may use open-source and third-party components which are governed by their own licensing terms. We will inform you of any licensing requirements for third-party components used in your project.`
    },
    {
      icon: Ban,
      title: 'Limitation of Liability',
      content: `GODIGITAL shall not be liable for:

• Indirect, incidental, or consequential damages
• Loss of profits, data, or business opportunities
• Delays due to circumstances beyond our control
• Issues arising from third-party services or hosting

Our total liability shall not exceed the amount paid for the specific service in question. We recommend maintaining backups of all content and data provided to us.`
    },
    {
      icon: Mail,
      title: 'Contact & Disputes',
      content: `For questions about these terms or to report issues:

Email: legal@godigital.io
Phone: +91 76003 23130

Any disputes arising from these terms shall be governed by the laws of India and subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.

These terms were last updated on January 2024.`
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
                <span className="text-gradient">Terms of</span>
                <span className="text-foreground"> Service</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Please read these terms carefully before using our services.
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

export default function Terms() {
  return (
    <SystemIntelligenceProvider>
      <TermsContent />
    </SystemIntelligenceProvider>
  );
}
