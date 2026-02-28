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
    <div className="glass-card-prominent rounded-2xl p-6 relative">
      {/* Focus glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)',
          opacity: focused ? 1 : 0,
        }}
      />
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Paste your wallet address (EVM or Solana)"
          className="glass-input w-full h-[52px] rounded-xl px-4 pr-12 font-mono text-sm text-foreground placeholder:text-muted-custom focus:outline-none transition-all"
        />
        <button
          onClick={handlePaste}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-custom hover:text-foreground transition-colors"
          aria-label="Paste from clipboard"
        >
          <Clipboard size={18} />
        </button>
      </div>

      {/* Chain detection */}
      <div className="h-6 mt-2 flex items-center gap-2">
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
        className="cta-streak w-full h-12 mt-3 rounded-xl brand-gradient brand-gradient-hover text-primary-foreground font-heading font-semibold text-[15px] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
      >
        Analyze Portfolio →
      </button>
    </div>
  );
};

export default WalletInput;
