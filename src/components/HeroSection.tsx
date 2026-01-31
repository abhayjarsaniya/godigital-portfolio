import { motion } from 'framer-motion';
import FloatingWords from './FloatingWords';
import { useMotionAdaptation, useTemporalAwareness, useInformationGravity } from '@/contexts/SystemIntelligence';
import { GalaxyButton } from '@/components/ui/galaxy-button';

export default function HeroSection() {
  const { scale: motionScale } = useMotionAdaptation();
  const { config: temporalConfig } = useTemporalAwareness();
  const { resistance: brandResistance } = useInformationGravity('core');
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingWords />
      
      {/* Center content - Core weight, resists movement */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: temporalConfig.opacity, scale: temporalConfig.scale }}
          transition={{ duration: motionScale(1.2), ease: [0.22, 1, 0.36, 1] }}
          // Brand name has maximum gravity - stays anchored
          style={{ willChange: 'transform' }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
            <span className="text-gradient">GO</span>
            <span className="text-foreground">DIGITAL</span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: temporalConfig.opacity * 0.9, y: 0 }}
          transition={{ duration: motionScale(0.8), delay: motionScale(0.5), ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto mb-12"
        >
          Creative experiments in digital space.
          <br />
          Low cost. High care.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionScale(0.8), delay: motionScale(0.8), ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <GalaxyButton onClick={scrollToContact} size="lg">
            Start a project →
          </GalaxyButton>
          <GalaxyButton variant="ghost" onClick={scrollToWork}>
            Explore experiments
          </GalaxyButton>
        </motion.div>
      </div>
      
      {/* Scroll indicator - only shows during curiosity phase */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: temporalConfig.animationSpeed }}
        transition={{ delay: motionScale(1.5), duration: motionScale(1) }}
      >
        <motion.div
          animate={{ y: [0, 10 * temporalConfig.animationSpeed, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          className="w-6 h-10 rounded-full glass-button flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ['20%', '80%', '20%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            className="w-1 bg-primary/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
