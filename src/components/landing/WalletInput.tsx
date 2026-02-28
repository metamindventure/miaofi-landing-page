import { useState, useCallback, useEffect, useRef } from 'react';
import { Clipboard, Check, X, Plus } from 'lucide-react';

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
  compact?: boolean;
}

const WalletInput = ({ onFocusChange, compact = false }: WalletInputProps) => {
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
    alert(`Navigating to /portfolio?address=${primaryAddress}&chain=${chain}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto relative">
      {/* Input fields */}
      <div className="flex flex-col gap-3 relative z-10">
        {addresses.map((addr, i) => (
          <div key={i} className="relative group">
            <div className={`sonar-ring ${sonarActive && i === 0 ? 'sonar-active' : ''}`} />
            <div className={`scan-line ${scanActive && i === 0 ? 'scan-active' : ''}`} />
            <input
              type="text"
              value={addr}
              onChange={(e) => handleChange(i, e.target.value)}
              onFocus={() => onFocusChange?.(true)}
              onBlur={() => onFocusChange?.(false)}
              placeholder="Paste wallet address (EVM or Solana)"
              className="glass-input w-full h-14 rounded-xl px-5 pr-14 font-mono text-sm text-foreground/80 placeholder:text-muted-foreground/50 focus:outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {i > 0 && (
                <button onClick={() => removeWallet(i)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Remove wallet">
                  <X size={14} />
                </button>
              )}
              <button onClick={() => handlePaste(i)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Paste from clipboard">
                <Clipboard size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mt-3 px-1 relative z-10">
        <button onClick={addWallet} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground/70 text-xs transition-colors">
          <Plus size={12} />
          <span>Add wallet</span>
        </button>
        <div className="text-xs text-muted-foreground">
          Try:{' '}
          <button onClick={() => handleDemo('evm')} className="text-primary hover:underline">vitalik.eth</button>
          {' · '}
          <button onClick={() => handleDemo('solana')} className="text-primary hover:underline">Solana</button>
        </div>
      </div>

      {/* Chain detection */}
      <div className="h-5 mt-2 flex items-center gap-2 px-1 relative z-10">
        {chain === 'evm' && (
          <><Check size={13} className="text-primary" /><span className="text-primary text-xs font-medium">EVM address detected</span></>
        )}
        {chain === 'solana' && (
          <><Check size={13} className="text-primary" /><span className="text-primary text-xs font-medium">Solana address detected</span></>
        )}
        {chain === 'invalid' && (
          <><X size={13} className="text-destructive" /><span className="text-destructive text-xs font-medium">Invalid address format</span></>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="btn-shimmer w-full h-13 mt-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-[15px] transition-all duration-200 hover:brightness-110 hover:-translate-y-[1px] hover:shadow-[0_8px_30px_-5px_hsl(165_82%_51%_/_0.35)] disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:brightness-100 relative z-10"
      >
        Diagnose My Portfolio →
      </button>

      {!compact && (
        <p className="text-center text-muted-foreground/50 text-[11px] mt-4 relative z-10 tracking-wide">
          Free · No sign-up · No wallet connection · Read-only
        </p>
      )}
    </div>
  );
};

export default WalletInput;
