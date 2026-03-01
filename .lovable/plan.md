

# New Section: Trading Behavior Analysis

A new component `src/components/landing/BehaviorAnalysis.tsx` will be created and inserted between `HowItWorks` and `ProductPreview` in `Index.tsx`.

## Design Concept: "Trading X-Ray Cards"

Each of the 3 cases is presented as a full-width glass card with two halves:

- **Left: The Diagnosis** -- a mini data visualization that makes the behavioral pattern viscerally obvious
- **Right: The AI Prescription** -- specific, actionable counter-strategy

This mirrors the existing Comparison section's layout language but goes deeper with embedded mini-charts built from styled divs.

## Visual Elements Per Case

### Case 1: FOMO Chasing
- **Mini chart**: A simplified price line (CSS-drawn) with 7 red dots marked "BUY" at peaks, showing the user consistently buying at tops
- **Stat callout**: "7/9 buys after 15%+ pump. Avg loss: -22%" in red monospace
- **AI fix**: The limit order alternative with the RCH example

### Case 2: Overtrading
- **Visual**: A "You vs Profitable Traders" horizontal bar comparison -- user's bar (47 trades, red-tinted, wide) vs profitable users (12 trades, green-tinted, narrow)
- **Stat callout**: "$340 burned on fees + slippage" in red monospace
- **AI fix**: The "wait 24 hours" rule with savings projection

### Case 3: No Take-Profit
- **Visual**: Two overlapping curves -- "Actual" line going from +35% down to -12%, and a "If you took profit" dashed line that plateaus at +25% then gently descends but stays positive
- **Stat callout**: "4 tokens rode profit to loss in 3 months" in amber monospace
- **AI fix**: The 25% auto-half rule with $1,020 net calculation

## Bottom CTA
A centered line: "你的操作习惯正在吃掉你的利润。30 秒查出来 →" styled as a clickable link that scrolls to the top input.

## Technical Details

### Files to create:
- `src/components/landing/BehaviorAnalysis.tsx` -- New component with:
  - `IntersectionObserver` scroll-trigger (same pattern as all other sections)
  - Staggered card entrance animations
  - Mini visualizations built with pure CSS/divs (no chart library needed)
  - `scrollToTop` handler for the bottom CTA

### Files to modify:
- `src/pages/Index.tsx` -- Import `BehaviorAnalysis` and place it between `<HowItWorks />` and `<ProductPreview />`

### CSS additions to `src/index.css`:
- `@keyframes price-draw` -- a left-to-right line drawing animation for the mini price chart
- `.behavior-card` -- subtle variant of `.glass-card` with a left accent border that glows on hover

### Patterns followed:
- Same `useRef` + `IntersectionObserver` + `visible` state pattern used in every other section
- Same gradient text headers (`bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60`)
- Same `glass-card` base styling with hover effects
- Same staggered `transitionDelay` for card entrances
- Red (#ef4444) for losses, green (#4ade80) for gains, amber for warnings -- consistent with existing palette

