import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const comparisons = [
  {
    others: '你持有 60% ETH',
    miaofi: '你的 ETH 集中度过高，建议分散到 3 个资产',
    icon: '📊',
  },
  {
    others: '你昨天买了 ARB',
    miaofi: '你最近 30 天有 4 次 FOMO 买入，平均亏损 23%',
    icon: '🎯',
  },
  {
    others: '你的组合价值 $50K',
    miaofi: '如果 3 个月前听了建议，你现在多 $8K',
    icon: '💡',
  },
];

const Comparison = () => {
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

  return (
    <section ref={ref} className="w-full max-w-4xl mx-auto px-5 py-24 relative z-10">
      <h2 className={`text-center font-display font-bold text-2xl sm:text-3xl text-foreground/90 mb-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        不只是数据，而是诊断
      </h2>
      <p className={`text-center text-foreground/35 text-sm mb-12 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        Others tell you what you have. MiaoFi tells you what to do.
      </p>

      <div className="flex flex-col gap-4">
        {comparisons.map((c, i) => (
          <div
            key={i}
            className={`glass-card rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: `${200 + i * 120}ms` }}
          >
            {/* Others */}
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{c.icon}</span>
              <div>
                <span className="text-foreground/25 text-[10px] font-mono uppercase tracking-wider">Others</span>
                <p className="text-foreground/50 text-sm mt-1">"{c.others}"</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden sm:flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowRight size={16} className="text-primary" />
              </div>
            </div>
            <div className="sm:hidden flex justify-center">
              <ArrowRight size={16} className="text-primary rotate-90" />
            </div>

            {/* MiaoFi */}
            <div>
              <span className="text-primary/70 text-[10px] font-mono uppercase tracking-wider font-bold">MiaoFi</span>
              <p className="text-foreground/90 text-sm mt-1 font-medium">"{c.miaofi}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comparison;
