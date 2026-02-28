import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const COMPARISONS = [
  {
    other: 'You hold 60% ETH',
    miao: 'Your ETH concentration exceeds your risk tolerance — rebalance recommended',
    label: 'Concentration Risk',
  },
  {
    other: 'You bought ARB yesterday',
    miao: '4 FOMO buys in 30 days, averaging 23% loss within 48 hours',
    label: 'Behavior Pattern',
  },
  {
    other: 'Portfolio: $50K',
    miao: "You'd have $8K more if you followed the rebalance advice 3 months ago",
    label: 'Missed Opportunity',
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative z-10 w-full max-w-5xl mx-auto px-5 py-28">
      <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-4">Beyond data</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
          Not another portfolio tracker
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Other tools show what you have. MiaoFi tells you what to do.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {COMPARISONS.map((item, i) => (
          <div
            key={i}
            className={`glass-card rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: `${300 + i * 150}ms` }}
          >
            {/* Label */}
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground shrink-0 w-32">
              {item.label}
            </span>

            {/* Other */}
            <div className="flex-1 flex items-center gap-4 sm:gap-6">
              <p className="text-muted-foreground/40 text-sm font-mono line-through flex-1">
                "{item.other}"
              </p>

              <ArrowRight size={16} className="text-primary/50 shrink-0 hidden sm:block" />

              {/* MiaoFi */}
              <p className="text-foreground/90 text-sm font-mono flex-1 border-l border-primary/20 pl-4 sm:pl-6">
                "{item.miao}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProposition;
