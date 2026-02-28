

# Landing Page Redesign: Atmospheric Depth

## Overview
Transform the flat dark landing page into a layered, atmospheric experience with depth, subtle glow effects, and micro-interactions -- all CSS-driven for performance.

## Changes by File

### 1. `src/components/landing/AnimatedBackground.tsx` -- Complete Rewrite
Replace the simple two-blob background with a 4-layer atmospheric system:
- **Layer 1 (base):** Full-screen gradient from `#0a0a0f` (top) to `#0d0b1a` (bottom)
- **Layer 2 (ambient orbs):** Three gradient orbs with slow drift animations:
  - Purple orb (top-right, 600px, opacity 0.08-0.12)
  - Blue-purple orb (center-left, 800px, opacity 0.06-0.10)
  - Teal orb (bottom-center, 500px, opacity 0.05-0.08)
- **Layer 3 (dot grid):** Repeating `radial-gradient` dot pattern (1px dots, 40px spacing, opacity 0.04) with a radial mask that fades at viewport edges
- **Layer 4 (hero glow):** A centered radial gradient glow (purple, ~500px, opacity 0.12) that draws the eye to the input area
- Add scroll-based parallax via a lightweight `useEffect` that sets a CSS custom property `--scroll-y` on the container; orbs use `translateY(calc(var(--scroll-y) * 0.05))`. Disabled on mobile via `prefers-reduced-motion` and screen width check.
- On mobile: hide dot grid, reduce orb count to 2 and shrink sizes

### 2. `src/index.css` -- Update Styles
- Remove old `.blob-purple` / `.blob-teal` and their keyframes
- Add new keyframes for 3 orb drift animations (15-20s cycles, 20-40px movement, ease-in-out)
- Add `.orb-1`, `.orb-2`, `.orb-3` classes with `will-change: transform`, appropriate sizes, colors, blur, and opacity
- Add `.dot-grid` class using repeating radial-gradient + radial mask
- Add `.hero-glow` class for the centered radial gradient
- Update `.glass-card` to include `backdrop-blur-sm` and add `box-shadow: 0 0 40px rgba(139, 92, 246, 0.05)`
- Add `.glass-card:hover` with `translateY(-4px)`, brighter shadow, `border-color: rgba(255,255,255,0.2)`, `transition: all 300ms ease`
- Add text glow utilities: `.text-glow-brand`, `.text-glow-green`, `.text-glow-white`
- Add CTA button light streak animation (a pseudo-element with a diagonal white gradient that sweeps left-to-right on hover, 1s)
- Add trust icon pulse animation (scale 1 -> 1.05 -> 1, runs once on load)
- Mobile media query: hide dot grid, reduce orb sizes

### 3. `src/components/landing/WalletInput.tsx` -- Minor Updates
- Add a state/class that intensifies the hero glow on input focus (dispatch a custom CSS class or use a callback prop)
- Actually: simpler approach -- add a local glow div inside the WalletInput card that increases opacity on focus via state. This keeps it self-contained.
- Add the light streak hover effect class to the CTA button

### 4. `src/components/landing/SampleCards.tsx` -- Minor Updates
- Update card hover: change `hover:-translate-y-0.5` to `hover:-translate-y-1` and add `transition-all duration-300 ease-out`
- The enhanced `.glass-card` styles from CSS will automatically apply the purple glow shadow

### 5. `src/pages/Index.tsx` -- Copy and Glow Classes
- Change "Your AI Investment Copilot for DeFi" to "Your AI Investment Copilot for Crypto"
- Replace social proof line with "Powered by Zerion . CoinGecko . Claude AI"
- Add `text-glow-brand` class to "MiaoFi" logo text
- Add `text-glow-green` to the powered-by brand names
- Add `text-glow-white` to section headings
- Add a one-time pulse animation class to trust indicator icons

## Technical Notes
- All animations use CSS `@keyframes` + `will-change: transform` for GPU acceleration
- Parallax uses a single scroll listener setting a CSS variable, no per-frame JS transforms
- Mobile: `@media (max-width: 640px)` hides grid, simplifies orbs, disables parallax
- No new dependencies required
