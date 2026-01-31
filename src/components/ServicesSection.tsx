import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ServiceModule from './ServiceModule';
import { Globe, Palette, BarChart3, Zap, Code } from 'lucide-react';
import { useMotionAdaptation, useTemporalAwareness } from '@/contexts/SystemIntelligence';

const experiments = [
  {
    title: 'Website',
    description: 'Custom-built digital experiences that captivate and convert.',
    features: ['Responsive Design', 'Performance Optimized', 'SEO Ready', 'CMS Integration'],
    icon: <Globe className="w-8 h-8" />,
    animation: 'scroll' as const,
    link: '/experiments/website',
  },
  {
    title: 'Branding',
    description: 'Visual identities that tell your story and stand apart.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Systems', 'Brand Strategy'],
    icon: <Palette className="w-8 h-8" />,
    animation: 'morph' as const,
    link: '/experiments/branding',
  },
  {
    title: 'Ads & Marketing',
    description: 'Data-driven campaigns that reach and resonate.',
    features: ['Social Media', 'Google Ads', 'Analytics', 'A/B Testing'],
    icon: <BarChart3 className="w-8 h-8" />,
    animation: 'pulse' as const,
    link: '/experiments/ads-marketing',
  },
  {
    title: 'Automation',
    description: 'Streamlined workflows that save time and scale.',
    features: ['Email Flows', 'CRM Setup', 'Integrations', 'Custom Scripts'],
    icon: <Zap className="w-8 h-8" />,
    animation: 'scroll' as const,
    link: '/experiments/automation',
  },
  {
    title: 'Development',
    description: 'Clean code that powers ambitious ideas.',
    features: ['Web Apps', 'APIs', 'E-commerce', 'Maintenance'],
    icon: <Code className="w-8 h-8" />,
    animation: 'morph' as const,
    link: '/experiments/development',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Intelligence integration
  const { scale: motionScale } = useMotionAdaptation();
  const { config: temporalConfig } = useTemporalAwareness();
  
  return (
    <section ref={ref} id="services" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: temporalConfig.opacity, y: 0 } : {}}
          transition={{ duration: motionScale(0.8), ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm uppercase tracking-widest mb-4 block">
            Experiments
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            What we create
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <Link key={experiment.title} to={experiment.link}>
              <ServiceModule 
                title={experiment.title}
                description={experiment.description}
                features={experiment.features}
                icon={experiment.icon}
                animation={experiment.animation}
                index={index} 
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}