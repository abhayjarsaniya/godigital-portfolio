import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useMotionAdaptation, useTemporalAwareness } from '@/contexts/SystemIntelligence';
import { useHoverIntelligence } from '@/hooks/useHoverIntelligence';

interface ServiceModuleProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  animation: 'scroll' | 'morph' | 'pulse';
  index: number;
}

function ScrollAnimation({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="relative h-20 overflow-hidden">
      <motion.div
        animate={{ y: [0, -60 * intensity, 0] }}
        transition={{ duration: 3 / intensity, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-2"
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 bg-primary/20 rounded-full" style={{ width: `${60 + i * 10}%` }} />
        ))}
      </motion.div>
    </div>
  );
}

function MorphAnimation({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="relative h-20 flex items-center justify-center">
      <motion.div
        animate={{ 
          borderRadius: ['20%', '50%', '30%', '20%'],
          rotate: [0, 90 * intensity, 180 * intensity, 360 * intensity],
          scale: [1, 1 + (0.1 * intensity), 1 - (0.1 * intensity), 1],
        }}
        transition={{ duration: 4 / intensity, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        className="w-16 h-16 bg-gradient-to-br from-primary/40 to-primary/10"
      />
    </div>
  );
}

function PulseAnimation({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="relative h-20 flex items-center justify-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{ height: [20, 20 + (40 * intensity), 20] }}
          transition={{ 
            duration: 1 / intensity, 
            repeat: Infinity, 
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-2 bg-primary/40 rounded-full"
        />
      ))}
    </div>
  );
}

const animations = {
  scroll: ScrollAnimation,
  morph: MorphAnimation,
  pulse: PulseAnimation,
};

export default function ServiceModule({ title, description, features, icon, animation, index }: ServiceModuleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  
  // Intelligence integration
  const { scale: motionScale, density } = useMotionAdaptation();
  const { config: temporalConfig } = useTemporalAwareness();
  const { onHoverStart, onHoverEnd, responseConfidence } = useHoverIntelligence(`service-${title}`);
  
  const AnimationComponent = animations[animation];
  
  // Calculate motion intensity based on system state
  const motionIntensity = temporalConfig.animationSpeed * (density === 'minimal' ? 0.3 : 1);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStart();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverEnd();
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={isInView ? { opacity: temporalConfig.opacity, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: motionScale(0.8), 
        delay: index * motionScale(0.15),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="service-module rounded-2xl p-8 perspective-1000"
      style={{
        // Response confidence affects hover response
        transition: `all ${0.5 / responseConfidence}s cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="text-primary/60 p-3 rounded-xl glass-icon">{icon}</div>
        <span className="text-xs text-muted-foreground uppercase tracking-widest px-2 py-1 rounded-full glass-badge">
          0{index + 1}
        </span>
      </div>
      
      <h3 className="text-2xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6">{description}</p>
      
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
        transition={{ duration: motionScale(0.3), ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="mb-6">
          <AnimationComponent intensity={motionIntensity} />
        </div>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
              transition={{ delay: i * motionScale(0.05), duration: motionScale(0.3) }}
              className="text-sm text-muted-foreground flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-primary rounded-full" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}