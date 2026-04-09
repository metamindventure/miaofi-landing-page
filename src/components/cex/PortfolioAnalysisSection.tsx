import { useState, useRef, useEffect } from "react";
import { Brain, Share2, ChevronDown, Check, Sparkles, ThumbsUp, ThumbsDown, Lock } from "lucide-react";
import { toast } from "sonner";
import { PortfolioInsight } from "./types";
import { mockInsights, AI_SUMMARY, STATS, PNL_DATA } from "./mockData";
import { useI18n } from "@/i18n/I18nContext";

const severityConfig = {
  critical: { border: "hsl(350, 100%, 65%)", bg: "hsla(350, 100%, 65%, 0.15)", text: "text-loss", label: "CRITICAL" },
  warning: { border: "hsl(30, 100%, 64%)", bg: "hsla(30, 100%, 64%, 0.15)", text: "text-warning", label: "WARNING" },
  tip: { border: "hsl(174, 60%, 55%)", bg: "hsla(174, 60%, 55%, 0.15)", text: "text-info", label: "TIP" },
};

const InsightCard = ({ insight }: { insight: PortfolioInsight }) => {
  const { t } = useI18n();
  const config = severityConfig[insight.severity];
  const [reviewed, setReviewed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setActionsOpen(false);
    };
    if (actionsOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [actionsOpen]);

  return (
    <div
      className="glass-card p-5 relative transition-all duration-200 overflow-visible"
      style={{
        borderLeft: `3px solid ${config.border}`,
        opacity: reviewed ? 0.5 : 1,
        zIndex: actionsOpen ? 50 : 1,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${config.text}`} style={{ background: config.bg }}>
            {config.label}
          </span>
          {reviewed && <span className="text-xs text-profit flex items-center gap-1"><Check className="w-3 h-3" /> {t('cexResults.tba.reviewed')}</span>}
          <span className={`text-xs ${config.text}`}>{insight.impact}</span>
        </div>
        {!insight.blurred && (
          <button onClick={() => { navigator.clipboard.writeText(insight.title); toast(t('cexResults.tba.copied')); }} className="text-muted-foreground hover:text-foreground transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <h3 className="font-display font-semibold text-[17px] text-foreground mb-2">{insight.title}</h3>

      {!collapsed && (
        <div className={insight.blurred ? "relative" : ""}>
          <div className={insight.blurred ? "blur-[6px] select-none pointer-events-none" : ""}>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-4">{insight.body}</p>
            <div className="flex flex-wrap items-center gap-3">
              {insight.ctaLabel && insight.actions.length > 0 && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => !insight.blurred && setActionsOpen(!actionsOpen)}
                    className="glass-button-primary text-primary-foreground text-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-1.5"
                  >
                    {insight.ctaLabel}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${actionsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {actionsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[300px] z-50 rounded-xl overflow-hidden bg-card border border-border shadow-xl">
                      {insight.actions.map((action, i) => (
                        <button key={i} onClick={() => { toast(action.label); setActionsOpen(false); }}
                          className="w-full text-left px-4 py-3 hover:bg-secondary/30 transition-colors border-b border-border last:border-b-0">
                          <div className="flex items-center gap-2">
                            {i === 0 && <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />}
                            <span className="text-sm font-medium text-foreground">{action.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 ml-[22px]">{action.description}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {insight.detailAnalysis && (
                <button onClick={() => !insight.blurred && setAnalysisOpen(!analysisOpen)}
                  className="glass-button text-sm text-secondary-foreground rounded-lg px-4 py-2 flex items-center gap-1">
                  {t('cexResults.tba.seeDetail')} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${analysisOpen ? "rotate-180" : ""}`} />
                </button>
              )}
              {!insight.blurred && (
                <button onClick={() => { setReviewed(true); setTimeout(() => setCollapsed(true), 200); }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  {reviewed ? <>{t('cexResults.tba.reviewed')} <Check className="w-3.5 h-3.5" /></> : <>{t('cexResults.tba.iKnow')} <Check className="w-3.5 h-3.5" /></>}
                </button>
              )}
            </div>
          </div>

          {analysisOpen && insight.detailAnalysis && !insight.blurred && (
            <div className="mt-3 p-4 rounded-lg border border-border bg-card">
              <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">{insight.detailAnalysis}</p>
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{t('cexResults.tba.helpful')}</span>
                  <button onClick={() => { setFeedback("up"); toast(t('cexResults.tba.thanksFeedback')); }}
                    className={`p-1.5 rounded-md transition-colors ${feedback === "up" ? "bg-profit/20 text-profit" : "text-muted-foreground hover:text-foreground"}`}>
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => { setFeedback("down"); toast(t('cexResults.tba.thanksFeedback')); }}
                    className={`p-1.5 rounded-md transition-colors ${feedback === "down" ? "bg-loss/20 text-loss" : "text-muted-foreground hover:text-foreground"}`}>
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {insight.blurred && (
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(10, 10, 15, 0.6) 80%)" }}>
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const PortfolioAnalysisSection = () => {
  const { t, locale } = useI18n();
  const [expanded, setExpanded] = useState(false);

  const insightSeverities = mockInsights.map(i => ({ id: i.id, severity: i.severity, label: i.title }));

  return (
    <section className="w-full space-y-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full glass-card p-5 text-left transition-all hover:bg-white/[0.02]"
      >
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Brain className="w-5 h-5 text-primary" />
            <h2 className="section-header text-foreground">{t('cexResults.portfolio.title')}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-loss/8 border border-loss/20">
              <span className="text-xs font-medium text-loss font-mono tabular-nums">
                {t('cexResults.portfolio.highRisk')} · 7/10
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-loss/15 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-loss" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-base text-foreground">{t('cexResults.portfolio.summaryTitle')}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{t('cexResults.portfolio.summaryDesc')}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-3">
          <div>
            <span className="text-[11px] text-muted-foreground block">{t('cexResults.portfolio.issuesFound')}</span>
            <span className="text-lg font-bold font-mono text-foreground tabular-nums">{mockInsights.length}</span>
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">{t('cexResults.portfolio.critical')}</span>
            <span className="text-lg font-bold font-mono text-loss tabular-nums">{mockInsights.filter(i => i.severity === 'critical').length}</span>
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">{t('cexResults.portfolio.totalLoss')}</span>
            <span className="text-lg font-bold font-mono text-loss tabular-nums">~$12,800</span>
          </div>
        </div>

        {!expanded && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">{t('cexResults.portfolio.insightsDetected')} ({insightSeverities.length})</span>
            <div className="flex items-center gap-1.5">
              {insightSeverities.map((s) => (
                <span key={s.id} className={`w-2 h-2 rounded-full ${
                  s.severity === "critical" ? "bg-loss" : s.severity === "warning" ? "bg-warning" : "bg-info"
                }`} />
              ))}
            </div>
            <ChevronDown className="w-3.5 h-3.5 ml-auto" />
          </div>
        )}
      </button>

      {expanded && (
        <div className="space-y-4 pt-4">
          {mockInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}

          {/* AI Summary */}
          <div className="glass-card p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/30 rounded-l-xl" />
            <h3 className="font-display font-semibold text-[15px] text-foreground mb-3 pl-4">{t('cexResults.aiSummaryTitle')}</h3>
            <p className="text-sm text-foreground/80 leading-relaxed pl-4">
              {AI_SUMMARY[locale]}
            </p>
          </div>

          {/* Trading Stats */}
          <div className="glass-card p-5">
            <h3 className="font-display font-semibold text-[15px] text-foreground mb-4">{t('cexResults.statsTitle')}</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{t('cexResults.totalTrades')}</p>
                <p className="text-xl font-display font-bold text-foreground">{STATS.totalTrades}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{t('cexResults.totalFees')}</p>
                <p className="text-xl font-display font-bold text-loss">${STATS.totalFees.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{t('cexResults.dailyFreq')}</p>
                <p className="text-xl font-display font-bold text-foreground">{STATS.dailyFreq}</p>
              </div>
            </div>

            {/* Pair distribution */}
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{t('cexResults.pairDistribution')}</p>
            <div className="space-y-2 mb-4">
              {STATS.pairs.map((pair) => (
                <div key={pair.name} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-foreground/70 w-24">{pair.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-primary/60" style={{ width: `${pair.pct}%` }} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground w-8 text-right">{pair.pct}%</span>
                </div>
              ))}
            </div>

            {/* Buy/Sell */}
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{t('cexResults.buyVsSell')}</p>
            <div className="flex gap-1 h-4 rounded-full overflow-hidden">
              <div className="bg-profit/50 rounded-l-full" style={{ width: `${STATS.buyPercent}%` }} />
              <div className="bg-loss/50 rounded-r-full" style={{ width: `${STATS.sellPercent}%` }} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-profit font-mono">Buy {STATS.buyPercent}%</span>
              <span className="text-xs text-loss font-mono">Sell {STATS.sellPercent}%</span>
            </div>
          </div>

          {/* P&L Table */}
          <div className="glass-card overflow-hidden">
            <div className="p-5 pb-3">
              <h3 className="font-display font-semibold text-[15px] text-foreground mb-1">{t('cexResults.pnlTitle')}</h3>
              <p className="text-xs text-muted-foreground">{t('cexResults.pnlSubtitle')}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-t border-border">
                    <th className="text-left px-5 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t('cexResults.asset')}</th>
                    <th className="text-right px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t('cexResults.totalBought')}</th>
                    <th className="text-right px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t('cexResults.totalSold')}</th>
                    <th className="text-right px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium hidden sm:table-cell">{t('cexResults.avgBuyPrice')}</th>
                    <th className="text-right px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium hidden sm:table-cell">{t('cexResults.avgSellPrice')}</th>
                    <th className="text-right px-5 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t('cexResults.estimatedPnl')}</th>
                  </tr>
                </thead>
                <tbody>
                  {PNL_DATA.map((row) => (
                    <tr key={row.asset} className="border-t border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-5 py-3 font-display font-bold text-sm text-foreground">{row.asset}</td>
                      <td className="text-right px-3 py-3 font-mono text-foreground/70">{row.bought}</td>
                      <td className="text-right px-3 py-3 font-mono text-foreground/70">{row.sold}</td>
                      <td className="text-right px-3 py-3 font-mono text-muted-foreground hidden sm:table-cell">{row.avgBuy}</td>
                      <td className="text-right px-3 py-3 font-mono text-muted-foreground hidden sm:table-cell">{row.avgSell}</td>
                      <td className={`text-right px-5 py-3 font-mono font-semibold ${row.negative ? 'text-loss' : 'text-profit'}`}>{row.pnl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioAnalysisSection;
