import { useState } from 'react';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import WalletInput from '@/components/landing/WalletInput';
import ValueProposition from '@/components/landing/ValueProposition';
import HowItWorks from '@/components/landing/HowItWorks';
import DiagnosisCardMockup from '@/components/landing/DiagnosisCardMockup';
import TrustSection from '@/components/landing/TrustSection';

const HEADLINE_WORDS = ['Your', 'AI', 'Investment', 'Copilot', 'for', 'Crypto'];
const CHAINS = ['Ethereum', 'Solana', 'Arbitrum', 'Base', 'Polygon'];

const Index = () => {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col grain">
      <AnimatedBackground inputFocused={inputFocused} />

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen px-5">
        <div className="w-full flex flex-col items-center gap-8 -mt-8">

          {/* Logo */}
          <div className="flex items-center gap-2.5 stagger-word" style={{ animationDelay: '0s' }}>
            <div className="logo-pulse w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-semibold text-xl text-foreground tracking-tight">MiaoFi</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-center leading-[1.1] max-w-3xl">
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="stagger-word text-foreground mr-[0.25em]"
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Sub-headline */}
          <p className="text-muted-foreground text-base sm:text-lg text-center max-w-md stagger-word" style={{ animationDelay: '0.9s' }}>
            Paste an address. Get your diagnosis in 30 seconds.
          </p>

          {/* Chain row */}
          <div className="flex items-center gap-2 flex-wrap justify-center stagger-word" style={{ animationDelay: '1s' }}>
            {CHAINS.map((chain) => (
              <span key={chain} className="glass-pill px-3 py-1.5 rounded-md text-[11px] text-muted-foreground font-mono">
                {chain}
              </span>
            ))}
          </div>

          {/* Input */}
          <div className="w-full stagger-word" style={{ animationDelay: '1.1s' }}>
            <WalletInput onFocusChange={setInputFocused} />
          </div>
        </div>
      </main>

      {/* Sections */}
      <ValueProposition />
      <HowItWorks />
      <DiagnosisCardMockup />
      <TrustSection />

      {/* Bottom CTA */}
      <section className="relative z-10 w-full max-w-xl mx-auto px-5 py-28 text-center">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
          How healthy is your portfolio?
        </h2>
        <p className="text-muted-foreground text-base mb-10">
          Free 30-second checkup. No strings attached.
        </p>
        <WalletInput compact />
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center border-t border-border">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-[10px]">M</span>
          </div>
          <span className="font-display font-semibold text-sm text-foreground/60">MiaoFi</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-muted-foreground text-xs mb-5">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <span className="text-border">·</span>
          <a href="#" className="hover:text-foreground transition-colors">Twitter/X</a>
          <span className="text-border">·</span>
          <a href="#" className="hover:text-foreground transition-colors">Telegram</a>
        </div>
        <p className="text-muted-foreground/40 text-[11px]">
          Built with ❤️ by a solo founder + AI agents
        </p>
      </footer>
    </div>
  );
};

export default Index;
