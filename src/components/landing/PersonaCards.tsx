import { useEffect, useRef, useState } from 'react';

const personas = [
  {
    emoji: '🐋',
    name: 'Whale',
    pnl: '+$48,291',
    positive: true,
    insight: 'One crash away from ruin',
    risk: 4,
    chains: ['ETH', 'SOL', 'ARB'],
    glowColor: 'hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]',
  },
  {
    emoji: '🎰',
    name: 'Degen',
    pnl: '-$3,847',
    positive: false,
    insight: '4 FOMO trades this week',
    risk: 9,
    chains: ['SOL', 'BASE'],
    glowColor: 'hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.2)]',
  },
  {
    emoji: '😴',
    name: 'Sleeper',
    pnl: '+$891',
    positive: true,
    insight: 'Leaving $280/mo on table',
    risk: 3,
    chains: ['ETH', 'OP'],
    glowColor: 'hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]',
  },
];

const PersonaCards = () => {
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
    <section ref={ref} className="w-full max-w-4xl mx-auto px-5 py-16">
      <p className={`text-center text-foreground/30 text-sm mb-8 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        Recent Diagnoses
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {personas.map((p, i) => (
          <button
            key={p.name}
            onClick={() => alert(`Loading ${p.name} portfolio... (demo)`)}
            className={`group glass-card rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/[0.15] cursor-pointer relative overflow-hidden ${p.glowColor} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${200 + i * 100}ms` }}
          >
            {/* CLASSIFIED watermark */}
            <span className="classified-stamp">CLASSIFIED</span>

            <span className="text-[40px] leading-none relative z-10">{p.emoji}</span>
            <p className="font-display font-bold text-foreground/90 text-lg mt-3 relative z-10">{p.name}</p>
            <p className={`font-mono text-2xl font-bold mt-1 relative z-10 ${p.positive ? 'text-accent' : 'text-destructive'}`}>
              {p.pnl}
            </p>
            <p className="text-foreground/40 text-xs mt-2 italic relative z-10">
              <span className="redacted">{p.insight}</span>
            </p>
            <div className="flex items-center gap-2 mt-3 relative z-10">
              <span className="text-foreground/25 text-[10px] font-mono">Risk {p.risk}/10</span>
              {p.chains.map(c => (
                <span key={c} className="glass-pill px-1.5 py-0.5 rounded text-[9px] font-mono text-foreground/35">{c}</span>
              ))}
            </div>
            <p className="text-primary/60 text-[10px] mt-3 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
              Tap to view full diagnosis →
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PersonaCards;
