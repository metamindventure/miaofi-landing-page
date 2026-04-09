import { useState } from "react";
import { BarChart3, TrendingDown, ArrowRight } from "lucide-react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";
import { BenchmarkData } from "./types";
import { useI18n } from "@/i18n/I18nContext";

type Period = "30D" | "60D" | "90D";

const BenchmarkComparison = ({ data }: { data: BenchmarkData }) => {
  const { t } = useI18n();
  const [period, setPeriod] = useState<Period>("30D");
  const chartData = data.chart[period];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <BarChart3 className="w-[18px] h-[18px] text-primary" />
        <h3 className="font-display font-semibold text-[15px] text-foreground">{t('cexResults.tba.youVsBtc')}</h3>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-6 md:gap-10 mb-5 flex-wrap">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{t('cexResults.tba.yourReturn')}</span>
            <span className={`text-xl font-bold font-mono tabular-nums ${data.userReturn < 0 ? "text-loss" : "text-profit"}`}>
              {data.userReturn > 0 ? "+" : ""}{data.userReturn}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{t('cexResults.benchmark.btcHold')}</span>
            <span className={`text-xl font-bold font-mono tabular-nums ${data.btcReturn < 0 ? "text-loss" : "text-profit"}`}>
              +{data.btcReturn}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{t('cexResults.benchmark.gap')}</span>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-loss" />
              <span className="text-xl font-bold font-mono tabular-nums text-loss">{data.gap}%</span>
            </div>
          </div>

          <div className="ml-auto flex items-center bg-secondary/50 rounded-lg p-0.5">
            {(["30D", "60D", "90D"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
                  period === p ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[200px] md:h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="cexUserGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(350, 100%, 65%)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(350, 100%, 65%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cexBtcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160, 100%, 45%)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(160, 100%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "hsl(245, 15%, 65%)" }}
                tickFormatter={(v) => `D${v}`}
                interval={Math.floor(chartData.length / 5)}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "hsl(245, 15%, 65%)" }}
                tickFormatter={(v) => `${v}%`}
              />
              <ReferenceLine y={0} stroke="hsl(0, 0%, 100%, 0.08)" strokeDasharray="3 3" />
              <Tooltip
                contentStyle={{
                  background: "hsl(240, 20%, 8%)",
                  border: "1px solid hsl(0, 0%, 100%, 0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.5)",
                }}
                labelFormatter={(v) => `${t('cexResults.benchmark.day')} ${v}`}
                formatter={(value: number, name: string) => [
                  `${value > 0 ? "+" : ""}${value}%`,
                  name === "user" ? t('cexResults.tba.yourPortfolio') : t('cexResults.benchmark.btcHold'),
                ]}
              />
              <Area type="monotone" dataKey="btc" stroke="hsl(160, 100%, 45%)" strokeWidth={2} fill="url(#cexBtcGrad)" dot={false} />
              <Area type="monotone" dataKey="user" stroke="hsl(350, 100%, 65%)" strokeWidth={2} fill="url(#cexUserGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/40 border border-border">
          <div className="flex items-start gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-secondary-foreground leading-relaxed">{data.attribution}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded-full bg-loss" />
            <span className="text-[11px] text-muted-foreground">{t('cexResults.tba.yourPortfolio')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded-full bg-profit" />
            <span className="text-[11px] text-muted-foreground">{t('cexResults.benchmark.btcHold')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkComparison;
