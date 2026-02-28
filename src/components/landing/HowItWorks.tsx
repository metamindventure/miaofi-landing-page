import { useEffect, useRef, useState } from 'react';
import { Clipboard, ScanSearch, Zap } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Clipboard,
    title: 'Paste',
    desc: 'Paste any EVM or Solana wallet address. Multi-wallet supported.',
  },
  {
    num: '02',
    icon: ScanSearch,
    title: 'Scan',
    desc: 'AI cross-references holdings, trades, and behavioral patterns in 30 seconds.',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Act',
    desc: 'Receive specific action cards — not reports, decisions.',
  },
];

const HowItWorks = () => {
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
    <section ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-5 py-28">
      <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-4">Process</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
          Three steps. Thirty seconds.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
        {/* Connecting line */}
        <div className="hidden sm:block absolute top-16 left-[20%] right-[20%] h-px border-t border-dashed border-border" />

        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={`flex flex-col items-center text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className="relative z-10 w-32 h-32 rounded-2xl glass-card flex flex-col items-center justify-center gap-2 mb-6">
                <span className="text-[11px] font-mono text-muted-foreground">{step.num}</span>
                <Icon size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-foreground text-xl mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
