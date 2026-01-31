/**
 * GODIGITAL Design-OS — System Intelligence Layer
 * 
 * This context provides centralized behavioral intelligence across the experience.
 * It tracks user patterns and adapts the system's motion, density, and interaction
 * responses over time without visible personalization UI.
 * 
 * ETHICAL CONSTRAINTS (hard-coded):
 * - No attention manipulation
 * - No fake urgency
 * - No dark patterns
 * - No over-animation for engagement
 */

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// TEMPORAL PHASES — Time awareness without timers or labels
// ═══════════════════════════════════════════════════════════════════════════
export type TemporalPhase = 'curiosity' | 'trust' | 'readiness' | 'comfort';

const PHASE_THRESHOLDS = {
  curiosity: 0,      // 0-5 seconds
  trust: 5000,       // 5-30 seconds
  readiness: 30000,  // 30s-2min
  comfort: 120000,   // 2min+
};

// ═══════════════════════════════════════════════════════════════════════════
// MOTION DENSITY LEVELS — Scales with experience
// ═══════════════════════════════════════════════════════════════════════════
export type MotionDensity = 'rich' | 'balanced' | 'calm' | 'minimal';

const MOTION_MULTIPLIERS: Record<MotionDensity, number> = {
  rich: 1,
  balanced: 0.75,
  calm: 0.5,
  minimal: 0.25,
};

// ═══════════════════════════════════════════════════════════════════════════
// BEHAVIOR PATTERNS — What we track (ethically)
// ═══════════════════════════════════════════════════════════════════════════
interface BehaviorPatterns {
  scrollSpeed: 'slow' | 'normal' | 'fast';
  hoverConfidence: 'hesitant' | 'normal' | 'confident';
  engagementLevel: 'exploring' | 'focused' | 'deciding';
  repeatHoverCount: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// SYSTEM STATE — The intelligence brain
// ═══════════════════════════════════════════════════════════════════════════
interface SystemState {
  // Temporal awareness
  temporalPhase: TemporalPhase;
  timeOnPage: number;
  
  // Motion adaptation
  motionDensity: MotionDensity;
  motionMultiplier: number;
  
  // Behavior patterns
  behavior: BehaviorPatterns;
  
  // Visit memory
  visitCount: number;
  isReturningUser: boolean;
  
  // Failure awareness corrections
  clarityBoost: number; // 0-1, increases when user seems confused
  
  // Ethical constraints check
  isEthical: (action: string) => boolean;
}

interface SystemActions {
  reportScrollSpeed: (speed: number) => void;
  reportHover: (elementId: string) => void;
  reportHesitation: () => void;
  getMotionScale: (baseValue: number) => number;
  getGravityWeight: (importance: 'core' | 'primary' | 'secondary' | 'tertiary') => number;
}

const SystemIntelligenceContext = createContext<(SystemState & SystemActions) | null>(null);

// ═══════════════════════════════════════════════════════════════════════════
// STORAGE KEYS — For persistent memory
// ═══════════════════════════════════════════════════════════════════════════
const STORAGE_KEYS = {
  visitCount: 'godigital_visits',
  motionPreference: 'godigital_motion_pref',
  lastVisit: 'godigital_last_visit',
};

// ═══════════════════════════════════════════════════════════════════════════
// ETHICAL CONSTRAINTS — Hard-coded refusals
// ═══════════════════════════════════════════════════════════════════════════
const FORBIDDEN_PATTERNS = [
  'fake-urgency',
  'countdown-pressure',
  'fomo-trigger',
  'attention-hijack',
  'infinite-scroll-trap',
  'dark-confirm',
  'hidden-cost',
  'forced-continuity',
];

export function SystemIntelligenceProvider({ children }: { children: React.ReactNode }) {
  // ─────────────────────────────────────────────────────────────────────────
  // State initialization
  // ─────────────────────────────────────────────────────────────────────────
  const [temporalPhase, setTemporalPhase] = useState<TemporalPhase>('curiosity');
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [motionDensity, setMotionDensity] = useState<MotionDensity>('rich');
  const [clarityBoost, setClarityBoost] = useState(0);
  const [behavior, setBehavior] = useState<BehaviorPatterns>({
    scrollSpeed: 'normal',
    hoverConfidence: 'normal',
    engagementLevel: 'exploring',
    repeatHoverCount: 0,
  });
  
  const hoverHistoryRef = useRef<Map<string, number>>(new Map());
  const scrollSamplesRef = useRef<number[]>([]);
  const hesitationCountRef = useRef(0);
  
  // ─────────────────────────────────────────────────────────────────────────
  // Persistent memory - visit tracking
  // ─────────────────────────────────────────────────────────────────────────
  const [visitCount, setVisitCount] = useState(1);
  const [isReturningUser, setIsReturningUser] = useState(false);
  
  useEffect(() => {
    const storedVisits = parseInt(localStorage.getItem(STORAGE_KEYS.visitCount) || '0', 10);
    const lastVisit = localStorage.getItem(STORAGE_KEYS.lastVisit);
    const now = Date.now();
    
    // Only count as new visit if more than 30 minutes since last
    const isNewVisit = !lastVisit || (now - parseInt(lastVisit, 10)) > 30 * 60 * 1000;
    
    if (isNewVisit) {
      const newCount = storedVisits + 1;
      setVisitCount(newCount);
      localStorage.setItem(STORAGE_KEYS.visitCount, newCount.toString());
    } else {
      setVisitCount(storedVisits);
    }
    
    localStorage.setItem(STORAGE_KEYS.lastVisit, now.toString());
    setIsReturningUser(storedVisits > 0);
    
    // Returning users get calmer motion by default
    if (storedVisits > 2) {
      setMotionDensity('balanced');
    }
    if (storedVisits > 5) {
      setMotionDensity('calm');
    }
  }, []);
  
  // ─────────────────────────────────────────────────────────────────────────
  // Temporal phase tracking
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setTimeOnPage(elapsed);
      
      // Update phase based on time
      if (elapsed >= PHASE_THRESHOLDS.comfort) {
        setTemporalPhase('comfort');
        // System becomes calmer the longer user stays
        setMotionDensity(prev => prev === 'rich' ? 'balanced' : prev);
      } else if (elapsed >= PHASE_THRESHOLDS.readiness) {
        setTemporalPhase('readiness');
      } else if (elapsed >= PHASE_THRESHOLDS.trust) {
        setTemporalPhase('trust');
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // ─────────────────────────────────────────────────────────────────────────
  // Behavior tracking actions
  // ─────────────────────────────────────────────────────────────────────────
  const reportScrollSpeed = useCallback((speed: number) => {
    scrollSamplesRef.current.push(speed);
    
    // Keep last 10 samples
    if (scrollSamplesRef.current.length > 10) {
      scrollSamplesRef.current.shift();
    }
    
    const avgSpeed = scrollSamplesRef.current.reduce((a, b) => a + b, 0) / scrollSamplesRef.current.length;
    
    // Failure awareness: if scrolling too fast, boost clarity
    if (avgSpeed > 2000) {
      setBehavior(prev => ({ ...prev, scrollSpeed: 'fast' }));
      setClarityBoost(prev => Math.min(1, prev + 0.1));
    } else if (avgSpeed < 500) {
      setBehavior(prev => ({ ...prev, scrollSpeed: 'slow' }));
      setClarityBoost(prev => Math.max(0, prev - 0.05));
    } else {
      setBehavior(prev => ({ ...prev, scrollSpeed: 'normal' }));
    }
  }, []);
  
  const reportHover = useCallback((elementId: string) => {
    const count = (hoverHistoryRef.current.get(elementId) || 0) + 1;
    hoverHistoryRef.current.set(elementId, count);
    
    // Failure awareness: repeated hovers indicate uncertainty
    if (count > 2) {
      setBehavior(prev => ({ 
        ...prev, 
        repeatHoverCount: count,
        hoverConfidence: 'hesitant',
      }));
      // Increase interaction confidence on repeated hovers
      setClarityBoost(prev => Math.min(1, prev + 0.15));
    }
  }, []);
  
  const reportHesitation = useCallback(() => {
    hesitationCountRef.current += 1;
    setClarityBoost(prev => Math.min(1, prev + 0.1));
    setBehavior(prev => ({ ...prev, hoverConfidence: 'hesitant' }));
  }, []);
  
  // ─────────────────────────────────────────────────────────────────────────
  // Motion scaling based on system state
  // ─────────────────────────────────────────────────────────────────────────
  const getMotionScale = useCallback((baseValue: number) => {
    const multiplier = MOTION_MULTIPLIERS[motionDensity];
    // Reduce motion further when clarity boost is high
    const clarityReduction = 1 - (clarityBoost * 0.3);
    return baseValue * multiplier * clarityReduction;
  }, [motionDensity, clarityBoost]);
  
  // ─────────────────────────────────────────────────────────────────────────
  // Information Gravity — Content weighting
  // ─────────────────────────────────────────────────────────────────────────
  const getGravityWeight = useCallback((importance: 'core' | 'primary' | 'secondary' | 'tertiary') => {
    // Higher weight = more resistance to movement
    const weights = {
      core: 1.0,      // Core values stay centered, resist movement
      primary: 0.7,   // Important ideas move slowly
      secondary: 0.4, // Supporting ideas can drift
      tertiary: 0.2,  // Secondary content yields space freely
    };
    return weights[importance];
  }, []);
  
  // ─────────────────────────────────────────────────────────────────────────
  // Ethical constraints checker
  // ─────────────────────────────────────────────────────────────────────────
  const isEthical = useCallback((action: string) => {
    return !FORBIDDEN_PATTERNS.some(pattern => 
      action.toLowerCase().includes(pattern)
    );
  }, []);
  
  const value: SystemState & SystemActions = {
    temporalPhase,
    timeOnPage,
    motionDensity,
    motionMultiplier: MOTION_MULTIPLIERS[motionDensity],
    behavior,
    visitCount,
    isReturningUser,
    clarityBoost,
    isEthical,
    reportScrollSpeed,
    reportHover,
    reportHesitation,
    getMotionScale,
    getGravityWeight,
  };
  
  return (
    <SystemIntelligenceContext.Provider value={value}>
      {children}
    </SystemIntelligenceContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK — Access system intelligence
// ═══════════════════════════════════════════════════════════════════════════
export function useSystemIntelligence() {
  const context = useContext(SystemIntelligenceContext);
  if (!context) {
    throw new Error('useSystemIntelligence must be used within SystemIntelligenceProvider');
  }
  return context;
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY HOOKS — Specific intelligence layers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook for temporal-aware components
 * Returns phase-specific values that change over time
 */
export function useTemporalAwareness() {
  const { temporalPhase, timeOnPage } = useSystemIntelligence();
  
  const phaseConfig = {
    curiosity: { opacity: 1, scale: 1, animationSpeed: 1 },
    trust: { opacity: 0.95, scale: 0.98, animationSpeed: 0.85 },
    readiness: { opacity: 0.9, scale: 0.96, animationSpeed: 0.7 },
    comfort: { opacity: 0.85, scale: 0.94, animationSpeed: 0.5 },
  };
  
  return {
    phase: temporalPhase,
    timeOnPage,
    config: phaseConfig[temporalPhase],
  };
}

/**
 * Hook for motion-adaptive components
 * Returns scaled motion values based on user behavior
 */
export function useMotionAdaptation() {
  const { getMotionScale, motionDensity, clarityBoost } = useSystemIntelligence();
  
  return {
    scale: getMotionScale,
    density: motionDensity,
    clarityBoost,
    // Pre-scaled common values
    duration: (base: number) => getMotionScale(base),
    delay: (base: number) => getMotionScale(base),
    distance: (base: number) => getMotionScale(base),
  };
}

/**
 * Hook for gravity-aware content
 * Returns movement constraints based on content importance
 */
export function useInformationGravity(importance: 'core' | 'primary' | 'secondary' | 'tertiary') {
  const { getGravityWeight } = useSystemIntelligence();
  const weight = getGravityWeight(importance);
  
  return {
    weight,
    // Higher weight = less movement allowed
    maxDrift: (1 - weight) * 20, // pixels
    resistance: weight,
    stayDuration: weight * 2000, // ms to stay centered
  };
}
