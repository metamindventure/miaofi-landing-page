import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, FileSpreadsheet, FileText, ChevronDown, ChevronRight, Check, AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import LanguageSwitcher from '@/components/landing/LanguageSwitcher';

const EXCHANGES = [
  { id: 'binance', name: 'Binance', available: true, logo: '🟡' },
  { id: 'okx', name: 'OKX', available: false, logo: '⚫' },
  { id: 'bybit', name: 'Bybit', available: false, logo: '🟠' },
  { id: 'coinbase', name: 'Coinbase', available: false, logo: '🔵' },
  { id: 'kraken', name: 'Kraken', available: false, logo: '🟣' },
];

type Stage = 'select' | 'preview' | 'analyzing';

const CexUpload = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>('select');
  const [howToOpen, setHowToOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [pdfDragOver, setPdfDragOver] = useState(false);
  const [analyzeStep, setAnalyzeStep] = useState(0);

  const currentStep = stage === 'select' ? 1 : stage === 'preview' ? 2 : 3;

  const handleFileSelect = useCallback((f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (ext === 'xlsx' || ext === 'csv') {
      setFile(f);
    }
  }, []);

  const handlePdfSelect = useCallback((f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
      setPdfFile(f);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
  }, [handleFileSelect]);

  const handlePdfDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setPdfDragOver(false);
    if (e.dataTransfer.files[0]) handlePdfSelect(e.dataTransfer.files[0]);
  }, [handlePdfSelect]);

  const handleUploadClick = () => {
    if (!selectedExchange || !file) return;
    setStage('preview');
  };

  const handleConfirmAnalyze = () => {
    setStage('analyzing');
    setAnalyzeStep(0);
  };

  useEffect(() => {
    if (stage !== 'analyzing') return;
    const timers = [
      setTimeout(() => setAnalyzeStep(1), 800),
      setTimeout(() => setAnalyzeStep(2), 2200),
      setTimeout(() => setAnalyzeStep(3), 3800),
      setTimeout(() => navigate('/cex-results'), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [stage, navigate]);

  // Mock parsed data
  const mockParsed = {
    totalTrades: 847,
    timeRange: '2025-06 → 2026-03',
    topPairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'DOGE/USDT'],
    buyPercent: 62,
    sellPercent: 38,
    hasWarnings: true,
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="logo-pulse w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-[10px]">M</span>
          </div>
          <span className="font-display font-semibold text-sm text-foreground/80 tracking-tight">MiaoFi</span>
        </Link>
        <LanguageSwitcher />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center pt-24 pb-16 px-5">
        <div className="w-full max-w-2xl">

          {/* Back link */}
          <Link to="/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors mb-8">
            <ArrowLeft size={14} />
            {t('cexUpload.backToHome')}
          </Link>

          {/* Page title */}
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mb-2">
            {t('cexUpload.pageTitle')}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-10">
            {t('cexUpload.pageSubtitle')}
          </p>

          {/* Stepper */}
          <div className="flex items-center gap-3 mb-10">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step < currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step === currentStep
                    ? 'bg-primary/20 text-primary border border-primary/40'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {step < currentStep ? <Check size={14} /> : step}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${
                  step <= currentStep ? 'text-foreground/80' : 'text-muted-foreground/50'
                }`}>
                  {step === 1 ? t('cexUpload.step1Label') : step === 2 ? t('cexUpload.step2Label') : t('cexUpload.step3Label')}
                </span>
                {step < 3 && <div className={`w-8 h-px ${step < currentStep ? 'bg-primary/50' : 'bg-secondary'}`} />}
              </div>
            ))}
          </div>

          {/* ─── Stage 1: Select & Upload ─── */}
          {stage === 'select' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Exchange selection */}
              <div>
                <h2 className="font-display font-semibold text-lg text-foreground mb-4">{t('cexUpload.selectExchange')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {EXCHANGES.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => ex.available && setSelectedExchange(ex.id)}
                      disabled={!ex.available}
                      className={`glass-card rounded-xl p-4 flex items-center gap-3 transition-all duration-200 ${
                        ex.available
                          ? selectedExchange === ex.id
                            ? 'border-primary/40 bg-primary/5 ring-1 ring-primary/20'
                            : 'hover:border-foreground/10 hover:bg-foreground/[0.02] cursor-pointer'
                          : 'opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-2xl">{ex.logo}</span>
                      <div className="text-left">
                        <span className="text-sm font-semibold text-foreground block">{ex.name}</span>
                        {!ex.available && (
                          <span className="text-[10px] text-muted-foreground">{t('cexUpload.comingSoon')}</span>
                        )}
                      </div>
                      {selectedExchange === ex.id && (
                        <Check size={16} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* File upload */}
              <div>
                <h2 className="font-display font-semibold text-lg text-foreground mb-4">{t('cexUpload.uploadTitle')}</h2>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`glass-card rounded-xl p-8 flex flex-col items-center gap-4 cursor-pointer transition-all duration-200 ${
                    dragOver ? 'border-primary/40 bg-primary/5' : 'hover:border-foreground/10'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.csv"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  />
                  {file ? (
                    <>
                      <FileSpreadsheet size={36} className="text-primary" />
                      <div className="text-center">
                        <p className="text-sm text-foreground font-medium">{t('cexUpload.uploadSelected')}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="text-xs text-primary/70 hover:text-primary mt-2 underline"
                        >
                          {t('cexUpload.uploadReplace')}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload size={36} className="text-muted-foreground/40" />
                      <div className="text-center">
                        <p className="text-sm text-foreground/70">{t('cexUpload.uploadDesc')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t('cexUpload.uploadFormats')} · {t('cexUpload.uploadMaxSize')}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* How to export guide (collapsible) */}
              <div className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setHowToOpen(!howToOpen)}
                  className="w-full flex items-center justify-between p-4 text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  <span className="font-medium">{t('cexUpload.howToExport')}</span>
                  {howToOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {howToOpen && (
                  <div className="px-4 pb-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-primary">{step}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(`cexUpload.howToStep${step}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload CTA */}
              <button
                onClick={handleUploadClick}
                disabled={!selectedExchange || !file}
                className="btn-shimmer w-full h-14 rounded-xl bg-gradient-to-r from-primary to-primary/70 text-primary-foreground font-display font-semibold text-base transition-all duration-200 hover:scale-[1.02] hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {t('cexUpload.uploadCta')}
              </button>
            </div>
          )}

          {/* ─── Stage 2: Preview ─── */}
          {stage === 'preview' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-display font-semibold text-lg text-foreground">{t('cexUpload.parsingSummary')}</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-5">
                  <p className="text-xs text-muted-foreground mb-1">{t('cexUpload.totalTrades')}</p>
                  <p className="text-2xl font-display font-bold text-foreground">{mockParsed.totalTrades.toLocaleString()}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <p className="text-xs text-muted-foreground mb-1">{t('cexUpload.timeRange')}</p>
                  <p className="text-lg font-mono font-semibold text-foreground">{mockParsed.timeRange}</p>
                </div>
              </div>

              <div className="glass-card rounded-xl p-5">
                <p className="text-xs text-muted-foreground mb-3">{t('cexUpload.topPairs')}</p>
                <div className="flex flex-wrap gap-2">
                  {mockParsed.topPairs.map((pair) => (
                    <span key={pair} className="glass-pill px-3 py-1.5 rounded-full text-xs font-mono text-foreground/80">
                      {pair}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground">{t('cexUpload.buyRatio')} / {t('cexUpload.sellRatio')}</p>
                </div>
                <div className="flex gap-1 h-3 rounded-full overflow-hidden">
                  <div className="bg-profit/60 rounded-l-full" style={{ width: `${mockParsed.buyPercent}%` }} />
                  <div className="bg-danger/60 rounded-r-full" style={{ width: `${mockParsed.sellPercent}%` }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-profit font-mono">{t('cexUpload.buyRatio')} {mockParsed.buyPercent}%</span>
                  <span className="text-xs text-danger font-mono">{t('cexUpload.sellRatio')} {mockParsed.sellPercent}%</span>
                </div>
              </div>

              {/* Warnings */}
              {mockParsed.hasWarnings && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20">
                  <AlertTriangle size={16} className="text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-warning">{t('cexUpload.warnings')}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t('cexUpload.warningPartialParse')}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => { setStage('select'); setFile(null); }}
                  className="flex-1 h-12 rounded-xl border border-foreground/10 text-foreground/70 hover:text-foreground hover:border-foreground/20 font-medium text-sm transition-all"
                >
                  {t('cexUpload.reupload')}
                </button>
                <button
                  onClick={handleConfirmAnalyze}
                  className="btn-shimmer flex-[2] h-12 rounded-xl bg-gradient-to-r from-primary to-primary/70 text-primary-foreground font-display font-semibold text-sm transition-all hover:scale-[1.02] hover:brightness-110"
                >
                  {t('cexUpload.confirmAndAnalyze')}
                </button>
              </div>
            </div>
          )}

          {/* ─── Stage 3: Analyzing ─── */}
          {stage === 'analyzing' && (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
              <div className="relative w-20 h-20 mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <div className="absolute inset-3 rounded-full border-2 border-primary/30 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              </div>

              <h2 className="font-display font-bold text-xl text-foreground mb-2">{t('cexUpload.analyzing')}</h2>
              <p className="text-sm text-muted-foreground mb-10">{t('cexUpload.analyzingDesc')}</p>

              <div className="w-full max-w-sm space-y-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className={`flex items-center gap-3 transition-all duration-500 ${
                    analyzeStep >= step ? 'opacity-100' : 'opacity-30'
                  }`}>
                    {analyzeStep > step ? (
                      <div className="w-6 h-6 rounded-full bg-profit/20 flex items-center justify-center">
                        <Check size={12} className="text-profit" />
                      </div>
                    ) : analyzeStep === step ? (
                      <Loader2 size={16} className="text-primary animate-spin ml-1" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-[10px] text-muted-foreground">{step}</span>
                      </div>
                    )}
                    <span className="text-sm text-foreground/70">
                      {t(`cexUpload.analyzingStep${step}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CexUpload;
