import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import LanguageSwitcher from '@/components/landing/LanguageSwitcher';
import TradingBehaviorSection from '@/components/cex/TradingBehaviorSection';
import PortfolioAnalysisSection from '@/components/cex/PortfolioAnalysisSection';

const CexResults = () => {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-background/80 backdrop-blur-lg border-b border-border/10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="logo-pulse w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-[10px]">M</span>
          </div>
          <span className="font-display font-semibold text-sm text-foreground/80 tracking-tight">MiaoFi</span>
        </Link>
        <LanguageSwitcher />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center pt-24 pb-16 px-5">
        <div className="w-full max-w-3xl">
          {/* Back */}
          <Link to="/cex-upload" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors mb-8">
            <ArrowLeft size={14} />
            {t('cexResults.backToUpload')}
          </Link>

          {/* Page title */}
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mb-2">
            {t('cexResults.pageTitle')}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-12">
            {t('cexResults.pageSubtitle')}
          </p>

          {/* Trading Behavior Analysis — matches Dashboard */}
          <div className="mb-8">
            <TradingBehaviorSection />
          </div>

          {/* Portfolio Analysis — matches Dashboard */}
          <div className="mb-12">
            <PortfolioAnalysisSection />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              to="/cex-upload"
              className="btn-shimmer flex-1 h-14 rounded-xl bg-gradient-to-r from-primary to-primary/70 text-primary-foreground font-display font-semibold text-sm flex items-center justify-center transition-all hover:scale-[1.02] hover:brightness-110"
            >
              {t('cexResults.startNewDiagnosis')}
            </Link>
            <button className="h-14 px-6 rounded-xl border border-foreground/10 text-foreground/70 hover:text-foreground hover:border-foreground/20 font-medium text-sm transition-all flex items-center gap-2">
              <Download size={16} />
              {t('cexResults.downloadReport')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CexResults;
