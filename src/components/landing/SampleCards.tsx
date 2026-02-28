const samples = [
  {
    emoji: '🐋',
    label: 'Whale Portfolio',
    pnl: '+$48,291',
    pnlPct: '+12.3%',
    positive: true,
    risk: 4,
    chains: ['ETH', 'SOL', 'ARB'],
  },
  {
    emoji: '🎰',
    label: 'Degen Trader',
    pnl: '-$3,847',
    pnlPct: '-22.1%',
    positive: false,
    risk: 9,
    chains: ['SOL', 'BASE'],
  },
  {
    emoji: '😴',
    label: 'Sleeping Giant',
    pnl: '+$891',
    pnlPct: '+1.8%',
    positive: true,
    risk: 3,
    chains: ['ETH', 'OP'],
  },
];

const SampleCards = () => {
  const handleClick = (label: string) => {
    alert(`Loading ${label} portfolio... (demo)`);
  };

  return (
    <div>
      {/* Divider label */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-custom text-[13px] font-body whitespace-nowrap">Or explore a sample portfolio</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {samples.map((s) => (
          <button
            key={s.label}
            onClick={() => handleClick(s.label)}
            className="glass-card rounded-xl p-4 text-left hover:-translate-y-1 cursor-pointer group"
          >
            <div className="text-[13px] font-heading font-semibold text-foreground mb-2">
              <span className="mr-1.5">{s.emoji}</span>{s.label}
            </div>
            <div className={`font-mono text-xl font-bold mb-2 ${s.positive ? 'text-accent-green' : 'text-accent-red'}`}>
              {s.pnl} <span className="text-sm font-medium">({s.pnlPct})</span>
            </div>
            <div className="text-muted-custom text-[11px] flex items-center gap-1.5 flex-wrap">
              <span>Risk: {s.risk}/10</span>
              <span>·</span>
              {s.chains.map((c) => (
                <span key={c} className="bg-secondary/40 px-1.5 py-0.5 rounded text-[10px]">{c}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SampleCards;
