import { useRef, useCallback } from 'react';
import { MiaoFiIcon, MiaoFiIconFlat, MiaoFiFullLogo, MiaoFiHeroLogo } from '@/components/logo/MiaoFiLogo';

const Section = ({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) => (
  <section className={`mb-16 ${className}`}>
    <h2 className="text-lg font-display font-bold mb-6 text-white/60 uppercase tracking-widest">{title}</h2>
    {children}
  </section>
);

const BgCard = ({ dark, children, className = '' }: { dark: boolean; children: React.ReactNode; className?: string }) => (
  <div
    className={`rounded-2xl p-8 flex items-center justify-center ${className}`}
    style={{
      background: dark
        ? 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f0f0f5 100%)',
      border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
    }}
  >
    {children}
  </div>
);

function DownloadButton({ svgRef, filename }: { svgRef: React.RefObject<HTMLDivElement>; filename: string }) {
  const download = useCallback(() => {
    const svgEl = svgRef.current?.querySelector('svg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgEl);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [svgRef, filename]);

  return (
    <button
      onClick={download}
      className="mt-3 text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
    >
      ↓ Download SVG
    </button>
  );
}

function IconSizeRow({ label }: { label: string }) {
  const sizes = [128, 64, 32, 16];
  const refs = sizes.map(() => useRef<HTMLDivElement>(null));

  return (
    <div className="mb-8">
      <p className="text-sm text-white/40 mb-4 font-mono">{label}</p>
      <div className="flex items-end gap-8 flex-wrap">
        {sizes.map((s, i) => (
          <div key={s} className="flex flex-col items-center">
            <div ref={refs[i]}>
              <MiaoFiIcon size={s} />
            </div>
            <span className="text-[10px] text-white/30 mt-2 font-mono">{s}px</span>
            <DownloadButton svgRef={refs[i] as React.RefObject<HTMLDivElement>} filename={`miaofi-icon-${s}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function IconFlatSizeRow({ color, bg }: { color: string; bg: string }) {
  const sizes = [128, 64, 32, 16];

  return (
    <div className="flex items-end gap-8 flex-wrap p-6 rounded-xl" style={{ background: bg }}>
      {sizes.map((s) => (
        <div key={s} className="flex flex-col items-center">
          <MiaoFiIconFlat size={s} color={color} />
          <span className="text-[10px] mt-2 font-mono" style={{ color: color, opacity: 0.4 }}>{s}px</span>
        </div>
      ))}
    </div>
  );
}

export default function LogoShowcase() {
  const fullDarkRef = useRef<HTMLDivElement>(null);
  const fullLightRef = useRef<HTMLDivElement>(null);
  const heroDarkRef = useRef<HTMLDivElement>(null);
  const heroLightRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#07070c] text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-4xl font-display font-extrabold mb-3">
            Miao<span className="text-primary">Fi</span> Logo System
          </h1>
          <p className="text-white/40 text-base max-w-xl">
            A complete logo system for MiaoFi — AI-powered crypto portfolio diagnosis. 
            Lucky cat motif with ₿ coin, designed to scale from 16px favicon to hero banners.
          </p>
        </div>

        {/* 1. Icon at multiple sizes */}
        <Section title="1 — Icon (with background)">
          <IconSizeRow label="On dark background" />
        </Section>

        {/* 2. Flat icon variants */}
        <Section title="2 — Icon (flat / transparent)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-white/30 mb-3 font-mono">Dark background</p>
              <IconFlatSizeRow color="#A29BFE" bg="linear-gradient(135deg, #0a0a0f, #1a1a2e)" />
            </div>
            <div>
              <p className="text-xs text-white/30 mb-3 font-mono">Light background</p>
              <IconFlatSizeRow color="#6C5CE7" bg="linear-gradient(135deg, #ffffff, #f0f0f5)" />
            </div>
          </div>
        </Section>

        {/* 3. Full logo (icon + text) */}
        <Section title="3 — Full Logo (horizontal)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BgCard dark>
              <div className="flex flex-col items-center gap-4">
                <div ref={fullDarkRef}>
                  <MiaoFiFullLogo height={56} dark />
                </div>
                <DownloadButton svgRef={fullDarkRef as React.RefObject<HTMLDivElement>} filename="miaofi-full-dark" />
              </div>
            </BgCard>
            <BgCard dark={false}>
              <div className="flex flex-col items-center gap-4">
                <div ref={fullLightRef}>
                  <MiaoFiFullLogo height={56} dark={false} />
                </div>
                <DownloadButton svgRef={fullLightRef as React.RefObject<HTMLDivElement>} filename="miaofi-full-light" />
              </div>
            </BgCard>
          </div>
          {/* Smaller sizes */}
          <div className="mt-6 flex gap-8 flex-wrap items-end">
            {[40, 32, 24].map(h => (
              <div key={h} className="flex flex-col items-center">
                <MiaoFiFullLogo height={h} dark />
                <span className="text-[10px] text-white/30 mt-2 font-mono">h={h}px</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. Hero version */}
        <Section title="4 — Hero Logo (with tagline)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BgCard dark className="min-h-[240px]">
              <div className="flex flex-col items-center gap-4">
                <div ref={heroDarkRef}>
                  <MiaoFiHeroLogo height={80} dark tagline="AI-Powered Crypto Diagnosis" />
                </div>
                <DownloadButton svgRef={heroDarkRef as React.RefObject<HTMLDivElement>} filename="miaofi-hero-dark" />
              </div>
            </BgCard>
            <BgCard dark={false} className="min-h-[240px]">
              <div className="flex flex-col items-center gap-4">
                <div ref={heroLightRef}>
                  <MiaoFiHeroLogo height={80} dark={false} tagline="AI-Powered Crypto Diagnosis" />
                </div>
                <DownloadButton svgRef={heroLightRef as React.RefObject<HTMLDivElement>} filename="miaofi-hero-light" />
              </div>
            </BgCard>
          </div>
        </Section>

        {/* 5. Favicon preview */}
        <Section title="5 — Favicon Preview">
          <div className="flex gap-6 items-center flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded overflow-hidden border border-white/10">
                <MiaoFiIcon size={32} />
              </div>
              <span className="text-[10px] text-white/30 font-mono">Browser tab</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <div className="w-4 h-4 rounded-sm overflow-hidden">
                <MiaoFiIcon size={16} />
              </div>
              <span className="text-xs text-white/50">MiaoFi — AI Crypto Diagnosis</span>
              <span className="text-white/20 text-xs">×</span>
            </div>
          </div>
        </Section>

        {/* 6. Design notes */}
        <Section title="6 — Design Notes">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Lucky Cat (招财猫)', desc: 'Geometric cat silhouette with raised paw and ₿ coin on forehead — fortune meets crypto.' },
              { title: 'Scalability', desc: 'Clean shapes with minimal detail. Ears + coin remain recognizable even at 16px favicon size.' },
              { title: 'Color System', desc: 'Primary gradient: #7C3AED → #4F46E5 (violet-indigo). Gold coin accent: #F59E0B. Works on any background.' },
            ].map(n => (
              <div key={n.title} className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="font-display font-bold text-sm mb-2 text-white/80">{n.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <div className="text-center pt-8 border-t border-white/[0.06]">
          <a href="/" className="text-sm text-primary/60 hover:text-primary transition-colors">
            ← Back to Landing Page
          </a>
        </div>
      </div>
    </div>
  );
}
