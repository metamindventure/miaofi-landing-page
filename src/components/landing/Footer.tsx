import { useEffect, useRef, useState } from 'react';
import { Twitter, MessageCircle, Send, Github } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

const Footer = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={ref} className={`relative z-10 border-t border-white/[0.06] mt-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-[10px]">M</span>
              </div>
              <span className="font-display font-bold text-sm text-foreground/80">MiaoFi</span>
            </div>
            <p className="text-foreground/30 text-xs leading-relaxed mb-4">
              {t('footer.tagline')}
            </p>
            <p className="text-foreground/15 text-[10px]">
              {t('footer.copyright')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-bold text-foreground/50 text-xs uppercase tracking-wider mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2.5">
              {[t('footer.productDiagnosis'), t('footer.productBehavior'), t('footer.productPrescription'), t('footer.productPricing')].map(item => (
                <li key={item}>
                  <a href="#" className="text-foreground/30 text-xs hover:text-foreground/60 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold text-foreground/50 text-xs uppercase tracking-wider mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2.5">
              {[t('footer.resourcesDocs'), t('footer.resourcesApi'), t('footer.resourcesBlog')].map(item => (
                <li key={item}>
                  <a href="#" className="text-foreground/30 text-xs hover:text-foreground/60 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-foreground/50 text-xs uppercase tracking-wider mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2.5">
              {[t('footer.companyAbout'), t('footer.companyTerms'), t('footer.companyPrivacy')].map(item => (
                <li key={item}>
                  <a href="#" className="text-foreground/30 text-xs hover:text-foreground/60 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-foreground/50 text-xs uppercase tracking-wider mb-4">{t('footer.social')}</h4>
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
