import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Download, TrendingDown, Repeat, Zap, Clock, AlertTriangle } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import LanguageSwitcher from '@/components/landing/LanguageSwitcher';

// Scroll animation hook
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.unobserve(e.target); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// Mock data
const BEHAVIOR_PATTERNS = [
  {
    id: 'overtrading',
    icon: Repeat,
    severity: 'high' as const,
    score: 82,
    titleZh: '过度交易',
    titleEn: 'Overtrading',
    titleKo: '과잉 거래',
    descZh: '9 个月内 847 笔交易，日均 3.1 笔。频繁交易不仅没提高收益，还累计付出了 $2,340 手续费。每次交易都在为交易所打工。',
    descEn: '847 trades in 9 months, avg 3.1/day. Frequent trading didn\'t improve returns — it cost you $2,340 in fees. Every trade is paying the exchange.',
    descKo: '9개월간 847건 거래, 일 평균 3.1건. 빈번한 거래가 수익을 높이지 못하고 수수료 $2,340만 지불. 매 거래마다 거래소만 돈 벌어줌.',
  },
  {
    id: 'fomo',
    icon: TrendingDown,
    severity: 'high' as const,
    score: 76,
    titleZh: 'FOMO 追涨',
    titleEn: 'FOMO Chasing',
    titleKo: 'FOMO 추격 매수',
    descZh: 'BTC 和 ETH 的 5 次买入中有 4 次发生在价格反弹 15%+ 之后。你的平均买入价比 30 日均价高 22%。',
    descEn: '4 out of 5 BTC and ETH buys came after 15%+ price rebounds. Your avg entry is 22% above the 30-day average.',
    descKo: 'BTC, ETH 5건 매수 중 4건이 15%+ 반등 후 진행. 평균 매입가가 30일 평균가보다 22% 높음.',
  },
  {
    id: 'revenge',
    icon: Zap,
    severity: 'medium' as const,
    score: 61,
    titleZh: '报复性交易',
    titleEn: 'Revenge Trading',
    titleKo: '보복 매매',
    descZh: '在经历较大亏损后的 2 小时内，你有 6 次立即进行了新的交易，其中 5 次继续亏损。亏了想翻本，结果越亏越多。',
    descEn: '6 times you opened new trades within 2 hours of a big loss. 5 of those also lost money. Trying to win it back only dug the hole deeper.',
    descKo: '큰 손실 후 2시간 내 6번 즉시 새 거래를 진행, 그 중 5번 추가 손실. 만회하려다 더 깊은 구렁텅이.',
  },
  {
    id: 'noStopLoss',
    icon: AlertTriangle,
    severity: 'medium' as const,
    score: 55,
    titleZh: '无止损习惯',
    titleEn: 'No Stop-Loss Habit',
    titleKo: '손절 습관 부재',
    descZh: '过去 9 个月里没有一笔交易设置了止损。最大单笔亏损 -$3,200（SOL），如果设了 -10% 止损，最多只亏 $800。',
    descEn: 'Zero stop-losses set in 9 months. Max single loss: -$3,200 (SOL). A -10% stop-loss would have capped it at $800.',
    descKo: '9개월간 손절 설정 0건. 최대 단일 손실 -$3,200 (SOL). -10% 손절 설정 시 $800으로 제한 가능.',
  },
];

const AI_SUMMARY = {
  zh: '你是一个典型的「高频情绪化交易者」。你的主要问题不是选错了币，而是交易行为本身在吞噬利润。如果保持同样的持仓选择，但将交易频率降低 70%、每笔交易设 -10% 止损、只在价格低于 30 日均线时买入，你过去 9 个月的表现预计可以提升 35-50%。核心建议：减少交易次数，建立纪律性规则，让规则代替情绪做决定。',
  en: 'You\'re a classic "high-frequency emotional trader." Your main problem isn\'t picking the wrong coins — it\'s your trading behavior eating your profits. Same coin picks, but trade 70% less, set -10% stop-losses, and only buy below the 30-day MA — your past 9 months would likely improve 35-50%. Core advice: trade less, build disciplined rules, let rules decide instead of emotions.',
  ko: '당신은 전형적인 "고빈도 감정적 트레이더"입니다. 주요 문제는 잘못된 코인 선택이 아니라 매매 행동 자체가 수익을 잡아먹고 있다는 것입니다. 동일한 코인 선택으로도 거래 빈도 70% 감소, -10% 손절 설정, 30일 이동평균선 아래에서만 매수하면 지난 9개월 수익이 35-50% 개선될 것으로 예상됩니다.',
};

const STATS = {
  totalTrades: 847,
  totalFees: 2340,
  dailyFreq: 3.1,
  buyPercent: 62,
  sellPercent: 38,
  pairs: [
    { name: 'BTC/USDT', pct: 34 },
    { name: 'ETH/USDT', pct: 28 },
    { name: 'SOL/USDT', pct: 18 },
    { name: 'DOGE/USDT', pct: 12 },
    { name: 'Others', pct: 8 },
  ],
};

const PNL_DATA = [
  { asset: 'BTC', bought: '$42,800', sold: '$38,200', avgBuy: '$68,200', avgSell: '$64,500', pnl: '-$4,600', negative: true },
  { asset: 'ETH', bought: '$28,500', sold: '$22,100', avgBuy: '$3,800', avgSell: '$3,200', pnl: '-$6,400', negative: true },
  { asset: 'SOL', bought: '$12,300', sold: '$8,900', avgBuy: '$165', avgSell: '$132', pnl: '-$3,400', negative: true },
  { asset: 'DOGE', bought: '$5,200', sold: '$6,800', avgBuy: '$0.32', avgSell: '$0.41', pnl: '+$1,600', negative: false },
];

const CexResults = () => {
  const { t, locale } = useI18n();

  const behaviorAnim = useScrollAnimation();
  const summaryAnim = useScrollAnimation();
  const statsAnim = useScrollAnimation();
  const pnlAnim = useScrollAnimation();

  const getSeverityColor = (s: string) => {
    if (s === 'high') return 'bg-danger/10 text-danger border-danger/20';
    if (s === 'medium') return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-profit/10 text-profit border-profit/20';
  };

  const getSeverityLabel = (s: string) => {
    if (s === 'high') return t('cexResults.severityHigh');
    if (s === 'medium') return t('cexResults.severityMedium');
    return t('cexResults.severityLow');
  };

  const getPatternTitle = (p: typeof BEHAVIOR_PATTERNS[0]) => {
    if (locale === 'zh') return p.titleZh;
    if (locale === 'ko') return p.titleKo;
    return p.titleEn;
  };

  const getPatternDesc = (p: typeof BEHAVIOR_PATTERNS[0]) => {
    if (locale === 'zh') return p.descZh;
    if (locale === 'ko') return p.descKo;
    return p.descEn;
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="logo-pulse w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-[10px]">M</span>
          </div>
          <span className="font-display font-semibold text-sm text-foreground/80 tracking-tight">MiaoFi</span>
        </Link>
        <LanguageSwitcher />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center pt-24 pb-16 px-5">
        <div className="w-full max-w-3xl">

          {/* Back */}
          <Link to="/cex-upload" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors mb-8">
            <ArrowLeft size={14} />
            {t('cexResults.backToUpload')}
          </Link>

          {/* Page title */}
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mb-2">
            {t('cexResults.pageTitle')}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-12">
            {t('cexResults.pageSubtitle')}
          </p>

          {/* ─── Section 1: Behavior Diagnosis ─── */}
          <div ref={behaviorAnim.ref} className={`mb-16 transition-all duration-700 ${behaviorAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-display font-bold text-xl text-foreground mb-2">{t('cexResults.behaviorTitle')}</h2>
            <p className="text-sm text-muted-foreground mb-6">{t('cexResults.behaviorSubtitle')}</p>

            <div className="space-y-4">
              {BEHAVIOR_PATTERNS.map((pattern, i) => {
                const Icon = pattern.icon;
                return (
                  <div
                    key={pattern.id}
                    className={`glass-card-bright rounded-xl p-5 sm:p-6 transition-all duration-500 ${
                      behaviorAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        pattern.severity === 'high' ? 'bg-danger/10' : 'bg-warning/10'
                      }`}>
                        <Icon size={20} className={pattern.severity === 'high' ? 'text-danger' : 'text-warning'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-display font-bold text-base text-foreground">{getPatternTitle(pattern)}</h3>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getSeverityColor(pattern.severity)}`}>
                            {t('cexResults.severity')}: {getSeverityLabel(pattern.severity)}
                          </span>
                        </div>

                        {/* Score bar */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                pattern.severity === 'high' ? 'bg-danger' : 'bg-warning'
                              }`}
                              style={{ width: behaviorAnim.isVisible ? `${pattern.score}%` : '0%', transitionDelay: `${i * 120 + 300}ms` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-foreground/60">{pattern.score}/100</span>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{getPatternDesc(pattern)}</p>

                        <button className="inline-flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors">
                          {t('cexResults.actionButton')}
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── Section 2: AI Summary ─── */}
          <div ref={summaryAnim.ref} className={`mb-16 transition-all duration-700 ${summaryAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-display font-bold text-xl text-foreground mb-4">{t('cexResults.aiSummaryTitle')}</h2>
            <div className="glass-card-bright rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/30 rounded-l-xl" />
              <p className="text-sm text-foreground/80 leading-relaxed pl-4">
                {AI_SUMMARY[locale]}
              </p>
            </div>
          </div>

          {/* ─── Section 3: Trading Statistics ─── */}
          <div ref={statsAnim.ref} className={`mb-16 transition-all duration-700 ${statsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-display font-bold text-xl text-foreground mb-6">{t('cexResults.statsTitle')}</h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{t('cexResults.totalTrades')}</p>
                <p className="text-xl font-display font-bold text-foreground">{STATS.totalTrades}</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{t('cexResults.totalFees')}</p>
                <p className="text-xl font-display font-bold text-danger">${STATS.totalFees.toLocaleString()}</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{t('cexResults.dailyFreq')}</p>
                <p className="text-xl font-display font-bold text-foreground">{STATS.dailyFreq}</p>
              </div>
            </div>

            {/* Pair distribution */}
            <div className="glass-card rounded-xl p-5 mb-4">
              <p className="text-xs text-muted-foreground mb-3">{t('cexResults.pairDistribution')}</p>
              <div className="space-y-2">
                {STATS.pairs.map((pair) => (
                  <div key={pair.name} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-foreground/70 w-24">{pair.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/60 transition-all duration-1000"
                        style={{ width: statsAnim.isVisible ? `${pair.pct}%` : '0%' }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-8 text-right">{pair.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buy/Sell ratio */}
            <div className="glass-card rounded-xl p-5">
              <p className="text-xs text-muted-foreground mb-3">{t('cexResults.buyVsSell')}</p>
              <div className="flex gap-1 h-4 rounded-full overflow-hidden">
                <div className="bg-profit/50 rounded-l-full transition-all duration-1000" style={{ width: statsAnim.isVisible ? `${STATS.buyPercent}%` : '0%' }} />
                <div className="bg-danger/50 rounded-r-full transition-all duration-1000" style={{ width: statsAnim.isVisible ? `${STATS.sellPercent}%` : '0%' }} />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-profit font-mono">Buy {STATS.buyPercent}%</span>
                <span className="text-xs text-danger font-mono">Sell {STATS.sellPercent}%</span>
              </div>
            </div>
          </div>

          {/* ─── Section 4: P&L Summary ─── */}
          <div ref={pnlAnim.ref} className={`mb-16 transition-all duration-700 ${pnlAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-display font-bold text-xl text-foreground mb-2">{t('cexResults.pnlTitle')}</h2>
            <p className="text-xs text-muted-foreground mb-6">{t('cexResults.pnlSubtitle')}</p>

            <div className="glass-card rounded-xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-6 gap-2 p-4 border-b border-foreground/[0.06] text-[10px] text-muted-foreground font-medium">
                <span>{t('cexResults.asset')}</span>
                <span>{t('cexResults.totalBought')}</span>
                <span>{t('cexResults.totalSold')}</span>
                <span>{t('cexResults.avgBuyPrice')}</span>
                <span>{t('cexResults.avgSellPrice')}</span>
                <span>{t('cexResults.estimatedPnl')}</span>
              </div>
              {/* Rows */}
              {PNL_DATA.map((row) => (
                <div key={row.asset} className="grid grid-cols-6 gap-2 p-4 border-b border-foreground/[0.03] hover:bg-foreground/[0.02] transition-colors">
                  <span className="text-sm font-display font-bold text-foreground">{row.asset}</span>
                  <span className="text-xs font-mono text-foreground/70">{row.bought}</span>
                  <span className="text-xs font-mono text-foreground/70">{row.sold}</span>
                  <span className="text-xs font-mono text-foreground/70">{row.avgBuy}</span>
                  <span className="text-xs font-mono text-foreground/70">{row.avgSell}</span>
                  <span className={`text-xs font-mono font-semibold ${row.negative ? 'text-danger' : 'text-profit'}`}>
                    {row.pnl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Actions ─── */}
          <div className="flex gap-3">
            <Link
              to="/cex-upload"
              className="btn-shimmer flex-1 h-14 rounded-xl bg-gradient-to-r from-primary to-primary/70 text-primary-foreground font-display font-semibold text-sm flex items-center justify-center transition-all hover:scale-[1.02] hover:brightness-110"
            >
              {t('cexResults.startNewDiagnosis')}
            </Link>
            <button className="h-14 px-6 rounded-xl border border-foreground/10 text-foreground/70 hover:text-foreground hover:border-foreground/20 font-medium text-sm transition-all flex items-center gap-2">
              <Download size={16} />
              {t('cexResults.downloadReport')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CexResults;
