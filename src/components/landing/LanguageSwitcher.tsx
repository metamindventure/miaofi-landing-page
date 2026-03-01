import { useState, useRef, useEffect } from 'react';
import { useI18n, localeNames, type Locale } from '@/i18n/I18nContext';

const options: { code: Locale; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'ko', label: '한국어' },
];

const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white/[0.08] border border-white/[0.15] rounded-full px-3 py-1 text-xs text-foreground/80 hover:bg-white/[0.14] transition-all font-display font-medium"
      >
        {localeNames[locale]}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-[#141420] border border-white/[0.1] rounded-lg overflow-hidden shadow-2xl min-w-[100px]">
          {options.map(opt => (
            <button
              key={opt.code}
              onClick={() => { setLocale(opt.code); setOpen(false); }}
              className={`block w-full px-4 py-2 text-sm text-left hover:bg-white/[0.08] transition ${locale === opt.code ? 'text-primary' : 'text-foreground/70'}`}
            >
              {opt.label} {locale === opt.code && '✓'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
