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

// Orbit stats removed — now in dedicated sections

interface WalletInputProps {
  onFocusChange?: (focused: boolean) => void;
}

const WalletInput = ({ onFocusChange }: WalletInputProps) => {
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
    // Force reflow for sonar restart
    requestAnimationFrame(() => {
      setSonarActive(true);
    });
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
    } catch {
      // clipboard not available
    }
  }, [addresses, triggerSonar]);

  const handleChange = (index: number, value: string) => {
    const updated = [...addresses];
    updated[index] = value;
    setAddresses(updated);
    if (value.length > 5) triggerSonar();
  };

  const addWallet = () => {
    if (addresses.length < 5) {
      setAddresses([...addresses, '']);
    }
  };

  const removeWallet = (index: number) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter((_, i) => i !== index));
    }
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
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Orbiting Stats Ring */}
      <div className="orbit-ring absolute inset-0 pointer-events-none" style={{ width: '140%', height: '140%', left: '-20%', top: '-20%' }}>
        {ORBIT_STATS.map((stat, i) => (
          <div
            key={stat}
            className="orbit-item pointer-events-auto"
            style={{ '--orbit-start': `${(360 / ORBIT_STATS.length) * i}deg`, '--orbit-radius': '240px' } as React.CSSProperties}
          >
            <span className="glass-pill px-3 py-1.5 rounded-full text-[11px] text-foreground/40 font-medium whitespace-nowrap">
              {stat}
            </span>
          </div>
        ))}
      </div>

      {/* Input fields */}
      <div className="flex flex-col gap-3 relative z-10">
        {addresses.map((addr, i) => (
          <div key={i} className="relative">
            {/* Sonar ring */}
            <div className={`sonar-ring ${sonarActive && i === 0 ? 'sonar-active' : ''}`} />
            
            {/* Scan line */}
            <div className={`scan-line ${scanActive && i === 0 ? 'scan-active' : ''}`} />
            
            <input
              type="text"
              value={addr}
              onChange={(e) => handleChange(i, e.target.value)}
              onFocus={() => onFocusChange?.(true)}
              onBlur={() => onFocusChange?.(false)}
              placeholder="Paste your wallet address (EVM or Solana)"
              className="glass-input w-full h-14 rounded-2xl px-5 pr-14 font-mono text-sm text-foreground/90 placeholder:text-foreground/30 focus:outline-none transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {i > 0 && (
                <button
                  onClick={() => removeWallet(i)}
                  className="p-1.5 text-foreground/30 hover:text-foreground/60 transition-colors"
                  aria-label="Remove wallet"
                >
                  <X size={14} />
                </button>
              )}
              <button
                onClick={() => handlePaste(i)}
                className="p-1.5 text-foreground/30 hover:text-foreground/60 transition-colors"
                aria-label="Paste from clipboard"
              >
                <Clipboard size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Below input row */}
      <div className="flex items-center justify-between mt-3 px-1 relative z-10">
        <button
          onClick={addWallet}
          className="flex items-center gap-1.5 text-foreground/30 hover:text-foreground/50 text-xs transition-colors"
        >
          <Plus size={12} />
          <span>Add another wallet</span>
        </button>
        <div className="text-xs text-foreground/30">
          No wallet?{' '}
          <button onClick={() => handleDemo('evm')} className="text-primary hover:underline">EVM</button>
          {' · '}
          <button onClick={() => handleDemo('solana')} className="text-primary hover:underline">Solana</button>
        </div>
      </div>

      {/* Chain detection */}
      <div className="h-5 mt-2 flex items-center gap-2 px-1 relative z-10">
        {chain === 'evm' && (
          <>
            <Check size={13} className="text-accent" />
            <span className="text-accent text-xs">EVM wallet detected</span>
          </>
        )}
        {chain === 'solana' && (
          <>
            <Check size={13} className="text-accent" />
            <span className="text-accent text-xs">Solana wallet detected</span>
          </>
        )}
        {chain === 'invalid' && (
          <>
            <X size={13} className="text-destructive" />
            <span className="text-destructive text-xs">Invalid wallet address</span>
          </>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="btn-shimmer w-full h-12 mt-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 text-primary-foreground font-display font-semibold text-[15px] transition-all duration-200 hover:brightness-110 hover:-translate-y-[1px] hover:shadow-[0_8px_30px_-5px_rgba(139,92,246,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:brightness-100 relative z-10"
      >
        Run Diagnosis →
      </button>

      {/* Trust line */}
      <p className="text-center text-foreground/20 text-[11px] mt-4 relative z-10">
        30 seconds · Read-only · No wallet connection · Free
      </p>
    </div>
  );
};

export default WalletInput;
