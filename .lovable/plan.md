## Plan: Clean up TBA stats and redesign the 卖飞 module

### Scope
Edit only the **current project** (landing page preview). Once approved and verified visually, sync the same changes into **MiaoFi Dashboard** in a follow-up.

### Changes

**1. `src/components/cex/TradingBehaviorSection.tsx` — Stats row**
- Remove the `vs 50%` benchmark next to win rate (we don't have a real benchmark source).
- Keep `847 / 9mo` next to trade count (this is just unit context, not a benchmark).
- Keep avg hold as-is.

**2. `src/components/cex/TradingBehaviorSection.tsx` — 卖飞 highlight**
Replace the confused 3-label pill with a narrative + 2 supporting numbers:

```
┌─────────────────────────────────────────────┐
│  ↗  你卖飞了 6 次                             │
│     平均涨幅 +19.7% · 错过 $13,852           │
└─────────────────────────────────────────────┘
```

- One human sentence as the headline ("你卖飞了 6 次" / "You sold too early on 6 positions" / "6번 너무 일찍 매도").
- Two clearly-labeled numbers underneath joined by `·`.
- Drop the `卖飞成本` / `离场后行情` (Post-exit move) sub-labels that were fighting for attention.
- Keep the red loss styling and the LogOut icon.

**3. i18n keys (`zh.json`, `en.json`, `ko.json`)**
Add three new keys under `cexResults.postExit`:
- `headline` — `"你卖飞了 {n} 次"` / `"Sold too early on {n} positions"` / `"{n}번 너무 일찍 매도"`
- `avgGain` — `"平均涨幅"` / `"Avg gain"` / `"평균 상승"`
- `missed` — `"错过"` / `"Missed"` / `"놓침"`

Existing `title` / `subtitle` / `opportunityCost` keys stay (used inside the expanded `PostExitMoveSection` component).

**4. Cross-project follow-up (after visual approval)**
The authoritative `TradingBehavior.tsx` lives in **MiaoFi Dashboard** at `src/components/dashboard/`. Once you confirm the redesign here, I will port the same simplified stats row, the 卖飞 narrative pill, and the i18n keys into that project so the logged-in dashboard matches.

### Out of scope
- Expanded `PostExitMoveSection` detail panel — already clear, no changes.
- Pattern cards, Worst Trades, Benchmark chart — untouched.
