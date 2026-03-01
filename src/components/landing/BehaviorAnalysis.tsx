import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

const cases = [
  {
    id: 'fomo',
    badge: '🔴 FOMO 追涨',
    finding: 'SOL 从 $295 跌到 $120 时你没买。等它反弹到 $180（+50%）你追进去了。现在 $80，你亏了 56%。',
    stat: '3 次买入全在反弹 30%+ 之后',
    statColor: 'text-[#ef4444]',
    fix: '你的 3 次买入全在价格反弹 30%+ 之后。如果你在 $120 时分批建仓（每周定投），同样的金额现在成本是 $105，而不是 $180。设规则：只在价格低于 30 日均线时加仓。',
  },
  {
    id: 'disposition',
    badge: '🟡 赚了不跑，亏了死扛',
    finding: '你的 ETH 从 $4,953 高点持有到现在 $2,036，中间没有任何减仓操作。浮盈 $29,000 变成了浮亏 $17,000。这不是第一次——过去 12 个月你有 3 个 token 经历了完整的"盈利→亏损"周期。',
    stat: '浮盈 $29K → 浮亏 $17K，零止盈操作',
    statColor: 'text-amber-400',
    fix: '如果在 ETH $4,000 时卖掉一半（离高点 -20%），锁定 $19,600 利润，剩下一半拿到现在也只亏 $9,800。总净赚 $9,800 vs 现在的净亏 $17,000。设规则：任何持仓盈利超 50% 时自动减仓 1/3。',
  },
  {
    id: 'panic',
    badge: '🔴 恐慌抛售',
    finding: '2026 年 2 月 3 日 ETH 单日跌 8%，你在最低点附近卖出了全部仓位。3 天后价格反弹 11%。你卖在了地板上。过去 6 个月你有 2 次类似的"恐慌清仓→错过反弹"。',
    stat: '2 次恐慌清仓，错过反弹共计 $4,800',
    statColor: 'text-[#ef4444]',
    fix: '恐慌抛售的代价：如果持有不动，你现在多 $2,400。如果你担心下跌，正确的做法是"分批减仓"而不是"一键清仓"。设规则：单次最多卖出持仓的 25%，间隔 24 小时再决定下一步。',
  },
];

/* ── Mini Visualizations ── */

const FomoChart = () => {
  // SOL price trajectory: $295 peak → $120 dip → $180 bounce (user buys) → $80 now
  const points = [
    { x: 0, y: 5 },    // $295 ATH
    { x: 15, y: 10 },
    { x: 30, y: 45 },  // dropping
    { x: 45, y: 60 },  // $120 dip
    { x: 55, y: 55 },
    { x: 65, y: 30 },  // $180 bounce — BUY
    { x: 72, y: 35 },
    { x: 78, y: 28 },  // another bounce — BUY
    { x: 85, y: 50 },
    { x: 92, y: 65 },  // $80 — BUY at another bounce
    { x: 100, y: 72 }, // current low
  ];
  const buyIndices = [5, 7, 9];
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <div className="relative w-full h-28 sm:h-32">
      <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="none">
        {/* Grid lines */}
        {[20, 40, 60].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}
        <path d={path} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <path d={path} fill="none" stroke="url(#fomoGrad)" strokeWidth="1.5" className="price-line-draw" />
        <defs>
          <linearGradient id="fomoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(74,222,128,0.5)" />
            <stop offset="40%" stopColor="rgba(251,191,36,0.5)" />
            <stop offset="100%" stopColor="rgba(239,68,68,0.6)" />
          </linearGradient>
        </defs>
        {buyIndices.map((idx) => {
          const p = points[idx];
          return (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r="2.5" fill="#ef4444" className="animate-[pulse_2s_ease-in-out_infinite]" />
              <text x={p.x} y={p.y - 6} textAnchor="middle" fill="#ef4444" fontSize="4.5" fontWeight="bold" fontFamily="monospace">BUY</text>
            </g>
          );
        })}
        {/* Price labels */}
        <text x="2" y="8" fill="rgba(255,255,255,0.25)" fontSize="4" fontFamily="monospace">$295</text>
        <text x="43" y="66" fill="rgba(255,255,255,0.25)" fontSize="4" fontFamily="monospace">$120</text>
        <text x="63" y="25" fill="rgba(255,255,255,0.25)" fontSize="4" fontFamily="monospace">$180</text>
        <text x="90" y="78" fill="rgba(255,255,255,0.25)" fontSize="4" fontFamily="monospace">$80</text>
      </svg>
      <div className="absolute bottom-1 right-2 text-[9px] text-foreground/20 font-mono">SOL / USD · 12 个月</div>
    </div>
  );
};

const DispositionChart = () => {
  // ETH: rises to ATH $4,953, then falls to $2,036
  const actual = 'M0,55 C10,50 20,35 30,18 C35,10 38,8 40,8 C45,10 55,25 65,40 C75,52 85,58 100,60';
  // If took profit at $4,000: sell half, lock profit, gentle decline
  const ideal = 'M0,55 C10,50 20,35 30,22 L40,22 C50,24 60,28 70,30 C80,32 90,34 100,36';

  return (
    <div className="relative w-full h-28 sm:h-32">
      <svg viewBox="0 0 100 70" className="w-full h-full" preserveAspectRatio="none">
        {/* Zero line */}
        <line x1="0" y1="55" x2="100" y2="55" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="2,2" />
        {/* Ideal path */}
        <path d={ideal} fill="none" stroke="#4ade80" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.6" className="price-line-draw" />
        {/* Actual path */}
        <path d={actual} fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.8" className="price-line-draw" />
        {/* Labels */}
        <text x="36" y="6" fill="rgba(255,255,255,0.3)" fontSize="4" fontFamily="monospace">$4,953</text>
        <text x="88" y="66" fill="#ef4444" fontSize="4" fontFamily="monospace">$2,036</text>
        <text x="88" y="34" fill="#4ade80" fontSize="4" fontFamily="monospace">+$9.8K</text>
        <text x="28" y="18" fill="rgba(255,255,255,0.2)" fontSize="3.5" fontFamily="monospace">止盈点 $4,000</text>
      </svg>
      <div className="absolute bottom-1 left-2 flex items-center gap-3 text-[9px] font-mono">
        <span className="flex items-center gap-1"><span className="w-3 h-[1.5px] bg-[#ef4444] inline-block"></span><span className="text-foreground/30">实际持仓</span></span>
        <span className="flex items-center gap-1"><span className="w-3 h-[1.5px] bg-[#4ade80] inline-block"></span><span className="text-foreground/30">如果止盈</span></span>
      </div>
    </div>
  );
};

const PanicChart = () => {
  // ETH drops 8% in one day, user sells at bottom, then rebounds 11%
  const points = [
    { x: 0, y: 30 },
    { x: 15, y: 28 },
    { x: 25, y: 25 },
    { x: 35, y: 32 },
    { x: 45, y: 55 },  // -8% drop starts
    { x: 55, y: 68 },  // bottom — user SELLS here
    { x: 60, y: 65 },
    { x: 68, y: 50 },  // rebound starts
    { x: 78, y: 38 },  // +11% rebound
    { x: 88, y: 35 },
    { x: 100, y: 40 },
  ];
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <div className="relative w-full h-28 sm:h-32">
      <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="none">
        {[20, 40, 60].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}
        <path d={path} fill="none" stroke="url(#panicGrad)" strokeWidth="1.5" className="price-line-draw" />
        <defs>
          <linearGradient id="panicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="45%" stopColor="rgba(239,68,68,0.7)" />
            <stop offset="60%" stopColor="rgba(239,68,68,0.5)" />
            <stop offset="80%" stopColor="rgba(74,222,128,0.5)" />
            <stop offset="100%" stopColor="rgba(74,222,128,0.3)" />
          </linearGradient>
        </defs>
        {/* Sell marker at bottom */}
        <circle cx={55} cy={68} r="3" fill="#ef4444" className="animate-[pulse_2s_ease-in-out_infinite]" />
        <text x={55} y={78} textAnchor="middle" fill="#ef4444" fontSize="4.5" fontWeight="bold" fontFamily="monospace">SELL</text>
        {/* Rebound marker */}
        <circle cx={78} cy={38} r="2" fill="#4ade80" opacity="0.7" />
        <text x={78} y={33} textAnchor="middle" fill="#4ade80" fontSize="4" fontFamily="monospace">+11%</text>
        {/* Drop label */}
        <text x={45} y={50} fill="rgba(255,255,255,0.2)" fontSize="3.5" fontFamily="monospace">-8%</text>
      </svg>
      <div className="absolute bottom-1 right-2 text-[9px] text-foreground/20 font-mono">ETH · 2026年2月</div>
    </div>
  );
};

const vizMap: Record<string, React.FC> = {
  fomo: FomoChart,
  disposition: DispositionChart,
  panic: PanicChart,
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
        Portfolio trackers 告诉你持有什么。只有 MiaoFi 像行为心理学家一样解读你的交易历史。
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
                  <Viz />
                  <p className="text-foreground/60 text-sm leading-relaxed">{c.finding}</p>
                  <p className={`font-mono text-xs font-bold ${c.statColor}`}>{c.stat}</p>
                </div>

                {/* Right: AI + Expert Prescription */}
                <div className="px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-3 bg-white/[0.01]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-[10px]">🤖</span>
                    </div>
                    <span className="text-[10px] font-mono text-primary/70 uppercase tracking-wider font-bold">AI + 专家处方</span>
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
