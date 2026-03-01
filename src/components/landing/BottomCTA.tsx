import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

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

const BottomCTA = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(91, 2000, visible);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('.glass-input')?.focus();
    }, 600);
  };

  return (
    <section ref={ref} className="w-full max-w-2xl mx-auto px-5 py-24 relative z-10 text-center">
      <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full bg-danger/10 red-glow-bg blur-3xl" />
          <span
            className="relative font-display font-extrabold text-7xl sm:text-8xl red-glow-pulse"
            style={{
              background: 'linear-gradient(180deg, #FF4757, #FFFFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {count}%
          </span>
        </div>

        <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">
          <span className="text-foreground/90">{t('bottomCta.title1')}</span>
          <br />
          <span className="text-foreground">{t('bottomCta.title2')}</span>
        </h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
          {t('bottomCta.subtitle')}
        </p>

        <button
          onClick={scrollToTop}
          className="btn-shimmer btn-breathe w-full max-w-md mx-auto h-14 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white font-display font-semibold text-base transition-all duration-200 hover:scale-[1.02] hover:brightness-110 flex items-center justify-center gap-2"
        >
          <Search size={18} />
          {t('bottomCta.cta')}
        </button>

        <p className="text-muted-foreground/40 text-[11px] mt-4">
          {t('bottomCta.trustLine')}
        </p>
      </div>
    </section>
  );
};

export default BottomCTA;
