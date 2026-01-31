import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useMotionAdaptation, useInformationGravity } from '@/contexts/SystemIntelligence';

type GravityWeight = 'core' | 'primary' | 'secondary' | 'tertiary';

const words = [
  { text: 'Design', x: '10%', y: '20%', size: 'text-6xl md:text-8xl', gravity: 'primary' as GravityWeight },
  { text: 'Web', x: '65%', y: '15%', size: 'text-7xl md:text-9xl', gravity: 'secondary' as GravityWeight },
  { text: 'Brand', x: '20%', y: '55%', size: 'text-5xl md:text-7xl', gravity: 'primary' as GravityWeight },
  { text: 'Automation', x: '55%', y: '70%', size: 'text-4xl md:text-6xl', gravity: 'tertiary' as GravityWeight },
  { text: 'Digital', x: '75%', y: '45%', size: 'text-5xl md:text-7xl', gravity: 'secondary' as GravityWeight },
];

interface WordProps {
  text: string;
  x: string;
  y: string;
  size: string;
  gravity: GravityWeight;
  index: number;
}

function FloatingWord({ text, x, y, size, gravity, index }: WordProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { scale: motionScale } = useMotionAdaptation();
  const { maxDrift, resistance } = useInformationGravity(gravity);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Apply gravity resistance - higher weight = less movement
      const movementFactor = 0.02 * (1 - resistance);
      const distanceX = Math.min(maxDrift, (e.clientX - centerX) * movementFactor);
      const distanceY = Math.min(maxDrift, (e.clientY - centerY) * movementFactor);
      
      setOffset({ x: distanceX, y: distanceY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [maxDrift, resistance]);
  
  // Scale animation duration based on motion adaptation
  const baseDuration = 1;
  const adaptedDuration = motionScale(baseDuration);
  
  return (
    <motion.div
      ref={ref}
      className={`floating-word absolute ${size}`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        x: offset.x,
        translateY: offset.y,
      }}
      transition={{
        opacity: { duration: adaptedDuration, delay: index * 0.15 },
        y: { duration: adaptedDuration, delay: index * 0.15 },
        x: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        translateY: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      whileHover={{ scale: 1 + (0.05 * (1 - resistance)) }}
    >
      {text}
    </motion.div>
  );
}

export default function FloatingWords() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {words.map((word, index) => (
        <div key={word.text} className="pointer-events-auto">
          <FloatingWord {...word} index={index} />
        </div>
      ))}
    </div>
  );
}