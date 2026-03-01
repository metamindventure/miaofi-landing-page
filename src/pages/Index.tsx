import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import LanguageSwitcher from '@/components/landing/LanguageSwitcher';
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
  const { t } = useI18n();
  const [inputFocused, setInputFocused] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const percentCount = useCountUp(59, 1500, heroReady);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 600);
    return () => clearTimeout(timer);
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

      {/* ─── Top bar with logo + lang switcher ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="logo-pulse w-7 h-7 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center">
            <span className="text-white font-display font-bold text-[10px]">M</span>
          </div>
          <span className="font-display font-semibold text-sm text-foreground/80 tracking-tight">MiaoFi</span>
        </div>
        <LanguageSwitcher />
      </div>

      {/* ─── Hero ─── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen px-5">
        {/* Hero spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)' }} />
        
        <div className="w-full max-w-xl flex flex-col items-center gap-7 -mt-8 relative">

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
              {t('hero.badge1')}
            </span>
            <span className="glass-pill px-3 py-1 rounded-full text-[12px] text-muted-foreground font-mono font-medium">
              {t('hero.badge2')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center max-w-2xl">
            <span className="stagger-in block font-display font-extrabold text-3xl sm:text-[44px] sm:leading-[1.15] text-foreground" style={{ animationDelay: '400ms' }}>
              {t('hero.titlePrefix')}{' '}
              <span className="text-danger red-glow-pulse text-4xl sm:text-[56px]">{percentCount}%</span>
            </span>
            <span className="stagger-in block font-display font-extrabold text-3xl sm:text-[44px] sm:leading-[1.15] text-foreground mt-3" style={{ animationDelay: '600ms' }}>
              {t('hero.subtitle')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="stagger-in text-muted-foreground text-sm sm:text-base text-center max-w-[480px] leading-relaxed" style={{ animationDelay: '800ms' }}>
            {t('hero.desc')}
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
            {t('realDiagnoses.peekWhale')}
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
