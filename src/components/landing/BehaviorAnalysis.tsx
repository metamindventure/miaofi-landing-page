import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

const cases = [
  {
    id: 'fomo',
    badge: '🔴 FOMO 追涨',
    finding: '过去 30 天你买了 9 次，其中 7 次是在 token 涨了 15% 之后追入的。这 7 次平均亏了 22%。',
    stat: '7/9 buys after 15%+ pump. Avg loss: -22%',
    statColor: 'text-[#ef4444]',
    fix: '别用市价单追涨。设限价单在目标价，等回调来找你。你 2 月 2 日追的 RCH（涨了 32% 后买入）现在 -18%，如果当时设 limit order 在 $0.85，现在还没触发——但你也没亏。',
  },
  {
    id: 'overtrade',
    badge: '🟡 过度交易',
    finding: '你 30 天交易了 47 次，平均每次持仓不到 18 小时。手续费和滑点加起来吃掉了 $340。',
    stat: '$340 burned on fees + slippage',
    statColor: 'text-[#ef4444]',
    fix: '你的交易频率是盈利用户平均值的 4 倍。盈利用户平均持仓 5.2 天。建议：每次想下单前等 24 小时，仍然想买再操作。仅靠"等一等"这一条，你上个月能省 $340 手续费 + 避开至少 3 笔亏损交易。',
  },
  {
    id: 'notp',
    badge: '🟠 不会止盈',
    finding: '你持有 ARB 从 +35% 到现在 -12%，中间没有任何止盈操作。这不是第一次——过去 3 个月你有 4 个 token 经历了"盈利 → 亏损"完整周期。',
    stat: '4 tokens rode profit → loss in 3 months',
    statColor: 'text-amber-400',
    fix: '你赚了不跑，亏了死扛。如果在 ARB +25% 时卖掉一半，锁定 $1,200 利润，剩下一半拿到现在也只亏 $180。总净赚 $1,020。设规则：任何 token 盈利超 25% 自动减半仓。',
  },
];

/* ── Mini Visualizations ── */

const FomoChart = () => {
  // Simplified price curve with buy markers at peaks
  const points = [
    { x: 0, y: 70 },
    { x: 12, y: 55 },
    { x: 22, y: 30 }, // peak — buy
    { x: 30, y: 50 },
    { x: 40, y: 60 },
    { x: 48, y: 20 }, // peak — buy
    { x: 56, y: 45 },
    { x: 64, y: 55 },
    { x: 72, y: 15 }, // peak — buy
    { x: 80, y: 35 },
    { x: 90, y: 25 }, // peak — buy
    { x: 100, y: 50 },
  ];
  const buyIndices = [2, 5, 8, 10];
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <div className="relative w-full h-28 sm:h-32">
      <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="none">
        <path d={path} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" className="price-line-draw" />
        <path d={path} fill="none" stroke="url(#fomoGrad)" strokeWidth="1.5" className="price-line-draw" />
        <defs>
          <linearGradient id="fomoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.6)" />
            <stop offset="100%" stopColor="rgba(239,68,68,0.6)" />
          </linearGradient>
        </defs>
        {buyIndices.map((idx) => {
          const p = points[idx];
          return (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r="2.5" fill="#ef4444" className="animate-[pulse_2s_ease-in-out_infinite]" />
              <text x={p.x} y={p.y - 6} textAnchor="middle" fill="#ef4444" fontSize="5" fontWeight="bold" fontFamily="monospace">BUY</text>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-1 right-2 text-[9px] text-foreground/20 font-mono">30d price action</div>
    </div>
  );
};

const OvertradeChart = () => (
  <div className="flex flex-col gap-3 w-full py-2">
    {/* User bar */}
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-foreground/40 font-mono w-10 shrink-0 text-right">You</span>
      <div className="flex-1 h-6 rounded-md bg-white/[0.03] overflow-hidden relative">
        <div className="overtrade-bar-user h-full rounded-md bg-gradient-to-r from-[#ef4444]/60 to-[#ef4444]/30 flex items-center pl-2" style={{ width: '85%' }}>
          <span className="text-[10px] font-mono text-white/80 font-bold">47 trades</span>
        </div>
      </div>
    </div>
    {/* Profitable traders bar */}
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-foreground/40 font-mono w-10 shrink-0 text-right">Avg</span>
      <div className="flex-1 h-6 rounded-md bg-white/[0.03] overflow-hidden relative">
        <div className="overtrade-bar-avg h-full rounded-md bg-gradient-to-r from-[#4ade80]/50 to-[#4ade80]/20 flex items-center pl-2" style={{ width: '25%' }}>
          <span className="text-[10px] font-mono text-white/80 font-bold">12</span>
        </div>
      </div>
    </div>
    <div className="text-[9px] text-foreground/20 font-mono text-right">trades / 30 days — profitable traders avg</div>
  </div>
);

const TakeProfitChart = () => {
  // Actual: rises to +35% then falls to -12%
  const actual = 'M0,50 C15,45 25,20 40,12 C50,8 55,10 60,18 C70,35 85,58 100,62';
  // If took profit: plateaus at +25% then gentle decline but stays positive
  const ideal = 'M0,50 C15,45 25,22 40,18 L55,18 C65,20 80,28 100,32';

  return (
    <div className="relative w-full h-28 sm:h-32">
      <svg viewBox="0 0 100 70" className="w-full h-full" preserveAspectRatio="none">
        {/* Zero line */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="2,2" />
        {/* Ideal path */}
        <path d={ideal} fill="none" stroke="#4ade80" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.6" className="price-line-draw" />
        {/* Actual path */}
        <path d={actual} fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.8" className="price-line-draw" />
        {/* Labels */}
        <text x="92" y="60" fill="#ef4444" fontSize="4.5" fontFamily="monospace" opacity="0.7">-12%</text>
        <text x="92" y="30" fill="#4ade80" fontSize="4.5" fontFamily="monospace" opacity="0.7">+13%</text>
        <text x="38" y="8" fill="rgba(255,255,255,0.3)" fontSize="4" fontFamily="monospace">+35%</text>
      </svg>
      <div className="absolute bottom-1 left-2 flex items-center gap-3 text-[9px] font-mono">
        <span className="flex items-center gap-1"><span className="w-3 h-[1.5px] bg-[#ef4444] inline-block"></span><span className="text-foreground/30">Actual</span></span>
        <span className="flex items-center gap-1"><span className="w-3 h-[1.5px] bg-[#4ade80] inline-block border-dashed"></span><span className="text-foreground/30">If took profit</span></span>
      </div>
    </div>
  );
};

const vizMap: Record<string, React.FC> = {
  fomo: FomoChart,
  overtrade: OvertradeChart,
  notp: TakeProfitChart,
};

const BehaviorAnalysis = () => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('.glass-input')?.focus();
    }, 600);
  };

  return (
    <section ref={ref} className="w-full max-w-4xl mx-auto px-5 py-24 relative z-10">
      {/* Header */}
      <h2 className={`text-center font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          你的交易记录，藏着你不愿承认的习惯
        </span>
      </h2>
      <p className={`text-center text-foreground/35 text-sm max-w-xl mx-auto mb-14 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        Portfolio trackers show your holdings. Only MiaoFi reads your trading history like a behavioral psychologist.
      </p>

      {/* Cards */}
      <div className="flex flex-col gap-5">
        {cases.map((c, i) => {
          const Viz = vizMap[c.id];
          return (
            <div
              key={c.id}
              className={`behavior-card glass-card rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Badge */}
              <div className="px-5 pt-5 pb-0 sm:px-6 sm:pt-6">
                <span className="inline-block text-xs font-mono font-bold tracking-wide opacity-80">{c.badge}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-0">
                {/* Left: Diagnosis */}
                <div className="px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-3 sm:border-r sm:border-white/[0.06]">
                  {/* Viz */}
                  <Viz />
                  {/* Finding */}
                  <p className="text-foreground/60 text-sm leading-relaxed">{c.finding}</p>
                  {/* Stat */}
                  <p className={`font-mono text-xs font-bold ${c.statColor}`}>{c.stat}</p>
                </div>

                {/* Right: AI Prescription */}
                <div className="px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-3 bg-white/[0.01]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-[10px]">🤖</span>
                    </div>
                    <span className="text-[10px] font-mono text-primary/70 uppercase tracking-wider font-bold">AI 处方</span>
                  </div>
                  <p className="text-foreground/80 text-sm leading-relaxed">{c.fix}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className={`text-center mt-10 transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={scrollToTop} className="inline-flex items-center gap-2 text-primary hover:underline text-sm transition-colors">
          <Search size={14} />
          你的操作习惯正在吃掉你的利润。30 秒查出来 →
        </button>
      </div>
    </section>
  );
};

export default BehaviorAnalysis;
