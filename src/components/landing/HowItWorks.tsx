import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    emoji: '📋',
    number: '01',
    title: '粘贴地址',
    desc: 'EVM 或 Solana，多钱包合并算总账。不连钱包，不碰私钥',
  },
  {
    emoji: '🧠',
    number: '02',
    title: '6 个 AI 交叉会诊',
    desc: 'Claude、GPT-4o、Gemini 同时看你的持仓和交易记录，像 3 个基金经理会诊你的操作',
  },
  {
    emoji: '⚡',
    number: '03',
    title: '拿到处方，不是报告',
    desc: '别人告诉你"要分散投资"。我们说"把 30% 的 ETH 换成 USDC，在 Aave 存着吃 4.2%"',
  },
];

const HowItWorks = () => {
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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">How It Works</span>
      </h2>
      <p className={`text-center text-foreground/30 text-sm mb-14 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        Three steps to your portfolio diagnosis
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
        {/* Animated connecting lines (desktop) */}
        <div className={`hidden sm:block absolute top-12 left-[16.6%] right-[16.6%] h-px overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div
            className={`h-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 transition-transform duration-1000 ease-out ${visible ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ transitionDelay: '600ms' }}
          />
        </div>

        {/* Animated dots on the line */}
        <div className={`hidden sm:block absolute top-[44px] left-[16.6%] right-[16.6%] h-4 pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '900ms' }}>
          <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(139,92,246,0.5)] transition-all duration-[1.5s] ease-out ${visible ? 'left-full' : 'left-0'}`} style={{ transitionDelay: '800ms' }} />
        </div>

        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex flex-col items-center text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${200 + i * 200}ms` }}
          >
            {/* Icon circle */}
            <div className="relative mb-5 group">
              <div className={`w-24 h-24 rounded-full glass-card flex items-center justify-center border-foreground/[0.08] transition-all duration-500 ${visible ? 'scale-100' : 'scale-75'}`} style={{ transitionDelay: `${300 + i * 200}ms` }}>
                <span className="text-4xl">{step.emoji}</span>
              </div>
              <div className={`absolute inset-0 rounded-full border border-primary/20 transition-all duration-700 ${visible ? 'scale-110 opacity-100' : 'scale-100 opacity-0'}`} style={{ transitionDelay: `${500 + i * 200}ms` }} />
              <span className="absolute -top-1 -right-1 font-mono text-[10px] text-primary bg-background/80 px-2 py-0.5 rounded-full border border-primary/20 font-bold">
                {step.number}
              </span>
            </div>

            {/* Mobile connector arrow */}
            {i < steps.length - 1 && (
              <div className={`sm:hidden flex flex-col items-center my-2 transition-all duration-500 ${visible ? 'opacity-60' : 'opacity-0'}`} style={{ transitionDelay: `${400 + i * 200}ms` }}>
                <div className="w-px h-6 bg-gradient-to-b from-primary/40 to-primary/10" />
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary/40" />
              </div>
            )}

            <h3 className="font-display font-bold text-foreground/90 text-lg mb-2">{step.title}</h3>
            <p className="text-foreground/35 text-sm leading-relaxed max-w-[260px]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
