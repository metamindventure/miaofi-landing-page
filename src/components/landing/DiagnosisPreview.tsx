import { useEffect, useRef, useState } from 'react';

const diagnosisCards = [
  {
    severity: 'red' as const,
    icon: '🔴',
    title: 'Extreme Concentration Risk',
    body: '68% of your portfolio is in ETH. If ETH drops 30%, you lose ~$14,200. Your risk-adjusted return would improve significantly with diversification.',
    actions: ['Rebalance to 40% ETH', 'Hedge with stablecoins', "I'm bullish, keep it"],
    confidence: 92,
    blur: 0,
  },
  {
    severity: 'amber' as const,
    icon: '⚠️',
    title: 'FOMO Trading Pattern',
    body: 'You made 4 purchases within 2 hours of price spikes in the last 30 days. This pattern historically leads to an average 18% loss on entry price...',
    actions: ['Set a 24h cooling period', 'Review my trade log', 'This was intentional'],
    confidence: 78,
    blur: 40,
  },
  {
    severity: 'green' as const,
    icon: '💡',
    title: 'Missed Yield: $340/month',
    body: 'You have $18,200 in idle stablecoins earning 0% APY. Moving to audited lending protocols could generate passive income safely...',
    actions: ['Show yield options', 'Compare protocols', 'Keep liquid'],
    confidence: 85,
    blur: 70,
  },
];

const severityBorder = {
  red: 'border-l-red-500',
  amber: 'border-l-amber-500',
  green: 'border-l-emerald-500',
};

const severityDot = {
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  green: 'bg-emerald-500',
};

const DiagnosisPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="mt-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground text-glow-white">
          Here's what MiaoFi sees that you don't
        </h2>
        <p className="text-muted-custom text-[13px] font-body mt-1">
          AI-powered diagnosis finds risks, patterns, and opportunities in your portfolio
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {diagnosisCards.map((card, i) => (
          <div
            key={card.title}
            className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
          >
            {/* Card */}
            <div
              className={`relative rounded-xl border-l-[3px] ${severityBorder[card.severity]} overflow-hidden`}
              style={{
                background: 'rgba(15, 15, 25, 0.80)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeftWidth: '3px',
              }}
            >
              <div className="p-4 sm:p-5">
                {/* Title row */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{card.icon}</span>
                    <span className="font-heading font-semibold text-[14px] text-foreground">{card.title}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-custom font-mono">
                    <span className={`w-1.5 h-1.5 rounded-full ${severityDot[card.severity]}`} />
                    AI Confidence: {card.confidence}%
                  </span>
                </div>

                {/* Body */}
                <p className="text-secondary-custom text-[13px] font-body leading-relaxed mb-3">
                  {card.body}
                </p>

                {/* Action chips */}
                <div className="flex flex-wrap gap-2">
                  {card.actions.map((action) => (
                    <span
                      key={action}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-body font-medium text-foreground/80"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {action}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blur overlay for locked cards */}
              {card.blur > 0 && (
                <div
                  className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-5 diagnosis-blur-pulse"
                  style={{
                    height: `${card.blur}%`,
                    backdropFilter: `blur(${card.blur === 40 ? 6 : 10}px)`,
                    WebkitBackdropFilter: `blur(${card.blur === 40 ? 6 : 10}px)`,
                    background: `linear-gradient(to bottom, transparent, rgba(10,10,15,0.6) 40%, rgba(10,10,15,0.9))`,
                  }}
                >
                  <span className="text-brand text-[12px] font-body font-medium text-glow-brand">
                    Paste your address to unlock your full diagnosis →
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosisPreview;
