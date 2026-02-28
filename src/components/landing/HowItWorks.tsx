import { useEffect, useRef, useState } from 'react';
import { Clipboard, ScanSearch, Zap } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Clipboard,
    title: 'Paste',
    desc: 'Paste your wallet address. EVM + Solana, multiple wallets supported.',
  },
  {
    num: '02',
    icon: ScanSearch,
    title: 'Diagnose',
    desc: 'AI analyzes holdings, trades, and behavior patterns in 30 seconds.',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Act',
    desc: 'Get specific action cards: do A, B, or C. Not reports — decisions.',
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full max-w-4xl mx-auto px-5 py-24">
      <h2 className={`text-center font-display font-bold text-2xl sm:text-3xl text-foreground/90 mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        How it works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
        {/* Connecting line (desktop) */}
        <div className="hidden sm:block absolute top-12 left-[16.6%] right-[16.6%] h-px border-t border-dashed border-foreground/[0.08]" />

        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={`flex flex-col items-center text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Number circle */}
              <div className="relative z-10 w-24 h-24 rounded-2xl glass-card flex flex-col items-center justify-center gap-1 mb-5">
                <span className="text-[10px] font-mono text-foreground/30">{step.num}</span>
                <Icon size={24} className="text-primary/80" />
              </div>
              <h3 className="font-display font-bold text-foreground/90 text-lg mb-2">{step.title}</h3>
              <p className="text-foreground/40 text-sm leading-relaxed max-w-[240px]">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
