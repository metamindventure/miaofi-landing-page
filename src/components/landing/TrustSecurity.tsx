import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, EyeOff, Brain, Lock } from 'lucide-react';

const items = [
  {
    icon: EyeOff,
    title: '只读，永远不碰你的币',
    desc: '粘贴地址 ≠ 连接钱包。我们只读公开链上数据，和你用 Etherscan 查地址一样',
  },
  {
    icon: Lock,
    title: '零私钥，零风险',
    desc: '不存私钥、不签交易、不碰资产。你的币在哪，还在哪',
  },
  {
    icon: Brain,
    title: '6 个 AI 交叉验证',
    desc: 'Claude + GPT-4o + Gemini 三家 AI 同时分析，互相校验，减少单一模型的幻觉',
  },
  {
    icon: ShieldCheck,
    title: '链上公开数据',
    desc: '所有分析基于区块链公开记录。没有数据泄露风险，因为数据本来就是公开的',
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
      <h2 className={`text-center font-display font-bold text-2xl sm:text-3xl mb-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Security & Trust</span>
      </h2>
      <p className={`text-center text-foreground/30 text-sm mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        Your safety is our first priority
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
