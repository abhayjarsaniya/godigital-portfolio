/**
 * GODIGITAL Design-OS — Scroll Intelligence Hook
 * 
 * Monitors scroll behavior and reports to System Intelligence.
 * Implements failure awareness through scroll speed detection.
 */

import { useEffect, useRef } from 'react';
import { useSystemIntelligence } from '@/contexts/SystemIntelligence';

export function useScrollIntelligence() {
  const { reportScrollSpeed, behavior } = useSystemIntelligence();
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const deltaY = Math.abs(window.scrollY - lastScrollY.current);
      const deltaTime = now - lastScrollTime.current;
      
      if (deltaTime > 0) {
        const speed = deltaY / deltaTime * 1000; // pixels per second
        reportScrollSpeed(speed);
      }
      
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reportScrollSpeed]);
  
  return {
    scrollBehavior: behavior.scrollSpeed,
    isScrollingFast: behavior.scrollSpeed === 'fast',
  };
}
