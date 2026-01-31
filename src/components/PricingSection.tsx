import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import { useMotionAdaptation, useTemporalAwareness } from '@/contexts/SystemIntelligence';
import { pricingTiers } from '@/data/portfolioProjects';
import { GalaxyButton } from '@/components/ui/galaxy-button';

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const { scale: motionScale } = useMotionAdaptation();
  const { config: temporalConfig } = useTemporalAwareness();
  
  return (
    <section ref={ref} id="pricing" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: temporalConfig.opacity, y: 0 } : {}}
          transition={{ duration: motionScale(0.8), ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest mb-4 block">
            Transparent
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Low cost. High care.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            No hidden fees. No surprises. Just honest work at fair prices.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => (
            <PricingCard 
              key={tier.id}
              tier={tier}
              index={index}
              isInView={isInView}
              motionScale={motionScale}
              temporalOpacity={temporalConfig.opacity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  tier: typeof pricingTiers[0];
  index: number;
  isInView: boolean;
  motionScale: (v: number) => number;
  temporalOpacity: number;
}

function PricingCard({ tier, index, isInView, motionScale, temporalOpacity }: PricingCardProps) {
  const isCustom = 'isCustom' in tier && tier.isCustom;
  const isPopular = tier.id === 'professional';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: temporalOpacity, y: 0 } : {}}
      transition={{ 
        duration: motionScale(0.8), 
        delay: motionScale(0.15 + index * 0.1),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        relative p-6 rounded-2xl transition-all duration-500 group glass-card
        ${isPopular 
          ? 'border-primary/40 shadow-[0_0_60px_hsl(var(--glow-primary)/0.2)]' 
          : ''
        }
        ${isCustom ? 'bg-gradient-to-br from-background/40 to-primary/5' : ''}
      `}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 glass-badge bg-primary/20 border-primary/40 text-primary text-xs uppercase tracking-wider rounded-full font-medium">
          Popular
        </span>
      )}
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{tier.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
        
        <div className="flex items-baseline gap-1">
          {isCustom ? (
            <span className="text-3xl font-bold text-foreground">Custom</span>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">{tier.currency}</span>
              <span className="text-3xl font-bold text-foreground">
                {tier.price?.toLocaleString('en-IN')}
              </span>
            </>
          )}
        </div>
        
        {!isCustom && tier.pages && (
          <p className="text-sm text-primary mt-2">{tier.pages} Pages Website</p>
        )}
      </div>
      
      <ul className="space-y-3 mb-6">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <GalaxyButton
        variant={isPopular || isCustom ? "primary" : "secondary"}
        className="w-full"
      >
        {isCustom ? (
          <>
            <MessageCircle className="w-4 h-4" />
            Inquiry Now
          </>
        ) : (
          <>
            Get Started
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </GalaxyButton>
    </motion.div>
  );
}
