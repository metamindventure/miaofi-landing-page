import { useState } from "react";
import { LogOut, TrendingUp, ChevronDown, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { PostExitSummary } from "./types";

const PostExitMoveSection = ({ data }: { data: PostExitSummary }) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const isLoss = data.avgChangePercent > 0; // post-exit went up = opportunity cost
  const accent = isLoss ? "text-loss" : "text-profit";
  const accentBg = isLoss ? "bg-loss/10 border-loss/25" : "bg-profit/10 border-profit/25";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <LogOut className="w-[18px] h-[18px] text-warning" />
        <h3 className="font-display font-semibold text-[15px] text-foreground">
          {t('cexResults.postExit.title')}
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-1.5 py-0.5 rounded-md bg-foreground/5 border border-foreground/10">
          {t('cexResults.postExit.windowLabel').replace('{n}', String(data.windowDays))}
        </span>
      </div>

      <div className={`glass-card p-5 border-l-[3px] ${isLoss ? "border-l-loss" : "border-l-profit"}`}>
        {/* Headline metric */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              {t('cexResults.postExit.avgMove')}
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold font-mono tabular-nums ${accent}`}>
                {data.avgChangePercent > 0 ? "+" : ""}{data.avgChangePercent.toFixed(1)}%
              </span>
              <TrendingUp className={`w-4 h-4 ${accent}`} />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {t('cexResults.postExit.avgMoveDesc').replace('{n}', String(data.exitedPositions))}
            </p>
          </div>

          <div className={`px-4 py-3 rounded-xl border ${accentBg} min-w-[180px]`}>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              {t('cexResults.postExit.opportunityCost')}
            </div>
            <div className={`text-2xl font-bold font-mono tabular-nums ${accent}`}>
              ${data.totalOpportunityCost.toLocaleString()}
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              {t('cexResults.postExit.opportunityCostDesc')}
            </div>
          </div>
        </div>

        {/* Explainer */}
        <div className="p-3 rounded-lg bg-secondary/40 border border-border mb-3">
          <p className="text-xs text-secondary-foreground leading-relaxed">
            {t('cexResults.postExit.explainer')}
          </p>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          <span>{t('cexResults.postExit.viewBreakdown')} ({data.moves.length})</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="space-y-2 pt-1">
            {data.moves.map((m) => {
              const up = m.changePercent > 0;
              return (
                <div key={m.id} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono font-semibold text-sm text-foreground">{m.asset}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {t('cexResults.postExit.exited')} {m.exitDate} @ {m.exitPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1 text-sm font-mono font-bold tabular-nums ${up ? "text-loss" : "text-profit"}`}>
                        <ArrowUpRight className={`w-3.5 h-3.5 ${up ? "" : "rotate-90"}`} />
                        {up ? "+" : ""}{m.changePercent}%
                      </span>
                      <span className="text-[11px] text-muted-foreground tabular-nums">
                        {t('cexResults.postExit.afterDays').replace('{n}', String(m.daysAfter))}
                      </span>
                      <span className={`text-xs font-mono font-semibold tabular-nums ${up ? "text-loss" : "text-profit"}`}>
                        −${m.opportunityCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5 italic">{m.note}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostExitMoveSection;
