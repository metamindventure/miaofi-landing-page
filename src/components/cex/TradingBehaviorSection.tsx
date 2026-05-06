import { useState } from "react";
import { Activity, Zap, TrendingDown, ChevronDown, LogOut } from "lucide-react";
import PatternCard from "./PatternCard";
import WorstTrades from "./WorstTrades";
import BenchmarkComparison from "./BenchmarkComparison";
import PostExitMoveSection from "./PostExitMoveSection";
import { getMockPatterns, getMockWorstTrades, getMockBenchmark, getMockPostExit } from "./mockData";
import { useI18n } from "@/i18n/I18nContext";

const TradingBehaviorSection = () => {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  const mockPatterns = getMockPatterns(t);
  const mockWorstTrades = getMockWorstTrades(t);
  const mockBenchmark = getMockBenchmark(t);
  const mockPostExit = getMockPostExit(t);

  const filteredPatterns = mockPatterns
    .filter((p) => p.confidence > 50)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 4);

  const totalImpact = filteredPatterns.reduce((sum, p) => sum + p.dollarImpact, 0);

  const dominantPattern = filteredPatterns[0];
  const traderLabel = dominantPattern?.id === "overtrading"
    ? t('cexResults.traderType.overtrader')
    : dominantPattern?.id === "fomo-buying"
    ? t('cexResults.traderType.impulseChaser')
    : t('cexResults.traderType.activeTrader');

  const traderDesc = dominantPattern?.id === "overtrading"
    ? t('cexResults.traderType.overtraderDesc')
    : dominantPattern?.id === "fomo-buying"
    ? t('cexResults.traderType.impulseChaserDesc')
    : "";

  const overviewStats = { totalTrades: 847, winRate: 38, avgHold: "2.1" };

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
            <span className="text-[11px] text-muted-foreground px-2 py-0.5 rounded-md bg-foreground/5 border border-foreground/10 font-mono tabular-nums">
              {t('cexResults.tba.dateRange')}
            </span>
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

        {/* Stats with benchmarks */}
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div>
            <span className="text-[11px] text-muted-foreground block">{t('cexResults.tba.trades')}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono text-foreground tabular-nums">{overviewStats.totalTrades}</span>
              <span className="text-[10px] text-muted-foreground/70 font-mono">/ 270d</span>
            </div>
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">{t('cexResults.tba.winRate')}</span>
            <span className={`text-lg font-bold font-mono tabular-nums ${overviewStats.winRate < 50 ? "text-loss" : "text-profit"}`}>
              {overviewStats.winRate}%
            </span>
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">{t('cexResults.tba.avgHold')}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono text-foreground tabular-nums">{overviewStats.avgHold}</span>
              <span className="text-[10px] text-muted-foreground/70">{t('cexResults.tba.days')}</span>
            </div>
          </div>
        </div>

        {/* Missed-upside narrative */}
        <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-loss/8 border border-loss/20">
          <LogOut className="w-4 h-4 text-loss shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm text-foreground">
              {t('cexResults.postExit.headline').replace('{n}', String(mockPostExit.exitedPositions))}
            </div>
            <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
              <span className="text-[11px] text-muted-foreground">{t('cexResults.postExit.avgGain')}</span>
              <span className="text-sm font-bold font-mono tabular-nums text-loss">
                +{mockPostExit.avgChangePercent.toFixed(1)}%
              </span>
              <span className="text-border">·</span>
              <span className="text-[11px] text-muted-foreground">{t('cexResults.postExit.missed')}</span>
              <span className="text-sm font-bold font-mono tabular-nums text-loss">
                ${mockPostExit.totalOpportunityCost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Collapsed footer — strong CTA */}
        {!expanded && (
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {filteredPatterns.map((p) => (
                  <span
                    key={p.id}
                    className={`w-1.5 h-1.5 rounded-full ${
                      p.severity === "high" ? "bg-loss" : p.severity === "medium" ? "bg-warning" : "bg-profit"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-foreground/80">
                {t('cexResults.tba.expandCta').replace('{n}', String(filteredPatterns.length))}
              </span>
            </div>
            <span className="text-xs text-primary flex items-center gap-1">
              {t('cexResults.tba.expand')}
              <ChevronDown className="w-3.5 h-3.5" />
            </span>
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
          <PostExitMoveSection data={mockPostExit} />
          <WorstTrades trades={mockWorstTrades} />
          <BenchmarkComparison data={mockBenchmark} />
        </div>
      )}
    </section>
  );
};

export default TradingBehaviorSection;
