import { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const ACTIONS = [
  'Swap 30% ETH to USDC',
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full max-w-3xl mx-auto px-5 py-24">
      <h2 className={`text-center font-display font-bold text-2xl sm:text-3xl text-foreground/90 mb-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        What you'll get
      </h2>
      <p className={`text-center text-foreground/40 text-base mb-14 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        AI-powered diagnosis cards with actionable recommendations.
      </p>

      <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        {/* Browser frame */}
        <div className="browser-frame">
          <div className="browser-chrome">
            <div className="browser-dot" />
            <div className="browser-dot" />
            <div className="browser-dot" />
            <div className="flex-1 mx-4">
              <div className="h-5 bg-foreground/[0.04] rounded-full max-w-[280px] mx-auto flex items-center justify-center">
                <span className="text-[10px] text-foreground/20 font-mono">app.miaofi.com/diagnosis</span>
              </div>
            </div>
          </div>

          {/* Diagnosis card content */}
          <div className="p-5 sm:p-8 bg-[hsl(240,10%,5%)]">
            <div className="glass-card rounded-2xl p-6 border-amber-500/20">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground/90 text-base sm:text-lg leading-tight">
                      ETH Concentration Too High
                    </h3>
                    <p className="text-foreground/40 text-xs mt-0.5">67% of portfolio in single asset</p>
                  </div>
                </div>
                <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-amber-400 border-amber-500/30 flex-shrink-0">
                  HIGH
                </span>
              </div>

              {/* Analysis */}
              <p className="text-foreground/50 text-sm leading-relaxed mb-6">
                Your portfolio is heavily concentrated in ETH, exposing you to significant single-asset risk. 
                A 20% ETH drawdown would wipe out 13.4% of your total portfolio value. 
                Historically, similar concentration levels lead to 2.3× higher volatility.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                {ACTIONS.map((action) => (
                  <button
                    key={action}
                    className="glass-pill px-4 py-2 rounded-xl text-sm text-foreground/70 hover:text-foreground/90 hover:border-primary/30 transition-all duration-200 cursor-default"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Skip link */}
              <button className="text-foreground/20 text-xs hover:text-foreground/40 transition-colors cursor-default">
                Got it, skip for now →
              </button>
            </div>
          </div>
        </div>

        {/* Glow reflection */}
        <div className="h-16 bg-gradient-to-b from-amber-500/5 to-transparent rounded-b-3xl blur-2xl -mt-4 mx-8" />
      </div>
    </section>
  );
};

export default DiagnosisCardMockup;
