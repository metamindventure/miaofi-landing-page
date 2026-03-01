import { useState, useCallback, useEffect, useRef } from 'react';
import { Clipboard, X, Plus } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

type ChainType = 'evm' | 'solana' | 'invalid' | null;

const detectChain = (address: string): ChainType => {
  if (!address || address.length <= 5) return null;
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) return 'evm';
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) return 'solana';
  return 'invalid';
};

const DEMO_EVM = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const DEMO_SOL = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';

interface WalletInputProps {
  onFocusChange?: (focused: boolean) => void;
}

const WalletInput = ({ onFocusChange }: WalletInputProps) => {
  const { t } = useI18n();
  const [addresses, setAddresses] = useState<string[]>(['']);
  const [sonarActive, setSonarActive] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const sonarTimeout = useRef<ReturnType<typeof setTimeout>>();
  const primaryAddress = addresses[0];
  const chain = detectChain(primaryAddress);
  const isValid = chain === 'evm' || chain === 'solana';

  const triggerSonar = useCallback(() => {
    setSonarActive(false);
    setScanActive(true);
    requestAnimationFrame(() => setSonarActive(true));
    clearTimeout(sonarTimeout.current);
    sonarTimeout.current = setTimeout(() => {
      setSonarActive(false);
      setScanActive(false);
    }, 900);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const addr = (e as CustomEvent).detail;
      if (addr) {
        setAddresses([addr]);
        triggerSonar();
        document.querySelector<HTMLInputElement>('.glass-input')?.focus();
      }
    };
    window.addEventListener('fill-wallet', handler);
    return () => window.removeEventListener('fill-wallet', handler);
  }, [triggerSonar]);

  useEffect(() => () => clearTimeout(sonarTimeout.current), []);

  const handlePaste = useCallback(async (index: number) => {
    try {
      const text = await navigator.clipboard.readText();
      const updated = [...addresses];
      updated[index] = text.trim();
      setAddresses(updated);
      triggerSonar();
    } catch { /* clipboard not available */ }
  }, [addresses, triggerSonar]);

  const handleChange = (index: number, value: string) => {
    const updated = [...addresses];
    updated[index] = value;
    setAddresses(updated);
    if (value.length > 5) triggerSonar();
  };

  const addWallet = () => {
    if (addresses.length < 5) setAddresses([...addresses, '']);
  };

  const removeWallet = (index: number) => {
    if (addresses.length > 1) setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleDemo = (type: 'evm' | 'solana') => {
    setAddresses([type === 'evm' ? DEMO_EVM : DEMO_SOL]);
    triggerSonar();
  };

  const handleSubmit = () => {
    if (!isValid) return;
    console.log(`Navigating to /portfolio?address=${primaryAddress}&chain=${chain}`);
    alert('即将上线，敬请期待');
  };

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <div className="flex flex-col gap-3 relative z-10">
        {addresses.map((addr, i) => (
          <div key={i} className="relative">
            <div className={`sonar-ring ${sonarActive && i === 0 ? 'sonar-active' : ''}`} />
            <div className={`scan-line ${scanActive && i === 0 ? 'scan-active' : ''}`} />
            <input
              type="text"
              value={addr}
              onChange={(e) => handleChange(i, e.target.value)}
              onFocus={() => onFocusChange?.(true)}
              onBlur={() => onFocusChange?.(false)}
              placeholder={t('hero.inputPlaceholder')}
              className="glass-input w-full h-14 rounded-xl px-5 pr-14 font-mono text-sm text-foreground/90 placeholder:text-foreground/20 focus:outline-none transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {i > 0 && (
                <button onClick={() => removeWallet(i)} className="p-1.5 text-foreground/30 hover:text-foreground/60 transition-colors" aria-label="Remove wallet">
                  <X size={14} />
                </button>
              )}
              <button onClick={() => handlePaste(i)} className="p-1.5 text-foreground/30 hover:text-foreground/60 transition-colors" aria-label="Paste from clipboard">
                <Clipboard size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 px-1 relative z-10">
        <button onClick={addWallet} className="flex items-center gap-1.5 text-primary/60 hover:text-primary text-xs transition-colors">
          <Plus size={12} />
          <span>{t('hero.addWallet')}</span>
        </button>
        <div className="text-xs text-muted-foreground">
          {t('hero.noWallet')}{' '}
          <button onClick={() => handleDemo('evm')} className="text-primary/70 hover:text-primary hover:underline">{t('hero.noWalletEvm')}</button>
          {' · '}
          <button onClick={() => handleDemo('solana')} className="text-primary/70 hover:text-primary hover:underline">{t('hero.noWalletSolana')}</button>
        </div>
      </div>

      <div className="h-5 mt-2 flex items-center gap-2 px-1 relative z-10">
        {chain === 'evm' && <span className="text-profit text-xs font-mono">{t('hero.evmDetected')}</span>}
        {chain === 'solana' && <span className="text-profit text-xs font-mono">{t('hero.solanaDetected')}</span>}
        {chain === 'invalid' && <span className="text-danger text-xs font-mono">{t('hero.invalidAddress')}</span>}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="btn-shimmer btn-breathe w-full h-14 mt-3 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white font-display font-semibold text-base transition-all duration-200 hover:scale-[1.02] hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100 disabled:animate-none relative z-10"
      >
        {t('hero.cta')}
      </button>

      <p className="text-center text-muted-foreground/50 text-[11px] mt-4 relative z-10">
        {t('hero.trustLine')}
      </p>
    </div>
  );
};

export default WalletInput;
