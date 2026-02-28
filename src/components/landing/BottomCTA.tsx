import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

const BottomCTA = () => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Focus the input after scroll
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('.glass-input');
      input?.focus();
    }, 600);
  };

  return (
    <section ref={ref} className="w-full max-w-2xl mx-auto px-5 py-24 relative z-10 text-center">
      <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground/90 mb-3">
          你的投资组合有多健康？
        </h2>
        <p className="text-foreground/40 text-sm mb-8">
          30 秒免费体检，无需连接钱包
        </p>

        <button
          onClick={scrollToTop}
          className="btn-shimmer w-full max-w-md mx-auto h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 text-primary-foreground font-display font-semibold text-base transition-all duration-200 hover:brightness-110 hover:-translate-y-[1px] hover:shadow-[0_8px_30px_-5px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2"
        >
          <Search size={18} />
          开始诊断 →
        </button>

        <p className="text-foreground/20 text-[11px] mt-4">
          Free · Read-only · No wallet connection · 30 seconds
        </p>
      </div>
    </section>
  );
};

export default BottomCTA;
