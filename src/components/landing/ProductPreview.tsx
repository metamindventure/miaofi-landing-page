import { useEffect, useRef, useState } from 'react';
import { Lock } from 'lucide-react';

const ProductPreview = () => {
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
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('.glass-input')?.focus();
    }, 600);
  };

  return (
    <section ref={ref} className="w-full max-w-5xl mx-auto px-5 py-24 relative">
      <h2 className={`text-center font-display font-bold text-2xl sm:text-3xl mb-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          你只看到了账面数字。真正的风险藏在背后。
        </span>
      </h2>
      <p className={`text-center text-foreground/35 text-sm mb-12 max-w-lg mx-auto transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        你知道自己持有什么，但你知道自己承担了多少风险吗？
      </p>

      <div className={`relative transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        {/* Dashboard content — blurred */}
        <div className={`browser-frame blur-reveal ${visible ? 'blur-partial' : ''}`}>
          {/* Chrome bar */}
          <div className="browser-chrome">
            <div className="browser-dot" />
            <div className="browser-dot" />
            <div className="browser-dot" />
            <div className="flex-1 mx-4">
              <div className="h-5 bg-foreground/[0.04] rounded-full max-w-[280px] mx-auto flex items-center justify-center">
                <span className="text-[10px] text-foreground/20 font-mono">app.miaofi.com/portfolio</span>
              </div>
            </div>
          </div>

          {/* Dashboard mock */}
          <div className="p-5 sm:p-8 bg-[#0c0c12]">
            {/* Top stats row */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
              <div>
                <p className="text-foreground/40 text-xs mb-1">组合总值</p>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground/90">$127,482</p>
              </div>
              <div>
                <p className="text-foreground/40 text-xs mb-1">30 天 P&L</p>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-accent">+12.3%</p>
              </div>
              <div className="ml-auto flex items-end gap-2">
                {['ETH', 'SOL', 'USDC'].map(c => (
                  <span key={c} className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono text-foreground/50">{c}</span>
                ))}
              </div>
            </div>

            {/* Risk gauge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="3"
                    strokeDasharray={`${62 * 0.63} ${62 * 0.37}`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold text-foreground/80">6.3</span>
              </div>
              <div>
                <p className="text-foreground/60 text-sm font-medium">风险评分</p>
                <p className="text-foreground/30 text-xs">中高风险</p>
              </div>
            </div>

            {/* Diagnosis cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: '🔴', title: '68% 仓位在 ETH 一个币上', desc: 'ETH 再跌 30% 你的组合直接腰斩', border: 'border-destructive/20' },
                { icon: '⚠️', title: '3 次追高买入 SOL', desc: '每次追涨平均亏 35%', border: 'border-amber-500/20' },
                { icon: '💡', title: '$15,000 USDC 在钱包睡觉', desc: '每月错过 $52 利息收入', border: 'border-accent/20' },
              ].map(card => (
                <div key={card.title} className={`glass-card rounded-xl p-4 ${card.border}`}>
                  <p className="text-base mb-1">{card.icon}</p>
                  <p className="text-foreground/80 text-sm font-medium mb-0.5">{card.title}</p>
                  <p className="text-foreground/35 text-xs">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
            <Lock size={22} className="text-primary" />
          </div>
          <p className="font-display font-bold text-lg sm:text-xl text-foreground/90 text-center px-4">
            你的组合藏着看不见的风险
          </p>
          <button
            onClick={scrollToTop}
            className="text-primary text-sm mt-2 hover:underline pointer-events-auto cursor-pointer"
          >
            30 秒诊断一下 →
          </button>
        </div>

        {/* Glow reflection */}
        <div className="h-20 bg-gradient-to-b from-primary/5 to-transparent rounded-b-3xl blur-2xl -mt-4 mx-8" />
      </div>
    </section>
  );
};

export default ProductPreview;
