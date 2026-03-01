import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import WalletInput from '@/components/landing/WalletInput';
import HowItWorks from '@/components/landing/HowItWorks';
import BehaviorAnalysis from '@/components/landing/BehaviorAnalysis';
import Comparison from '@/components/landing/Comparison';
import ProductPreview from '@/components/landing/ProductPreview';
import PersonaCards from '@/components/landing/PersonaCards';
import TrustSecurity from '@/components/landing/TrustSecurity';
import BottomCTA from '@/components/landing/BottomCTA';
import Footer from '@/components/landing/Footer';

const HEADLINE_PARTS = [
  { text: 'ETH 从高点暴跌 ', delay: 0.15 },
  { text: '59%', delay: 0.35, red: true },
  { text: '。', delay: 0.45 },
  { text: '你的仓位扛住了吗？', delay: 0.55 },
];

const Index = () => {
  const [inputFocused, setInputFocused] = useState(false);

  const scrollToTopAndFillWhale = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('fill-wallet', { detail: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }));
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('.glass-input')?.focus();
    }, 600);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground inputFocused={inputFocused} />

      {/* Hero — full viewport */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen px-5">
        <div className="w-full flex flex-col items-center gap-8 -mt-12">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="logo-pulse w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground/90 tracking-tight">MiaoFi</span>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-3 stagger-word" style={{ animationDelay: '0.1s' }}>
            <span className="glass-pill px-3 py-1 rounded-full text-[11px] text-foreground/50 font-medium">
              免费 · 30 秒
            </span>
            <span className="glass-pill px-3 py-1 rounded-full text-[11px] text-foreground/50 font-medium font-mono">
              EVM + Solana
            </span>
          </div>

          {/* Headline — staggered entrance */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-center leading-[1.15] max-w-2xl">
            {HEADLINE_PARTS.map((part, i) => (
              <span
                key={i}
                className={`stagger-word ${part.red ? 'text-[#ef4444] font-mono' : 'bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60'}`}
                style={{ animationDelay: `${part.delay}s` }}
              >
                {part.text}
              </span>
            ))}
          </h1>

          {/* Sub-headline */}
          <p className="text-foreground/40 text-sm sm:text-base text-center max-w-lg stagger-word leading-relaxed" style={{ animationDelay: '0.8s' }}>
            粘贴钱包地址，AI + 投资专家 30 秒诊断你的<br className="sm:hidden" />持仓风险、交易习惯和错过的收益
          </p>

          {/* Wallet Input */}
          <WalletInput onFocusChange={setInputFocused} />
        </div>
      </main>

      {/* How It Works */}
      <HowItWorks />

      {/* Trading Behavior Analysis */}
      <BehaviorAnalysis />

      {/* Product Preview — X-Ray */}
      <ProductPreview />

      {/* Comparison — Others vs MiaoFi */}
      <Comparison />

      {/* Persona Cards — Case Files */}
      <PersonaCards />

      {/* Trust & Security */}
      <TrustSecurity />

      {/* Famous Wallets CTA */}
      <div className="relative z-10 text-center py-8">
        <button
          onClick={scrollToTopAndFillWhale}
          className="inline-flex items-center gap-2 text-primary hover:underline text-sm transition-colors"
        >
          <Search size={14} />
          偷看一个巨鲸钱包 →
        </button>
      </div>

      {/* Bottom CTA */}
      <BottomCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
