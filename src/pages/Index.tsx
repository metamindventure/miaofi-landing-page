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
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground inputFocused={inputFocused} />

      {/* Hero — full viewport */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen px-5">
        <div className="w-full flex flex-col items-center gap-7 -mt-8">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="logo-pulse w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground/90 tracking-tight">MiaoFi</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-center leading-[1.15] max-w-2xl">
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="stagger-word bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mr-[0.25em]"
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Sub-headline */}
          <p className="text-foreground/40 text-base sm:text-lg text-center max-w-md stagger-word" style={{ animationDelay: '0.9s' }}>
            Paste an address. Get your diagnosis in 30 seconds.
          </p>

          {/* Chain row */}
          <div className="flex items-center gap-2 stagger-word" style={{ animationDelay: '1s' }}>
            {CHAINS.map((chain) => (
              <span key={chain} className="glass-pill px-3 py-1.5 rounded-full text-[11px] text-foreground/30 font-medium">
                {chain}
              </span>
            ))}
          </div>

          {/* Wallet Input */}
          <WalletInput onFocusChange={setInputFocused} />
        </div>
      </main>

      {/* Value Proposition */}
      <ValueProposition />

      {/* How It Works */}
      <HowItWorks />

      {/* Diagnosis Card Mockup */}
      <DiagnosisCardMockup />

      {/* Trust Section */}
      <TrustSection />

      {/* Bottom CTA */}
      <section className="relative z-10 w-full max-w-2xl mx-auto px-5 py-24 text-center">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground/90 mb-3">
          How healthy is your portfolio?
        </h2>
        <p className="text-foreground/40 text-base mb-10">
          Free 30-second checkup.
        </p>
        <WalletInput />
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center border-t border-foreground/[0.05]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-[10px]">M</span>
          </div>
          <span className="font-display font-bold text-sm text-foreground/60">MiaoFi</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-foreground/25 text-xs mb-4">
          <a href="#" className="hover:text-foreground/50 transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-foreground/50 transition-colors">Twitter/X</a>
          <span>·</span>
          <a href="#" className="hover:text-foreground/50 transition-colors">Telegram</a>
        </div>
        <p className="text-foreground/15 text-[11px]">
          Built with ❤️ by a solo founder + AI agents
        </p>
      </footer>
    </div>
  );
};

export default Index;
