import { BehaviorPattern, WorstTrade, BenchmarkData, BenchmarkPoint, PortfolioInsight, PostExitSummary } from "./types";

export const getMockPostExit = (t: (key: string) => string): PostExitSummary => ({
  avgChangePercent: 19.7,
  totalOpportunityCost: 13852,
  exitedPositions: 6,
  windowDays: 30,
  moves: [
    { id: "pe-1", asset: "BTC",  exitDate: "Feb 11, 2025", exitPrice: "$78,726", currentPrice: "$94,210", daysAfter: 30, changePercent: 19.7, opportunityCost: 7740, note: t('cexResults.postExit.note.btc') },
    { id: "pe-2", asset: "WBTC", exitDate: "Feb 12, 2025", exitPrice: "$78,420", currentPrice: "$93,580", daysAfter: 30, changePercent: 19.3, opportunityCost: 3088, note: t('cexResults.postExit.note.wbtc') },
    { id: "pe-3", asset: "SOL",  exitDate: "Jan 28, 2025", exitPrice: "$182.40",  currentPrice: "$214.10", daysAfter: 45, changePercent: 17.4, opportunityCost: 1620, note: t('cexResults.postExit.note.sol') },
    { id: "pe-4", asset: "ETH",  exitDate: "Feb 03, 2025", exitPrice: "$2,640",   currentPrice: "$3,180",  daysAfter: 38, changePercent: 20.5, opportunityCost: 1404, note: t('cexResults.postExit.note.eth') },
  ],
});


// All text content uses i18n keys — resolved by components via t()
export const getMockPatterns = (t: (key: string) => string): BehaviorPattern[] => [
  {
    id: "overtrading",
    label: t('cexResults.patterns.overtrading.label'),
    severity: "high",
    confidence: 87,
    summary: t('cexResults.patterns.overtrading.summary'),
    dollarImpact: -2340,
    tradeCount: 847,
    recommendation: t('cexResults.patterns.overtrading.recommendation'),
    evidence: [
      { asset: "BTC/USDT", action: "buy", date: "Mar 5", price: "$67,200", amount: "0.05 BTC", pnl: "-$12", pnlPercent: -0.4 },
      { asset: "ETH/USDT", action: "sell", date: "Mar 5", price: "$3,180", amount: "2.1 ETH", pnl: "-$8", pnlPercent: -0.1 },
      { asset: "SOL/USDT", action: "buy", date: "Mar 4", price: "$142", amount: "15 SOL", pnl: "-$21", pnlPercent: -1.0 },
      { asset: "BTC/USDT", action: "sell", date: "Mar 4", price: "$66,800", amount: "0.03 BTC", pnl: "-$15", pnlPercent: -0.7 },
    ],
    actions: [
      { label: t('cexResults.patterns.overtrading.action1'), description: t('cexResults.patterns.overtrading.action1Desc') },
      { label: t('cexResults.patterns.overtrading.action2'), description: t('cexResults.patterns.overtrading.action2Desc') },
      { label: t('cexResults.patterns.overtrading.action3'), description: t('cexResults.patterns.overtrading.action3Desc') },
    ],
  },
  {
    id: "fomo-buying",
    label: t('cexResults.patterns.fomo.label'),
    severity: "high",
    confidence: 82,
    summary: t('cexResults.patterns.fomo.summary'),
    dollarImpact: -4600,
    tradeCount: 5,
    recommendation: t('cexResults.patterns.fomo.recommendation'),
    evidence: [
      { asset: "BTC/USDT", action: "buy", date: "Feb 12", price: "$69,800", amount: "0.15 BTC", pnl: "-$1,520", pnlPercent: -14.5 },
      { asset: "ETH/USDT", action: "buy", date: "Jan 28", price: "$3,950", amount: "3.2 ETH", pnl: "-$2,400", pnlPercent: -19.0 },
      { asset: "BTC/USDT", action: "buy", date: "Jan 15", price: "$68,200", amount: "0.08 BTC", pnl: "-$480", pnlPercent: -8.8 },
      { asset: "ETH/USDT", action: "buy", date: "Dec 20", price: "$3,820", amount: "1.5 ETH", pnl: "-$200", pnlPercent: -3.5 },
    ],
    actions: [
      { label: t('cexResults.patterns.fomo.action1'), description: t('cexResults.patterns.fomo.action1Desc') },
      { label: t('cexResults.patterns.fomo.action2'), description: t('cexResults.patterns.fomo.action2Desc') },
      { label: t('cexResults.patterns.fomo.action3'), description: t('cexResults.patterns.fomo.action3Desc') },
    ],
  },
  {
    id: "revenge-trading",
    label: t('cexResults.patterns.revenge.label'),
    severity: "medium",
    confidence: 74,
    summary: t('cexResults.patterns.revenge.summary'),
    dollarImpact: -1820,
    tradeCount: 6,
    recommendation: t('cexResults.patterns.revenge.recommendation'),
    evidence: [
      { asset: "SOL/USDT", action: "buy", date: "Feb 8", price: "$158", amount: "20 SOL", pnl: "-$640", pnlPercent: -20.3 },
      { asset: "DOGE/USDT", action: "buy", date: "Jan 30", price: "$0.38", amount: "5000 DOGE", pnl: "-$380", pnlPercent: -20.0 },
      { asset: "ETH/USDT", action: "buy", date: "Jan 18", price: "$3,600", amount: "1.0 ETH", pnl: "-$360", pnlPercent: -10.0 },
    ],
    actions: [
      { label: t('cexResults.patterns.revenge.action1'), description: t('cexResults.patterns.revenge.action1Desc') },
      { label: t('cexResults.patterns.revenge.action2'), description: t('cexResults.patterns.revenge.action2Desc') },
      { label: t('cexResults.patterns.revenge.action3'), description: t('cexResults.patterns.revenge.action3Desc') },
    ],
  },
  {
    id: "no-stop-loss",
    label: t('cexResults.patterns.noStopLoss.label'),
    severity: "medium",
    confidence: 68,
    summary: t('cexResults.patterns.noStopLoss.summary'),
    dollarImpact: -3200,
    tradeCount: 0,
    recommendation: t('cexResults.patterns.noStopLoss.recommendation'),
    evidence: [
      { asset: "SOL/USDT", action: "sell", date: "Mar 1", price: "$118", amount: "20 SOL", pnl: "-$3,200", pnlPercent: -35.0 },
      { asset: "ETH/USDT", action: "sell", date: "Feb 15", price: "$3,100", amount: "2.5 ETH", pnl: "-$1,750", pnlPercent: -18.4 },
    ],
    actions: [
      { label: t('cexResults.patterns.noStopLoss.action1'), description: t('cexResults.patterns.noStopLoss.action1Desc') },
      { label: t('cexResults.patterns.noStopLoss.action2'), description: t('cexResults.patterns.noStopLoss.action2Desc') },
      { label: t('cexResults.patterns.noStopLoss.action3'), description: t('cexResults.patterns.noStopLoss.action3Desc') },
    ],
  },
];

export const getMockWorstTrades = (t: (key: string) => string): WorstTrade[] => [
  {
    id: "wt-1",
    asset: "SOL",
    buyDate: "Dec 15, 2024",
    buyPrice: "$182.00",
    amount: "20 SOL",
    sellDate: "Mar 1, 2025",
    sellPrice: "$118.00",
    status: "sold",
    lossAmount: -3200,
    lossPercent: -35.0,
    linkedPatternId: "no-stop-loss",
    linkedPatternLabel: t('cexResults.patterns.noStopLoss.label'),
    comment: t('cexResults.worstTrades.wt1Comment'),
  },
  {
    id: "wt-2",
    asset: "ETH",
    buyDate: "Jan 28, 2025",
    buyPrice: "$3,950",
    amount: "3.2 ETH",
    sellDate: "Feb 20, 2025",
    sellPrice: "$3,200",
    status: "sold",
    lossAmount: -2400,
    lossPercent: -19.0,
    linkedPatternId: "fomo-buying",
    linkedPatternLabel: t('cexResults.patterns.fomo.label'),
    comment: t('cexResults.worstTrades.wt2Comment'),
  },
  {
    id: "wt-3",
    asset: "BTC",
    buyDate: "Feb 12, 2025",
    buyPrice: "$69,800",
    amount: "0.15 BTC",
    status: "holding",
    lossAmount: -1520,
    lossPercent: -14.5,
    linkedPatternId: "fomo-buying",
    linkedPatternLabel: t('cexResults.patterns.fomo.label'),
    comment: t('cexResults.worstTrades.wt3Comment'),
  },
];

function generateChart(days: number, userEnd: number, btcEnd: number): BenchmarkPoint[] {
  const points: BenchmarkPoint[] = [];
  for (let d = 0; d <= days; d++) {
    const progress = d / days;
    const noise1 = Math.sin(d * 0.7) * 3 + Math.sin(d * 1.3) * 2;
    const noise2 = Math.sin(d * 0.5) * 2 + Math.sin(d * 0.9) * 1.5;
    points.push({
      day: d,
      user: +(progress * userEnd + noise1).toFixed(1),
      btc: +(progress * btcEnd + noise2).toFixed(1),
    });
  }
  return points;
}

export const getMockBenchmark = (t: (key: string) => string): BenchmarkData => ({
  userReturn: -12.8,
  btcReturn: 8.3,
  gap: -21.1,
  attribution: t('cexResults.benchmark.attribution'),
  chart: {
    "30D": generateChart(30, -12.8, 8.3),
    "60D": generateChart(60, -18.4, 15.2),
    "90D": generateChart(90, -8.6, 24.1),
  },
});

export const getMockInsights = (t: (key: string) => string): PortfolioInsight[] => [
  {
    id: "eth-concentration",
    severity: "critical",
    impact: t('cexResults.insights.ethConcentration.impact'),
    title: t('cexResults.insights.ethConcentration.title'),
    body: t('cexResults.insights.ethConcentration.body'),
    ctaLabel: t('cexResults.insights.ethConcentration.cta'),
    actions: [
      { label: t('cexResults.insights.ethConcentration.action1'), description: t('cexResults.insights.ethConcentration.action1Desc') },
      { label: t('cexResults.insights.ethConcentration.action2'), description: t('cexResults.insights.ethConcentration.action2Desc') },
      { label: t('cexResults.insights.ethConcentration.action3'), description: t('cexResults.insights.ethConcentration.action3Desc') },
    ],
    detailAnalysis: t('cexResults.insights.ethConcentration.detail'),
  },
  {
    id: "fee-bleeding",
    severity: "warning",
    impact: t('cexResults.insights.feeBleeding.impact'),
    title: t('cexResults.insights.feeBleeding.title'),
    body: t('cexResults.insights.feeBleeding.body'),
    ctaLabel: t('cexResults.insights.feeBleeding.cta'),
    actions: [
      { label: t('cexResults.insights.feeBleeding.action1'), description: t('cexResults.insights.feeBleeding.action1Desc') },
      { label: t('cexResults.insights.feeBleeding.action2'), description: t('cexResults.insights.feeBleeding.action2Desc') },
      { label: t('cexResults.insights.feeBleeding.action3'), description: t('cexResults.insights.feeBleeding.action3Desc') },
    ],
    detailAnalysis: t('cexResults.insights.feeBleeding.detail'),
  },
  {
    id: "doge-profit",
    severity: "tip",
    impact: t('cexResults.insights.dogeProfit.impact'),
    title: t('cexResults.insights.dogeProfit.title'),
    body: t('cexResults.insights.dogeProfit.body'),
    ctaLabel: t('cexResults.insights.dogeProfit.cta'),
    actions: [
      { label: t('cexResults.insights.dogeProfit.action1'), description: t('cexResults.insights.dogeProfit.action1Desc') },
      { label: t('cexResults.insights.dogeProfit.action2'), description: t('cexResults.insights.dogeProfit.action2Desc') },
    ],
    detailAnalysis: t('cexResults.insights.dogeProfit.detail'),
  },
];

export const STATS = {
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

export const PNL_DATA = [
  { asset: 'BTC', bought: '$42,800', sold: '$38,200', avgBuy: '$68,200', avgSell: '$64,500', pnl: '-$4,600', negative: true },
  { asset: 'ETH', bought: '$28,500', sold: '$22,100', avgBuy: '$3,800', avgSell: '$3,200', pnl: '-$6,400', negative: true },
  { asset: 'SOL', bought: '$12,300', sold: '$8,900', avgBuy: '$165', avgSell: '$132', pnl: '-$3,400', negative: true },
  { asset: 'DOGE', bought: '$5,200', sold: '$6,800', avgBuy: '$0.32', avgSell: '$0.41', pnl: '+$1,600', negative: false },
];

export const AI_SUMMARY: Record<string, string> = {
  zh: '你是一个典型的「高频情绪化交易者」。你的主要问题不是选错了币，而是交易行为本身在吞噬利润。如果保持同样的持仓选择，但将交易频率降低 70%、每笔交易设 -10% 止损、只在价格低于 30 日均线时买入，你过去 9 个月的表现预计可以提升 35-50%。核心建议：减少交易次数，建立纪律性规则，让规则代替情绪做决定。',
  en: 'You\'re a classic "high-frequency emotional trader." Your main problem isn\'t picking the wrong coins — it\'s your trading behavior eating your profits. Same coin picks, but trade 70% less, set -10% stop-losses, and only buy below the 30-day MA — your past 9 months would likely improve 35-50%. Core advice: trade less, build disciplined rules, let rules decide instead of emotions.',
  ko: '당신은 전형적인 "고빈도 감정적 트레이더"입니다. 주요 문제는 잘못된 코인 선택이 아니라 매매 행동 자체가 수익을 잡아먹고 있다는 것입니다. 동일한 코인 선택으로도 거래 빈도 70% 감소, -10% 손절 설정, 30일 이동평균선 아래에서만 매수하면 지난 9개월 수익이 35-50% 개선될 것으로 예상됩니다.',
};
