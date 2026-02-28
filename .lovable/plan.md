

# MiaoFi Landing Page -- Complete Redesign

## Design Concept: "AI Doctor for Your Crypto"

The metaphor of a medical checkup runs through everything -- "Diagnose", "体检", risk scores. The design leans into this: clinical precision meets crypto edge. Clean, structured, trustworthy -- like a premium health dashboard, not another neon crypto template.

## Page Architecture (6 sections, top to bottom)

### Section 1: Hero (100vh)

**Background**: Keep the animated vortex + dot grid system (it works well), but refine the center glow to feel more like a focused beam on the input.

**Content stack (centered, max-w-2xl):**
- Logo: M icon + "MiaoFi" (keep current)
- Headline: **"Your AI Investment Copilot for Crypto"** -- gradient text white-to-white/60, staggered word entrance
- Sub-headline: "Paste an address. Get your diagnosis in 30 seconds." -- muted, single line
- **Chain logo row** (NEW): Small monochrome icons/text pills for Ethereum, Solana, Arbitrum, Base, Polygon -- displayed as a horizontal row of glass pills, subtle, builds trust
- Wallet input area (keep all existing logic: multi-wallet, EVM/Solana detection, demo links, sonar/scan effects)
- CTA: "Diagnose My Portfolio" (updated text per brief)
- Trust line: "Free. No sign-up. No wallet connection. Read-only."

**What changes**: Add chain logo row, update CTA text, remove orbiting stats ring (replaced by chain row + value prop section below).

### Section 2: Value Proposition -- "Not Another Portfolio Tracker" (NEW)

Three-column comparison cards showing what existing tools tell you vs what MiaoFi tells you:

```text
+---------------------------+----------------------------------+
| Other tools say           | MiaoFi says                      |
+---------------------------+----------------------------------+
| "You hold 60% ETH"       | "Your ETH concentration exceeds  |
|                           |  your risk tolerance"            |
+---------------------------+----------------------------------+
| "You bought ARB yesterday"| "4 FOMO buys in 30 days,        |
|                           |  avg loss 23%"                   |
+---------------------------+----------------------------------+
| "Portfolio: $50K"         | "You'd have $8K more if you      |
|                           |  followed the advice 3 months ago"|
+---------------------------+----------------------------------+
```

Each row is a glass card with left side (muted, "others") and right side (highlighted, "MiaoFi"). The MiaoFi side has a subtle accent border.

Section tagline: **"Not another portfolio tracker. Your AI investment coach."**

### Section 3: How It Works -- 3 Steps (NEW)

Horizontal row of 3 steps with connecting lines:

1. **Paste** -- "Paste your wallet address. EVM + Solana, multiple wallets." (icon: Clipboard)
2. **Diagnose** -- "AI analyzes holdings, trades, and behavior patterns in 30 seconds." (icon: Scan/Brain)
3. **Act** -- "Get specific action cards: do A, B, or C." (icon: Zap)

Each step is a numbered circle + icon + short text. Glass card style. Connected by a subtle dashed line.

### Section 4: Diagnosis Card Mockup (NEW -- replaces current ProductPreview)

A single, high-fidelity AI diagnosis card -- the core product UI element:

- Header: Warning icon + "ETH Concentration Too High -- 67% of Portfolio"
- Severity badge: "High" in amber/red pill
- Analysis text: 2-3 sentences explaining the risk
- 3 action buttons styled as glass pills:
  - "Swap 30% ETH to USDC"
  - "Diversify into 3 stablecoins"  
  - "Set stop-loss at $3,200"
- Bottom: "Got it, skip for now" muted link

This card floats in a browser-frame mockup (keep existing browser chrome styling). No blur effect -- show it clearly so users understand exactly what they'll get.

### Section 5: Social Proof / Trust (NEW)

- "Powered by Claude, GPT-4o, Gemini" -- AI model logos/names in a row
- Security statement: Shield icon + "Read-only analysis. Never connects to your wallet. Never requests transaction signing."
- Stats row: "47,291 portfolios analyzed. $2.1B in assets scanned." (glass pills with green-tinted numbers)

### Section 6: Bottom CTA (NEW -- repeat of hero input)

- Headline: "How healthy is your portfolio? Free 30-second checkup."
- Full wallet input component (reuse WalletInput)
- This catches users who scrolled through the whole page

### Footer

- MiaoFi logo
- Links: Privacy Policy, Twitter/X, Telegram
- "Built with heart by a solo founder + AI agents"

## Files to Create/Modify

1. **`src/pages/Index.tsx`** -- Restructure to include all 6 sections + footer
2. **`src/components/landing/WalletInput.tsx`** -- Update CTA text to "Diagnose My Portfolio", keep all existing logic
3. **`src/components/landing/AnimatedBackground.tsx`** -- Minor refinements only
4. **`src/components/landing/ValueProposition.tsx`** -- NEW: comparison cards
5. **`src/components/landing/HowItWorks.tsx`** -- NEW: 3-step flow
6. **`src/components/landing/DiagnosisCardMockup.tsx`** -- NEW: replaces ProductPreview, shows a realistic diagnosis card
7. **`src/components/landing/TrustSection.tsx`** -- NEW: social proof + security
8. **`src/components/landing/PersonaCards.tsx`** -- Remove (replaced by DiagnosisCardMockup)
9. **`src/components/landing/ProductPreview.tsx`** -- Remove (replaced by DiagnosisCardMockup)
10. **`src/components/landing/SampleCards.tsx`** -- Remove (no longer needed)
11. **`src/index.css`** -- Add styles for new components, keep existing animation system

## Technical Notes

- All new sections use IntersectionObserver for scroll-triggered fade-in (same pattern as existing components)
- No new dependencies -- pure CSS animations + React
- Chain logo row uses text-based pills (no image assets needed)
- Diagnosis card mockup is a styled div, not an image
- Bottom CTA reuses the same WalletInput component
- Mobile: all multi-column layouts stack to single column below `sm:` breakpoint

