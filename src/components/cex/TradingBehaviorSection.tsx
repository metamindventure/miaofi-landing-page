import { useState } from "react";
import { Activity, Zap, TrendingDown, ChevronDown } from "lucide-react";
import PatternCard from "./PatternCard";
import WorstTrades from "./WorstTrades";
import BenchmarkComparison from "./BenchmarkComparison";
import { mockPatterns, mockWorstTrades, mockBenchmark } from "./mockData";
import { useI18n } from "@/i18n/I18nContext";

const filteredPatterns = mockPatterns
  .filter((p) => p.confidence > 50)
  .sort((a, b) => b.confidence - a.confidence)
  .slice(0, 4);

const totalImpact = filteredPatterns.reduce((sum, p) => sum + p.dollarImpact, 0);

const traderTypeMap: Record<string, { en: string; zh: string; ko: string; descEn: string; descZh: string; descKo: string }> = {
  overtrading: {
    en: "Overtrader", zh: "过度交易者", ko: "과잉 거래자",
    descEn: "You trade too frequently — fees and poor timing are silently eating your gains.",
    descZh: "你交易太频繁了——手续费和糟糕的入场时机正在无声地吞噬你的收益。",
    descKo: "너무 자주 거래합니다 — 수수료와 잘못된 타이밍이 수익을 갉아먹고 있습니다.",
  },
  "fomo-buying": {
    en: "Impulse Chaser", zh: "冲动追涨者", ko: "충동 추격 매수자",
    descEn: "You tend to buy into hype — entries near local tops are eroding your returns.",
    descZh: "你倾向于追涨——在局部高点入场正在侵蚀你的收益。",
    descKo: "과열 시 매수하는 경향 — 고점 근처 진입이 수익을 깎고 있습니다.",
  },
};

const TradingBehaviorSection = () => {
  const { t, locale } = useI18n();
  const [expanded, setExpanded] = useState(false);

  const dominantPattern = filteredPatterns[0];
  const traderType = dominantPattern ? traderTypeMap[dominantPattern.id] : null;
  const traderLabel = traderType ? (locale === 'zh' ? traderType.zh : locale === 'ko' ? traderType.ko : traderType.en) : "Active Trader";
  const traderDesc = traderType ? (locale === 'zh' ? traderType.descZh : locale === 'ko' ? traderType.descKo : traderType.descEn) : "";

  const overviewStats = { totalTrades: 847, winRate: 38, avgHold: "2.1 days" };

  return (
    <section className="w-full space-y-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full glass-card p-5 text-left transition-all hover:bg-white/[0.02]"
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="section-header text-foreground">{t('cexResults.tba.title')}</h2>
            <span className="text-xs text-muted-foreground">{t('cexResults.tba.last9months')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-loss/8 border border-loss/20">
              <TrendingDown className="w-3.5 h-3.5 text-loss" />
              <span className="text-xs font-medium text-loss font-mono tabular-nums">
                -${Math.abs(totalImpact).toLocaleString()} {t('cexResults.tba.totalCost')}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
          </div>
        </div>

        {/* Trader type */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-warning/15 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-warning" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-base text-foreground">{traderLabel}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{traderDesc}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-3">
          <div>
            <span className="text-[11px] text-muted-foreground block">{t('cexResults.tba.trades')}</span>
            <span className="text-lg font-bold font-mono text-foreground tabular-nums">{overviewStats.totalTrades}</span>
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">{t('cexResults.tba.winRate')}</span>
            <span className={`text-lg font-bold font-mono tabular-nums ${overviewStats.winRate < 50 ? "text-loss" : "text-profit"}`}>
              {overviewStats.winRate}%
            </span>
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">{t('cexResults.tba.avgHold')}</span>
            <span className="text-lg font-bold font-mono text-foreground tabular-nums">{overviewStats.avgHold}</span>
          </div>
        </div>

        {/* Collapsed footer */}
        {!expanded && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">
              {t('cexResults.tba.patternsDetected')} ({filteredPatterns.length})
            </span>
            <div className="flex items-center gap-1.5">
              {filteredPatterns.map((p) => (
                <span
                  key={p.id}
                  className={`w-2 h-2 rounded-full ${
                    p.severity === "high" ? "bg-loss" : p.severity === "medium" ? "bg-warning" : "bg-profit"
                  }`}
                />
              ))}
            </div>
            <ChevronDown className="w-3.5 h-3.5 ml-auto" />
          </div>
        )}
      </button>

      {/* Expanded */}
      {expanded && (
        <div className="space-y-6 pt-4">
          <div className="grid gap-4">
            {filteredPatterns.map((pattern, i) => (
              <PatternCard key={pattern.id} pattern={pattern} index={i} />
            ))}
          </div>
          <WorstTrades trades={mockWorstTrades} />
          <BenchmarkComparison data={mockBenchmark} />
        </div>
      )}
    </section>
  );
};

export default TradingBehaviorSection;
