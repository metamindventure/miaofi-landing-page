import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import WalletInput from '@/components/landing/WalletInput';
import BehaviorAnalysis from '@/components/landing/BehaviorAnalysis';
import PersonaCards from '@/components/landing/PersonaCards';
import TrustSecurity from '@/components/landing/TrustSecurity';
import BottomCTA from '@/components/landing/BottomCTA';
import Footer from '@/components/landing/Footer';

const useCountUp = (target: number, duration: number, trigger: boolean) => {
  const [value, setValue] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, [trigger, target, duration]);

  return value;
};

const Index = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const percentCount = useCountUp(60, 1500, heroReady);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  const scrollToTopAndFillWhale = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('fill-wallet', { detail: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }));
    }, 600);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />

      {/* ─── Hero ─── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen px-5">
        <div className="w-full max-w-xl flex flex-col items-center gap-7 -mt-8">

          {/* Logo */}
          <div className="stagger-in flex items-center gap-2.5" style={{ animationDelay: '0ms' }}>
            <div className="logo-pulse w-9 h-9 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-semibold text-xl text-foreground/90 tracking-tight">MiaoFi</span>
          </div>

          {/* Pills */}
          <div className="stagger-in flex items-center gap-2" style={{ animationDelay: '200ms' }}>
            <span className="glass-pill px-3 py-1 rounded-full text-[12px] text-muted-foreground font-medium">
              免费 · 30 秒
            </span>
            <span className="glass-pill px-3 py-1 rounded-full text-[12px] text-muted-foreground font-mono font-medium">
              EVM + Solana
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center max-w-2xl">
            <span className="stagger-in block font-display font-extrabold text-3xl sm:text-[48px] sm:leading-[1.1] text-foreground" style={{ animationDelay: '400ms' }}>
              ETH 从高点暴跌
            </span>
            <span
              className="stagger-in inline-block font-display font-extrabold text-5xl sm:text-[72px] leading-none text-danger red-glow-pulse mt-1"
              style={{ animationDelay: '600ms' }}
            >
              {percentCount}%
            </span>
            <span className="stagger-in block font-display font-extrabold text-3xl sm:text-[48px] sm:leading-[1.1] text-foreground mt-2" style={{ animationDelay: '600ms' }}>
              你的仓位扛住了吗？
            </span>
          </h1>

          {/* Subtitle */}
          <p className="stagger-in text-muted-foreground text-sm sm:text-base text-center max-w-[480px] leading-relaxed" style={{ animationDelay: '800ms' }}>
            粘贴钱包地址，AI + 投资专家 30 秒诊断你的<br className="sm:hidden" />持仓风险、交易习惯和错过的收益
          </p>

          {/* Input */}
          <div className="stagger-in w-full" style={{ animationDelay: '1000ms' }}>
            <WalletInput onFocusChange={setInputFocused} />
          </div>
        </div>
      </main>

      {/* ─── Trading Behavior Analysis ─── */}
      <BehaviorAnalysis />

      {/* ─── Persona Cards ─── */}
      <PersonaCards />

      {/* ─── Trust & Security ─── */}
      <TrustSecurity />

      {/* ─── Whale Peek ─── */}
      <div className="relative z-10 text-center py-16">
        <button
          onClick={scrollToTopAndFillWhale}
          className="inline-flex items-center gap-2 text-primary/70 hover:text-primary text-base transition-colors group"
        >
          <Search size={16} />
          <span className="relative">
            🔍 偷看一个巨鲸钱包 →
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
          </span>
        </button>
      </div>

      {/* ─── Bottom CTA ─── */}
      <BottomCTA />

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
};

export default Index;
