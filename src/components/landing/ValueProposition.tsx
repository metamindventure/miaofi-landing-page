import { useEffect, useRef, useState } from 'react';

const COMPARISONS = [
  {
    other: '"You hold 60% ETH"',
    miao: '"Your ETH concentration exceeds your risk tolerance"',
  },
  {
    other: '"You bought ARB yesterday"',
    miao: '"4 FOMO buys in 30 days, avg loss 23%"',
  },
  {
    other: '"Portfolio value: $50K"',
    miao: '"You\'d have $8K more if you followed the advice 3 months ago"',
  },
];

const ValueProposition = () => {
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
      <h2 className={`text-center font-display font-bold text-2xl sm:text-3xl text-foreground/90 mb-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Not another portfolio tracker
      </h2>
      <p className={`text-center text-foreground/40 text-base mb-14 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Your AI investment coach.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {COMPARISONS.map((item, i) => (
          <div
            key={i}
            className={`glass-card rounded-2xl p-5 flex flex-col gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: `${200 + i * 120}ms` }}
          >
            {/* Other tools */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-foreground/25 font-medium mb-2 block">Others say</span>
              <p className="text-foreground/40 text-sm font-mono leading-relaxed line-through decoration-foreground/10">{item.other}</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-foreground/[0.06]" />

            {/* MiaoFi */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-accent/70 font-medium mb-2 block">MiaoFi says</span>
              <p className="text-foreground/80 text-sm font-mono leading-relaxed">{item.miao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProposition;
