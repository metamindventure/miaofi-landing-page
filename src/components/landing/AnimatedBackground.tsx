import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const onScroll = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--scroll-y', `${window.scrollY}`);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none" style={{ '--scroll-y': '0' } as React.CSSProperties}>
      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] to-[#0d0b1a]" />

      {/* Layer 2: Ambient orbs */}
      <div className="orb-1" style={{ transform: 'translateY(calc(var(--scroll-y) * 0.03px))' }} />
      <div className="orb-2" style={{ transform: 'translateY(calc(var(--scroll-y) * 0.05px))' }} />
      <div className="orb-3 hidden sm:block" style={{ transform: 'translateY(calc(var(--scroll-y) * 0.04px))' }} />

      {/* Layer 3: Dot grid */}
      <div className="dot-grid" />

      {/* Layer 4: Hero glow */}
      <div className="hero-glow" />
    </div>
  );
};

export default AnimatedBackground;
