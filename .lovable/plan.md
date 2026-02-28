

# MiaoFi Landing Page -- Complete Visual Redesign

## Design Philosophy: "Living Portal"

The core problem with the current page: it looks like every other dark-mode crypto landing page. The redesign breaks from convention by treating the input field as a **portal** -- a living, breathing focal point that reacts to user presence, creating a sense of discovery rather than a sales pitch.

### Three Differentiators

1. **Real-time "Scanning" Animation** -- When the user pastes an address, a dramatic scan visualization plays across the input area (horizontal light beam sweep + particle burst), making the act of pasting feel like activating something powerful. No other crypto tool does this.

2. **Floating Live Stats Ticker** -- Instead of static badges, a slowly orbiting ring of real-time-looking data points (wallets analyzed, chains supported, AI models) floats around the input area like a heads-up display. Creates depth and movement without clutter.

3. **"X-Ray Preview" on Hover** -- The persona cards below the fold show a blurred/redacted dashboard that sharpens on hover, implying "paste your wallet to unlock YOUR version." This creates curiosity-driven engagement.

---

## Page Structure

### Section 1: Hero (100vh)

**Background overhaul:**
- Replace simple orbs with a **radial vortex gradient** -- concentric rings of violet/indigo radiating outward from center, very low opacity (4-6%), with a slow rotation animation (60s cycle). This creates a gravitational pull toward center.
- Keep dot grid but make it responsive to scroll (subtle parallax via CSS transform).
- Add a single, sharp **light cone** from above the input -- a narrow gradient beam (white at 3% opacity) pointing down at the input field, like a spotlight.

**Content stack (centered):**

1. **Logo** -- Unchanged (small M icon + MiaoFi text), but add a subtle pulse glow to the M icon (breathing animation, 4s cycle).

2. **Headline** -- Change to: **"See Through Your Portfolio"** -- Shorter, more provocative, implies X-ray vision. Uses a staggered letter-by-letter fade-in on page load (CSS animation with delays per word). Gradient text: white to white/60.

3. **Orbiting Stats Ring** -- Replace static badges with 4-5 data points arranged in a loose circle around the input area:
   - "47,291 portfolios scanned" 
   - "EVM + Solana"
   - "6 AI models"
   - "$2.1B analyzed"
   - "Free to start"
   
   Each is a small glass pill that slowly rotits around the input (CSS animation, 40s cycle, each offset). On mobile, these collapse into a horizontal scrolling ticker.

4. **The Input** -- Same glass input but with new interaction:
   - Idle state: a faint horizontal scan line sweeps across the input every 8 seconds (like a radar sweep)
   - On paste/type: the scan line accelerates and the input border transitions to a bright violet glow with expanding ring animation (like a sonar ping)
   - Chain detection badge slides in from the right with a spring animation

5. **CTA Button** -- "Run Diagnosis" instead of "Analyze Portfolio" (more medical/urgent, implies a problem to solve). Keep shimmer effect.

6. **Sub-text** -- "30 seconds. Read-only. No wallet connection." -- all in one line, ultra-muted.

### Section 2: X-Ray Preview

Replace the current browser mock with an **actual blurred dashboard preview**:

- Show the same dashboard content (portfolio value, risk score, diagnosis cards) but apply a CSS `blur(8px)` filter over it
- On scroll into view, the blur gradually reduces to `blur(4px)` -- enough to see shapes but not read details
- Overlay text: **"Your portfolio has secrets. Paste an address to reveal them."**
- A pulsing "unlock" icon in the center
- This creates FOMO -- users can almost see the product but need to act to unlock it

### Section 3: Persona Cards (redesigned as "Case Files")

Instead of simple cards, present them as **redacted case files**:

- Header: "Recent Diagnoses" (implies activity, social proof)
- Each card styled like a document with:
  - A "CLASSIFIED" stamp watermark at slight angle (very low opacity)
  - Persona emoji + name visible
  - P&L number visible
  - The AI insight line has a redacted/censored look (text visible but with strikethrough bars over some words, implying there's more to discover)
  - Bottom: "Tap to view full diagnosis"
- On hover: the redaction bars fade away, full text revealed, card lifts

### Section 4: Footer

Minimal, unchanged.

---

## Technical Implementation

### Files to modify:

1. **`src/index.css`** -- Add new keyframes:
   - `@keyframes vortex-rotate` (60s slow rotation for background)
   - `@keyframes scan-sweep` (8s horizontal light sweep across input)
   - `@keyframes sonar-ping` (ring expansion on input activation)
   - `@keyframes orbit` (40s rotation for stats ring items)
   - `@keyframes stagger-fade` (headline word entrance)
   - `@keyframes pulse-glow` (logo M breathing)
   - Update `.glass-input` with scan-sweep pseudo-element
   - Add `.blur-reveal` utility for the X-ray preview section

2. **`src/components/landing/AnimatedBackground.tsx`** -- Replace orbs with vortex gradient + light cone + enhanced dot grid

3. **`src/components/landing/WalletInput.tsx`** -- Add:
   - Orbiting stats ring around input container
   - Scan-line animation on idle
   - Sonar ping on paste/type interaction
   - Change button text to "Run Diagnosis"
   - Spring-animated chain detection badge

4. **`src/components/landing/ProductPreview.tsx`** -- Redesign as blurred "X-Ray" preview:
   - Same dashboard mock content
   - CSS blur filter that partially clears on scroll
   - Overlay with provocative CTA text
   - Pulsing unlock icon

5. **`src/components/landing/PersonaCards.tsx`** -- Redesign as "Case Files":
   - Add CLASSIFIED watermark
   - Redacted text effect on insights
   - Hover reveals full content
   - Header change to "Recent Diagnoses"

6. **`src/pages/Index.tsx`** -- Update headline text, remove static badges (replaced by orbiting ring), adjust section spacing

### No new dependencies needed -- all CSS-only animations.
