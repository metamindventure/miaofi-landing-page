import { useEffect, useRef, useState } from 'react';
import { Brain, Search } from 'lucide-react';

/* ─── Scroll-triggered visibility hook ─── */
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

/* ═══════════════════════════════════════════
   Case 1 — FOMO 追涨 (SOL chart)
   ═══════════════════════════════════════════ */
const FomoCard = ({ visible, delay }: { visible: boolean; delay: number }) => {
  // SOL price journey: $295 → $120 → $180 → $80
  const solPoints = [
    { x: 0, y: 10 },    // $295
    { x: 12, y: 14 },
    { x: 25, y: 50 },   // dropping
    { x: 40, y: 80 },   // $120 bottom
    { x: 55, y: 52 },   // $180 bounce
    { x: 70, y: 60 },
    { x: 85, y: 85 },
    { x: 100, y: 95 },  // $80 current
  ];

  const toPath = (pts: typeof solPoints) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * 3.2} ${p.y * 1.4}`).join(' ');

  // Buy markers at bounce highs
  const buyMarkers = [
    { x: 55, y: 52, label: 'BUY $180' },
    { x: 62, y: 55, label: 'BUY $165' },
    { x: 68, y: 58, label: 'BUY $155' },
  ];

  return (
    <div
      className={`glass-card-bright rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-danger" />
          <h3 className="font-display font-bold text-lg text-foreground/90">FOMO 追涨</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — Chart */}
        <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div className="relative w-full aspect-[2/1] mb-6">
            <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
              {[35, 70, 105].map(y => (
                <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.04)" />
              ))}

              {/* SOL price line */}
              <path
                d={toPath(solPoints)}
                stroke="#FF4757"
                strokeWidth="2.5"
                className={visible ? 'line-draw' : ''}
                fill="none"
              />

              {/* Price labels */}
              <text x={4} y={18} fill="#F0F0F5" fontSize="10" fontFamily="JetBrains Mono">$295</text>
              <text x={120} y={118} fill="#8B8B9E" fontSize="9" fontFamily="JetBrains Mono">$120</text>
              <text x={316} y={138} textAnchor="end" fill="#FF4757" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">$80</text>

              {/* BUY markers */}
              {buyMarkers.map((m, i) => (
                <g key={i}>
                  <circle cx={m.x * 3.2} cy={m.y * 1.4} r="4" fill="#FF4757" className={visible ? 'animate-pulse' : ''} />
                  <text
                    x={m.x * 3.2}
                    y={m.y * 1.4 - 10}
                    textAnchor="middle"
                    fill="#FF4757"
                    fontSize="8"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                  >
                    BUY
                  </text>
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 bg-danger rounded" />
                <span className="text-[10px] text-muted-foreground">SOL / USD · 12 个月</span>
              </div>
            </div>
          </div>

          <p className="text-foreground/60 text-sm leading-relaxed mb-4">
            SOL 从 $295 跌到 $120 时你没买。等它反弹到 $180（+50%）你追进去了。现在 $80，你亏了 56%。
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-danger/10 border border-danger/20">
            <span className="font-mono font-bold text-danger text-sm">3 次买入全在反弹 30%+ 之后</span>
          </div>
        </div>

        {/* Right — AI Prescription */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Brain size={16} className="text-primary" />
            </div>
            <span className="font-display font-bold text-primary text-sm">AI + 专家处方</span>
          </div>

          <p className="text-foreground/60 text-sm leading-relaxed mb-6">
            你的 3 次买入全在价格反弹 30%+ 之后。如果你在 $120 时分批建仓（每周定投），同样的金额现在成本是 $105，而不是 $180。设规则：只在价格低于 30 日均线时加仓。
          </p>

          <div className="glass-card rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-muted-foreground font-mono">你的均价</span>
              <span className="text-danger font-mono font-bold text-sm">$180</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">定投均价</span>
              <span className="text-profit font-mono font-bold text-sm">$105</span>
            </div>
            <div className="border-t border-white/[0.06] mt-3 pt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">成本差</span>
              <span className="text-warn font-mono font-bold text-sm">-42%</span>
            </div>
          </div>

          <div className="px-3 py-2 rounded-lg bg-primary/8 border border-primary/15">
            <p className="text-primary/80 text-xs leading-relaxed">
              📋 设规则：只在价格低于 30 日均线时加仓
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   Case 3 — 恐慌抛售 (ETH chart)
   ═══════════════════════════════════════════ */
const PanicCard = ({ visible, delay }: { visible: boolean; delay: number }) => {
  // ETH Feb 2026: steady → -8% crash → SELL at bottom → +11% bounce
  const ethPoints = [
    { x: 0, y: 30 },
    { x: 15, y: 28 },
    { x: 25, y: 32 },
    { x: 35, y: 30 },
    { x: 45, y: 35 },
    { x: 55, y: 80 },   // -8% crash bottom
    { x: 60, y: 75 },
    { x: 70, y: 55 },   // bounce starts
    { x: 80, y: 40 },
    { x: 90, y: 35 },   // +11% recovery
    { x: 100, y: 38 },
  ];

  const toPath = (pts: typeof ethPoints) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * 3.2} ${p.y * 1.6}`).join(' ');

  return (
    <div
      className={`glass-card-bright rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-danger" />
          <h3 className="font-display font-bold text-lg text-foreground/90">恐慌抛售</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — Chart */}
        <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div className="relative w-full aspect-[2/1] mb-6">
            <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
              {[35, 70, 105].map(y => (
                <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.04)" />
              ))}

              <path
                d={toPath(ethPoints)}
                stroke="#FF4757"
                strokeWidth="2.5"
                className={visible ? 'line-draw' : ''}
                fill="none"
              />

              {/* SELL marker at crash bottom */}
              <circle cx={55 * 3.2} cy={80 * 1.6} r="5" fill="#FF4757" />
              <text x={55 * 3.2} y={80 * 1.6 - 12} textAnchor="middle" fill="#FF4757" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
                SELL
              </text>

              {/* -8% annotation */}
              <text x={45 * 3.2} y={60 * 1.6} textAnchor="middle" fill="#FF4757" fontSize="9" fontFamily="JetBrains Mono">
                -8%
              </text>

              {/* Recovery annotation */}
              <text x={85 * 3.2} y={30 * 1.6} textAnchor="middle" fill="#00E5A0" fontSize="9" fontFamily="JetBrains Mono">
                +11% 反弹
              </text>

              {/* Green dashed line showing "if held" */}
              <line
                x1={55 * 3.2} y1={80 * 1.6}
                x2={100 * 3.2} y2={38 * 1.6}
                stroke="#00E5A0"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                className={visible ? 'line-draw' : ''}
              />
            </svg>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 bg-danger rounded" />
                <span className="text-[10px] text-muted-foreground">ETH · 2026年2月</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 rounded" style={{ borderTop: '1px dashed #00E5A0' }} />
                <span className="text-[10px] text-muted-foreground">如果持有</span>
              </div>
            </div>
          </div>

          <p className="text-foreground/60 text-sm leading-relaxed mb-4">
            2026 年 2 月 3 日 ETH 单日跌 8%，你在最低点附近卖出了全部仓位。3 天后价格反弹 11%。你卖在了地板上。过去 6 个月你有 2 次类似的"恐慌清仓→错过反弹"。
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-danger/10 border border-danger/20">
            <span className="font-mono font-bold text-danger text-sm">2 次恐慌清仓，错过反弹共计 $4,800</span>
          </div>
        </div>

        {/* Right — AI Prescription */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Brain size={16} className="text-primary" />
            </div>
            <span className="font-display font-bold text-primary text-sm">AI + 专家处方</span>
          </div>

          <p className="text-foreground/60 text-sm leading-relaxed mb-6">
            恐慌抛售的代价：如果持有不动，你现在多 $2,400。如果你担心下跌，正确的做法是"分批减仓"而不是"一键清仓"。设规则：单次最多卖出持仓的 25%，间隔 24 小时再决定下一步。
          </p>

          <div className="glass-card rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-muted-foreground font-mono">恐慌全卖</span>
              <span className="text-danger font-mono font-bold text-sm">-$4,800</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">持有不动</span>
              <span className="text-profit font-mono font-bold text-sm">+$2,400</span>
            </div>
            <div className="border-t border-white/[0.06] mt-3 pt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">差距</span>
              <span className="text-warn font-mono font-bold text-sm">$7,200</span>
            </div>
          </div>

          <div className="px-3 py-2 rounded-lg bg-primary/8 border border-primary/15">
            <p className="text-primary/80 text-xs leading-relaxed">
              📋 设规则：单次最多卖出持仓的 25%，间隔 24 小时
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   Main Section Component
   ═══════════════════════════════════════════ */
const BehaviorAnalysis = () => {
  const { ref: sectionRef, visible: sectionVisible } = useScrollReveal(0.05);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative z-10 w-full max-w-[1080px] mx-auto px-5 py-20">
      {/* Section Header */}
      <div className={`text-center mb-14 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-foreground mb-4">
          你的交易记录，藏着你不愿承认的习惯
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Portfolio trackers 告诉你持有什么。只有 MiaoFi 像行为心理学家一样解读你的交易历史。
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-10">
        <FomoCard visible={sectionVisible} delay={200} />
        {/* Card 2 is the existing DiagnosisCard rendered from Index.tsx — we render a copy here */}
        <DispositionCard visible={sectionVisible} delay={400} />
        <PanicCard visible={sectionVisible} delay={600} />
      </div>

      {/* Bottom CTA */}
      <div className={`text-center mt-14 transition-all duration-700 delay-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-primary/70 hover:text-primary text-base transition-colors group"
        >
          <Search size={16} />
          <span className="relative">
            你的操作习惯正在吃掉你的利润。30 秒查出来 →
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
          </span>
        </button>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   Case 2 — 赚了不跑，亏了死扛 (inline copy from DiagnosisCard)
   ═══════════════════════════════════════════ */
const DispositionCard = ({ visible, delay }: { visible: boolean; delay: number }) => {
  const chartPoints = [
    { x: 0, y: 60 }, { x: 15, y: 55 }, { x: 30, y: 40 }, { x: 45, y: 20 },
    { x: 55, y: 10 }, { x: 65, y: 25 }, { x: 75, y: 45 }, { x: 85, y: 65 }, { x: 100, y: 80 },
  ];
  const profitPoints = [
    { x: 0, y: 60 }, { x: 15, y: 55 }, { x: 30, y: 40 }, { x: 45, y: 20 },
    { x: 50, y: 15 }, { x: 65, y: 30 }, { x: 75, y: 40 }, { x: 85, y: 48 }, { x: 100, y: 52 },
  ];
  const toPath = (pts: typeof chartPoints) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * 3.2} ${p.y * 1.8}`).join(' ');

  return (
    <div
      className={`glass-card-bright rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-warn" />
          <h3 className="font-display font-bold text-lg text-foreground/90">赚了不跑，亏了死扛</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div className="relative w-full aspect-[2/1] mb-6">
            <svg viewBox="0 0 320 144" className="w-full h-full" fill="none">
              {[36, 72, 108].map(y => (
                <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.04)" />
              ))}
              <path d={toPath(profitPoints)} stroke="#00E5A0" strokeWidth="2" strokeDasharray="6 4" className={visible ? 'line-draw' : ''} fill="none" />
              <path d={toPath(chartPoints)} stroke="#FF4757" strokeWidth="2.5" className={visible ? 'line-draw' : ''} fill="none" />
              <circle cx={176} cy={18} r="3" fill="#F0F0F5" />
              <text x={176} y={12} textAnchor="middle" fill="#F0F0F5" fontSize="10" fontFamily="JetBrains Mono">$4,900</text>
              <circle cx={160} cy={27} r="4" fill="#00E5A0" />
              <text x={160} y={50} textAnchor="middle" fill="#00E5A0" fontSize="9" fontFamily="JetBrains Mono">止盈点 $4,000</text>
              <text x={316} y={140} textAnchor="end" fill="#FF4757" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">$2,000</text>
              <text x={316} y={98} textAnchor="end" fill="#00E5A0" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">+$5,000</text>
            </svg>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 bg-danger rounded" />
                <span className="text-[10px] text-muted-foreground">实际持仓</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 bg-profit rounded" style={{ borderTop: '1px dashed #00E5A0' }} />
                <span className="text-[10px] text-muted-foreground">如果止盈</span>
              </div>
            </div>
          </div>
          <p className="text-foreground/60 text-sm leading-relaxed mb-4">
            你的 ETH 从 $4,900 高点持有到现在 $2,000，中间没有任何减仓操作。浮盈 $19,000 变成了浮亏 $10,000。这不是第一次——过去 12 个月你有 3 个 token 经历了完整的"盈利→亏损"周期。
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warn/10 border border-warn/20">
            <span className="font-mono font-bold text-warn text-sm">浮盈 $19K → 浮亏 $10K，零止盈操作</span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Brain size={16} className="text-primary" />
            </div>
            <span className="font-display font-bold text-primary text-sm">AI + 专家处方</span>
          </div>
          <p className="text-foreground/60 text-sm leading-relaxed mb-6">
            如果在 ETH $4,000 时卖掉一半（离高点 -18%），锁定 $5,000 利润，剩下一半拿到现在也只亏 $5,000。总净赚 $0 vs 现在的净亏 $10,000。
          </p>
          <div className="glass-card rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-muted-foreground font-mono">如果止盈</span>
              <span className="text-profit font-mono font-bold text-sm">$0 (保本)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">实际结果</span>
              <span className="text-danger font-mono font-bold text-sm">-$10,000</span>
            </div>
            <div className="border-t border-white/[0.06] mt-3 pt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">差距</span>
              <span className="text-warn font-mono font-bold text-sm">$10,000</span>
            </div>
          </div>
          <div className="px-3 py-2 rounded-lg bg-primary/8 border border-primary/15">
            <p className="text-primary/80 text-xs leading-relaxed">
              📋 设规则：任何持仓盈利超 50% 时自动减仓 1/3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehaviorAnalysis;
