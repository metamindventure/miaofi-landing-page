import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/i18n/I18nContext';

const PersonaCards = () => {
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

  const personas = [
    {
      emoji: '🐋',
      name: 'Vitalik Buterin',
      label: t('realDiagnoses.vitalikLabel'),
      wallet: '0xd8dA...96045',
      pnl: '−$35M',
      positive: false,
      insight: t('realDiagnoses.vitalikDiagnosis'),
      risk: 6,
      chains: ['ETH'],
      note: t('realDiagnoses.vitalikFootnote'),
    },
    {
      emoji: '🎰',
      name: 'Ansem',
      label: t('realDiagnoses.degenLabel') + ' · @blknoiz06',
      wallet: 'AVAZ...NXYm',
      pnl: '−$8,200',
      positive: false,
      insight: t('realDiagnoses.degenDiagnosis'),
      risk: 9,
      chains: ['SOL', 'PUMP'],
      note: t('realDiagnoses.degenFootnote'),
    },
    {
      emoji: '😴',
      name: t('realDiagnoses.sleeperName'),
      label: t('realDiagnoses.sleeperTag'),
      wallet: null,
      pnl: '+$2,100',
      pnlNote: t('realDiagnoses.sleeperPnlNote'),
      positive: true,
      insight: t('realDiagnoses.sleeperDiagnosis'),
      risk: 3,
      chains: ['ETH', 'SOL'],
      isMirror: true,
    },
  ];

  return (
    <section ref={ref} className="w-full max-w-5xl mx-auto px-5 py-20 relative z-10">
      <h2 className={`text-center font-display font-extrabold text-3xl sm:text-4xl mb-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">{t('realDiagnoses.title')}</span>
      </h2>
      <p className={`text-center text-muted-foreground text-sm mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {t('realDiagnoses.subtitle')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {personas.map((p, i) => (
          <div
            key={i}
            className={`group glass-card rounded-2xl p-6 text-left transition-all duration-500 hover:scale-[1.03] hover:border-white/[0.15] hover:shadow-[0_8px_40px_-10px_rgba(108,92,231,0.15)] cursor-pointer relative overflow-hidden ${
              p.isMirror ? 'border-dashed' : ''
            } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${200 + i * 150}ms` }}
          >
            <span className="classified-stamp">CLASSIFIED</span>

            <span className="text-[42px] leading-none relative z-10">{p.emoji}</span>
            <p className="font-display font-bold text-foreground/90 text-lg mt-3 relative z-10">{p.name}</p>
            <p className="text-muted-foreground text-[11px] relative z-10">{p.label}</p>
            {p.wallet && (
              <p className="font-mono text-[10px] text-muted-foreground/50 mt-0.5 relative z-10">{p.wallet}</p>
            )}
            <div className="mt-2 relative z-10">
              <span className={`font-mono text-2xl font-bold ${p.positive ? 'text-profit' : 'text-danger'}`}>
                {p.pnl}
              </span>
              {p.pnlNote && (
                <span className="text-muted-foreground text-[10px] ml-1">{p.pnlNote}</span>
              )}
            </div>
            <p className="text-muted-foreground text-xs mt-3 leading-relaxed relative z-10">
              <span className="redacted">{p.insight}</span>
            </p>
            <div className="flex items-center gap-2 mt-3 relative z-10">
              <span className="text-muted-foreground/50 text-[10px] font-mono">Risk {p.risk}/10</span>
              {p.chains.map(c => (
                <span key={c} className="glass-pill px-1.5 py-0.5 rounded text-[9px] font-mono text-muted-foreground/60">{c}</span>
              ))}
            </div>
            {p.note && (
              <p className="text-muted-foreground/30 text-[9px] mt-3 relative z-10">{p.note}</p>
            )}
            <p className="text-primary/60 text-[10px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
              {t('realDiagnoses.clickFull')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonaCards;
