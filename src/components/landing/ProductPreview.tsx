import { useEffect, useRef, useState } from 'react';

const ProductPreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full max-w-5xl mx-auto px-5 py-24">
      <h2 className={`text-center font-display font-bold text-2xl sm:text-3xl text-foreground/90 mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        See what others can't
      </h2>

      <div
        className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        style={{ perspective: '1200px' }}
      >
        <div className="browser-frame sm:transform sm:rotate-y-[2deg]" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-2deg) rotateX(1deg)' }}>
          {/* Chrome bar */}
          <div className="browser-chrome">
            <div className="browser-dot" />
            <div className="browser-dot" />
            <div className="browser-dot" />
            <div className="flex-1 mx-4">
              <div className="h-5 bg-foreground/[0.04] rounded-full max-w-[280px] mx-auto flex items-center justify-center">
                <span className="text-[10px] text-foreground/20 font-mono">app.miaofi.com/portfolio</span>
              </div>
            </div>
          </div>

          {/* Dashboard mock */}
          <div className="p-5 sm:p-8 bg-[#0c0c12]">
            {/* Top stats row */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
              <div>
                <p className="text-foreground/40 text-xs mb-1">Portfolio Value</p>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground/90">$127,482</p>
              </div>
              <div>
                <p className="text-foreground/40 text-xs mb-1">30d P&L</p>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-accent">+12.3%</p>
              </div>
              <div className="ml-auto flex items-end gap-2">
                {['ETH', 'SOL', 'ARB'].map(c => (
                  <span key={c} className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono text-foreground/50">{c}</span>
                ))}
              </div>
            </div>

            {/* Risk gauge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="3"
                    strokeDasharray={`${62 * 0.62} ${62 * 0.38}`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold text-foreground/80">6.2</span>
              </div>
              <div>
                <p className="text-foreground/60 text-sm font-medium">Risk Score</p>
                <p className="text-foreground/30 text-xs">Moderate-High</p>
              </div>
            </div>

            {/* Diagnosis cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: '🔴', title: 'Concentration Risk', desc: '68% in single asset', border: 'border-destructive/20' },
                { icon: '⚠️', title: 'FOMO Pattern', desc: '4 buys after price spikes', border: 'border-amber-500/20' },
                { icon: '💡', title: 'Yield Opportunity', desc: '$280/mo unrealized', border: 'border-accent/20' },
              ].map(card => (
                <div key={card.title} className={`glass-card rounded-xl p-4 ${card.border}`}>
                  <p className="text-base mb-1">{card.icon}</p>
                  <p className="text-foreground/80 text-sm font-medium mb-0.5">{card.title}</p>
                  <p className="text-foreground/35 text-xs">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Glow reflection */}
        <div className="h-20 bg-gradient-to-b from-primary/5 to-transparent rounded-b-3xl blur-2xl -mt-4 mx-8" />
      </div>
    </section>
  );
};

export default ProductPreview;
