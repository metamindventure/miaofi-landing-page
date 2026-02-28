import { Search } from 'lucide-react';

const samples = [
  {
    emoji: '🐋',
    label: 'Whale Portfolio',
    tagline: 'The Confident Maximalist',
    pnl: '+$48,291',
    pnlPct: '+12.3%',
    positive: true,
    risk: 4,
    chains: ['ETH', 'SOL', 'ARB'],
    glowColor: 'rgba(245, 158, 11, 0.15)',
    hoverBorder: 'rgba(245, 158, 11, 0.3)',
    quote: "You're one satisfying trade away from dangerous overconfidence. 70% in one asset isn't conviction — it's ",
    quoteHighlight: 'concentration risk.',
    highlightColor: 'text-amber-400',
  },
  {
    emoji: '🎰',
    label: 'Degen Trader',
    tagline: 'The Adrenaline Chaser',
    pnl: '-$3,847',
    pnlPct: '-22.1%',
    positive: false,
    risk: 9,
    chains: ['SOL', 'BASE'],
    glowColor: 'rgba(255, 77, 106, 0.15)',
    hoverBorder: 'rgba(255, 77, 106, 0.3)',
    quote: ' Your worst entries all happened within 2 hours of a price spike. You\'re not trading — you\'re ',
    quoteHighlight: 'gambling.',
    highlightColor: 'text-accent-red',
    quotePrefix: '4 FOMO buys in 7 days.',
    quotePrefixColor: 'text-accent-red',
  },
  {
    emoji: '😴',
    label: 'Sleeping Giant',
    tagline: 'The Passive Accumulator',
    pnl: '+$891',
    pnlPct: '+1.8%',
    positive: true,
    risk: 3,
    chains: ['ETH', 'OP'],
    glowColor: 'rgba(0, 229, 160, 0.12)',
    hoverBorder: 'rgba(0, 229, 160, 0.25)',
    quote: "Your portfolio is safe but sleeping. You're leaving ~",
    quoteHighlight: '$280/month',
    highlightColor: 'text-accent-green',
    quoteSuffix: ' in yield on the table by not deploying idle stablecoins.',
  },
];

const SampleCards = () => {
  const handleClick = (label: string) => {
    alert(`Loading ${label} portfolio... (demo)`);
  };

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-foreground text-sm font-heading font-semibold whitespace-nowrap">
          Which investor are you?
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <p className="text-center text-muted-custom text-[12px] font-body mb-5">
        Click any profile to see a full AI diagnosis
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {samples.map((s) => (
          <button
            key={s.label}
            onClick={() => handleClick(s.label)}
            className="persona-card glass-card rounded-xl p-5 text-left cursor-pointer group"
            style={{
              '--card-glow': s.glowColor,
              '--card-hover-border': s.hoverBorder,
            } as React.CSSProperties}
          >
            {/* Emoji with glow */}
            <div className="relative w-14 h-14 flex items-center justify-center mb-3">
              <div
                className="absolute inset-0 rounded-full opacity-40 blur-lg"
                style={{ background: s.glowColor }}
              />
              <span className="relative text-[40px] leading-none">{s.emoji}</span>
            </div>

            {/* Name + tagline */}
            <div className="font-heading font-semibold text-[14px] text-foreground">
              {s.label}
            </div>
            <div className="text-muted-custom text-[12px] font-body italic mb-3">
              "{s.tagline}"
            </div>

            {/* P&L */}
            <div className={`font-mono text-xl font-bold mb-3 ${s.positive ? 'text-accent-green' : 'text-accent-red'}`}>
              {s.pnl} <span className="text-sm font-medium opacity-70">({s.pnlPct})</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-3" />

            {/* AI Quote */}
            <div className="text-[12px] font-body leading-relaxed text-secondary-custom mb-3 group-hover:text-foreground/80 transition-colors duration-300">
              <span className="text-muted-custom mr-1">🔴 AI says:</span>
              <span className="italic">
                {s.quotePrefix && (
                  <span className={s.quotePrefixColor}>{s.quotePrefix}</span>
                )}
                {s.quote}
                <span className={s.highlightColor}>{s.quoteHighlight}</span>
                {s.quoteSuffix || ''}
              </span>
            </div>

            {/* Risk + chains */}
            <div className="text-muted-custom text-[11px] flex items-center gap-1.5 flex-wrap mb-3">
              <span>Risk: {s.risk}/10</span>
              <span>·</span>
              {s.chains.map((c) => (
                <span key={c} className="bg-secondary/40 px-1.5 py-0.5 rounded text-[10px]">{c}</span>
              ))}
            </div>

            {/* CTA */}
            <div className="text-brand text-[12px] font-body font-medium opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              Peek inside →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SampleCards;
