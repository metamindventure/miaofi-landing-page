import { BehaviorPattern, WorstTrade, BenchmarkData, BenchmarkPoint, PortfolioInsight } from "./types";

export const mockPatterns: BehaviorPattern[] = [
  {
    id: "overtrading",
    label: "Overtrading",
    severity: "high",
    confidence: 87,
    summary: "847 trades in 9 months, avg 3.1/day. Frequent trading didn't improve returns — it cost you $2,340 in fees. Every trade is paying the exchange.",
    dollarImpact: -2340,
    tradeCount: 847,
    recommendation: "Consolidate to 5-8 trades per month. Each unnecessary trade erodes returns through fees and poor timing. Set a weekly trade limit and stick to it.",
    evidence: [
      { asset: "BTC/USDT", action: "buy", date: "Mar 5", price: "$67,200", amount: "0.05 BTC", pnl: "-$12", pnlPercent: -0.4 },
      { asset: "ETH/USDT", action: "sell", date: "Mar 5", price: "$3,180", amount: "2.1 ETH", pnl: "-$8", pnlPercent: -0.1 },
      { asset: "SOL/USDT", action: "buy", date: "Mar 4", price: "$142", amount: "15 SOL", pnl: "-$21", pnlPercent: -1.0 },
      { asset: "BTC/USDT", action: "sell", date: "Mar 4", price: "$66,800", amount: "0.03 BTC", pnl: "-$15", pnlPercent: -0.7 },
    ],
    actions: [
      { label: "Set Weekly Trade Limit", description: "Cap at 2 trades per week to reduce noise" },
      { label: "Review Fee Impact", description: "See how much fees ate into your returns" },
      { label: "Enable Trade Cooldown", description: "Add a 6h buffer between consecutive trades" },
    ],
  },
  {
    id: "fomo-buying",
    label: "FOMO Chasing",
    severity: "high",
    confidence: 82,
    summary: "4 out of 5 BTC and ETH buys came after 15%+ price rebounds. Your avg entry is 22% above the 30-day average.",
    dollarImpact: -4600,
    tradeCount: 5,
    recommendation: "Set limit orders at your target price before hype cycles. Wait 4+ hours after a surge before evaluating entry. Historical data shows 78% of FOMO entries end in losses within 2 weeks.",
    evidence: [
      { asset: "BTC/USDT", action: "buy", date: "Feb 12", price: "$69,800", amount: "0.15 BTC", pnl: "-$1,520", pnlPercent: -14.5 },
      { asset: "ETH/USDT", action: "buy", date: "Jan 28", price: "$3,950", amount: "3.2 ETH", pnl: "-$2,400", pnlPercent: -19.0 },
      { asset: "BTC/USDT", action: "buy", date: "Jan 15", price: "$68,200", amount: "0.08 BTC", pnl: "-$480", pnlPercent: -8.8 },
      { asset: "ETH/USDT", action: "buy", date: "Dec 20", price: "$3,820", amount: "1.5 ETH", pnl: "-$200", pnlPercent: -3.5 },
    ],
    actions: [
      { label: "Enable Cool-Down Timer", description: "Block buy orders for 4h after 15%+ surges" },
      { label: "Set Price Alerts Instead", description: "Get notified at your target price, not at the top" },
      { label: "Review Surge History", description: "See how past surges played out before buying" },
    ],
  },
  {
    id: "revenge-trading",
    label: "Revenge Trading",
    severity: "medium",
    confidence: 74,
    summary: "6 times you opened new trades within 2 hours of a big loss. 5 of those also lost money. Trying to win it back only dug the hole deeper.",
    dollarImpact: -1820,
    tradeCount: 6,
    recommendation: "After a loss exceeding 5%, enforce a mandatory 24-hour cooling period before your next trade. Your win rate drops to 17% on revenge trades vs 42% normal.",
    evidence: [
      { asset: "SOL/USDT", action: "buy", date: "Feb 8", price: "$158", amount: "20 SOL", pnl: "-$640", pnlPercent: -20.3 },
      { asset: "DOGE/USDT", action: "buy", date: "Jan 30", price: "$0.38", amount: "5000 DOGE", pnl: "-$380", pnlPercent: -20.0 },
      { asset: "ETH/USDT", action: "buy", date: "Jan 18", price: "$3,600", amount: "1.0 ETH", pnl: "-$360", pnlPercent: -10.0 },
    ],
    actions: [
      { label: "Enable 24h Cooldown After Loss", description: "Block trading for 24h after any loss > 5%" },
      { label: "Set Loss Limit per Day", description: "Stop trading if daily loss exceeds $500" },
      { label: "Review Revenge Trade History", description: "See the pattern of losses after losses" },
    ],
  },
  {
    id: "no-stop-loss",
    label: "No Stop-Loss Habit",
    severity: "medium",
    confidence: 68,
    summary: "Zero stop-losses set in 9 months. Max single loss: -$3,200 (SOL). A -10% stop-loss would have capped it at $800.",
    dollarImpact: -3200,
    tradeCount: 0,
    recommendation: "Set a -10% stop-loss on every position. This single habit would have saved you $2,400 on your worst trade alone.",
    evidence: [
      { asset: "SOL/USDT", action: "sell", date: "Mar 1", price: "$118", amount: "20 SOL", pnl: "-$3,200", pnlPercent: -35.0 },
      { asset: "ETH/USDT", action: "sell", date: "Feb 15", price: "$3,100", amount: "2.5 ETH", pnl: "-$1,750", pnlPercent: -18.4 },
    ],
    actions: [
      { label: "Auto Stop-Loss at -10%", description: "Sell automatically at a planned level" },
      { label: "Set Trailing Stop-Loss", description: "Lock in profits while limiting downside" },
      { label: "Backtest Stop-Loss Impact", description: "See how stop-losses would have changed your P&L" },
    ],
  },
];

export const mockWorstTrades: WorstTrade[] = [
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
    linkedPatternLabel: "No Stop-Loss",
    comment: "Held through 35% drawdown with no stop-loss. A -10% stop would have saved $2,400.",
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
    linkedPatternLabel: "FOMO Chasing",
    comment: "Bought after 18% pump. Classic FOMO entry near the local top.",
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
    linkedPatternLabel: "FOMO Chasing",
    comment: "Entered after news hype. Still holding at a loss — unrealized.",
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

export const mockBenchmark: BenchmarkData = {
  userReturn: -12.8,
  btcReturn: 8.3,
  gap: -21.1,
  attribution: "FOMO entries, revenge trades, and missing stop-losses account for 82% of underperformance vs BTC hold strategy.",
  chart: {
    "30D": generateChart(30, -12.8, 8.3),
    "60D": generateChart(60, -18.4, 15.2),
    "90D": generateChart(90, -8.6, 24.1),
  },
};

export const mockInsights: PortfolioInsight[] = [
  {
    id: "eth-concentration",
    severity: "critical",
    impact: "Impact: ~$6,400 at risk",
    title: "60% Portfolio Concentrated in ETH",
    body: "Your ETH position ($28,500) represents 60% of your total trading volume. Combined with BTC ($42,800), you have 90% exposure to just 2 assets. If ETH drops 30%, you lose ~$6,400.",
    ctaLabel: "Diversify ETH",
    actions: [
      { label: "Swap 30% ETH → USDC", description: "Lock in profits and reduce volatility" },
      { label: "Swap 20% ETH → SOL", description: "Diversify into high-growth L1" },
      { label: "Set allocation alerts", description: "Get warned when any asset exceeds 40%" },
    ],
    detailAnalysis: "ETH represents a dangerous concentration risk. With 60% of trading volume in a single asset, a market correction could wipe out a significant portion of your portfolio. Historical data shows concentrated portfolios underperform diversified ones by 4-7% annually on a risk-adjusted basis.",
  },
  {
    id: "fee-bleeding",
    severity: "warning",
    impact: "Impact: -$2,340 in fees",
    title: "Trading Fees Are Eating Your Profits",
    body: "You've paid $2,340 in trading fees over 9 months — that's $260/month. At your current trading frequency (3.1 trades/day), you need each trade to profit >0.3% just to break even on fees.",
    ctaLabel: "Reduce Fees",
    actions: [
      { label: "Switch to Limit Orders", description: "Maker fees are 50-80% cheaper than taker fees" },
      { label: "Reduce Trading Frequency", description: "Fewer trades = fewer fees = better returns" },
      { label: "Upgrade to VIP Tier", description: "Your volume qualifies for lower fee tiers" },
    ],
    detailAnalysis: "At 847 trades over 9 months, your average fee per trade is $2.76. If you reduced to 200 trades (still plenty for active trading), you'd save ~$1,787 in fees alone. Combined with better entry timing from less impulsive trading, the total improvement could be $3,000-5,000.",
  },
  {
    id: "doge-profit",
    severity: "tip",
    impact: "Impact: +$1,600 profit",
    title: "DOGE Is Your Only Winner — Consider Why",
    body: "DOGE is the only asset where you made money (+$1,600). Interestingly, you traded DOGE less frequently and held longer. This pattern suggests your best returns come from patience, not activity.",
    ctaLabel: "Apply This Pattern",
    actions: [
      { label: "Set Hold Minimum to 7 Days", description: "Force yourself to hold winners longer" },
      { label: "Reduce BTC/ETH Frequency", description: "Trade your main assets like you trade DOGE" },
    ],
    detailAnalysis: "Your DOGE trades had an average hold time of 12.3 days vs 2.1 days for BTC/ETH. The longer hold time allowed you to capture larger moves instead of getting shaken out by daily volatility. This is a clear signal that reducing frequency improves your returns.",
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

export const AI_SUMMARY = {
  zh: '你是一个典型的「高频情绪化交易者」。你的主要问题不是选错了币，而是交易行为本身在吞噬利润。如果保持同样的持仓选择，但将交易频率降低 70%、每笔交易设 -10% 止损、只在价格低于 30 日均线时买入，你过去 9 个月的表现预计可以提升 35-50%。核心建议：减少交易次数，建立纪律性规则，让规则代替情绪做决定。',
  en: 'You\'re a classic "high-frequency emotional trader." Your main problem isn\'t picking the wrong coins — it\'s your trading behavior eating your profits. Same coin picks, but trade 70% less, set -10% stop-losses, and only buy below the 30-day MA — your past 9 months would likely improve 35-50%. Core advice: trade less, build disciplined rules, let rules decide instead of emotions.',
  ko: '당신은 전형적인 "고빈도 감정적 트레이더"입니다. 주요 문제는 잘못된 코인 선택이 아니라 매매 행동 자체가 수익을 잡아먹고 있다는 것입니다. 동일한 코인 선택으로도 거래 빈도 70% 감소, -10% 손절 설정, 30일 이동평균선 아래에서만 매수하면 지난 9개월 수익이 35-50% 개선될 것으로 예상됩니다.',
};
