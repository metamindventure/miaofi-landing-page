import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const AI_MODELS = ['Claude', 'GPT-4o', 'Gemini'];

const TrustSection = () => {
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
    <section ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-5 py-20">
      <div className={`flex flex-col items-center gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* AI Models */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground mr-2">Powered by</span>
          {AI_MODELS.map((model) => (
            <span key={model} className="glass-pill px-3 py-1.5 rounded-md text-xs font-mono text-foreground/60">
              {model}
            </span>
          ))}
        </div>

        {/* Security */}
        <div className="flex items-center gap-3 glass-card rounded-xl px-5 py-3.5">
          <ShieldCheck size={18} className="text-primary shrink-0" />
          <p className="text-muted-foreground text-sm">
            Read-only analysis · Never connects to your wallet · No transaction signing
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-10">
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-foreground">47,291</p>
            <p className="text-muted-foreground text-xs mt-1">portfolios scanned</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-foreground">$2.1B</p>
            <p className="text-muted-foreground text-xs mt-1">assets analyzed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
