/**
 * GODIGITAL Design-OS — Hover Intelligence Hook
 * 
 * Tracks hover patterns and detects hesitation.
 * Implements failure awareness through repeated hover detection.
 */

import { useCallback, useRef } from 'react';
import { useSystemIntelligence } from '@/contexts/SystemIntelligence';

export function useHoverIntelligence(elementId: string) {
  const { reportHover, reportHesitation, clarityBoost } = useSystemIntelligence();
  const hoverStartTime = useRef<number | null>(null);
  const hoverCount = useRef(0);
  
  const onHoverStart = useCallback(() => {
    hoverStartTime.current = Date.now();
    hoverCount.current += 1;
    reportHover(elementId);
  }, [elementId, reportHover]);
  
  const onHoverEnd = useCallback(() => {
    if (hoverStartTime.current) {
      const duration = Date.now() - hoverStartTime.current;
      
      // Short hovers followed by return indicate hesitation
      if (duration < 500 && hoverCount.current > 1) {
        reportHesitation();
      }
      
      hoverStartTime.current = null;
    }
  }, [reportHesitation]);
  
  return {
    onHoverStart,
    onHoverEnd,
    hoverCount: hoverCount.current,
    // Components can use this to increase their response confidence
    responseConfidence: Math.min(1, 0.7 + clarityBoost * 0.3),
  };
}
