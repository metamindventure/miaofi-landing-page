import { useState, useCallback } from 'react';
import { Clipboard, Check, X } from 'lucide-react';

type ChainType = 'evm' | 'solana' | 'invalid' | null;

const detectChain = (address: string): ChainType => {
  if (!address || address.length <= 5) return null;
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) return 'evm';
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) return 'solana';
  return 'invalid';
};

const WalletInput = () => {
  const [address, setAddress] = useState('');
  const [focused, setFocused] = useState(false);
  const chain = detectChain(address);
  const isValid = chain === 'evm' || chain === 'solana';

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAddress(text.trim());
    } catch {
      // clipboard not available
    }
  }, []);

  const handleSubmit = () => {
    if (!isValid) return;
    alert(`Navigating to /portfolio?address=${address}&chain=${chain}`);
  };

  return (
    <div className="relative">
      {/* Pulsing radial glow — the portal */}
      <div
        className="hero-input-glow pointer-events-none"
        style={{ opacity: focused ? 0.5 : undefined }}
      />

      {/* Input */}
      <div className="relative z-10">
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Paste your wallet address (EVM or Solana)"
            className={`hero-input w-full h-14 sm:h-16 rounded-2xl px-5 pr-14 font-mono text-sm sm:text-base text-foreground placeholder:text-muted-custom focus:outline-none transition-all duration-300 ${focused ? 'scale-[1.02]' : 'scale-100'}`}
          />
          <button
            onClick={handlePaste}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-custom hover:text-foreground transition-colors"
            aria-label="Paste from clipboard"
          >
            <Clipboard size={18} />
          </button>
        </div>

        {/* Chain detection */}
        <div className="h-6 mt-2.5 flex items-center gap-2 px-1">
          {chain === 'evm' && (
            <>
              <Check size={14} className="text-accent-green" />
              <span className="text-accent-green text-xs font-body">EVM wallet detected</span>
              <span className="text-xs text-muted-custom bg-secondary/40 px-2 py-0.5 rounded-full">ETH</span>
            </>
          )}
          {chain === 'solana' && (
            <>
              <Check size={14} className="text-accent-green" />
              <span className="text-accent-green text-xs font-body">Solana wallet detected</span>
              <span className="text-xs text-muted-custom bg-secondary/40 px-2 py-0.5 rounded-full">SOL</span>
            </>
          )}
          {chain === 'invalid' && (
            <>
              <X size={14} className="text-accent-red" />
              <span className="text-accent-red text-xs font-body">Invalid wallet address</span>
            </>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="cta-shimmer w-full h-12 sm:h-14 mt-2 rounded-2xl brand-gradient brand-gradient-hover text-primary-foreground font-heading font-semibold text-[15px] sm:text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Analyze Portfolio →
        </button>
      </div>
    </div>
  );
};

export default WalletInput;
