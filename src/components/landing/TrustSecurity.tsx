import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, EyeOff, Brain, Lock } from 'lucide-react';

const items = [
  {
    icon: EyeOff,
    title: '只读分析',
    desc: '永远不需要连接钱包或授权任何交易',
  },
  {
    icon: Lock,
    title: '零私钥接触',
    desc: '不存储私钥，不接触你的任何资产',
  },
  {
    icon: Brain,
    title: '6 AI Models',
    desc: 'Claude, GPT-4o, Gemini 等多模型交叉验证',
  },
  {
    icon: ShieldCheck,
    title: '公开地址分析',
    desc: '仅使用链上公开数据，和区块浏览器一样安全',
  },
];

const TrustSecurity = () => {
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
      <p className={`text-center text-foreground/30 text-sm mb-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        Security & Trust
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`glass-card rounded-2xl p-5 flex items-start gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${150 + i * 100}ms` }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon size={20} className="text-primary/80" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground/85 text-sm">{item.title}</h3>
              <p className="text-foreground/35 text-xs mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSecurity;
