import { useEffect, useRef, useState } from 'react';
import { Eye, Shield, Brain, CheckCircle } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

const icons = [Eye, Shield, Brain, CheckCircle];
const titleKeys = ['security.item1Title', 'security.item2Title', 'security.item3Title', 'security.item4Title'];
const descKeys = ['security.item1Desc', 'security.item2Desc', 'security.item3Desc', 'security.item4Desc'];

const TrustSecurity = () => {
  const { t } = useI18n();
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
    <section ref={ref} className="w-full max-w-4xl mx-auto px-5 py-20 relative z-10">
      <h2 className={`text-center font-display font-extrabold text-3xl sm:text-4xl mb-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">{t('security.title')}</span>
      </h2>
      <p className={`text-center text-muted-foreground text-sm mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {t('security.subtitle')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {icons.map((Icon, i) => (
          <div
            key={i}
            className={`glass-card rounded-2xl p-6 flex items-start gap-4 transition-all duration-700 hover:border-white/[0.12] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${150 + i * 100}ms` }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-primary/80" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground/85 text-sm">{t(titleKeys[i])}</h3>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{t(descKeys[i])}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSecurity;
