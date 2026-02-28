import { useEffect, useRef, useState } from 'react';
import { Clipboard, Cpu, FileCheck } from 'lucide-react';

const steps = [
  {
    icon: Clipboard,
    number: '01',
    title: '粘贴地址',
    desc: 'EVM 或 Solana，支持多钱包同时分析',
  },
  {
    icon: Cpu,
    number: '02',
    title: '30秒 AI 扫描',
    desc: '6 个 AI 模型交叉分析持仓、交易历史与行为模式',
  },
  {
    icon: FileCheck,
    number: '03',
    title: '收到诊断卡片',
    desc: '不是报告，是具体的"做 A、B 或 C"操作建议',
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
      <p className={`text-center text-foreground/30 text-sm mb-12 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        How It Works
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
        {/* Connecting line (desktop) */}
        <div className="hidden sm:block absolute top-12 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent" />

        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex flex-col items-center text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${150 + i * 150}ms` }}
          >
            {/* Icon circle */}
            <div className="relative mb-5">
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center border-foreground/[0.08]">
                <step.icon size={28} className="text-primary/80" />
              </div>
              <span className="absolute -top-1 -right-1 font-mono text-[10px] text-foreground/25 bg-background/60 px-1.5 py-0.5 rounded-full border border-foreground/[0.06]">
                {step.number}
              </span>
            </div>

            <h3 className="font-display font-bold text-foreground/90 text-lg mb-2">{step.title}</h3>
            <p className="text-foreground/35 text-sm leading-relaxed max-w-[240px]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
