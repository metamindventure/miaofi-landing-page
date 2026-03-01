import { Twitter, MessageCircle, Send, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-8">
      <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-[10px]">M</span>
              </div>
              <span className="font-display font-bold text-sm text-foreground/80">MiaoFi</span>
            </div>
            <p className="text-foreground/30 text-xs leading-relaxed mb-4">
              AI + 投资专家，<br />你的 Crypto 投资助手
            </p>
            <p className="text-foreground/15 text-[10px]">
              © 2026 MiaoFi. All rights reserved.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-bold text-foreground/50 text-xs uppercase tracking-wider mb-4">产品</h4>
            <ul className="space-y-2.5">
              {['组合诊断', '行为分析', 'AI 处方', '定价'].map(item => (
                <li key={item}>
                  <a href="#" className="text-foreground/30 text-xs hover:text-foreground/60 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold text-foreground/50 text-xs uppercase tracking-wider mb-4">资源</h4>
            <ul className="space-y-2.5">
              {['文档', 'API', '博客'].map(item => (
                <li key={item}>
                  <a href="#" className="text-foreground/30 text-xs hover:text-foreground/60 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-foreground/50 text-xs uppercase tracking-wider mb-4">公司</h4>
            <ul className="space-y-2.5">
              {['关于我们', 'Terms of Service', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <a href="#" className="text-foreground/30 text-xs hover:text-foreground/60 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-foreground/50 text-xs uppercase tracking-wider mb-4">社交</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: MessageCircle, label: 'Discord' },
                { icon: Send, label: 'Telegram' },
                { icon: Github, label: 'GitHub' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
                  aria-label={label}
                >
                  <Icon size={14} className="text-foreground/40" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
