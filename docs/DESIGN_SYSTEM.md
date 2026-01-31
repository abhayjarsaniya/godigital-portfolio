# GODIGITAL Design-OS — System Documentation

> This documentation is for future builders. It describes the internal architecture,
> motion principles, interaction grammar, and ethical constraints of the GODIGITAL
> Design Operating System.

---

## 1. MOTION PRINCIPLES

### 1.1 Core Easing
All animations use a custom easing curve that feels organic and intentional:
```
cubic-bezier(0.22, 1, 0.36, 1)
```
This easing is codified as `--ease-out-expo` in the design tokens.

### 1.2 Motion Density Levels
The system supports four motion density levels that adapt based on:
- User visit count (returning users see calmer motion)
- Time on page (longer stays = reduced intensity)
- Scroll behavior (fast scrolling triggers clarity mode)

| Level    | Multiplier | When Applied |
|----------|------------|--------------|
| Rich     | 1.0        | First visit, first 5 seconds |
| Balanced | 0.75       | After 2+ minutes, or 3+ visits |
| Calm     | 0.5        | After 5+ visits |
| Minimal  | 0.25       | Accessibility preference detected |

### 1.3 Delay Stacking
Staggered animations use consistent delay increments:
- Base delay: `index * 0.15s` for service modules
- Never exceed 1s total stagger across a group
- Delays reduce proportionally with motion density

### 1.4 Imperfection Rules
To maintain human feel:
- Floating elements have slight rotational drift (±1deg)
- Movement paths include subtle randomization
- No element moves in perfectly straight lines

---

## 2. INTERACTION GRAMMAR

### 2.1 Hover Behavior
- Hover triggers are generous (not pixel-perfect)
- Response time: immediate visual feedback, full animation within 300ms
- Exit animations are 20% faster than entry

### 2.2 Scroll Behavior
- Smooth scrolling via Lenis with duration: 1.2s
- Scroll-triggered reveals use `margin: -100px` for early activation
- No scroll hijacking—user maintains control

### 2.3 Failure Awareness
The system detects and responds to confusion:

| Signal | Response |
|--------|----------|
| Fast scrolling | Reduce motion, increase contrast |
| Repeated hovers | Increase interaction confidence |
| Hesitation patterns | Boost clarity, simplify animations |

---

## 3. VISUAL DNA

### 3.1 Color System
All colors are HSL-based and semantic:
- `--background`: Deep obsidian (0 0% 4%)
- `--foreground`: Warm cream (45 10% 92%)
- `--primary`: Amber gold (38 92% 55%)
- `--accent`: Electric amber (32 100% 50%)

### 3.2 Typography
- Font: Space Grotesk
- Weights: 300 (light) to 700 (bold)
- Tracking: Tight for headlines, normal for body

### 3.3 Grain & Texture
- Film grain overlay at 3.5% opacity
- Applied globally via `.grain-overlay` class
- Never animate grain—it's a constant textural element

### 3.4 Glow System
Two glow intensities for depth:
- `.glow-soft`: 60px spread, 15% opacity
- `.glow-intense`: 100px primary + 200px secondary

---

## 4. TEMPORAL AWARENESS

### 4.1 Phase Definitions
| Phase | Time Range | System Behavior |
|-------|------------|-----------------|
| Curiosity | 0-5s | Full animation, rich motion |
| Trust | 5-30s | Slight motion reduction |
| Readiness | 30s-2min | Focused, purposeful motion |
| Comfort | 2min+ | Calm, minimal unnecessary movement |

### 4.2 Phase Transitions
- Transitions are invisible to users
- No UI indicates phase changes
- Motion smoothly interpolates between states

---

## 5. INFORMATION GRAVITY

### 5.1 Weight Classes
Content has inherent "gravity" affecting its behavior:

| Weight | Drift Allowed | Stability |
|--------|---------------|-----------|
| Core | 0px | Anchored |
| Primary | 6px | Resistant |
| Secondary | 12px | Yielding |
| Tertiary | 20px | Free-floating |

### 5.2 Application
- Brand name: Core weight
- Service titles: Primary weight
- Descriptions: Secondary weight
- Decorative elements: Tertiary weight

---

## 6. ETHICAL CONSTRAINTS

### 6.1 Forbidden Patterns
The system will reject any implementation containing:
- `fake-urgency`
- `countdown-pressure`
- `fomo-trigger`
- `attention-hijack`
- `infinite-scroll-trap`
- `dark-confirm`
- `hidden-cost`
- `forced-continuity`

### 6.2 Animation Ethics
- No animation exists purely for engagement
- All motion must serve comprehension or delight
- If an animation can be removed without loss of meaning, remove it

---

## 7. SCALE CONSTRAINTS

### 7.1 Performance Budgets
- Max simultaneous animations: 12
- WebGL particle count: 2000 (adaptive to device)
- CSS animations preferred over JS for simple effects

### 7.2 Internationalization Ready
- All text is externalized (no hardcoded strings)
- RTL layout support via logical properties
- Font loading optimized for variable character sets

### 7.3 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large: > 1400px

---

## 8. COMPONENT ARCHITECTURE

### 8.1 Intelligence Integration
Components access system intelligence via hooks:
```tsx
import { useMotionAdaptation } from '@/contexts/SystemIntelligence';
import { useHoverIntelligence } from '@/hooks/useHoverIntelligence';
```

### 8.2 Gravity-Aware Components
Content components declare their importance:
```tsx
import { useInformationGravity } from '@/contexts/SystemIntelligence';

const { maxDrift, resistance } = useInformationGravity('primary');
```

---

## 9. CRITIQUE PROTOCOL

Before any component ships, verify:

1. **Inevitability**: Does this feel like it must exist?
2. **Necessity**: Can anything be removed without loss?
3. **Ethics**: Does this respect user attention?
4. **Scale**: Will this remain calm at 10× load?
5. **Accessibility**: Does this work without motion?

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Initial | Core design system |
| 2.0.0 | Evolution | Added intelligence layers |

---

*This is a living document. It evolves with the system.*
