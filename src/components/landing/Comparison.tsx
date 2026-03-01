import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const comparisons = [
  {
    icon: '📊',
    others: '你持有 60% ETH',
    miaofi: '你的 ETH 仓位超过组合的 3 倍标准风险线。把 $18K 换成 USDC 存 Aave，年化 4.2%',
    result: 'ETH 随后跌了 30%，你的组合只跌了 12%。比纯持有少亏 $5,400',
  },
  {
    icon: '🎯',
    others: '你昨天买了 SOL',
    miaofi: '这是你 30 天内第 3 次在涨超 20% 后追入。建议：设 $95 止损，或等回调到 $75 再加仓',
    result: 'SOL 继续跌到 $80，你的止损保住了 $1,500。如果没设止损，你现在多亏 16%',
  },
  {
    icon: '💡',
    others: '你的 USDC 余额 $15,000',
    miaofi: '$15,000 USDC 闲置 60 天了。存 Aave 能年赚 $630。存 Kamino 能赚 $975',
    result: '执行后每月多赚 $81，一年 $975。什么都不用做，钱自己在生钱',
  },
  {
    icon: '🛡️',
    others: '大盘跌了 40%',
    miaofi: '提前降低 ETH 集中度到 30%，配置 20% 稳定币和 10% 对冲仓位',
    result: '大盘跌 40% 时，你的组合只跌 18%。相当于保住了 $22,000',
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
      <h2 className={`text-center font-display font-bold text-2xl sm:text-3xl mb-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">别人给你数据。我们给你操作指令。</span>
      </h2>
      <p className={`text-center text-foreground/35 text-sm mb-12 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        Portfolio trackers 显示数字。MiaoFi 告诉你哪里有问题、怎么修复、修复后你能得到什么。
      </p>

      <div className="flex flex-col gap-4">
        {comparisons.map((c, i) => (
          <div
            key={i}
            className={`group glass-card rounded-2xl overflow-hidden transition-all duration-700 hover:border-primary/20 hover:bg-white/[0.05] hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.15)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: `${200 + i * 120}ms` }}
          >
            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              {/* Others */}
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{c.icon}</span>
                <div>
                  <span className="text-foreground/25 text-[10px] font-mono uppercase tracking-wider">Others</span>
                  <p className="text-foreground/50 text-sm mt-1 group-hover:text-foreground/40 transition-colors">"{c.others}"</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <ArrowRight size={16} className="text-primary group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              <div className="sm:hidden flex justify-center">
                <ArrowRight size={16} className="text-primary rotate-90" />
              </div>

              {/* MiaoFi */}
              <div className="sm:pl-2">
                <span className="text-primary/70 text-[10px] font-mono uppercase tracking-wider font-bold group-hover:text-primary transition-colors">MiaoFi</span>
                <p className="text-foreground/90 text-sm mt-1 font-medium group-hover:text-white transition-colors leading-relaxed">"{c.miaofi}"</p>
              </div>
            </div>

            {/* Result row */}
            <div className="px-5 sm:px-6 pb-4 sm:pb-5">
              <div className="flex items-start gap-2 bg-accent/5 rounded-lg px-4 py-3 border border-accent/10">
                <Check size={14} className="text-accent shrink-0 mt-0.5" />
                <p className="text-accent/90 text-xs font-medium leading-relaxed">{c.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comparison;
