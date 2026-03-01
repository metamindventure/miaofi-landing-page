import { useEffect, useRef, useState } from 'react';
import { Brain } from 'lucide-react';

const DiagnosisCard = () => {
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

  // Chart data points (simplified ETH price journey)
  // Cost basis: $3,000. Peak: $4,900. Current: $2,000.
  const chartPoints = [
    { x: 0, y: 60 },    // $3,000 entry
    { x: 15, y: 55 },
    { x: 30, y: 40 },
    { x: 45, y: 20 },
    { x: 55, y: 10 },   // peak ~$4,900
    { x: 65, y: 25 },
    { x: 75, y: 45 },
    { x: 85, y: 65 },
    { x: 100, y: 80 },  // $2,000 current
  ];

  // "If took profit" line — diverges at the $4,000 mark
  const profitPoints = [
    { x: 0, y: 60 },
    { x: 15, y: 55 },
    { x: 30, y: 40 },
    { x: 45, y: 20 },
    { x: 50, y: 15 },   // sell half at ~$4,000
    { x: 65, y: 30 },
    { x: 75, y: 40 },
    { x: 85, y: 48 },
    { x: 100, y: 52 },  // stays higher — breakeven
  ];

  const toPath = (pts: typeof chartPoints) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * 3.2} ${p.y * 1.8}`).join(' ');

  return (
    <section ref={ref} className="w-full max-w-[1080px] mx-auto px-5 py-20 relative z-10">
      <div
        className={`glass-card-bright rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Card header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-warn" />
            <h3 className="font-display font-bold text-lg text-foreground/90">赚了不跑，亏了死扛</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — Chart + Diagnosis */}
          <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/[0.06]">
            {/* Mini chart */}
            <div className="relative w-full aspect-[2/1] mb-6">
              <svg viewBox="0 0 320 144" className="w-full h-full" fill="none">
                {/* Grid lines */}
                {[36, 72, 108].map(y => (
                  <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.04)" />
                ))}

                {/* Green "if took profit" line */}
                <path
                  d={toPath(profitPoints)}
                  stroke="#00E5A0"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className={visible ? 'line-draw' : ''}
                  fill="none"
                />

                {/* Red actual line */}
                <path
                  d={toPath(chartPoints)}
                  stroke="#FF4757"
                  strokeWidth="2.5"
                  className={visible ? 'line-draw' : ''}
                  fill="none"
                />

                {/* Peak annotation */}
                <circle cx={176} cy={18} r="3" fill="#F0F0F5" />
                <text x={176} y={12} textAnchor="middle" fill="#F0F0F5" fontSize="10" fontFamily="JetBrains Mono">$4,900</text>

                {/* Take-profit point */}
                <circle cx={160} cy={27} r="4" fill="#00E5A0" />
                <text x={160} y={50} textAnchor="middle" fill="#00E5A0" fontSize="9" fontFamily="JetBrains Mono">止盈点 $4,000</text>

                {/* Current price */}
                <text x={316} y={140} textAnchor="end" fill="#FF4757" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">$2,000</text>

                {/* Green end label */}
                <text x={316} y={98} textAnchor="end" fill="#00E5A0" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">+$5,000</text>
              </svg>

              {/* Legend */}
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

            {/* Diagnosis text */}
            <p className="text-foreground/60 text-sm leading-relaxed mb-4">
              你的 ETH 从 $4,900 高点持有到现在 $2,000，中间没有任何减仓操作。浮盈 $19,000 变成了浮亏 $10,000。这不是第一次——过去 12 个月你有 3 个 token 经历了完整的"盈利→亏损"周期。
            </p>

            {/* Alert callout */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warn/10 border border-warn/20">
              <span className="font-mono font-bold text-warn text-sm">浮盈 $19K → 浮亏 $10K，零止盈操作</span>
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
    </section>
  );
};

export default DiagnosisCard;
