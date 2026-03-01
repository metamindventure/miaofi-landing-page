import React, { createContext, useContext, useState, useCallback } from 'react';
import zh from './zh.json';
import en from './en.json';
import ko from './ko.json';

export type Locale = 'zh' | 'en' | 'ko';
const translations: Record<Locale, any> = { zh, en, ko };

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'EN',
  ko: '한국어'
};

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh');

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
