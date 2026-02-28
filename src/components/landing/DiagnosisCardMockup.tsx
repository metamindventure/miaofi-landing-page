import { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const ACTIONS = [
  'Swap 30% ETH → USDC',
  'Diversify into 3 stablecoins',
  'Set stop-loss at $3,200',
];

const DiagnosisCardMockup = () => {
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
    <section ref={ref} className="relative z-10 w-full max-w-3xl mx-auto px-5 py-28">
      <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-4">Output</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
          What you'll get
        </h2>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          AI-powered diagnosis cards with specific, actionable recommendations.
        </p>
      </div>

      <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.97]'}`}>
        {/* Browser frame */}
        <div className="browser-frame shadow-2xl shadow-black/40">
          <div className="browser-chrome">
            <div className="browser-dot" />
            <div className="browser-dot" />
            <div className="browser-dot" />
            <div className="flex-1 mx-4">
              <div className="h-5 bg-secondary rounded-full max-w-[260px] mx-auto flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground font-mono">app.miaofi.com/diagnosis</span>
              </div>
            </div>
          </div>

          {/* Card content */}
          <div className="p-5 sm:p-8 bg-background">
            <div className="glass-card rounded-xl p-6 border-l-2" style={{ borderLeftColor: 'hsl(38 92% 50%)' }}>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(38 92% 50% / 0.1)' }}>
                    <AlertTriangle size={20} style={{ color: 'hsl(38 92% 50%)' }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-base sm:text-lg leading-tight">
                      ETH Concentration Too High
                    </h3>
                    <p className="text-muted-foreground text-xs mt-0.5 font-mono">67% of portfolio in single asset</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold shrink-0" style={{ background: 'hsl(38 92% 50% / 0.1)', color: 'hsl(38 92% 50%)' }}>
                  HIGH
                </span>
              </div>

              {/* Analysis */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Your portfolio is heavily concentrated in ETH, exposing you to significant single-asset risk. 
                A 20% ETH drawdown would wipe <span className="text-foreground/70 font-medium">13.4%</span> of your total portfolio value. 
                Historically, similar concentration levels lead to <span className="text-foreground/70 font-medium">2.3× higher volatility</span>.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mb-5">
                {ACTIONS.map((action) => (
                  <button
                    key={action}
                    className="glass-pill px-4 py-2.5 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all duration-200 cursor-default font-mono text-xs"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Skip */}
              <button className="text-muted-foreground/40 text-xs hover:text-muted-foreground transition-colors cursor-default">
                Got it, skip for now →
              </button>
            </div>
          </div>
        </div>

        {/* Glow */}
        <div className="h-20 bg-gradient-to-b from-primary/5 to-transparent rounded-b-3xl blur-2xl -mt-6 mx-10" />
      </div>
    </section>
  );
};

export default DiagnosisCardMockup;
