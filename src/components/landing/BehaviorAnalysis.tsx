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

/* ─── Candlestick type ─── */
type Candle = { o: number; h: number; l: number; c: number };

/* Map price → Y in SVG (inverted: higher price = lower Y) */
const priceToY = (price: number, min: number, max: number, top: number, bottom: number) =>
  top + ((max - price) / (max - min)) * (bottom - top);

/* ─── Reusable candlestick renderer ─── */
const CandlestickChart = ({
  candles,
  width = 320,
  height = 150,
  priceMin,
  priceMax,
  visible,
  annotations,
  yAxisLabels,
}: {
  candles: Candle[];
  width?: number;
  height?: number;
  priceMin: number;
  priceMax: number;
  visible: boolean;
  annotations?: React.ReactNode;
  yAxisLabels?: { price: number; label: string; color?: string }[];
}) => {
  const padTop = 12;
  const padBottom = 8;
  const padLeft = 40;
  const padRight = 8;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const candleW = chartW / candles.length;
  const bodyW = Math.max(candleW * 0.55, 3);

  // Grid lines (4 horizontal)
  const gridCount = 4;
  const gridLines = Array.from({ length: gridCount }, (_, i) => {
    const ratio = (i + 1) / (gridCount + 1);
    return padTop + ratio * chartH;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" fill="none">
      {/* Grid */}
      {gridLines.map((gy, i) => (
        <line key={i} x1={padLeft} y1={gy} x2={width - padRight} y2={gy} stroke="rgba(255,255,255,0.04)" />
      ))}

      {/* Y-axis labels */}
      {yAxisLabels?.map((yl, i) => {
        const y = priceToY(yl.price, priceMin, priceMax, padTop, padTop + chartH);
        return (
          <text key={i} x={padLeft - 4} y={y + 3} textAnchor="end" fill={yl.color || '#8B8B9E'} fontSize="8" fontFamily="JetBrains Mono">
            {yl.label}
          </text>
        );
      })}

      {/* Candles */}
      {candles.map((c, i) => {
        const bullish = c.c >= c.o;
        const color = bullish ? '#00E5A0' : '#FF4757';
        const cx = padLeft + i * candleW + candleW / 2;
        const wickTop = priceToY(c.h, priceMin, priceMax, padTop, padTop + chartH);
        const wickBot = priceToY(c.l, priceMin, priceMax, padTop, padTop + chartH);
        const bodyTop = priceToY(Math.max(c.o, c.c), priceMin, priceMax, padTop, padTop + chartH);
        const bodyBot = priceToY(Math.min(c.o, c.c), priceMin, priceMax, padTop, padTop + chartH);
        const bodyH = Math.max(bodyBot - bodyTop, 1);

        return (
          <g
            key={i}
            className={visible ? 'animate-candle-appear' : ''}
            style={{
              opacity: visible ? 1 : 0,
              animationDelay: visible ? `${i * 40}ms` : '0ms',
              animationFillMode: 'both',
            }}
          >
            {/* Wick */}
            <line x1={cx} y1={wickTop} x2={cx} y2={wickBot} stroke={color} strokeWidth="1" />
            {/* Body */}
            <rect
              x={cx - bodyW / 2}
              y={bodyTop}
              width={bodyW}
              height={bodyH}
              fill={bullish ? 'transparent' : color}
              stroke={color}
              strokeWidth="1"
              rx="0.5"
            />
          </g>
        );
      })}

      {/* Custom annotations */}
      {annotations}
    </svg>
  );
};

/* ═══════════════════════════════════════════
   Case 1 — FOMO 追涨 (SOL candlestick)
   ═══════════════════════════════════════════ */
const FomoCard = ({ visible, delay }: { visible: boolean; delay: number }) => {
  // SOL 12-month journey: $295 peak → $120 low → $180 bounce → $80 current (20 candles)
  const candles: Candle[] = [
    { o: 290, h: 298, l: 275, c: 280 },
    { o: 280, h: 285, l: 255, c: 260 },
    { o: 260, h: 265, l: 230, c: 235 },
    { o: 235, h: 240, l: 205, c: 210 },
    { o: 210, h: 218, l: 185, c: 190 },
    { o: 190, h: 195, l: 155, c: 160 },
    { o: 160, h: 168, l: 130, c: 135 },
    { o: 135, h: 140, l: 118, c: 120 }, // bottom
    { o: 120, h: 138, l: 118, c: 135 }, // bounce starts
    { o: 135, h: 155, l: 132, c: 150 },
    { o: 150, h: 172, l: 148, c: 168 },
    { o: 168, h: 183, l: 165, c: 180 }, // bounce peak — BUY 1
    { o: 178, h: 182, l: 158, c: 165 }, // BUY 2
    { o: 165, h: 170, l: 148, c: 155 }, // BUY 3
    { o: 155, h: 158, l: 132, c: 138 },
    { o: 138, h: 142, l: 118, c: 122 },
    { o: 122, h: 128, l: 105, c: 110 },
    { o: 110, h: 115, l: 92, c: 95 },
    { o: 95, h: 100, l: 82, c: 85 },
    { o: 85, h: 88, l: 76, c: 80 },   // current
  ];

  const pMin = 70;
  const pMax = 310;
  const W = 360;
  const H = 180;
  const padTop = 24;
  const padLeft = 44;
  const padRight = 36;
  const chartW = W - padLeft - padRight;
  const chartH = H - padTop - 12;
  const candleW = chartW / candles.length;

  // Only show one combined BUY label with a bracket to avoid overlap
  const buyIndices = [11, 12, 13];

  const annotations = (
    <>
      {/* Individual BUY dots */}
      {buyIndices.map((idx, i) => {
        const cx = padLeft + idx * candleW + candleW / 2;
        const y = priceToY(candles[idx].h, pMin, pMax, padTop, padTop + chartH);
        return (
          <circle key={i} cx={cx} cy={y - 6} r="3" fill="#FF4757" className={visible ? 'animate-pulse' : ''} />
        );
      })}
      {/* Single combined label above the middle BUY dot */}
      {(() => {
        const midIdx = 12;
        const cx = padLeft + midIdx * candleW + candleW / 2;
        const y = priceToY(candles[11].h, pMin, pMax, padTop, padTop + chartH);
        return (
          <>
            <text x={cx} y={y - 18} textAnchor="middle" fill="#FF4757" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
              3× BUY
            </text>
            <text x={cx} y={y - 28} textAnchor="middle" fill="#FF4757" fontSize="7" fontFamily="JetBrains Mono">
              $155–$183
            </text>
          </>
        );
      })()}
      {/* Current price label — outside chart area */}
      <text x={W - 2} y={priceToY(80, pMin, pMax, padTop, padTop + chartH) + 4} textAnchor="end" fill="#FF4757" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
        $80
      </text>
    </>
  );

  return (
    <div
      className={`glass-card-bright rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-danger" />
          <h3 className="font-display font-bold text-lg text-foreground/90">FOMO 追涨</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div className="relative w-full aspect-[2/1] mb-6">
            <CandlestickChart
              candles={candles}
              priceMin={pMin}
              priceMax={pMax}
              visible={visible}
              annotations={annotations}
              yAxisLabels={[
                { price: 295, label: '$295', color: '#F0F0F5' },
                { price: 200, label: '$200' },
                { price: 120, label: '$120' },
              ]}
            />
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-danger rounded-sm" />
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
   Case 2 — 赚了不跑，亏了死扛 (ETH candlestick with take-profit overlay)
   ═══════════════════════════════════════════ */
const DispositionCard = ({ visible, delay }: { visible: boolean; delay: number }) => {
  // ETH journey: ~$3,000 entry → $4,900 peak → $2,000 current (18 candles)
  const candles: Candle[] = [
    { o: 2950, h: 3100, l: 2900, c: 3050 },
    { o: 3050, h: 3250, l: 3000, c: 3200 },
    { o: 3200, h: 3500, l: 3150, c: 3450 },
    { o: 3450, h: 3700, l: 3400, c: 3650 },
    { o: 3650, h: 3900, l: 3600, c: 3850 },
    { o: 3850, h: 4100, l: 3800, c: 4050 }, // index 5: ~$4,000 take-profit zone
    { o: 4050, h: 4400, l: 4000, c: 4350 },
    { o: 4350, h: 4700, l: 4300, c: 4650 },
    { o: 4650, h: 4953, l: 4600, c: 4900 }, // index 8: peak
    { o: 4900, h: 4920, l: 4500, c: 4550 }, // selloff begins
    { o: 4550, h: 4600, l: 4100, c: 4150 },
    { o: 4150, h: 4200, l: 3700, c: 3750 },
    { o: 3750, h: 3800, l: 3300, c: 3400 },
    { o: 3400, h: 3450, l: 2900, c: 3000 },
    { o: 3000, h: 3050, l: 2600, c: 2700 },
    { o: 2700, h: 2750, l: 2350, c: 2400 },
    { o: 2400, h: 2450, l: 2100, c: 2150 },
    { o: 2150, h: 2200, l: 1950, c: 2000 }, // current
  ];

  const pMin = 1800;
  const pMax = 5200;
  const W = 360;
  const H = 180;
  const padTop = 24;
  const padLeft = 44;
  const padRight = 50;
  const chartH = H - padTop - 12;
  const chartW = W - padLeft - padRight;
  const candleW = chartW / candles.length;

  // Take-profit divergence line from candle 5
  const tpStartX = padLeft + 5 * candleW + candleW / 2;
  const tpStartY = priceToY(4000, pMin, pMax, padTop, padTop + chartH);
  const tpEndX = padLeft + 17 * candleW + candleW / 2;
  const tpEndY = priceToY(3000, pMin, pMax, padTop, padTop + chartH);

  const annotations = (
    <>
      {/* Peak label — above chart */}
      <text
        x={padLeft + 8 * candleW + candleW / 2}
        y={priceToY(4953, pMin, pMax, padTop, padTop + chartH) - 8}
        textAnchor="middle"
        fill="#F0F0F5"
        fontSize="9"
        fontFamily="JetBrains Mono"
      >
        $4,900
      </text>

      {/* Take-profit zone marker — label offset to the left to avoid candle overlap */}
      <circle cx={tpStartX} cy={tpStartY} r="4" fill="#00E5A0" />
      <text x={tpStartX} y={tpStartY - 10} textAnchor="middle" fill="#00E5A0" fontSize="8" fontFamily="JetBrains Mono">
        止盈 $4,000
      </text>

      {/* Green dashed take-profit path */}
      <path
        d={`M ${tpStartX} ${tpStartY} C ${tpStartX + 60} ${tpStartY - 10}, ${tpEndX - 60} ${tpEndY + 10}, ${tpEndX} ${tpEndY}`}
        stroke="#00E5A0"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        fill="none"
        className={visible ? 'line-draw' : ''}
      />

      {/* End labels — pushed to right margin outside candles */}
      <text x={W - 2} y={priceToY(2000, pMin, pMax, padTop, padTop + chartH) + 4} textAnchor="end" fill="#FF4757" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
        $2,000
      </text>
      <text x={W - 2} y={tpEndY + 4} textAnchor="end" fill="#00E5A0" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
        +$5,000
      </text>
    </>
  );

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
            <CandlestickChart
              candles={candles}
              priceMin={pMin}
              priceMax={pMax}
              visible={visible}
              annotations={annotations}
              yAxisLabels={[
                { price: 4900, label: '$4.9K', color: '#F0F0F5' },
                { price: 4000, label: '$4.0K', color: '#00E5A0' },
                { price: 3000, label: '$3.0K' },
                { price: 2000, label: '$2.0K', color: '#FF4757' },
              ]}
            />
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-danger rounded-sm" />
                <span className="text-[10px] text-muted-foreground">实际持仓</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 rounded" style={{ borderTop: '1.5px dashed #00E5A0' }} />
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

/* ═══════════════════════════════════════════
   Case 3 — 恐慌抛售 (ETH Feb 2026 candlestick)
   ═══════════════════════════════════════════ */
const PanicCard = ({ visible, delay }: { visible: boolean; delay: number }) => {
  // ETH Feb 2026 daily candles — crash + recovery (~16 candles)
  const candles: Candle[] = [
    { o: 2250, h: 2280, l: 2220, c: 2260 }, // Feb 1
    { o: 2260, h: 2270, l: 2230, c: 2240 }, // Feb 2
    { o: 2240, h: 2250, l: 2040, c: 2060 }, // Feb 3 — crash -8%
    { o: 2060, h: 2080, l: 2020, c: 2030 }, // Feb 4 — bottom
    { o: 2030, h: 2100, l: 2020, c: 2090 }, // Feb 5 — bounce
    { o: 2090, h: 2180, l: 2080, c: 2170 }, // Feb 6
    { o: 2170, h: 2260, l: 2160, c: 2250 }, // Feb 7 — +11% from bottom
    { o: 2250, h: 2280, l: 2200, c: 2220 },
    { o: 2220, h: 2240, l: 2180, c: 2200 },
    { o: 2200, h: 2230, l: 2170, c: 2210 },
    { o: 2210, h: 2250, l: 2190, c: 2240 },
    { o: 2240, h: 2260, l: 2200, c: 2210 },
    { o: 2210, h: 2220, l: 2150, c: 2160 },
    { o: 2160, h: 2180, l: 2120, c: 2140 },
    { o: 2140, h: 2160, l: 2100, c: 2110 },
    { o: 2110, h: 2130, l: 2060, c: 2080 },
  ];

  const pMin = 1980;
  const pMax = 2320;
  const W = 320;
  const H = 150;
  const padTop = 12;
  const padLeft = 40;
  const padRight = 8;
  const chartH = H - padTop - 8;
  const chartW = W - padLeft - padRight;
  const candleW = chartW / candles.length;

  // SELL marker at candle 3 (the crash bottom)
  const sellIdx = 3;
  const sellCx = padLeft + sellIdx * candleW + candleW / 2;
  const sellY = priceToY(candles[sellIdx].l, pMin, pMax, padTop, padTop + chartH);

  // "If held" dashed line from sell point to candle 6 recovery
  const holdEndIdx = 6;
  const holdEndCx = padLeft + holdEndIdx * candleW + candleW / 2;
  const holdEndY = priceToY(candles[holdEndIdx].c, pMin, pMax, padTop, padTop + chartH);

  const annotations = (
    <>
      {/* Crash annotation */}
      <text
        x={padLeft + 2 * candleW + candleW / 2}
        y={priceToY(2280, pMin, pMax, padTop, padTop + chartH) - 4}
        textAnchor="middle"
        fill="#FF4757"
        fontSize="8"
        fontFamily="JetBrains Mono"
      >
        -8%
      </text>

      {/* SELL marker */}
      <circle cx={sellCx} cy={sellY + 4} r="4" fill="#FF4757" className={visible ? 'animate-pulse' : ''} />
      <text x={sellCx} y={sellY + 16} textAnchor="middle" fill="#FF4757" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
        SELL 全仓
      </text>

      {/* Recovery label */}
      <text
        x={holdEndCx}
        y={holdEndY - 8}
        textAnchor="middle"
        fill="#00E5A0"
        fontSize="8"
        fontFamily="JetBrains Mono"
      >
        +11% 反弹
      </text>

      {/* Green dashed "if held" line */}
      <line
        x1={sellCx}
        y1={sellY}
        x2={holdEndCx}
        y2={holdEndY}
        stroke="#00E5A0"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        className={visible ? 'line-draw' : ''}
      />
    </>
  );

  return (
    <div
      className={`glass-card-bright rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-danger" />
          <h3 className="font-display font-bold text-lg text-foreground/90">恐慌抛售</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div className="relative w-full aspect-[2/1] mb-6">
            <CandlestickChart
              candles={candles}
              priceMin={pMin}
              priceMax={pMax}
              visible={visible}
              annotations={annotations}
              yAxisLabels={[
                { price: 2280, label: '$2.3K' },
                { price: 2150, label: '$2.2K' },
                { price: 2030, label: '$2.0K', color: '#FF4757' },
              ]}
            />
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-danger rounded-sm" />
                <span className="text-[10px] text-muted-foreground">ETH · 2026年2月</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 rounded" style={{ borderTop: '1.5px dashed #00E5A0' }} />
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

export default BehaviorAnalysis;
