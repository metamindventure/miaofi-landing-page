import { useEffect, useRef, useState } from 'react';

const personas = [
  {
    emoji: '🐋',
    name: 'Vitalik Buterin',
    label: '以太坊创始人',
    wallet: '0xd8dA...96045',
    pnl: '−$35M',
    positive: false,
    insight: '在 ETH 跌了 37% 的情况下抛售 19K ETH。如果在 $4,000 时分批减仓，同样的资金需求只需卖 9,700 ETH——少卖一半的币，多拿一倍的钱',
    risk: 6,
    chains: ['ETH'],
    note: '基于链上公开数据 · Arkham Intelligence 可验证',
  },
  {
    emoji: '🎰',
    name: 'Ansem',
    label: 'Solana Meme Coin 猎手 · @blknoiz06',
    wallet: 'AVAZ...NXYm',
    pnl: '−$8,200',
    positive: false,
    insight: '一周买了 5 个 meme coin，3 个已经归零。剩下 2 个浮亏 60%。不是运气差，是没有任何风控逻辑',
    risk: 9,
    chains: ['SOL', 'PUMP'],
    note: '基于链上公开数据 · Solscan 可验证',
  },
  {
    emoji: '😴',
    name: '某散户',
    label: '佛系持有者 · 也许就是你',
    wallet: null,
    pnl: '+$2,100',
    pnlNote: '(错过的收益)',
    positive: true,
    insight: '$28K USDC 在钱包躺了 4 个月。白白送了 $1,120 利息给交易所。只需要点几下就能把钱放到 DeFi 里生息',
    risk: 3,
    chains: ['ETH', 'SOL'],
    isMirror: true,
  },
];

const PersonaCards = () => {
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
    <section ref={ref} className="w-full max-w-5xl mx-auto px-5 py-20 relative z-10">
      <h2 className={`text-center font-display font-extrabold text-3xl sm:text-4xl mb-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">真实钱包。真实诊断。</span>
      </h2>
      <p className={`text-center text-muted-foreground text-sm mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        这些是 MiaoFi 对链上公开钱包的真实分析。任何人的钱包都能诊断。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {personas.map((p, i) => (
          <div
            key={p.name}
            className={`group glass-card rounded-2xl p-6 text-left transition-all duration-500 hover:scale-[1.03] hover:border-white/[0.15] hover:shadow-[0_8px_40px_-10px_rgba(108,92,231,0.15)] cursor-pointer relative overflow-hidden ${
              p.isMirror ? 'border-dashed' : ''
            } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${200 + i * 150}ms` }}
          >
            <span className="classified-stamp">CLASSIFIED</span>

            <span className="text-[42px] leading-none relative z-10">{p.emoji}</span>
            <p className="font-display font-bold text-foreground/90 text-lg mt-3 relative z-10">{p.name}</p>
            <p className="text-muted-foreground text-[11px] relative z-10">{p.label}</p>
            {p.wallet && (
              <p className="font-mono text-[10px] text-muted-foreground/50 mt-0.5 relative z-10">{p.wallet}</p>
            )}
            <div className="mt-2 relative z-10">
              <span className={`font-mono text-2xl font-bold ${p.positive ? 'text-profit' : 'text-danger'}`}>
                {p.pnl}
              </span>
              {p.pnlNote && (
                <span className="text-muted-foreground text-[10px] ml-1">{p.pnlNote}</span>
              )}
            </div>
            <p className="text-muted-foreground text-xs mt-3 leading-relaxed relative z-10">
              <span className="redacted">{p.insight}</span>
            </p>
            <div className="flex items-center gap-2 mt-3 relative z-10">
              <span className="text-muted-foreground/50 text-[10px] font-mono">Risk {p.risk}/10</span>
              {p.chains.map(c => (
                <span key={c} className="glass-pill px-1.5 py-0.5 rounded text-[9px] font-mono text-muted-foreground/60">{c}</span>
              ))}
            </div>
            {p.note && (
              <p className="text-muted-foreground/30 text-[9px] mt-3 relative z-10">{p.note}</p>
            )}
            <p className="text-primary/60 text-[10px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
              点击查看完整诊断 →
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonaCards;
