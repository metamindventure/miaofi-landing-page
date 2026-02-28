import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const AI_MODELS = ['Claude', 'GPT-4o', 'Gemini'];
const STATS = [
  { label: 'Portfolios analyzed', value: '47,291' },
  { label: 'Assets scanned', value: '$2.1B' },
];

const TrustSection = () => {
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
      <div className={`flex flex-col items-center gap-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* AI Models */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-foreground/25 font-medium mb-4">Powered by</p>
          <div className="flex items-center gap-3">
            {AI_MODELS.map((model) => (
              <span key={model} className="glass-pill px-4 py-2 rounded-full text-sm font-mono text-foreground/50">
                {model}
              </span>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="flex items-center gap-3 glass-card rounded-2xl px-6 py-4 max-w-lg">
          <ShieldCheck size={24} className="text-accent/70 flex-shrink-0" />
          <p className="text-foreground/40 text-sm leading-relaxed">
            Read-only analysis. Never connects to your wallet. Never requests transaction signing.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-2xl font-bold text-accent/80">{stat.value}</p>
              <p className="text-foreground/30 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
